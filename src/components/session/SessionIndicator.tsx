'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { sessionManager } from '@/lib/session-manager';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Shield, 
  AlertTriangle,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { toast } from 'sonner';

interface SessionIndicatorProps {
  className?: string;
}

export function SessionIndicator({ className = '' }: SessionIndicatorProps) {
  const { user, logout } = useAuth();
  const [sessionValid, setSessionValid] = useState<boolean | null>(null);
  const [timeUntilExpiry, setTimeUntilExpiry] = useState<number | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (!user) {
      setSessionValid(null);
      setTimeUntilExpiry(null);
      return;
    }

    // Validate session on mount
    validateSession();

    // Set up periodic validation
    const interval = setInterval(validateSession, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [user]);

  const validateSession = async () => {
    if (!user) return;

    try {
      setIsValidating(true);
      const isValid = await sessionManager.validateCurrentSession();
      setSessionValid(isValid);

      if (isValid) {
        // Calculate time until expiry (8 hours from last activity)
        const lastActivity = new Date(); // This would come from session data
        const expiryTime = new Date(lastActivity.getTime() + 8 * 60 * 60 * 1000);
        const now = new Date();
        const timeLeft = expiryTime.getTime() - now.getTime();
        
        if (timeLeft > 0) {
          setTimeUntilExpiry(timeLeft);
        } else {
          setTimeUntilExpiry(0);
        }
      } else {
        setTimeUntilExpiry(0);
      }
    } catch (error) {
      console.error('Error validating session:', error);
      setSessionValid(false);
    } finally {
      setIsValidating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await sessionManager.endSession();
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Error during logout');
    }
  };

  const formatTimeLeft = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getSessionStatus = () => {
    if (sessionValid === null) return { status: 'loading', color: 'gray' };
    if (!sessionValid) return { status: 'expired', color: 'red' };
    if (timeUntilExpiry === null) return { status: 'active', color: 'green' };
    
    const hoursLeft = timeUntilExpiry / (1000 * 60 * 60);
    if (hoursLeft < 1) return { status: 'expiring', color: 'yellow' };
    if (hoursLeft < 2) return { status: 'warning', color: 'orange' };
    return { status: 'active', color: 'green' };
  };

  const sessionStatus = getSessionStatus();

  if (!user || sessionValid === null) {
    return null;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {isValidating && (
        <RefreshCw className="h-4 w-4 animate-spin text-gray-500" />
      )}
      
      {!isValidating && (
        <>
          {sessionStatus.status === 'active' && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Shield className="h-3 w-3 mr-1" />
              Session Active
            </Badge>
          )}
          
          {sessionStatus.status === 'warning' && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              <Clock className="h-3 w-3 mr-1" />
              {timeUntilExpiry && formatTimeLeft(timeUntilExpiry)} left
            </Badge>
          )}
          
          {sessionStatus.status === 'expiring' && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Expiring Soon
            </Badge>
          )}
          
          {sessionStatus.status === 'expired' && (
            <Badge variant="destructive">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Session Expired
            </Badge>
          )}
          
          {timeUntilExpiry && timeUntilExpiry > 0 && (
            <span className="text-xs text-gray-500">
              {formatTimeLeft(timeUntilExpiry)} remaining
            </span>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}
