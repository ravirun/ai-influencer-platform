export type Role = 'creator' | 'brand' | 'admin';
export type Channel = 'instagram' | 'youtube' | 'tiktok';
export type AssetType = 'caption' | 'image' | 'video' | 'audio';
export type Status = 'generated' | 'approved' | 'rejected' | 'scheduled' | 'posted';

export interface UserDoc {
  role: Role;
  displayName: string;
  email: string;
  photoURL?: string;
  brandId?: string; // for brand staff
  handles?: { 
    instagram?: string; 
    youtube?: string; 
    tiktok?: string; 
  };
  creatorProfile?: { 
    niches: string[]; 
    languages: string[]; 
    minCPM?: number; 
  };
  brandProfile?: { 
    vertical: string; 
    guidelinesDocId?: string; 
    tone?: string; 
  };
  createdAt: number;
}

export interface PersonaDoc {
  name: string; 
  ownerType: 'system' | 'brand' | 'creator';
  voiceTraits: string[]; 
  examplePosts?: string[]; 
  embeddingRef?: string;
  createdBy: string; 
  createdAt: number;
  sliders?: {
    tone: number; // 0-1 (formal to playful)
    emoji: number; // 0-3 (none to heavy)
    cta: number; // 0-3 (subtle to strong)
  };
}

export interface CampaignDoc {
  brandId: string; 
  name: string; 
  brief: string; 
  target: string;
  personaId?: string; 
  channels: Channel[]; 
  budget: number;
  status: 'draft' | 'live' | 'paused' | 'done';
  kpis?: { 
    impressionsGoal?: number; 
    ctrGoal?: number; 
    conversionGoal?: number; 
  };
  createdBy: string; 
  createdAt: number;
}

export interface AssetDoc {
  campaignId: string; 
  ownerId: string; 
  brandId: string;
  type: AssetType; 
  status: Status; 
  src?: string; // gs://
  variants?: string[]; 
  language?: string; 
  durationSec?: number;
  topics?: string[]; 
  hashtags?: string[]; 
  moderation?: { 
    flagged: boolean; 
    reasons?: string[]; 
  };
  metadata?: Record<string, any>;
  createdAt: number;
}

export interface ScheduleDoc {
  assetId: string; 
  channel: Channel; 
  publishAt: number; 
  timezone: string;
  status: 'queued' | 'sent' | 'failed'; 
  attempts: number;
}

export interface PostDoc {
  scheduleId: string; 
  externalId?: string; 
  permalink?: string; 
  postedAt?: number;
  insights?: { 
    impressions?: number; 
    reach?: number; 
    likes?: number; 
    comments?: number; 
    shares?: number; 
    ctaClicks?: number; 
  };
}

export interface EventDoc { 
  type: string; 
  ts: number; 
  actorId: string; 
  payload?: any; 
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
