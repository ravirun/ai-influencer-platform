export type Role = 'creator' | 'brand' | 'admin';
export type Channel = 'instagram' | 'youtube' | 'tiktok' | 'twitter';
export type AssetType = 'caption' | 'image' | 'video' | 'audio' | 'story' | 'reel';
export type AssetStatus = 'generated' | 'approved' | 'rejected' | 'scheduled' | 'posted';
export type CampaignStatus = 'draft' | 'live' | 'paused' | 'completed' | 'cancelled';
export type ScheduleStatus = 'queued' | 'scheduled' | 'sent' | 'failed' | 'cancelled';
export type PostStatus = 'active' | 'deleted' | 'hidden' | 'flagged';
export type UserStatus = 'active' | 'suspended' | 'pending_verification';
export type PersonaOwnerType = 'system' | 'brand' | 'creator';
export type PersonaStatus = 'active' | 'archived' | 'draft';
export type EventCategory = 'auth' | 'campaign' | 'content' | 'analytics' | 'system';
export type EventSeverity = 'low' | 'medium' | 'high' | 'critical';
export type EventStatus = 'success' | 'failure' | 'warning';
export type AnalyticsPeriod = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
export type EntityType = 'campaign' | 'user' | 'asset' | 'post' | 'platform';
export type SettingType = 'string' | 'number' | 'boolean' | 'object' | 'array';
export type SettingCategory = 'platform' | 'ai' | 'billing' | 'security' | 'features';
export type AccessLevel = 'public' | 'authenticated' | 'admin' | 'system';

export interface UserDoc {
  // Basic Information
  role: Role;
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
  
  // Preferences
  preferences?: UserPreferences;
  
  // Timestamps
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
  lastLoginAt?: FirebaseFirestore.Timestamp;
  
  // Status
  status: UserStatus;
  emailVerified: boolean;
}

export interface UserPreferences {
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
}

export interface PersonaDoc {
  // Basic Information
  name: string;
  description?: string;
  ownerType: PersonaOwnerType;
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
  status: PersonaStatus;
  isPublic?: boolean; // For system personas
}

export interface AnalyticsDoc {
  // Entity Information
  entityType: EntityType;
  entityId: string;
  
  // Time Period
  period: AnalyticsPeriod;
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

export interface SettingsDoc {
  // Setting Information
  key: string;
  value: any;
  type: SettingType;
  
  // Metadata
  description?: string;
  category?: SettingCategory;
  
  // Access Control
  accessLevel: AccessLevel;
  
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

export interface CampaignDoc {
  // Basic Information
  brandId: string; // Reference to brand user
  name: string;
  brief: string;
  description?: string;
  target: string; // Target audience description
  
  // Campaign Details
  personaId?: string; // Reference to AI persona
  channels: Channel[];
  budget: number;
  currency: string; // 'USD', 'INR', 'EUR'
  
  // Status & Timeline
  status: CampaignStatus;
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

export interface AssetDoc {
  // Basic Information
  campaignId: string; // Reference to campaign
  ownerId: string; // Creator or brand user ID
  brandId: string; // Reference to brand
  
  // Asset Details
  type: AssetType;
  status: AssetStatus;
  
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

export interface ScheduleDoc {
  // References
  assetId: string; // Reference to asset
  campaignId: string; // Reference to campaign
  ownerId: string; // Creator or brand user ID
  
  // Scheduling Details
  channel: Channel;
  publishAt: FirebaseFirestore.Timestamp;
  timezone: string; // 'UTC', 'America/New_York', etc.
  
  // Status & Execution
  status: ScheduleStatus;
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

export interface PostDoc {
  // References
  scheduleId: string; // Reference to schedule
  assetId: string; // Reference to asset
  campaignId: string; // Reference to campaign
  ownerId: string; // Creator or brand user ID
  
  // Platform Information
  platform: Channel;
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
  status: PostStatus;
  
  // Timestamps
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface EventDoc {
  // Event Details
  type: string; // 'user_login', 'campaign_created', 'content_generated', etc.
  category: EventCategory;
  
  // Actor Information
  actorId: string; // User ID who performed the action
  actorRole: Role;
  
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
  severity: EventSeverity;
  
  // Status
  status: EventStatus;
}

// LLM Workbench Types
export interface Session {
  id: string; 
  campaignId: string; 
  personaId?: string;
  blocks: Array<
    | { kind: 'system'; text: string; version: string }
    | { kind: 'user'; text: string }
    | { kind: 'tool'; name: 'retrieval'; inputs: { k: number; filters?: any } }
    | { kind: 'guard'; policies: string[] }
  >;
  context: { chips: ChipRef[] };
  variants?: Array<{
    id: string; 
    text: string; 
    score: number; 
    reasons: string[];
    safety: { ok: boolean; reasons: string[] }; 
    cost: { input: number; output: number };
  }>;
  createdAt: number; 
  updatedAt: number;
}

export interface ChipRef { 
  type: 'guideline' | 'product' | 'examplePost' | 'claim'; 
  refId: string; 
  excerpt?: string; 
}

export interface PromptTemplate {
  id: string; 
  name: string; 
  version: string; 
  system: string; 
  userMask: string; // {{brief}} etc.
  vars: { 
    tone: number; 
    emoji: number; 
    cta: number; 
    language: string; 
  };
  guardrails: { 
    denyList: string[]; 
    claimPolicies: string[]; 
  };
}

// API Response Types
export interface GenerateResponse {
  assetId: string;
  variants: Array<{
    id: string;
    text: string;
    score: number;
    reasons: string[];
    safety: { ok: boolean; reasons: string[] };
    cost: { input: number; output: number };
  }>;
}

export interface ApiError {
  error: string;
  message?: string;
  code?: string;
}
