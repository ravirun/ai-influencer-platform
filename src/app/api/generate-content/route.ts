import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requirePermission } from '@/lib/api-auth';

export const runtime = 'edge';

// Define the schema for generated content variants
const ContentVariantSchema = z.object({
  id: z.string(),
  text: z.string(),
  score: z.number().min(0).max(100),
  reasons: z.array(z.string()),
  hashtags: z.array(z.string()),
  topics: z.array(z.string()),
  safety: z.object({
    ok: z.boolean(),
    reasons: z.array(z.string())
  }),
  cost: z.object({
    input: z.number(),
    output: z.number()
  })
});

const GenerateContentSchema = z.object({
  variants: z.array(ContentVariantSchema),
  totalCost: z.number(),
  campaignId: z.string(),
  assetId: z.string()
});

async function handleGenerateContent(req: NextRequest) {
  try {
    const { 
      campaignId, 
      personaId, 
      brief, 
      target, 
      tone = 0.6, 
      emoji = 1.5, 
      cta = 2, 
      numVariants = 3 
    } = await req.json();

    if (!campaignId || !brief) {
      return NextResponse.json(
        { error: 'Campaign ID and brief are required' },
        { status: 400 }
      );
    }

    // Build the prompt with context
    let prompt = `Generate ${numVariants} engaging social media caption variants for this campaign brief:\n\n`;
    prompt += `Brief: ${brief}\n`;
    prompt += `Target Audience: ${target || 'General audience'}\n\n`;

    // Add tone instructions
    const toneDescription = tone < 0.3 ? 'formal and professional' : 
                           tone < 0.7 ? 'conversational and friendly' : 
                           'playful and casual';
    prompt += `Tone: ${toneDescription}\n`;

    const emojiLevel = emoji < 1 ? 'minimal emojis (0-1)' : 
                      emoji < 2 ? 'moderate emojis (1-2)' : 
                      'heavy emoji usage (2-3)';
    prompt += `Emoji Usage: ${emojiLevel}\n`;

    const ctaStrength = cta < 1 ? 'subtle call-to-action' : 
                       cta < 2 ? 'clear call-to-action' : 
                       'strong call-to-action';
    prompt += `Call-to-Action: ${ctaStrength}\n\n`;

    prompt += `Requirements:
- Each caption should be 120-180 characters
- Include 3-5 relevant hashtags
- Ensure brand safety and compliance
- Make content engaging and shareable
- Include appropriate call-to-action
- Score each variant based on engagement potential (0-100)
- Provide reasons for the score
- Check for safety and compliance issues

Return the variants as structured JSON with all required fields.`;

    const result = await generateObject({
      model: google('models/gemini-1.5-pro'),
      prompt,
      schema: GenerateContentSchema,
      temperature: 0.8,
    });

    // Generate a unique asset ID
    const assetId = `asset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Calculate total cost (mock calculation)
    const totalCost = result.object.variants.reduce((sum, variant) => 
      sum + (variant.cost.input + variant.cost.output) * 0.00001, 0
    );

    // TODO: Save to Firestore
    // await saveAssetToFirestore({
    //   assetId,
    //   campaignId,
    //   variants: result.object.variants,
    //   totalCost,
    //   createdAt: Date.now()
    // });

    return NextResponse.json({
      ...result.object,
      assetId,
      totalCost
    });

  } catch (error) {
    console.error('Content generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}

// Export the handler with fallback for development
export async function POST(req: NextRequest) {
  try {
    // Try to use the protected handler first
    if (process.env.FIREBASE_ADMIN_PROJECT_ID && process.env.FIREBASE_ADMIN_CLIENT_EMAIL && process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
      return await requirePermission('create', 'content', handleGenerateContent)(req);
    } else {
      // Fallback for development when Firebase Admin is not configured
      console.warn('Firebase Admin not configured, using development mode for content generation');
      return await handleGenerateContent(req);
    }
  } catch (error) {
    console.error('Content generation API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
