import { NextRequest } from 'next/server';
import { auth } from 'firebase-admin';
import { getFirebaseAdmin } from './firebase-admin';
import { Role } from './types';
import { hasPermission } from './rbac';

export interface AuthenticatedUser {
  uid: string;
  email: string;
  role: Role;
  displayName?: string;
}

export async function verifyAuthToken(request: NextRequest): Promise<AuthenticatedUser | null> {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split('Bearer ')[1];
    const admin = getFirebaseAdmin();
    
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Get user document from Firestore to get role
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(decodedToken.uid)
      .get();
    
    if (!userDoc.exists) {
      return null;
    }
    
    const userData = userDoc.data();
    
    return {
      uid: decodedToken.uid,
      email: decodedToken.email || '',
      role: userData?.role || 'brand',
      displayName: userData?.displayName || decodedToken.name,
    };
  } catch (error) {
    console.error('Error verifying auth token:', error);
    return null;
  }
}

export function requireAuth(handler: (request: NextRequest, user: AuthenticatedUser) => Promise<Response>) {
  return async (request: NextRequest) => {
    const user = await verifyAuthToken(request);
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return handler(request, user);
  };
}

export function requireRole(
  requiredRole: Role,
  handler: (request: NextRequest, user: AuthenticatedUser) => Promise<Response>
) {
  return requireAuth(async (request, user) => {
    if (user.role !== requiredRole) {
      return new Response(
        JSON.stringify({ 
          error: 'Forbidden',
          message: `This endpoint requires ${requiredRole} role. Your role is ${user.role}.`
        }),
        { 
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return handler(request, user);
  });
}

export function requirePermission(
  action: 'access' | 'create' | 'edit' | 'delete' | 'view' | 'manage',
  resource: string,
  handler: (request: NextRequest, user: AuthenticatedUser) => Promise<Response>
) {
  return requireAuth(async (request, user) => {
    if (!hasPermission(user.role, action, resource)) {
      return new Response(
        JSON.stringify({ 
          error: 'Forbidden',
          message: `You don't have permission to ${action} ${resource}.`
        }),
        { 
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return handler(request, user);
  });
}

export function requireAnyRole(
  roles: Role[],
  handler: (request: NextRequest, user: AuthenticatedUser) => Promise<Response>
) {
  return requireAuth(async (request, user) => {
    if (!roles.includes(user.role)) {
      return new Response(
        JSON.stringify({ 
          error: 'Forbidden',
          message: `This endpoint requires one of: ${roles.join(', ')}. Your role is ${user.role}.`
        }),
        { 
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return handler(request, user);
  });
}

// Helper function to get user from request in API routes
export async function getUserFromRequest(request: NextRequest): Promise<AuthenticatedUser | null> {
  return await verifyAuthToken(request);
}
