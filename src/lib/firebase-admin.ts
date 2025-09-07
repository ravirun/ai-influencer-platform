import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Initialize Firebase Admin only if credentials are available
let adminApp: any = null;

if (firebaseAdminConfig.projectId && firebaseAdminConfig.clientEmail && firebaseAdminConfig.privateKey) {
  try {
    adminApp = getApps().length === 0 
      ? initializeApp({
          credential: cert(firebaseAdminConfig),
          storageBucket: `${process.env.FIREBASE_ADMIN_PROJECT_ID}.appspot.com`,
        })
      : getApps()[0];
  } catch (error) {
    console.warn('Failed to initialize Firebase Admin SDK:', error);
  }
} else {
  console.warn('Firebase Admin SDK credentials not configured. Server-side features will be limited.');
}

// Initialize Firebase Admin services only if adminApp is available
export const adminAuth = adminApp ? getAuth(adminApp) : null;
export const adminDb = adminApp ? getFirestore(adminApp) : null;
export const adminStorage = adminApp ? getStorage(adminApp) : null;

// Export auth for backward compatibility
export const auth = adminAuth;

// Export getFirebaseAdmin function
export function getFirebaseAdmin() {
  return adminApp;
}

export default adminApp;
