'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, CheckCircle, Loader2, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { toast } from 'sonner';
import { getAuthErrorMessage, logAuthError } from '@/lib/auth-errors';
import { AuthErrorDisplay } from '@/components/auth/AuthErrorDisplay';
import { Role } from '@/lib/types';

export default function EnhancedLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<any>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('brand');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { 
    signInWithGoogle, 
    signInWithEmail, 
    signUpWithEmail, 
    sendPasswordReset,
    user, 
    userDoc 
  } = useAuth();
  const router = useRouter();

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

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);
    setLoginSuccess(false);
    
    try {
      await signInWithEmail(email, password);
      
      // Show success message
      setLoginSuccess(true);
      toast.success('Successfully signed in!', {
        description: 'Redirecting to your dashboard...',
        duration: 3000,
      });
    } catch (error: unknown) {
      // Use the enhanced error handling utility
      const authError = logAuthError(error, 'Email Sign-In');
      setLoginError(authError);
      
      // Show error toast
      const toastTitle = authError.category === 'network' ? 'Connection Error' : 
                        authError.category === 'permission' ? 'Access Denied' :
                        authError.category === 'validation' ? 'Invalid Input' :
                        'Sign-in Failed';
      
      toast.error(toastTitle, {
        description: authError.userFriendlyMessage,
        duration: authError.shouldRetry ? 5000 : 8000,
        action: authError.shouldRetry ? {
          label: 'Try Again',
          onClick: () => handleEmailSignIn(e)
        } : undefined
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    
    setIsLoading(true);
    setLoginError(null);
    setLoginSuccess(false);
    
    try {
      await signUpWithEmail(email, password, displayName, selectedRole);
      
      // Show success message
      setLoginSuccess(true);
      toast.success('Account created successfully!', {
        description: 'Please check your email to verify your account.',
        duration: 5000,
      });
      
      // Switch to sign-in tab
      setActiveTab('signin');
    } catch (error: unknown) {
      // Use the enhanced error handling utility
      const authError = logAuthError(error, 'Email Sign-Up');
      setLoginError(authError);
      
      // Show error toast
      const toastTitle = authError.category === 'network' ? 'Connection Error' : 
                        authError.category === 'permission' ? 'Access Denied' :
                        authError.category === 'validation' ? 'Invalid Input' :
                        'Sign-up Failed';
      
      toast.error(toastTitle, {
        description: authError.userFriendlyMessage,
        duration: authError.shouldRetry ? 5000 : 8000,
        action: authError.shouldRetry ? {
          label: 'Try Again',
          onClick: () => handleEmailSignUp(e)
        } : undefined
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      toast.error('Please enter your email address first');
      return;
    }
    
    try {
      await sendPasswordReset(email);
      toast.success('Password reset email sent!', {
        description: 'Check your email for reset instructions.',
        duration: 5000,
      });
    } catch (error: unknown) {
      const authError = logAuthError(error, 'Password Reset');
      toast.error('Password Reset Failed', {
        description: authError.userFriendlyMessage,
        duration: 5000,
      });
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
          <p className="text-gray-600">Sign in or create an account to continue</p>
        </div>

        {/* Auth Forms */}
        <Card className="p-6">
          {loginError && (
            <AuthErrorDisplay 
              error={loginError} 
              onRetry={() => {
                if (activeTab === 'signin') {
                  handleEmailSignIn(new Event('submit') as any);
                } else {
                  handleEmailSignUp(new Event('submit') as any);
                }
              }}
              className="mb-4"
            />
          )}

          {loginSuccess && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700">Successfully signed in! Redirecting...</span>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signin-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePasswordReset}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || loginSuccess}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Sign In with Email
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleEmailSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-role">Account Type</Label>
                  <select
                    id="signup-role"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as Role)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="brand">Brand/Company</option>
                    <option value="creator">Content Creator</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || loginSuccess}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <User className="w-4 h-4 mr-2" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
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
