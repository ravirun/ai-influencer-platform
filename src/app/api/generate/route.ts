import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      type, 
      campaignId, 
      personaId, 
      options = {} 
    } = body;

    if (!campaignId) {
      return NextResponse.json(
        { error: 'campaign_id_required' },
        { status: 400 }
      );
    }

    // Get campaign data
    const campaignDoc = await adminDb.collection('campaigns').doc(campaignId).get();
    if (!campaignDoc.exists) {
      return NextResponse.json(
        { error: 'campaign_not_found' },
        { status: 404 }
      );
    }

    const campaign = campaignDoc.data();
    if (!campaign) {
      return NextResponse.json(
        { error: 'campaign_data_invalid' },
        { status: 400 }
      );
    }

    // Get persona data if specified
    let persona = null;
    if (personaId) {
      const personaDoc = await adminDb.collection('personas').doc(personaId).get();
      if (personaDoc.exists) {
        persona = personaDoc.data();
      }
    }

    // Generate content based on type
    let result;
    switch (type) {
      case 'caption':
        result = await generateCaption(campaign, persona, options);
        break;
      case 'script':
        result = await generateScript(campaign, persona, options);
        break;
      default:
        return NextResponse.json(
          { error: 'invalid_content_type' },
          { status: 400 }
        );
    }

    // Save generated asset to Firestore
    const assetRef = adminDb.collection('assets').doc();
    await assetRef.set({
      campaignId,
      brandId: campaign.brandId,
      ownerId: options.ownerId || 'system',
      type,
      status: 'generated',
      variants: [result.text],
      language: options.language || 'en',
      topics: result.topics || [],
      hashtags: result.hashtags || [],
      moderation: {
        flagged: !result.safety.ok,
        reasons: result.safety.reasons || []
      },
      metadata: {
        model: 'gemini-1.5-pro',
        cost: result.metadata.cost,
        personaId: personaId || null,
        options
      },
      createdAt: Date.now()
    });

    return NextResponse.json({
      assetId: assetRef.id,
      variants: [{
        id: `variant_${Date.now()}`,
        text: result.text,
        score: calculateScore(result.text, campaign.brief, campaign.target),
        reasons: getScoreReasons(result.text, campaign.brief, campaign.target),
        safety: result.safety,
        cost: result.metadata.cost
      }]
    });

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'generation_failed', message: 'Failed to generate content' },
      { status: 500 }
    );
  }
}

async function generateCaption(campaign: any, persona: any, options: any) {
  const brief = campaign.brief;
  const target = campaign.target;
  
  const result = await geminiService.generateCaption(
    brief,
    target,
    persona,
    {
      tone: options.tone || 0.6,
      emoji: options.emoji || 1.5,
      cta: options.cta || 2,
      language: options.language || 'en'
    }
  );

  return {
    text: result.text,
    hashtags: result.hashtags,
    topics: extractTopics(result.text),
    safety: checkSafety(result.text),
    metadata: result.metadata
  };
}

async function generateScript(campaign: any, persona: any, options: any) {
  // For now, return a simple script structure
  // In a real implementation, this would use Gemini to generate video scripts
  return {
    text: `[Video Script for ${campaign.name}]\n\nOpening: Hook the audience with a compelling question\n\nMain Content: Showcase the product features and benefits\n\nCall to Action: Encourage viewers to take action\n\nHashtags: ${campaign.name.replace(/\s+/g, '')} #ProductLaunch #Innovation`,
    hashtags: [campaign.name.replace(/\s+/g, ''), 'ProductLaunch', 'Innovation'],
    topics: ['product', 'launch', 'innovation'],
    safety: { ok: true, reasons: [] },
    metadata: { cost: { input: 200, output: 100 } }
  };
}

function calculateScore(text: string, brief: string, target: string): number {
  let score = 50; // Base score
  
  // Length scoring (prefer 120-180 chars for captions)
  if (text.length >= 120 && text.length <= 180) score += 20;
  else if (text.length < 120) score -= 10;
  else score -= 15;
  
  // Hashtag scoring (prefer 3-5 hashtags)
  const hashtagCount = (text.match(/#\w+/g) || []).length;
  if (hashtagCount >= 3 && hashtagCount <= 5) score += 15;
  else if (hashtagCount < 3) score -= 10;
  else score -= 5;
  
  // Brand relevance (simple keyword matching)
  const briefWords = brief.toLowerCase().split(' ');
  const textWords = text.toLowerCase().split(' ');
  const matchingWords = briefWords.filter(word => textWords.includes(word)).length;
  score += matchingWords * 5;
  
  return Math.max(0, Math.min(100, score));
}

function getScoreReasons(text: string, brief: string, target: string): string[] {
  const reasons = [];
  
  if (text.length >= 120 && text.length <= 180) {
    reasons.push('Optimal length');
  }
  
  const hashtagCount = (text.match(/#\w+/g) || []).length;
  if (hashtagCount >= 3 && hashtagCount <= 5) {
    reasons.push('Good hashtag count');
  }
  
  const briefWords = brief.toLowerCase().split(' ');
  const textWords = text.toLowerCase().split(' ');
  const matchingWords = briefWords.filter(word => textWords.includes(word)).length;
  if (matchingWords > 0) {
    reasons.push('Brand relevant');
  }
  
  return reasons;
}

function extractTopics(text: string): string[] {
  // Simple topic extraction - in a real implementation, this would use NLP
  const topics = [];
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('product') || lowerText.includes('launch')) topics.push('product');
  if (lowerText.includes('sale') || lowerText.includes('discount')) topics.push('promotion');
  if (lowerText.includes('review') || lowerText.includes('test')) topics.push('review');
  if (lowerText.includes('tip') || lowerText.includes('guide')) topics.push('education');
  
  return topics;
}

function checkSafety(text: string): { ok: boolean; reasons: string[] } {
  const reasons = [];
  const lowerText = text.toLowerCase();
  
  // Simple safety checks
  const bannedWords = ['spam', 'scam', 'fake', 'clickbait'];
  const hasBannedWords = bannedWords.some(word => lowerText.includes(word));
  
  if (hasBannedWords) {
    reasons.push('Contains potentially problematic words');
  }
  
  // Check for excessive caps
  const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length;
  if (capsRatio > 0.3) {
    reasons.push('Excessive capitalization');
  }
  
  return {
    ok: reasons.length === 0,
    reasons
  };
}
