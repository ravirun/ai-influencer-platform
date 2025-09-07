'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Sparkles, 
  LayoutDashboard, 
  Users, 
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bot,
  Workflow,
  History,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/lib/auth';
import { getRoleNavigation, hasFeature } from '@/lib/rbac';
import { Role } from '@/lib/types';
import { SessionIndicator } from '@/components/session/SessionIndicator';

// Icon mapping for dynamic navigation
const iconMap = {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart3,
  Settings,
  Bot,
  Workflow,
  History,
  Sparkles,
  Shield,
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, userRole, userDoc, logout } = useAuth();

  // Get role-based navigation
  const navigation = userRole ? getRoleNavigation(userRole) : [];


  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={cn(
        'fixed inset-0 z-50 lg:hidden',
        sidebarOpen ? 'block' : 'hidden'
      )}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Sparkles className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Inspire AI</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Sparkles;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <IconComponent className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div id="main-navigation" className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Sparkles className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Inspire AI</span>
            </div>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Sparkles;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <IconComponent className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div id="dashboard-header" className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <SessionIndicator />
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {userDoc?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {userDoc?.displayName || user?.email || 'User'}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500 capitalize">
                      {userRole || 'User'}
                    </p>
                    {userRole && (
                      <div className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-medium',
                        userRole === 'admin' ? 'bg-red-100 text-red-700' :
                        userRole === 'brand' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      )}>
                        {userRole}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {children}
          </div>
        </main>
      </div>
    </div>
    </ProtectedRoute>
  );
}
