'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { sessionManager, SessionData } from '@/lib/session-manager';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Globe, 
  Clock, 
  Shield, 
  LogOut,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

interface SessionManagerProps {
  onSessionEnd?: () => void;
}

export function SessionManager({ onSessionEnd }: SessionManagerProps) {
  const { user, userDoc, logout } = useAuth();
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (user && userDoc) {
      loadSessions();
      setCurrentSessionId(sessionManager.getCurrentSessionId());
    }
  }, [user, userDoc]);

  const loadSessions = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const userSessions = await sessionManager.getUserSessions(user.uid);
      setSessions(userSessions);
    } catch (error) {
      console.error('Error loading sessions:', error);
      toast.error('Failed to load sessions');
    } finally {
      setLoading(false);
    }
  };

  const endSession = async (sessionId: string) => {
    try {
      await sessionManager.endSpecificSession(sessionId);
      await loadSessions();
      toast.success('Session ended successfully');
      
      // If ending current session, logout
      if (sessionId === currentSessionId) {
        await logout();
        onSessionEnd?.();
      }
    } catch (error) {
      console.error('Error ending session:', error);
      toast.error('Failed to end session');
    }
  };

  const endAllOtherSessions = async () => {
    try {
      const otherSessions = sessions.filter(s => s.id !== currentSessionId);
      
      for (const session of otherSessions) {
        await sessionManager.endSpecificSession(session.id);
      }
      
      await loadSessions();
      toast.success('All other sessions ended');
    } catch (error) {
      console.error('Error ending sessions:', error);
      toast.error('Failed to end sessions');
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'tablet':
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getDeviceColor = (type: string) => {
    switch (type) {
      case 'mobile':
        return 'bg-blue-100 text-blue-800';
      case 'tablet':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatLastActivity = (lastActivity: Date) => {
    const now = new Date();
    const diff = now.getTime() - lastActivity.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const isCurrentSession = (sessionId: string) => {
    return sessionId === currentSessionId;
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          <span>Loading sessions...</span>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Active Sessions</h2>
          <p className="text-gray-600">Manage your active sessions across devices</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadSessions}
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          {sessions.length > 1 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={endAllOtherSessions}
            >
              <LogOut className="h-4 w-4 mr-2" />
              End All Others
            </Button>
          )}
        </div>
      </div>

      {sessions.length === 0 ? (
        <Card className="p-6 text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Sessions</h3>
          <p className="text-gray-600">You don't have any active sessions at the moment.</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sessions.map((session) => (
            <Card key={session.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${getDeviceColor(session.deviceInfo.type)}`}>
                    {getDeviceIcon(session.deviceInfo.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {session.deviceInfo.browser} on {session.deviceInfo.os}
                      </h3>
                      {isCurrentSession(session.id) && (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Current
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        <span>{session.userEmail}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Last active: {formatLastActivity(session.lastActivity)}</span>
                      </div>
                      
                      {session.location?.country && (
                        <div className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          <span>{session.location.country}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-1">
                      {session.deviceInfo.screenResolution && (
                        <span>Resolution: {session.deviceInfo.screenResolution}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {!isCurrentSession(session.id) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => endSession(session.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      End
                    </Button>
                  )}
                  
                  {isCurrentSession(session.id) && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <Shield className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card className="p-4 bg-yellow-50 border-yellow-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800 mb-1">Security Tips</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• End sessions on devices you no longer use</li>
              <li>• Your sessions will automatically expire after 8 hours of inactivity</li>
              <li>• If you notice suspicious activity, end all sessions and change your password</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
