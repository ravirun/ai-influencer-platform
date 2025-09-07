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
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const stats = [
    {
      name: 'Total Campaigns',
      value: '12',
      change: '+2.5%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      name: 'Active Creators',
      value: '48',
      change: '+12%',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
    {
      name: 'Posts Scheduled',
      value: '156',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: Calendar,
    },
    {
      name: 'Revenue',
      value: '₹2.4M',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
  ];

  const recentCampaigns = [
    {
      id: 1,
      name: 'Summer Collection Launch',
      status: 'active',
      progress: 75,
      posts: 12,
      engagement: '4.2%',
    },
    {
      id: 2,
      name: 'Tech Product Review',
      status: 'draft',
      progress: 30,
      posts: 5,
      engagement: '2.8%',
    },
    {
      id: 3,
      name: 'Fitness Challenge',
      status: 'completed',
      progress: 100,
      posts: 20,
      engagement: '6.1%',
    },
  ];

  const topPosts = [
    {
      id: 1,
      content: 'Just tried the new skincare routine and wow! ✨ My skin has never felt better...',
      platform: 'Instagram',
      engagement: '8.5%',
      reach: '12.3K',
    },
    {
      id: 2,
      content: 'Game-changing workout tips that actually work! 💪 Here are my top 5...',
      platform: 'TikTok',
      engagement: '7.2%',
      reach: '8.9K',
    },
    {
      id: 3,
      content: 'Unboxing the latest tech gadget - this is incredible! 📱',
      platform: 'YouTube',
      engagement: '6.8%',
      reach: '15.2K',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your campaigns.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/campaigns/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </Link>
          <Link href="/dashboard/workbench">
            <Button variant="outline">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Workbench
            </Button>
          </Link>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Campaigns */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Campaigns</h2>
            <Link href="/dashboard/campaigns">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentCampaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                    <span>{campaign.posts} posts</span>
                    <span>{campaign.engagement} engagement</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${campaign.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600">{campaign.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Performing Posts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Top Performing Posts</h2>
            <Link href="/dashboard/analytics">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {topPosts.map((post) => (
              <div key={post.id} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-800 mb-2 line-clamp-2">{post.content}</p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    {post.platform}
                  </span>
                  <div className="flex items-center gap-3">
                    <span>{post.engagement} engagement</span>
                    <span>{post.reach} reach</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/workbench">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Generate Content</h3>
                  <p className="text-sm text-gray-600">Create AI-powered posts</p>
                </div>
              </div>
            </Card>
          </Link>
          
          <Link href="/dashboard/campaigns/new">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Plus className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">New Campaign</h3>
                  <p className="text-sm text-gray-600">Launch a new campaign</p>
                </div>
              </div>
            </Card>
          </Link>
          
          <Link href="/dashboard/analytics">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">View Analytics</h3>
                  <p className="text-sm text-gray-600">Check performance metrics</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </Card>
    </div>
  );
}
