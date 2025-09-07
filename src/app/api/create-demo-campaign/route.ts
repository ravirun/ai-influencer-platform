import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebase-admin';
import { campaignDb, personaDb, assetDb } from '@/lib/database';
import { Timestamp } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const { role } = await request.json();

    // Create demo campaign based on role
    const demoCampaign = await createDemoCampaign(userId, role);

    return NextResponse.json({ 
      success: true, 
      campaignId: demoCampaign.campaignId,
      message: 'Demo campaign created successfully' 
    });

  } catch (error) {
    console.error('Error creating demo campaign:', error);
    return NextResponse.json(
      { error: 'Failed to create demo campaign' },
      { status: 500 }
    );
  }
}

async function createDemoCampaign(userId: string, role: string) {
  const now = Timestamp.now();
  const startDate = Timestamp.fromDate(new Date());
  const endDate = Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)); // 30 days from now

  if (role === 'brand') {
    // Create demo brand campaign
    const campaignData = {
      brandId: userId,
      name: 'Welcome to Inspire AI - Demo Campaign',
      brief: 'This is a demo campaign to help you get started with Inspire AI. Create engaging content that showcases the power of AI-driven influencer marketing.',
      description: 'A sample campaign to demonstrate the platform capabilities',
      target: 'Tech-savvy millennials and Gen Z interested in AI and productivity tools',
      channels: ['instagram', 'youtube', 'tiktok'] as const,
      budget: 5000,
      currency: 'USD',
      status: 'draft' as const,
      startDate,
      endDate,
      kpis: {
        impressionsGoal: 100000,
        reachGoal: 50000,
        engagementGoal: 5000,
        ctrGoal: 3.5,
        conversionGoal: 200
      },
      contentRequirements: {
        postCount: 3,
        storyCount: 5,
        reelCount: 2,
        hashtags: ['#InspireAI', '#AIContent', '#InfluencerMarketing', '#DemoCampaign'],
        mentions: ['@inspireai'],
        callToAction: 'Try Inspire AI today and transform your content strategy!',
        brandGuidelines: 'Keep content authentic, engaging, and aligned with our innovative AI-driven approach.'
      },
      createdBy: userId,
      tags: ['demo', 'onboarding', 'ai', 'influencer-marketing'],
      priority: 'medium' as const,
      category: 'technology'
    };

    const campaignId = await campaignDb.create(campaignData);

    // Create demo persona for the campaign
    const personaData = {
      name: 'Tech Enthusiast Persona',
      description: 'A tech-savvy individual who loves innovation and AI tools',
      ownerType: 'brand' as const,
      createdBy: userId,
      voiceTraits: ['innovative', 'authentic', 'engaging'],
      tone: 'conversational' as const,
      examplePosts: [
        'Just discovered this amazing AI tool that\'s changing how I create content! 🤖✨',
        'The future of content creation is here, and it\'s more exciting than ever! 🚀',
        'Why spend hours on content when AI can help you create better posts in minutes?'
      ],
      sliders: {
        tone: 0.7, // conversational
        emoji: 2, // moderate
        cta: 2, // moderate
        length: 0.6, // medium
        creativity: 0.8 // high
      },
      brandContext: {
        brandId: userId,
        guidelines: 'Focus on innovation, authenticity, and the power of AI in content creation',
        keywords: ['AI', 'innovation', 'productivity', 'content creation', 'technology'],
        avoidWords: ['spam', 'clickbait', 'misleading'],
        brandVoice: 'Innovative, authentic, and empowering'
      },
      status: 'active' as const
    };

    const personaId = await personaDb.create(personaData);

    // Update campaign with persona
    await campaignDb.update(campaignId, { personaId });

    // Create demo assets
    const demoAssets = [
      {
        campaignId,
        ownerId: userId,
        brandId: userId,
        type: 'caption' as const,
        status: 'generated' as const,
        content: {
          text: '🚀 Excited to share that I\'m now using Inspire AI to create amazing content! This AI-powered platform is revolutionizing how I approach influencer marketing. The results speak for themselves - better engagement, more authentic content, and way less time spent on the creative process. #InspireAI #AIContent #InfluencerMarketing'
        },
        language: 'en',
        topics: ['AI', 'content creation', 'influencer marketing'],
        hashtags: ['#InspireAI', '#AIContent', '#InfluencerMarketing'],
        mentions: ['@inspireai'],
        aiContext: {
          personaId,
          prompt: 'Create an engaging Instagram caption about using Inspire AI for content creation',
          model: 'gemini-pro',
          temperature: 0.7,
          maxTokens: 150
        },
        tags: ['demo', 'instagram', 'caption']
      },
      {
        campaignId,
        ownerId: userId,
        brandId: userId,
        type: 'caption' as const,
        status: 'generated' as const,
        content: {
          text: 'The future of content creation is here! 🤖✨ Just tried Inspire AI and I\'m blown away by how it helps me create authentic, engaging content that resonates with my audience. No more staring at blank screens - just pure creative magic! #ContentCreation #AI #Innovation'
        },
        language: 'en',
        topics: ['AI', 'innovation', 'content creation'],
        hashtags: ['#ContentCreation', '#AI', '#Innovation'],
        mentions: ['@inspireai'],
        aiContext: {
          personaId,
          prompt: 'Create a TikTok-style caption about AI content creation',
          model: 'gemini-pro',
          temperature: 0.8,
          maxTokens: 120
        },
        tags: ['demo', 'tiktok', 'caption']
      }
    ];

    for (const assetData of demoAssets) {
      await assetDb.create(assetData);
    }

    return { campaignId, personaId };

  } else {
    // Create demo creator campaign (opportunity)
    const campaignData = {
      brandId: 'demo-brand-id', // This would be a system demo brand
      name: 'Tech Innovation Showcase - Creator Opportunity',
      brief: 'We\'re looking for tech-savvy creators to showcase the latest in AI-powered content creation tools. Share your experience with innovative technology and help others discover the future of content creation.',
      description: 'A demo opportunity for creators to explore AI content tools',
      target: 'Tech enthusiasts and early adopters',
      channels: ['instagram', 'youtube', 'tiktok'] as const,
      budget: 2000,
      currency: 'USD',
      status: 'live' as const,
      startDate,
      endDate,
      assignedCreators: {
        [userId]: {
          status: 'accepted' as const,
          assignedAt: now,
          acceptedAt: now,
          deliverables: ['3 Instagram posts', '2 TikTok videos', '1 YouTube short'],
          compensation: 500,
          notes: 'Demo creator opportunity'
        }
      },
      contentRequirements: {
        postCount: 3,
        storyCount: 3,
        reelCount: 2,
        hashtags: ['#TechInnovation', '#AIContent', '#CreatorLife'],
        mentions: ['@techbrand'],
        callToAction: 'Join the tech revolution!',
        brandGuidelines: 'Authentic, innovative, and engaging content that showcases technology'
      },
      createdBy: 'demo-brand-id',
      tags: ['demo', 'creator-opportunity', 'tech', 'ai'],
      priority: 'high' as const,
      category: 'technology'
    };

    const campaignId = await campaignDb.create(campaignData);

    // Create demo creator persona
    const personaData = {
      name: 'Tech Creator Persona',
      description: 'A content creator who loves sharing tech innovations and AI tools',
      ownerType: 'creator' as const,
      createdBy: userId,
      voiceTraits: ['authentic', 'enthusiastic', 'educational'],
      tone: 'conversational' as const,
      examplePosts: [
        'Just tried this new AI tool and my mind is blown! 🤯 Here\'s what happened...',
        'Tech Tuesday: This AI platform is changing how I create content!',
        'POV: You discover an AI tool that actually makes content creation fun again'
      ],
      sliders: {
        tone: 0.8, // very conversational
        emoji: 2, // moderate
        cta: 1, // light
        length: 0.5, // medium
        creativity: 0.9 // very high
      },
      brandContext: {
        guidelines: 'Focus on authentic experiences with technology and AI tools',
        keywords: ['AI', 'technology', 'innovation', 'content creation', 'creator life'],
        avoidWords: ['fake', 'sponsored', 'ad'],
        brandVoice: 'Authentic, enthusiastic, and educational'
      },
      status: 'active' as const
    };

    const personaId = await personaDb.create(personaData);

    // Create demo assets for creator
    const demoAssets = [
      {
        campaignId,
        ownerId: userId,
        brandId: 'demo-brand-id',
        type: 'caption' as const,
        status: 'generated' as const,
        content: {
          text: 'Tech Tuesday is here! 🚀 Just discovered this incredible AI tool that\'s completely changing how I approach content creation. The best part? It actually understands my style and helps me create more authentic content. Game changer! #TechTuesday #AIContent #CreatorLife'
        },
        language: 'en',
        topics: ['AI', 'content creation', 'technology'],
        hashtags: ['#TechTuesday', '#AIContent', '#CreatorLife'],
        mentions: ['@techbrand'],
        aiContext: {
          personaId,
          prompt: 'Create a Tech Tuesday post about discovering an AI content tool',
          model: 'gemini-pro',
          temperature: 0.7,
          maxTokens: 140
        },
        tags: ['demo', 'tech-tuesday', 'caption']
      }
    ];

    for (const assetData of demoAssets) {
      await assetDb.create(assetData);
    }

    return { campaignId, personaId };
  }
}
