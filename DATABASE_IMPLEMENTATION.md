# Firestore Database Implementation

This document provides a comprehensive overview of the Firestore database implementation for the Inspire AI influencer platform.

## 🗄️ **Database Schema Overview**

The database is organized into **9 main collections** with well-defined relationships and comprehensive type safety:

### **Core Collections**
1. **`users`** - User profiles and authentication data
2. **`campaigns`** - Marketing campaigns and briefs  
3. **`assets`** - Generated content (captions, images, videos)
4. **`schedules`** - Content scheduling information
5. **`posts`** - Published content with analytics
6. **`personas`** - AI influencer personas and traits
7. **`events`** - Audit trail and activity logs
8. **`analytics`** - Performance metrics and insights
9. **`settings`** - Platform configuration

## 📊 **Data Relationships**

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

## 🔧 **Implementation Features**

### **1. Type Safety**
- **Complete TypeScript interfaces** for all collections
- **Strict typing** for all database operations
- **Compile-time validation** of data structures

### **2. Database Operations**
- **CRUD operations** for all collections
- **Batch operations** for bulk updates
- **Transaction support** for data consistency
- **Pagination** for large datasets

### **3. Query Optimization**
- **Composite indexes** for complex queries
- **Efficient filtering** and sorting
- **Real-time updates** with Firestore listeners

### **4. Security**
- **Role-based access control** at database level
- **Firestore security rules** for data protection
- **Audit trails** for all operations

## 📁 **Files Created**

### **1. Schema Documentation**
- `FIRESTORE_SCHEMA.md` - Complete schema documentation
- `DATABASE_IMPLEMENTATION.md` - This implementation guide

### **2. TypeScript Types**
- `src/lib/types.ts` - Updated with comprehensive interfaces
- All collection types with proper Firebase Timestamp support

### **3. Database Utilities**
- `src/lib/database.ts` - Complete database operations library
- Collection references and document operations
- Batch and transaction support

### **4. Firestore Configuration**
- `firestore.rules` - Security rules for role-based access
- `firestore.indexes.json` - Composite indexes for queries

## 🚀 **Key Features by Collection**

### **Users Collection**
```typescript
interface UserDoc {
  // Role-based data
  role: 'admin' | 'brand' | 'creator';
  
  // Creator profile
  creatorProfile?: {
    niches: string[];
    followerCount: { instagram?: number; youtube?: number; };
    engagementRate: { instagram?: number; youtube?: number; };
    verified: boolean;
  };
  
  // Brand profile  
  brandProfile?: {
    vertical: string;
    companySize: 'startup' | 'small' | 'medium' | 'enterprise';
    brandColors: string[];
  };
  
  // Preferences and settings
  preferences: UserPreferences;
  onboardingCompleted: boolean;
}
```

### **Campaigns Collection**
```typescript
interface CampaignDoc {
  // Campaign details
  brandId: string;
  name: string;
  brief: string;
  target: string;
  
  // Creator management
  assignedCreators: {
    [creatorId: string]: {
      status: 'invited' | 'accepted' | 'declined';
      compensation: number;
      deliverables: string[];
    };
  };
  
  // Content requirements
  contentRequirements: {
    postCount: number;
    hashtags: string[];
    callToAction: string;
  };
  
  // Analytics
  analytics: {
    totalImpressions: number;
    totalEngagement: number;
    roi: number;
  };
}
```

### **Assets Collection**
```typescript
interface AssetDoc {
  // Content data
  type: 'caption' | 'image' | 'video' | 'audio' | 'story' | 'reel';
  content: {
    text?: string;
    imageUrl?: string;
    videoUrl?: string;
  };
  
  // AI generation data
  variants: Array<{
    id: string;
    text: string;
    score: number;
    safety: { ok: boolean; reasons: string[]; };
    cost: { input: number; output: number; };
  }>;
  
  // Moderation
  moderation: {
    flagged: boolean;
    approvedBy?: string;
    approvedAt?: Timestamp;
  };
}
```

### **Schedules Collection**
```typescript
interface ScheduleDoc {
  // Scheduling details
  channel: 'instagram' | 'youtube' | 'tiktok' | 'twitter';
  publishAt: Timestamp;
  timezone: string;
  
  // Platform-specific data
  platformData: {
    instagram?: { postType: 'feed' | 'story' | 'reel'; };
    youtube?: { videoType: 'short' | 'long'; };
    tiktok?: { videoType: 'regular' | 'duet'; };
  };
  
  // Execution results
  result: {
    externalId?: string;
    permalink?: string;
    postedAt?: Timestamp;
  };
}
```

### **Posts Collection**
```typescript
interface PostDoc {
  // Platform information
  platform: 'instagram' | 'youtube' | 'tiktok' | 'twitter';
  externalId: string;
  permalink: string;
  
  // Analytics (updated periodically)
  insights: {
    impressions: number;
    reach: number;
    engagement: number;
    likes: number;
    comments: number;
    shares: number;
    conversions: number;
  };
  
  // Platform-specific metrics
  instagram?: { storyViews: number; storyReplies: number; };
  youtube?: { watchTime: number; subscriberGained: number; };
  tiktok?: { completionRate: number; shares: number; };
}
```

### **Personas Collection**
```typescript
interface PersonaDoc {
  // Voice configuration
  voiceTraits: string[];
  tone: 'formal' | 'conversational' | 'playful' | 'authoritative';
  
  // AI sliders
  sliders: {
    tone: number; // 0-1 (formal to playful)
    emoji: number; // 0-3 (none to heavy)
    cta: number; // 0-3 (subtle to strong)
    creativity: number; // 0-1 (conservative to creative)
  };
  
  // Brand context
  brandContext: {
    guidelines: string;
    keywords: string[];
    avoidWords: string[];
  };
  
  // Usage statistics
  usageStats: {
    totalGenerations: number;
    averageScore: number;
    successRate: number;
  };
}
```

## 🔍 **Database Operations**

### **User Operations**
```typescript
import { userDb } from '@/lib/database';

// Create user
await userDb.create(userId, userData);

// Get user
const user = await userDb.get(userId);

// Update user
await userDb.update(userId, { role: 'brand' });

// Get users by role
const brands = await userDb.getByRole('brand');
const brandStaff = await userDb.getByBrand(brandId);
```

### **Campaign Operations**
```typescript
import { campaignDb } from '@/lib/database';

// Create campaign
const campaignId = await campaignDb.create(campaignData);

// Get campaigns
const campaigns = await campaignDb.getByBrand(brandId);
const creatorCampaigns = await campaignDb.getByCreator(creatorId);

// Update campaign
await campaignDb.update(campaignId, { status: 'live' });
```

### **Asset Operations**
```typescript
import { assetDb } from '@/lib/database';

// Create asset
const assetId = await assetDb.create(assetData);

// Get assets
const campaignAssets = await assetDb.getByCampaign(campaignId);
const userAssets = await assetDb.getByOwner(userId);

// Update asset
await assetDb.update(assetId, { status: 'approved' });
```

### **Batch Operations**
```typescript
import { batchDb } from '@/lib/database';

// Batch write
const batch = await batchDb.createBatch();
batch.set(doc1, data1);
batch.set(doc2, data2);
await batch.commit();

// Transaction
await batchDb.runTransaction(async (transaction) => {
  const userDoc = await transaction.get(userRef);
  const campaignDoc = await transaction.get(campaignRef);
  
  // Update both documents atomically
  transaction.update(userRef, { lastCampaign: campaignId });
  transaction.update(campaignRef, { assignedUser: userId });
});
```

## 📈 **Analytics & Events**

### **Event Tracking**
```typescript
import { eventDb } from '@/lib/database';

// Log user action
await eventDb.create({
  type: 'campaign_created',
  category: 'campaign',
  actorId: userId,
  actorRole: 'brand',
  resourceId: campaignId,
  resourceType: 'campaign',
  severity: 'low',
  status: 'success'
});
```

### **Analytics Collection**
```typescript
import { analyticsDb } from '@/lib/database';

// Create analytics record
await analyticsDb.create({
  entityType: 'campaign',
  entityId: campaignId,
  period: 'daily',
  startDate: startOfDay,
  endDate: endOfDay,
  metrics: {
    impressions: 10000,
    engagement: 500,
    conversions: 25,
    roi: 3.2
  }
});
```

## 🔒 **Security Implementation**

### **Firestore Security Rules**
- **User isolation**: Users can only access their own data
- **Role-based access**: Different permissions for admin/brand/creator
- **Campaign access**: Brand owners and assigned creators
- **Asset protection**: Content creators and campaign participants
- **Admin override**: Admins have full access with audit trails

### **Data Validation**
- **Type safety**: All operations are type-checked
- **Required fields**: Validation at database level
- **Business rules**: Enforced through security rules

## 🚀 **Deployment**

### **1. Deploy Security Rules**
```bash
firebase deploy --only firestore:rules
```

### **2. Deploy Indexes**
```bash
firebase deploy --only firestore:indexes
```

### **3. Initialize Database**
```typescript
// Create initial system personas
const systemPersonas = [
  {
    name: 'Professional Brand Voice',
    ownerType: 'system',
    voiceTraits: ['professional', 'authoritative'],
    tone: 'formal',
    isPublic: true,
    status: 'active'
  },
  // ... more personas
];

// Create default settings
const defaultSettings = [
  {
    key: 'platform_name',
    value: 'Inspire AI',
    type: 'string',
    category: 'platform',
    accessLevel: 'public'
  },
  // ... more settings
];
```

## 📊 **Performance Optimization**

### **Indexes**
- **Composite indexes** for complex queries
- **Single-field indexes** for simple filters
- **Array indexes** for creator assignments

### **Query Optimization**
- **Limit results** to prevent large reads
- **Use pagination** for large datasets
- **Cache frequently accessed data**

### **Real-time Updates**
- **Firestore listeners** for live data
- **Optimistic updates** for better UX
- **Batch operations** for efficiency

## 🔧 **Usage Examples**

### **Creating a Campaign**
```typescript
const campaignData: Omit<CampaignDoc, 'createdAt' | 'updatedAt'> = {
  brandId: 'brand_123',
  name: 'Summer Collection Launch',
  brief: 'Promote our new summer collection',
  target: 'Fashion enthusiasts aged 18-35',
  channels: ['instagram', 'tiktok'],
  budget: 10000,
  currency: 'USD',
  status: 'draft',
  startDate: Timestamp.fromDate(new Date('2024-06-01')),
  endDate: Timestamp.fromDate(new Date('2024-08-31')),
  contentRequirements: {
    postCount: 20,
    hashtags: ['#SummerCollection', '#Fashion'],
    callToAction: 'Shop now at our website'
  }
};

const campaignId = await campaignDb.create(campaignData);
```

### **Generating Content**
```typescript
const assetData: Omit<AssetDoc, 'createdAt' | 'updatedAt'> = {
  campaignId: campaignId,
  ownerId: creatorId,
  brandId: brandId,
  type: 'caption',
  status: 'generated',
  content: {
    text: 'Check out this amazing summer collection! 🌞✨'
  },
  variants: [
    {
      id: 'variant_1',
      text: 'Check out this amazing summer collection! 🌞✨',
      score: 85,
      reasons: ['Good engagement potential', 'Appropriate hashtags'],
      safety: { ok: true, reasons: [] },
      cost: { input: 150, output: 50 },
      generatedAt: Timestamp.now()
    }
  ],
  hashtags: ['#SummerCollection', '#Fashion'],
  aiContext: {
    personaId: 'persona_123',
    model: 'gemini-1.5-pro',
    temperature: 0.8
  }
};

const assetId = await assetDb.create(assetData);
```

### **Scheduling Content**
```typescript
const scheduleData: Omit<ScheduleDoc, 'createdAt' | 'updatedAt'> = {
  assetId: assetId,
  campaignId: campaignId,
  ownerId: creatorId,
  channel: 'instagram',
  publishAt: Timestamp.fromDate(new Date('2024-06-15T14:00:00Z')),
  timezone: 'UTC',
  status: 'scheduled',
  attempts: 0,
  maxAttempts: 3,
  platformData: {
    instagram: {
      postType: 'feed',
      location: 'New York, NY'
    }
  }
};

const scheduleId = await scheduleDb.create(scheduleData);
```

This comprehensive database implementation provides a robust foundation for the AI influencer platform with proper relationships, security, performance optimization, and type safety! 🚀
