# Firestore Database Schema

This document defines the complete Firestore database schema for the Inspire AI influencer platform.

## Overview

The database is organized into the following main collections:
- `users` - User profiles and authentication data
- `campaigns` - Marketing campaigns and briefs
- `assets` - Generated content (captions, images, videos)
- `schedules` - Content scheduling information
- `posts` - Published content with analytics
- `personas` - AI influencer personas and traits
- `events` - Audit trail and activity logs
- `analytics` - Performance metrics and insights
- `settings` - Platform configuration

## Collection Schemas

### 1. Users Collection (`users`)

**Document ID**: User UID from Firebase Auth

```typescript
interface UserDoc {
  // Basic Information
  role: 'admin' | 'brand' | 'creator';
  displayName: string;
  email: string;
  photoURL?: string;
  
  // Role-specific Data
  brandId?: string; // For brand staff members
  handles?: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    twitter?: string;
  };
  
  // Creator Profile
  creatorProfile?: {
    niches: string[]; // ['fashion', 'tech', 'lifestyle']
    languages: string[]; // ['en', 'es', 'fr']
    minCPM?: number; // Minimum cost per mille
    bio?: string;
    location?: string;
    followerCount?: {
      instagram?: number;
      youtube?: number;
      tiktok?: number;
      twitter?: number;
    };
    engagementRate?: {
      instagram?: number;
      youtube?: number;
      tiktok?: number;
      twitter?: number;
    };
    verified?: boolean;
    portfolio?: string[]; // Array of portfolio URLs
  };
  
  // Brand Profile
  brandProfile?: {
    vertical: string; // 'fashion', 'tech', 'beauty', etc.
    guidelinesDocId?: string; // Reference to brand guidelines
    tone?: string; // Brand voice description
    website?: string;
    industry?: string;
    companySize?: 'startup' | 'small' | 'medium' | 'enterprise';
    brandColors?: string[]; // Hex color codes
    logoUrl?: string;
  };
  
  // Onboarding & Preferences
  onboardingCompleted: boolean;
  preferences?: {
    notifications: {
      email: boolean;
      push: boolean;
      campaignUpdates: boolean;
      newOpportunities: boolean;
      weeklyReports: boolean;
    };
    privacy: {
      profileVisibility: 'public' | 'verified' | 'private';
      showEarnings: boolean;
      allowDirectMessages: boolean;
    };
    content: {
      tone: number; // 0 = formal, 1 = casual
      emojiUsage: number; // 0 = none, 3 = heavy
      ctaStrength: number; // 0 = subtle, 3 = strong
      language: string;
    };
    business: {
      budgetRange?: [number, number];
      targetAudience?: string;
      campaignTypes?: string[];
      minCPM?: number;
      maxCampaigns?: number;
      preferredChannels?: string[];
    };
  };
  
  // Timestamps
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
  lastLoginAt?: FirebaseFirestore.Timestamp;
  
  // Status
  status: 'active' | 'suspended' | 'pending_verification';
  emailVerified: boolean;
}
```

### 2. Campaigns Collection (`campaigns`)

**Document ID**: Auto-generated campaign ID

```typescript
interface CampaignDoc {
  // Basic Information
  brandId: string; // Reference to brand user
  name: string;
  brief: string;
  description?: string;
  target: string; // Target audience description
  
  // Campaign Details
  personaId?: string; // Reference to AI persona
  channels: ('instagram' | 'youtube' | 'tiktok' | 'twitter')[];
  budget: number;
  currency: string; // 'USD', 'INR', 'EUR'
  
  // Status & Timeline
  status: 'draft' | 'live' | 'paused' | 'completed' | 'cancelled';
  startDate: FirebaseFirestore.Timestamp;
  endDate: FirebaseFirestore.Timestamp;
  
  // KPIs & Goals
  kpis?: {
    impressionsGoal?: number;
    reachGoal?: number;
    engagementGoal?: number;
    ctrGoal?: number;
    conversionGoal?: number;
    salesGoal?: number;
  };
  
  // Creator Management
  assignedCreators?: {
    [creatorId: string]: {
      status: 'invited' | 'accepted' | 'declined' | 'completed';
      assignedAt: FirebaseFirestore.Timestamp;
      acceptedAt?: FirebaseFirestore.Timestamp;
      deliverables?: string[];
      compensation?: number;
      notes?: string;
    };
  };
  
  // Content Requirements
  contentRequirements?: {
    postCount: number;
    storyCount?: number;
    reelCount?: number;
    videoLength?: number; // in seconds
    hashtags?: string[];
    mentions?: string[];
    callToAction?: string;
    brandGuidelines?: string;
  };
  
  // Analytics
  analytics?: {
    totalImpressions?: number;
    totalReach?: number;
    totalEngagement?: number;
    totalClicks?: number;
    totalConversions?: number;
    totalSpend?: number;
    roi?: number;
  };
  
  // Timestamps
  createdBy: string; // User ID
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
  
  // Metadata
  tags?: string[];
  priority?: 'low' | 'medium' | 'high';
  category?: string;
}
```

### 3. Assets Collection (`assets`)

**Document ID**: Auto-generated asset ID

```typescript
interface AssetDoc {
  // Basic Information
  campaignId: string; // Reference to campaign
  ownerId: string; // Creator or brand user ID
  brandId: string; // Reference to brand
  
  // Asset Details
  type: 'caption' | 'image' | 'video' | 'audio' | 'story' | 'reel';
  status: 'generated' | 'approved' | 'rejected' | 'scheduled' | 'posted';
  
  // Content
  content?: {
    text?: string;
    imageUrl?: string;
    videoUrl?: string;
    audioUrl?: string;
    thumbnailUrl?: string;
  };
  
  // AI Generation Data
  variants?: Array<{
    id: string;
    text: string;
    score: number;
    reasons: string[];
    safety: {
      ok: boolean;
      reasons: string[];
    };
    cost: {
      input: number;
      output: number;
    };
    generatedAt: FirebaseFirestore.Timestamp;
  }>;
  
  // Content Metadata
  language?: string;
  durationSec?: number; // For video/audio
  topics?: string[];
  hashtags?: string[];
  mentions?: string[];
  
  // Moderation
  moderation?: {
    flagged: boolean;
    reasons?: string[];
    moderatedBy?: string;
    moderatedAt?: FirebaseFirestore.Timestamp;
    approvedBy?: string;
    approvedAt?: FirebaseFirestore.Timestamp;
  };
  
  // AI Context
  aiContext?: {
    personaId?: string;
    prompt?: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
    generationCost?: number;
  };
  
  // Timestamps
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
  
  // Metadata
  metadata?: Record<string, any>;
  tags?: string[];
}
```

### 4. Schedules Collection (`schedules`)

**Document ID**: Auto-generated schedule ID

```typescript
interface ScheduleDoc {
  // References
  assetId: string; // Reference to asset
  campaignId: string; // Reference to campaign
  ownerId: string; // Creator or brand user ID
  
  // Scheduling Details
  channel: 'instagram' | 'youtube' | 'tiktok' | 'twitter';
  publishAt: FirebaseFirestore.Timestamp;
  timezone: string; // 'UTC', 'America/New_York', etc.
  
  // Status & Execution
  status: 'queued' | 'scheduled' | 'sent' | 'failed' | 'cancelled';
  attempts: number;
  maxAttempts: number;
  
  // Platform-specific Data
  platformData?: {
    instagram?: {
      postType?: 'feed' | 'story' | 'reel' | 'igtv';
      location?: string;
      taggedUsers?: string[];
    };
    youtube?: {
      videoType?: 'short' | 'long';
      category?: string;
      tags?: string[];
    };
    tiktok?: {
      videoType?: 'regular' | 'duet' | 'stitch';
      effects?: string[];
    };
    twitter?: {
      thread?: boolean;
      replyTo?: string;
    };
  };
  
  // Results
  result?: {
    externalId?: string; // Platform post ID
    permalink?: string;
    postedAt?: FirebaseFirestore.Timestamp;
    error?: string;
    retryAfter?: FirebaseFirestore.Timestamp;
  };
  
  // Timestamps
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
  
  // Metadata
  notes?: string;
  priority?: 'low' | 'medium' | 'high';
}
```

### 5. Posts Collection (`posts`)

**Document ID**: Auto-generated post ID

```typescript
interface PostDoc {
  // References
  scheduleId: string; // Reference to schedule
  assetId: string; // Reference to asset
  campaignId: string; // Reference to campaign
  ownerId: string; // Creator or brand user ID
  
  // Platform Information
  platform: 'instagram' | 'youtube' | 'tiktok' | 'twitter';
  externalId: string; // Platform post ID
  permalink: string;
  
  // Content
  content: {
    text?: string;
    imageUrl?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
  };
  
  // Publishing Details
  postedAt: FirebaseFirestore.Timestamp;
  timezone: string;
  
  // Analytics (updated periodically)
  insights?: {
    // Engagement Metrics
    impressions?: number;
    reach?: number;
    likes?: number;
    comments?: number;
    shares?: number;
    saves?: number;
    views?: number; // For video content
    
    // Click Metrics
    ctaClicks?: number;
    linkClicks?: number;
    profileClicks?: number;
    
    // Conversion Metrics
    conversions?: number;
    conversionValue?: number;
    
    // Platform-specific Metrics
    instagram?: {
      storyViews?: number;
      storyExits?: number;
      storyReplies?: number;
    };
    youtube?: {
      watchTime?: number;
      averageViewDuration?: number;
      subscriberGained?: number;
    };
    tiktok?: {
      completionRate?: number;
      shares?: number;
    };
  };
  
  // Analytics Timestamps
  insightsUpdatedAt?: FirebaseFirestore.Timestamp;
  lastAnalyticsFetch?: FirebaseFirestore.Timestamp;
  
  // Status
  status: 'active' | 'deleted' | 'hidden' | 'flagged';
  
  // Timestamps
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}
```

### 6. Personas Collection (`personas`)

**Document ID**: Auto-generated persona ID

```typescript
interface PersonaDoc {
  // Basic Information
  name: string;
  description?: string;
  ownerType: 'system' | 'brand' | 'creator';
  createdBy: string; // User ID
  
  // Voice & Style
  voiceTraits: string[]; // ['professional', 'casual', 'humorous']
  tone: 'formal' | 'conversational' | 'playful' | 'authoritative';
  
  // Content Examples
  examplePosts?: string[];
  exampleCaptions?: string[];
  
  // AI Configuration
  sliders?: {
    tone: number; // 0-1 (formal to playful)
    emoji: number; // 0-3 (none to heavy)
    cta: number; // 0-3 (subtle to strong)
    length: number; // 0-1 (short to long)
    creativity: number; // 0-1 (conservative to creative)
  };
  
  // Brand Context
  brandContext?: {
    brandId?: string;
    guidelines?: string;
    keywords?: string[];
    avoidWords?: string[];
    brandVoice?: string;
  };
  
  // AI Model Data
  embeddingRef?: string; // Reference to vector embedding
  modelConfig?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
  };
  
  // Usage Statistics
  usageStats?: {
    totalGenerations?: number;
    lastUsed?: FirebaseFirestore.Timestamp;
    averageScore?: number;
    successRate?: number;
  };
  
  // Timestamps
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
  
  // Status
  status: 'active' | 'archived' | 'draft';
  isPublic?: boolean; // For system personas
}
```

### 7. Events Collection (`events`)

**Document ID**: Auto-generated event ID

```typescript
interface EventDoc {
  // Event Details
  type: string; // 'user_login', 'campaign_created', 'content_generated', etc.
  category: 'auth' | 'campaign' | 'content' | 'analytics' | 'system';
  
  // Actor Information
  actorId: string; // User ID who performed the action
  actorRole: 'admin' | 'brand' | 'creator';
  
  // Event Data
  payload?: {
    [key: string]: any;
  };
  
  // Context
  resourceId?: string; // ID of the resource affected
  resourceType?: 'campaign' | 'asset' | 'post' | 'user';
  
  // Metadata
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
  
  // Timestamps
  timestamp: FirebaseFirestore.Timestamp;
  
  // Severity
  severity: 'low' | 'medium' | 'high' | 'critical';
  
  // Status
  status: 'success' | 'failure' | 'warning';
}
```

### 8. Analytics Collection (`analytics`)

**Document ID**: Composite ID (e.g., `campaign_123_daily_2024-01-15`)

```typescript
interface AnalyticsDoc {
  // Entity Information
  entityType: 'campaign' | 'user' | 'asset' | 'post' | 'platform';
  entityId: string;
  
  // Time Period
  period: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: FirebaseFirestore.Timestamp;
  endDate: FirebaseFirestore.Timestamp;
  
  // Metrics
  metrics: {
    // Engagement
    impressions?: number;
    reach?: number;
    engagement?: number;
    engagementRate?: number;
    likes?: number;
    comments?: number;
    shares?: number;
    saves?: number;
    views?: number;
    
    // Clicks
    clicks?: number;
    ctr?: number; // Click-through rate
    linkClicks?: number;
    profileClicks?: number;
    
    // Conversions
    conversions?: number;
    conversionRate?: number;
    conversionValue?: number;
    roi?: number;
    
    // Revenue
    revenue?: number;
    cost?: number;
    profit?: number;
    
    // Platform-specific
    platformMetrics?: {
      [platform: string]: {
        [metric: string]: number;
      };
    };
  };
  
  // Aggregations
  aggregations?: {
    totalUsers?: number;
    activeUsers?: number;
    newUsers?: number;
    retentionRate?: number;
  };
  
  // Timestamps
  calculatedAt: FirebaseFirestore.Timestamp;
  dataSource: 'api' | 'webhook' | 'manual' | 'estimated';
}
```

### 9. Settings Collection (`settings`)

**Document ID**: Setting key (e.g., `platform_config`, `ai_models`)

```typescript
interface SettingsDoc {
  // Setting Information
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  
  // Metadata
  description?: string;
  category?: 'platform' | 'ai' | 'billing' | 'security' | 'features';
  
  // Access Control
  accessLevel: 'public' | 'authenticated' | 'admin' | 'system';
  
  // Validation
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
    enum?: any[];
  };
  
  // Timestamps
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
  updatedBy: string; // User ID
  
  // Versioning
  version: number;
  previousValue?: any;
}
```

## Indexes

### Required Composite Indexes

```javascript
// Campaigns collection
campaigns: [
  ['brandId', 'status', 'createdAt'],
  ['status', 'startDate', 'endDate'],
  ['assignedCreators', 'status', 'createdAt']
]

// Assets collection
assets: [
  ['campaignId', 'ownerId', 'status'],
  ['ownerId', 'type', 'createdAt'],
  ['brandId', 'status', 'createdAt']
]

// Schedules collection
schedules: [
  ['ownerId', 'status', 'publishAt'],
  ['campaignId', 'status', 'publishAt'],
  ['status', 'publishAt', 'channel']
]

// Posts collection
posts: [
  ['ownerId', 'platform', 'postedAt'],
  ['campaignId', 'platform', 'postedAt'],
  ['platform', 'postedAt', 'status']
]

// Events collection
events: [
  ['actorId', 'type', 'timestamp'],
  ['type', 'timestamp', 'severity'],
  ['resourceType', 'resourceId', 'timestamp']
]

// Analytics collection
analytics: [
  ['entityType', 'entityId', 'startDate'],
  ['entityType', 'period', 'startDate'],
  ['period', 'startDate', 'endDate']
]
```

## Security Rules Summary

The Firestore security rules enforce:

1. **Users**: Can only access their own data, admins can access all
2. **Campaigns**: Brand owners and assigned creators can access
3. **Assets**: Content creators and campaign participants can access
4. **Schedules**: Schedule owners and campaign participants can access
5. **Posts**: Post owners and campaign participants can access
6. **Personas**: Owners and system personas are accessible to all
7. **Events**: Users can read events related to their activities
8. **Analytics**: Users can read analytics for their own data
9. **Settings**: Only admins can access global settings

## Data Relationships

```
Users (1) ──→ (N) Campaigns
Users (1) ──→ (N) Assets
Users (1) ──→ (N) Schedules
Users (1) ──→ (N) Posts

Campaigns (1) ──→ (N) Assets
Campaigns (1) ──→ (N) Schedules
Campaigns (1) ──→ (N) Posts

Assets (1) ──→ (1) Schedules
Schedules (1) ──→ (1) Posts

Personas (1) ──→ (N) Assets
Personas (1) ──→ (N) Campaigns
```

This schema provides a robust foundation for the AI influencer platform with proper relationships, security, and scalability considerations.
