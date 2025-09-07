import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter, 
  serverTimestamp,
  writeBatch,
  runTransaction,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { 
  UserDoc, 
  CampaignDoc, 
  AssetDoc, 
  ScheduleDoc, 
  PostDoc, 
  PersonaDoc, 
  EventDoc, 
  AnalyticsDoc, 
  SettingsDoc 
} from './types';

// Collection references
export const collections = {
  users: () => {
    if (!db) throw new Error('Firebase database not initialized');
    return collection(db, 'users');
  },
  campaigns: () => {
    if (!db) throw new Error('Firebase database not initialized');
    return collection(db, 'campaigns');
  },
  assets: () => {
    if (!db) throw new Error('Firebase database not initialized');
    return collection(db, 'assets');
  },
  schedules: () => {
    if (!db) throw new Error('Firebase database not initialized');
    return collection(db, 'schedules');
  },
  posts: () => {
    if (!db) throw new Error('Firebase database not initialized');
    return collection(db, 'posts');
  },
  personas: () => {
    if (!db) throw new Error('Firebase database not initialized');
    return collection(db, 'personas');
  },
  events: () => {
    if (!db) throw new Error('Firebase database not initialized');
    return collection(db, 'events');
  },
  analytics: () => {
    if (!db) throw new Error('Firebase database not initialized');
    return collection(db, 'analytics');
  },
  settings: () => {
    if (!db) throw new Error('Firebase database not initialized');
    return collection(db, 'settings');
  },
};

// Document references
export const docs = {
  user: (userId: string) => {
    if (!db) throw new Error('Firebase database not initialized');
    return doc(db, 'users', userId);
  },
  campaign: (campaignId: string) => {
    if (!db) throw new Error('Firebase database not initialized');
    return doc(db, 'campaigns', campaignId);
  },
  asset: (assetId: string) => {
    if (!db) throw new Error('Firebase database not initialized');
    return doc(db, 'assets', assetId);
  },
  schedule: (scheduleId: string) => {
    if (!db) throw new Error('Firebase database not initialized');
    return doc(db, 'schedules', scheduleId);
  },
  post: (postId: string) => {
    if (!db) throw new Error('Firebase database not initialized');
    return doc(db, 'posts', postId);
  },
  persona: (personaId: string) => {
    if (!db) throw new Error('Firebase database not initialized');
    return doc(db, 'personas', personaId);
  },
  event: (eventId: string) => {
    if (!db) throw new Error('Firebase database not initialized');
    return doc(db, 'events', eventId);
  },
  analytics: (analyticsId: string) => {
    if (!db) throw new Error('Firebase database not initialized');
    return doc(db, 'analytics', analyticsId);
  },
  setting: (settingKey: string) => {
    if (!db) throw new Error('Firebase database not initialized');
    return doc(db, 'settings', settingKey);
  },
};

// User Operations
export const userDb = {
  async create(userId: string, userData: Partial<UserDoc>): Promise<void> {
    const userRef = docs.user(userId);
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  },

  async get(userId: string): Promise<UserDoc | null> {
    const userRef = docs.user(userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? (userSnap.data() as UserDoc) : null;
  },

  async update(userId: string, updates: Partial<UserDoc>): Promise<void> {
    const userRef = docs.user(userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },

  async getByRole(role: string): Promise<UserDoc[]> {
    const q = query(
      collections.users(),
      where('role', '==', role),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as UserDoc);
  },

  async getByBrand(brandId: string): Promise<UserDoc[]> {
    const q = query(
      collections.users(),
      where('brandId', '==', brandId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as UserDoc);
  },
};

// Campaign Operations
export const campaignDb = {
  async create(campaignData: Omit<CampaignDoc, 'createdAt' | 'updatedAt'>): Promise<string> {
    const campaignRef = doc(collections.campaigns());
    await setDoc(campaignRef, {
      ...campaignData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return campaignRef.id;
  },

  async get(campaignId: string): Promise<CampaignDoc | null> {
    const campaignRef = docs.campaign(campaignId);
    const campaignSnap = await getDoc(campaignRef);
    return campaignSnap.exists() ? (campaignSnap.data() as CampaignDoc) : null;
  },

  async update(campaignId: string, updates: Partial<CampaignDoc>): Promise<void> {
    const campaignRef = docs.campaign(campaignId);
    await updateDoc(campaignRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },

  async getByBrand(brandId: string): Promise<CampaignDoc[]> {
    const q = query(
      collections.campaigns(),
      where('brandId', '==', brandId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as CampaignDoc);
  },

  async getByStatus(status: string): Promise<CampaignDoc[]> {
    const q = query(
      collections.campaigns(),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as CampaignDoc);
  },

  async getByCreator(creatorId: string): Promise<CampaignDoc[]> {
    const q = query(
      collections.campaigns(),
      where(`assignedCreators.${creatorId}`, '!=', null),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as CampaignDoc);
  },
};

// Asset Operations
export const assetDb = {
  async create(assetData: Omit<AssetDoc, 'createdAt' | 'updatedAt'>): Promise<string> {
    const assetRef = doc(collections.assets());
    await setDoc(assetRef, {
      ...assetData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return assetRef.id;
  },

  async get(assetId: string): Promise<AssetDoc | null> {
    const assetRef = docs.asset(assetId);
    const assetSnap = await getDoc(assetRef);
    return assetSnap.exists() ? (assetSnap.data() as AssetDoc) : null;
  },

  async update(assetId: string, updates: Partial<AssetDoc>): Promise<void> {
    const assetRef = docs.asset(assetId);
    await updateDoc(assetRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },

  async getByCampaign(campaignId: string): Promise<AssetDoc[]> {
    const q = query(
      collections.assets(),
      where('campaignId', '==', campaignId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as AssetDoc);
  },

  async getByOwner(ownerId: string): Promise<AssetDoc[]> {
    const q = query(
      collections.assets(),
      where('ownerId', '==', ownerId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as AssetDoc);
  },

  async getByStatus(status: string): Promise<AssetDoc[]> {
    const q = query(
      collections.assets(),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as AssetDoc);
  },
};

// Schedule Operations
export const scheduleDb = {
  async create(scheduleData: Omit<ScheduleDoc, 'createdAt' | 'updatedAt'>): Promise<string> {
    const scheduleRef = doc(collections.schedules());
    await setDoc(scheduleRef, {
      ...scheduleData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return scheduleRef.id;
  },

  async get(scheduleId: string): Promise<ScheduleDoc | null> {
    const scheduleRef = docs.schedule(scheduleId);
    const scheduleSnap = await getDoc(scheduleRef);
    return scheduleSnap.exists() ? (scheduleSnap.data() as ScheduleDoc) : null;
  },

  async update(scheduleId: string, updates: Partial<ScheduleDoc>): Promise<void> {
    const scheduleRef = docs.schedule(scheduleId);
    await updateDoc(scheduleRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },

  async getByOwner(ownerId: string): Promise<ScheduleDoc[]> {
    const q = query(
      collections.schedules(),
      where('ownerId', '==', ownerId),
      orderBy('publishAt', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as ScheduleDoc);
  },

  async getByCampaign(campaignId: string): Promise<ScheduleDoc[]> {
    const q = query(
      collections.schedules(),
      where('campaignId', '==', campaignId),
      orderBy('publishAt', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as ScheduleDoc);
  },

  async getPending(): Promise<ScheduleDoc[]> {
    const now = Timestamp.now();
    const q = query(
      collections.schedules(),
      where('status', '==', 'scheduled'),
      where('publishAt', '<=', now),
      orderBy('publishAt', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as ScheduleDoc);
  },
};

// Post Operations
export const postDb = {
  async create(postData: Omit<PostDoc, 'createdAt' | 'updatedAt'>): Promise<string> {
    const postRef = doc(collections.posts());
    await setDoc(postRef, {
      ...postData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return postRef.id;
  },

  async get(postId: string): Promise<PostDoc | null> {
    const postRef = docs.post(postId);
    const postSnap = await getDoc(postRef);
    return postSnap.exists() ? (postSnap.data() as PostDoc) : null;
  },

  async update(postId: string, updates: Partial<PostDoc>): Promise<void> {
    const postRef = docs.post(postId);
    await updateDoc(postRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },

  async getByOwner(ownerId: string): Promise<PostDoc[]> {
    const q = query(
      collections.posts(),
      where('ownerId', '==', ownerId),
      orderBy('postedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as PostDoc);
  },

  async getByCampaign(campaignId: string): Promise<PostDoc[]> {
    const q = query(
      collections.posts(),
      where('campaignId', '==', campaignId),
      orderBy('postedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as PostDoc);
  },

  async getByPlatform(platform: string): Promise<PostDoc[]> {
    const q = query(
      collections.posts(),
      where('platform', '==', platform),
      orderBy('postedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as PostDoc);
  },
};

// Persona Operations
export const personaDb = {
  async create(personaData: Omit<PersonaDoc, 'createdAt' | 'updatedAt'>): Promise<string> {
    const personaRef = doc(collections.personas());
    await setDoc(personaRef, {
      ...personaData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return personaRef.id;
  },

  async get(personaId: string): Promise<PersonaDoc | null> {
    const personaRef = docs.persona(personaId);
    const personaSnap = await getDoc(personaRef);
    return personaSnap.exists() ? (personaSnap.data() as PersonaDoc) : null;
  },

  async update(personaId: string, updates: Partial<PersonaDoc>): Promise<void> {
    const personaRef = docs.persona(personaId);
    await updateDoc(personaRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },

  async getByOwner(ownerType: string, createdBy?: string): Promise<PersonaDoc[]> {
    let q = query(
      collections.personas(),
      where('ownerType', '==', ownerType),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc')
    );

    if (createdBy) {
      q = query(
        collections.personas(),
        where('ownerType', '==', ownerType),
        where('createdBy', '==', createdBy),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as PersonaDoc);
  },

  async getSystemPersonas(): Promise<PersonaDoc[]> {
    const q = query(
      collections.personas(),
      where('ownerType', '==', 'system'),
      where('isPublic', '==', true),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as PersonaDoc);
  },
};

// Event Operations
export const eventDb = {
  async create(eventData: Omit<EventDoc, 'timestamp'>): Promise<string> {
    const eventRef = doc(collections.events());
    await setDoc(eventRef, {
      ...eventData,
      timestamp: serverTimestamp(),
    });
    return eventRef.id;
  },

  async getByActor(actorId: string, limitCount: number = 50): Promise<EventDoc[]> {
    const q = query(
      collections.events(),
      where('actorId', '==', actorId),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as EventDoc);
  },

  async getByType(type: string, limitCount: number = 50): Promise<EventDoc[]> {
    const q = query(
      collections.events(),
      where('type', '==', type),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as EventDoc);
  },

  async getByResource(resourceType: string, resourceId: string): Promise<EventDoc[]> {
    const q = query(
      collections.events(),
      where('resourceType', '==', resourceType),
      where('resourceId', '==', resourceId),
      orderBy('timestamp', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as EventDoc);
  },
};

// Analytics Operations
export const analyticsDb = {
  async create(analyticsData: Omit<AnalyticsDoc, 'calculatedAt'>): Promise<string> {
    const analyticsRef = doc(collections.analytics());
    await setDoc(analyticsRef, {
      ...analyticsData,
      calculatedAt: serverTimestamp(),
    });
    return analyticsRef.id;
  },

  async getByEntity(entityType: string, entityId: string, period?: string): Promise<AnalyticsDoc[]> {
    let q = query(
      collections.analytics(),
      where('entityType', '==', entityType),
      where('entityId', '==', entityId),
      orderBy('startDate', 'desc')
    );

    if (period) {
      q = query(
        collections.analytics(),
        where('entityType', '==', entityType),
        where('entityId', '==', entityId),
        where('period', '==', period),
        orderBy('startDate', 'desc')
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as AnalyticsDoc);
  },

  async getByPeriod(period: string, limitCount: number = 100): Promise<AnalyticsDoc[]> {
    const q = query(
      collections.analytics(),
      where('period', '==', period),
      orderBy('startDate', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as AnalyticsDoc);
  },
};

// Settings Operations
export const settingsDb = {
  async get(settingKey: string): Promise<SettingsDoc | null> {
    const settingRef = docs.setting(settingKey);
    const settingSnap = await getDoc(settingRef);
    return settingSnap.exists() ? (settingSnap.data() as SettingsDoc) : null;
  },

  async set(settingKey: string, value: any, updatedBy: string): Promise<void> {
    const settingRef = docs.setting(settingKey);
    const existing = await this.get(settingKey);
    
    await setDoc(settingRef, {
      key: settingKey,
      value,
      type: typeof value,
      previousValue: existing?.value,
      version: (existing?.version || 0) + 1,
      updatedBy,
      updatedAt: serverTimestamp(),
      createdAt: existing?.createdAt || serverTimestamp(),
    });
  },

  async getByCategory(category: string): Promise<SettingsDoc[]> {
    const q = query(
      collections.settings(),
      where('category', '==', category),
      orderBy('key', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as SettingsDoc);
  },
};

// Batch Operations
export const batchDb = {
  async createBatch(): Promise<ReturnType<typeof writeBatch>> {
    return writeBatch(db);
  },

  async runTransaction<T>(updateFunction: (transaction: any) => Promise<T>): Promise<T> {
    return runTransaction(db, updateFunction);
  },
};

// Utility Functions
export const dbUtils = {
  generateId(): string {
    return doc(collections.users()).id;
  },

  timestamp(): Timestamp {
    return Timestamp.now();
  },

  serverTimestamp() {
    return serverTimestamp();
  },

  async paginate<T>(
    collectionRef: any,
    orderByField: string,
    limitCount: number,
    lastDoc?: any
  ): Promise<{ data: T[]; lastDoc: any }> {
    let q = query(
      collectionRef,
      orderBy(orderByField, 'desc'),
      limit(limitCount)
    );

    if (lastDoc) {
      q = query(
        collectionRef,
        orderBy(orderByField, 'desc'),
        startAfter(lastDoc),
        limit(limitCount)
      );
    }

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => doc.data() as T);
    const newLastDoc = snapshot.docs[snapshot.docs.length - 1];

    return { data, lastDoc: newLastDoc };
  },
};
