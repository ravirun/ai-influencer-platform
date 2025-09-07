'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { canAccessRoute, getDefaultRoute } from '@/lib/rbac';
import { Loader2, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Role } from '@/lib/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: Role;
  requiredPermissions?: string[];
  fallbackRoute?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  requiredPermissions = [],
  fallbackRoute 
}: ProtectedRouteProps) {
  const { user, userRole, userDoc, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
        return;
      }

      // Check if user has completed onboarding
      if (userDoc && !userDoc.onboardingCompleted) {
        router.push('/onboarding');
        return;
      }

      // Check role-based access
      if (userRole) {
        // Check if user can access the current route
        if (!canAccessRoute(userRole, pathname)) {
          const defaultRoute = fallbackRoute || getDefaultRoute(userRole);
          router.push(defaultRoute);
          return;
        }

        // Check specific role requirement
        if (requiredRole && userRole !== requiredRole) {
          const defaultRoute = fallbackRoute || getDefaultRoute(userRole);
          router.push(defaultRoute);
          return;
        }
      }
    }
  }, [user, userRole, userDoc, loading, router, pathname, requiredRole, fallbackRoute]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Check if user has completed onboarding
  if (userDoc && !userDoc.onboardingCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Redirecting to onboarding...</p>
        </div>
      </div>
    );
  }

  // Check role-based access
  if (userRole && !canAccessRoute(userRole, pathname)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="p-3 bg-red-100 rounded-full w-fit mx-auto mb-4">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don&apos;t have permission to access this page with your current role ({userRole}).
          </p>
          <Button 
            onClick={() => router.push(getDefaultRoute(userRole!))}
            className="w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  // Check specific role requirement
  if (requiredRole && userRole !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="p-3 bg-red-100 rounded-full w-fit mx-auto mb-4">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Role Required</h1>
          <p className="text-gray-600 mb-6">
            This page requires {requiredRole} role. Your current role is {userRole}.
          </p>
          <Button 
            onClick={() => router.push(getDefaultRoute(userRole!))}
            className="w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
