'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { toast } from 'sonner';
import { getAuthErrorMessage, logAuthError } from '@/lib/auth-errors';
import { AuthErrorDisplay } from '@/components/auth/AuthErrorDisplay';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<any>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  
  const { signInWithGoogle, user, userDoc } = useAuth();
  const router = useRouter();

  // Removed getErrorMessage function - now using the utility from auth-errors.ts

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setLoginError(null);
    setLoginSuccess(false);
    
    try {
      await signInWithGoogle();
      
      // Show success message
      setLoginSuccess(true);
      toast.success('Successfully signed in!', {
        description: 'Redirecting to your dashboard...',
        duration: 3000,
      });
      
      // The auth context will handle the redirect based on onboarding status
      // No need to manually redirect here
    } catch (error: unknown) {
      // Use the enhanced error handling utility
      const authError = logAuthError(error, 'Google Sign-In');
      setLoginError(authError);
      
      // Show error toast with category-specific styling
      const toastTitle = authError.category === 'network' ? 'Connection Error' : 
                        authError.category === 'permission' ? 'Access Denied' :
                        authError.category === 'validation' ? 'Invalid Input' :
                        'Sign-in Failed';
      
      toast.error(toastTitle, {
        description: authError.userFriendlyMessage,
        duration: authError.shouldRetry ? 5000 : 8000,
        action: authError.shouldRetry ? {
          label: 'Try Again',
          onClick: () => handleGoogleSignIn()
        } : undefined
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Inspire AI</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to Inspire AI</h1>
          <p className="text-gray-600">Sign in with Google to continue</p>
        </div>

        {/* Google Sign In */}
        <Card className="p-6">
          {loginError && (
            <AuthErrorDisplay 
              error={loginError} 
              onRetry={handleGoogleSignIn}
              className="mb-4"
            />
          )}

          {loginSuccess && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700">Successfully signed in! Redirecting...</span>
            </div>
          )}

          <Button 
            onClick={handleGoogleSignIn} 
            className="w-full" 
            disabled={isLoading || loginSuccess}
            variant="outline"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Signing in...
              </>
            ) : loginSuccess ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Signed in successfully!
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </>
            )}
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              By signing in, you agree to our{' '}
              <a href="/terms" className="text-blue-600 hover:text-blue-500 font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
                Privacy Policy
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
