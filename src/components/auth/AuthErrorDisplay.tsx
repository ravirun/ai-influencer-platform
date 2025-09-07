'use client';

import { AlertCircle, Wifi, Shield, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthError } from '@/lib/auth-errors';

interface AuthErrorDisplayProps {
  error: AuthError;
  onRetry?: () => void;
  className?: string;
}

export function AuthErrorDisplay({ error, onRetry, className = '' }: AuthErrorDisplayProps) {
  const getIcon = () => {
    switch (error.category) {
      case 'network':
        return <Wifi className="h-4 w-4" />;
      case 'permission':
        return <Shield className="h-4 w-4" />;
      case 'validation':
        return <AlertTriangle className="h-4 w-4" />;
      case 'system':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getBackgroundColor = () => {
    switch (error.category) {
      case 'network':
        return 'bg-yellow-50 border-yellow-200';
      case 'permission':
        return 'bg-red-50 border-red-200';
      case 'validation':
        return 'bg-orange-50 border-orange-200';
      case 'system':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-red-50 border-red-200';
    }
  };

  const getTextColor = () => {
    switch (error.category) {
      case 'network':
        return 'text-yellow-700';
      case 'permission':
        return 'text-red-700';
      case 'validation':
        return 'text-orange-700';
      case 'system':
        return 'text-red-700';
      default:
        return 'text-red-700';
    }
  };

  const getIconColor = () => {
    switch (error.category) {
      case 'network':
        return 'text-yellow-600';
      case 'permission':
        return 'text-red-600';
      case 'validation':
        return 'text-orange-600';
      case 'system':
        return 'text-red-600';
      default:
        return 'text-red-600';
    }
  };

  return (
    <div className={`flex items-start gap-3 p-4 border rounded-lg ${getBackgroundColor()} ${className}`}>
      <div className={`mt-0.5 ${getIconColor()}`}>
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium ${getTextColor()} mb-1`}>
          {error.category === 'network' && 'Connection Error'}
          {error.category === 'permission' && 'Access Denied'}
          {error.category === 'validation' && 'Invalid Input'}
          {error.category === 'system' && 'System Error'}
          {error.category === 'user' && 'User Action Required'}
        </div>
        
        <p className={`text-sm ${getTextColor()}`}>
          {error.userFriendlyMessage}
        </p>
        
        {error.shouldRetry && onRetry && (
          <div className="mt-3">
            <Button
              size="sm"
              variant="outline"
              onClick={onRetry}
              className={`${getTextColor()} border-current hover:bg-current hover:text-white`}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
