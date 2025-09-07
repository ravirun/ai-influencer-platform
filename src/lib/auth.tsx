'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification as firebaseSendEmailVerification,
  sendPasswordResetEmail,
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { Role, UserDoc } from './types';
import { sessionManager } from './session-manager';

interface AuthContextType {
  user: User | null;
  userDoc: UserDoc | null;
  userRole: Role | null;
  loading: boolean;
  signInWithGoogle: () => Promise<any>;
  signInWithEmail: (email: string, password: string) => Promise<any>;
  signUpWithEmail: (email: string, password: string, displayName: string, role: Role) => Promise<any>;
  sendPasswordReset: (email: string) => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserRole: (role: Role) => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDoc = async (user: User): Promise<UserDoc | null> => {
    try {
      if (!db) {
        console.error('Firebase database not initialized');
        return null;
      }

      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        return userDocSnap.data() as UserDoc;
      } else {
        // Create new user document
        const newUserDoc = {
          role: 'brand' as Role, // Default role
          displayName: user.displayName || user.email?.split('@')[0] || 'User',
          email: user.email || '',
          photoURL: user.photoURL || undefined,
          createdAt: serverTimestamp(),
        };
        
        await setDoc(userDocRef, newUserDoc);
        
        return newUserDoc as UserDoc;
      }
    } catch (error) {
      console.error('Error fetching user document:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        console.error('Error code:', (error as any).code);
      }
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed - user:', user?.email, 'uid:', user?.uid);
      setUser(user);
      if (user) {
        console.log('Fetching user document for:', user.email);
        const userData = await fetchUserDoc(user);
        console.log('User document fetched:', userData);
        setUserDoc(userData);
        setUserRole(userData?.role || null);
        
        // Create session for authenticated user
        if (userData) {
          try {
            await sessionManager.createSession(user, userData);
            console.log('Session created for user:', user.email);
          } catch (error) {
            console.error('Error creating session:', error);
          }
        }
      } else {
        console.log('No user, clearing user data');
        setUserDoc(null);
        setUserRole(null);
        
        // End session when user logs out
        try {
          await sessionManager.endSession();
          console.log('Session ended');
        } catch (error) {
          console.error('Error ending session:', error);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      console.log('Starting Google sign-in process...');
      const provider = new GoogleAuthProvider();
      // Add additional scopes if needed
      provider.addScope('email');
      provider.addScope('profile');
      
      console.log('Calling signInWithPopup...');
      const result = await signInWithPopup(auth, provider);
      
      // Log successful sign-in
      console.log('Google sign-in successful:', result.user.email, 'uid:', result.user.uid);
      
      return result;
    } catch (error: any) {
      console.error('Google sign in error:', error);
      
      // Enhanced error logging
      if (error.code) {
        console.error('Firebase error code:', error.code);
        console.error('Firebase error message:', error.message);
      }
      
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Log successful sign-in
      console.log('Email sign-in successful:', result.user.email);
      
      return result;
    } catch (error: any) {
      console.error('Email sign in error:', error);
      
      // Enhanced error logging
      if (error.code) {
        console.error('Firebase error code:', error.code);
        console.error('Firebase error message:', error.message);
      }
      
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string, role: Role) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name
      await updateProfile(result.user, { displayName });
      
      // Send email verification
      await firebaseSendEmailVerification(result.user);
      
      // Create user document in Firestore
      if (db) {
        const userDocRef = doc(db, 'users', result.user.uid);
        const newUserDoc = {
          role,
          displayName,
          email: result.user.email || '',
          photoURL: result.user.photoURL || undefined,
          status: 'pending_verification' as const,
          emailVerified: false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        
        await setDoc(userDocRef, newUserDoc);
      }
      
      // Log successful sign-up
      console.log('Email sign-up successful:', result.user.email);
      
      return result;
    } catch (error: any) {
      console.error('Email sign up error:', error);
      
      // Enhanced error logging
      if (error.code) {
        console.error('Firebase error code:', error.code);
        console.error('Firebase error message:', error.message);
      }
      
      throw error;
    }
  };

  const sendPasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent to:', email);
    } catch (error: any) {
      console.error('Password reset error:', error);
      
      // Enhanced error logging
      if (error.code) {
        console.error('Firebase error code:', error.code);
        console.error('Firebase error message:', error.message);
      }
      
      throw error;
    }
  };

  const sendEmailVerification = async () => {
    if (!user) throw new Error('No user logged in');
    
    try {
      await firebaseSendEmailVerification(user);
      console.log('Email verification sent to:', user.email);
    } catch (error: any) {
      console.error('Email verification error:', error);
      
      // Enhanced error logging
      if (error.code) {
        console.error('Firebase error code:', error.code);
        console.error('Firebase error message:', error.message);
      }
      
      throw error;
    }
  };

  const logout = async () => {
    try {
      // End session before signing out
      await sessionManager.endSession();
      
      await signOut(auth);
      setUserDoc(null);
      setUserRole(null);
      console.log('User logged out successfully');
    } catch (error: any) {
      console.error('Logout error:', error);
      
      // Enhanced error logging
      if (error.code) {
        console.error('Firebase logout error code:', error.code);
        console.error('Firebase logout error message:', error.message);
      }
      
      throw error;
    }
  };

  const updateUserRole = async (role: Role) => {
    if (!user) throw new Error('No user logged in');
    if (!db) throw new Error('Firebase database not initialized');
    
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        role,
        updatedAt: serverTimestamp(),
      });
      
      setUserRole(role);
      if (userDoc) {
        setUserDoc({ ...userDoc, role });
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        console.error('Error code:', (error as any).code);
      }
      throw error;
    }
  };


  const refreshUserData = async () => {
    if (user) {
      const userData = await fetchUserDoc(user);
      setUserDoc(userData);
      setUserRole(userData?.role || null);
    }
  };

  const value = {
    user,
    userDoc,
    userRole,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    sendPasswordReset,
    sendEmailVerification,
    logout,
    updateUserRole,
    refreshUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
