'use client';

import { User } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';
import { Role, UserDoc } from './types';

export interface SessionData {
  id: string;
  userId: string;
  userEmail: string;
  userRole: Role;
  deviceInfo: DeviceInfo;
  loginTime: Date;
  lastActivity: Date;
  isActive: boolean;
  ipAddress?: string;
  userAgent?: string;
  location?: {
    country?: string;
    city?: string;
    region?: string;
  };
}

export interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
  screenResolution?: string;
}

export interface SessionManagerConfig {
  maxSessionsPerUser: number;
  sessionTimeoutMinutes: number;
  enableDeviceTracking: boolean;
  enableLocationTracking: boolean;
  autoLogoutInactive: boolean;
}

const DEFAULT_CONFIG: SessionManagerConfig = {
  maxSessionsPerUser: 5,
  sessionTimeoutMinutes: 480, // 8 hours
  enableDeviceTracking: true,
  enableLocationTracking: false,
  autoLogoutInactive: true,
};

export class SessionManager {
  private config: SessionManagerConfig;
  private currentSessionId: string | null = null;
  private activityTimer: NodeJS.Timeout | null = null;
  private sessionCheckInterval: NodeJS.Timeout | null = null;

  constructor(config: Partial<SessionManagerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Create a new session for a user
   */
  async createSession(user: User, userDoc: UserDoc): Promise<SessionData> {
    try {
      const sessionId = this.generateSessionId();
      const deviceInfo = this.getDeviceInfo();
      
      const sessionData: SessionData = {
        id: sessionId,
        userId: user.uid,
        userEmail: user.email || '',
        userRole: userDoc.role,
        deviceInfo,
        loginTime: new Date(),
        lastActivity: new Date(),
        isActive: true,
        userAgent: navigator.userAgent,
        // Note: IP and location would be set by server-side code
      };

      // Store session in Firestore
      await setDoc(doc(db, 'user_sessions', sessionId), {
        ...sessionData,
        loginTime: serverTimestamp(),
        lastActivity: serverTimestamp(),
      });

      // Clean up old sessions if user has too many
      await this.cleanupOldSessions(user.uid);

      // Store current session ID
      this.currentSessionId = sessionId;

      // Start activity tracking
      this.startActivityTracking();

      // Start session validation
      this.startSessionValidation();

      console.log('Session created:', sessionId);
      return sessionData;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  }

  /**
   * Update session activity
   */
  async updateActivity(): Promise<void> {
    if (!this.currentSessionId) return;

    try {
      await updateDoc(doc(db, 'user_sessions', this.currentSessionId), {
        lastActivity: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating session activity:', error);
    }
  }

  /**
   * End current session
   */
  async endSession(): Promise<void> {
    if (!this.currentSessionId) return;

    try {
      await updateDoc(doc(db, 'user_sessions', this.currentSessionId), {
        isActive: false,
        endedAt: serverTimestamp(),
      });

      this.stopActivityTracking();
      this.stopSessionValidation();
      this.currentSessionId = null;

      console.log('Session ended:', this.currentSessionId);
    } catch (error) {
      console.error('Error ending session:', error);
    }
  }

  /**
   * Get all active sessions for a user
   */
  async getUserSessions(userId: string): Promise<SessionData[]> {
    try {
      const sessionsQuery = query(
        collection(db, 'user_sessions'),
        where('userId', '==', userId),
        where('isActive', '==', true),
        orderBy('lastActivity', 'desc')
      );

      const querySnapshot = await getDocs(sessionsQuery);
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        loginTime: doc.data().loginTime?.toDate() || new Date(),
        lastActivity: doc.data().lastActivity?.toDate() || new Date(),
      })) as SessionData[];
    } catch (error) {
      console.error('Error getting user sessions:', error);
      return [];
    }
  }

  /**
   * End a specific session (for session management)
   */
  async endSpecificSession(sessionId: string): Promise<void> {
    try {
      await updateDoc(doc(db, 'user_sessions', sessionId), {
        isActive: false,
        endedAt: serverTimestamp(),
      });

      // If this is the current session, clear it
      if (this.currentSessionId === sessionId) {
        this.stopActivityTracking();
        this.stopSessionValidation();
        this.currentSessionId = null;
      }
    } catch (error) {
      console.error('Error ending specific session:', error);
    }
  }

  /**
   * Check if current session is still valid
   */
  async validateCurrentSession(): Promise<boolean> {
    if (!this.currentSessionId) return false;

    try {
      const sessionDoc = await getDoc(doc(db, 'user_sessions', this.currentSessionId));
      
      if (!sessionDoc.exists()) {
        this.currentSessionId = null;
        return false;
      }

      const sessionData = sessionDoc.data();
      const lastActivity = sessionData.lastActivity?.toDate();
      
      if (!lastActivity) return false;

      // Check if session has expired
      const now = new Date();
      const timeDiff = now.getTime() - lastActivity.getTime();
      const minutesDiff = timeDiff / (1000 * 60);

      if (minutesDiff > this.config.sessionTimeoutMinutes) {
        await this.endSession();
        return false;
      }

      return sessionData.isActive;
    } catch (error) {
      console.error('Error validating session:', error);
      return false;
    }
  }

  /**
   * Get device information
   */
  private getDeviceInfo(): DeviceInfo {
    const userAgent = navigator.userAgent;
    
    // Detect device type
    let type: 'desktop' | 'mobile' | 'tablet' = 'desktop';
    if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
      type = /iPad/.test(userAgent) ? 'tablet' : 'mobile';
    }

    // Detect browser
    let browser = 'Unknown';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';

    // Detect OS
    let os = 'Unknown';
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'macOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS')) os = 'iOS';

    return {
      type,
      browser,
      os,
      screenResolution: `${screen.width}x${screen.height}`,
    };
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Clean up old sessions for a user
   */
  private async cleanupOldSessions(userId: string): Promise<void> {
    try {
      const sessions = await this.getUserSessions(userId);
      
      if (sessions.length > this.config.maxSessionsPerUser) {
        // Sort by last activity and remove oldest sessions
        const sessionsToRemove = sessions
          .sort((a, b) => a.lastActivity.getTime() - b.lastActivity.getTime())
          .slice(0, sessions.length - this.config.maxSessionsPerUser);

        for (const session of sessionsToRemove) {
          await this.endSpecificSession(session.id);
        }
      }
    } catch (error) {
      console.error('Error cleaning up old sessions:', error);
    }
  }

  /**
   * Start activity tracking
   */
  private startActivityTracking(): void {
    if (!this.config.autoLogoutInactive) return;

    // Update activity every 5 minutes
    this.activityTimer = setInterval(() => {
      this.updateActivity();
    }, 5 * 60 * 1000);

    // Track user interactions
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const updateActivity = () => {
      this.updateActivity();
    };

    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });
  }

  /**
   * Stop activity tracking
   */
  private stopActivityTracking(): void {
    if (this.activityTimer) {
      clearInterval(this.activityTimer);
      this.activityTimer = null;
    }
  }

  /**
   * Start session validation
   */
  private startSessionValidation(): void {
    // Check session validity every 10 minutes
    this.sessionCheckInterval = setInterval(async () => {
      const isValid = await this.validateCurrentSession();
      if (!isValid) {
        // Session is invalid, redirect to login
        window.location.href = '/login';
      }
    }, 10 * 60 * 1000);
  }

  /**
   * Stop session validation
   */
  private stopSessionValidation(): void {
    if (this.sessionCheckInterval) {
      clearInterval(this.sessionCheckInterval);
      this.sessionCheckInterval = null;
    }
  }

  /**
   * Get current session ID
   */
  getCurrentSessionId(): string | null {
    return this.currentSessionId;
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<SessionManagerConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

// Global session manager instance
export const sessionManager = new SessionManager();
