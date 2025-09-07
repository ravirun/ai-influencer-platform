import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages, campaignId, personaId, tone, emoji, cta } = await req.json();

    // Get campaign context if provided
    let systemPrompt = 'You are a professional social media copywriter for influencer marketing campaigns.';
    
    if (campaignId) {
      // TODO: Fetch campaign details from Firestore
      systemPrompt += `\n\nCampaign Context: Generate content for campaign ${campaignId}`;
    }

    if (personaId) {
      // TODO: Fetch persona details from Firestore
      systemPrompt += `\n\nPersona Context: Use the voice and style of persona ${personaId}`;
    }

    // Add tone instructions
    if (tone !== undefined) {
      const toneDescription = tone < 0.3 ? 'formal and professional' : 
                             tone < 0.7 ? 'conversational and friendly' : 
                             'playful and casual';
      systemPrompt += `\n\nTone: ${toneDescription}`;
    }

    if (emoji !== undefined) {
      const emojiLevel = emoji < 1 ? 'minimal emojis' : 
                        emoji < 2 ? 'moderate emojis' : 
                        'heavy emoji usage';
      systemPrompt += `\n\nEmoji Usage: ${emojiLevel}`;
    }

    if (cta !== undefined) {
      const ctaStrength = cta < 1 ? 'subtle call-to-action' : 
                         cta < 2 ? 'clear call-to-action' : 
                         'strong call-to-action';
      systemPrompt += `\n\nCall-to-Action: ${ctaStrength}`;
    }

    systemPrompt += '\n\nGenerate engaging, brand-safe social media content that drives engagement and conversions.';

    const result = await streamText({
      model: google('models/gemini-1.5-pro'),
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      maxOutputTokens: 500,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
