'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Sparkles,
  BarChart3,
  Shield,
  Bot,
  Workflow
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { getRoleDashboardWidgets, hasFeature } from '@/lib/rbac';
import { Role } from '@/lib/types';

interface DashboardStats {
  name: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: any;
}

export function RoleBasedDashboard() {
  const { userRole } = useAuth();
  
  if (!userRole) return null;

  const widgets = getRoleDashboardWidgets(userRole);
  
  // Role-specific stats
  const getStats = (role: Role): DashboardStats[] => {
    switch (role) {
      case 'admin':
        return [
          {
            name: 'Total Users',
            value: '2,847',
            change: '+12.5%',
            changeType: 'positive',
            icon: Users,
          },
          {
            name: 'Active Campaigns',
            value: '156',
            change: '+8.2%',
            changeType: 'positive',
            icon: TrendingUp,
          },
          {
            name: 'Platform Revenue',
            value: '₹12.4M',
            change: '+23.1%',
            changeType: 'positive',
            icon: DollarSign,
          },
          {
            name: 'System Health',
            value: '99.9%',
            change: '+0.1%',
            changeType: 'positive',
            icon: Shield,
          },
        ];
      case 'brand':
        return [
          {
            name: 'Active Campaigns',
            value: '12',
            change: '+2.5%',
            changeType: 'positive',
            icon: Users,
          },
          {
            name: 'Connected Creators',
            value: '48',
            change: '+12%',
            changeType: 'positive',
            icon: TrendingUp,
          },
          {
            name: 'Posts Scheduled',
            value: '156',
            change: '+8.2%',
            changeType: 'positive',
            icon: Calendar,
          },
          {
            name: 'Campaign ROI',
            value: '340%',
            change: '+15.3%',
            changeType: 'positive',
            icon: DollarSign,
          },
        ];
      case 'creator':
        return [
          {
            name: 'Active Collaborations',
            value: '8',
            change: '+2',
            changeType: 'positive',
            icon: Users,
          },
          {
            name: 'Content Published',
            value: '24',
            change: '+6',
            changeType: 'positive',
            icon: TrendingUp,
          },
          {
            name: 'Engagement Rate',
            value: '4.2%',
            change: '+0.8%',
            changeType: 'positive',
            icon: BarChart3,
          },
          {
            name: 'Monthly Earnings',
            value: '₹45K',
            change: '+18%',
            changeType: 'positive',
            icon: DollarSign,
          },
        ];
      default:
        return [];
    }
  };

  const stats = getStats(userRole);

  const getQuickActions = (role: Role) => {
    const actions = [];
    
    
    if (hasFeature(role, 'contentGeneration')) {
      actions.push({
        title: 'Generate Content',
        description: 'Create AI-powered posts',
        href: '/workbench',
        icon: Sparkles,
        color: 'blue'
      });
    }
    
    if (hasFeature(role, 'campaignManagement')) {
      actions.push({
        title: 'New Campaign',
        description: 'Launch a new campaign',
        href: '/campaigns/new',
        icon: Plus,
        color: 'green'
      });
    }
    
    if (hasFeature(role, 'analytics')) {
      actions.push({
        title: 'View Analytics',
        description: 'Check performance metrics',
        href: '/analytics',
        icon: BarChart3,
        color: 'purple'
      });
    }

    if (role === 'admin') {
      actions.push({
        title: 'System Settings',
        description: 'Manage platform settings',
        href: '/settings',
        icon: Shield,
        color: 'red'
      });
    }
    
    return actions;
  };

  const quickActions = getQuickActions(userRole);

  const getWelcomeMessage = (role: Role) => {
    switch (role) {
      case 'admin':
        return {
          title: 'Platform Overview',
          subtitle: 'Monitor system performance and manage platform operations'
        };
      case 'brand':
        return {
          title: 'Campaign Dashboard',
          subtitle: 'Manage your influencer campaigns and track performance'
        };
      case 'creator':
        return {
          title: 'Creator Dashboard',
          subtitle: 'Track your collaborations and content performance'
        };
      default:
        return {
          title: 'Dashboard',
          subtitle: 'Welcome to your dashboard'
        };
    }
  };

  const welcome = getWelcomeMessage(userRole);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{welcome.title}</h1>
          <p className="text-gray-600">{welcome.subtitle}</p>
        </div>
        <div className="flex gap-3">
          {hasFeature(userRole, 'campaignManagement') && (
            <Link href="/campaigns/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </Link>
          )}
          {hasFeature(userRole, 'contentGeneration') && (
            <Link href="/workbench">
              <Button variant="outline">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Workbench
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.changeType === 'positive' ? (
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`p-2 bg-${action.color}-100 rounded-lg`}>
                    <action.icon className={`h-5 w-5 text-${action.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Card>

      {/* Role-specific content */}
      {userRole === 'admin' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Response Time</span>
                <span className="text-sm font-medium text-green-600">45ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database Health</span>
                <span className="text-sm font-medium text-green-600">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">AI Service Status</span>
                <span className="text-sm font-medium text-green-600">Operational</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-900">New user registration</p>
                <p className="text-gray-500">2 minutes ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-900">Campaign created</p>
                <p className="text-gray-500">5 minutes ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-900">Content generated</p>
                <p className="text-gray-500">8 minutes ago</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
