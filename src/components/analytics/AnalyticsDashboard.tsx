'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Eye, 
  Heart, 
  MessageSquare, 
  Share2, 
  DollarSign,
  Users,
  Target,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Instagram,
  Youtube,
  MessageSquare as TikTok
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsDashboardProps {
  className?: string;
}

interface MetricData {
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: any;
  color: string;
}

interface CampaignPerformance {
  id: string;
  name: string;
  impressions: number;
  reach: number;
  engagement: number;
  clicks: number;
  conversions: number;
  spend: number;
  roi: number;
  status: 'active' | 'completed' | 'paused';
}

interface ChannelData {
  platform: 'instagram' | 'youtube' | 'tiktok';
  impressions: number;
  reach: number;
  engagement: number;
  posts: number;
  icon: any;
  color: string;
}

export function AnalyticsDashboard({ className }: AnalyticsDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedCampaign, setSelectedCampaign] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const [metrics, setMetrics] = useState<MetricData[]>([
    {
      label: 'Total Impressions',
      value: 1250000,
      change: 12.5,
      changeType: 'increase',
      icon: Eye,
      color: 'text-blue-600'
    },
    {
      label: 'Total Reach',
      value: 890000,
      change: 8.3,
      changeType: 'increase',
      icon: Users,
      color: 'text-green-600'
    },
    {
      label: 'Engagement Rate',
      value: 4.2,
      change: -2.1,
      changeType: 'decrease',
      icon: Heart,
      color: 'text-purple-600'
    },
    {
      label: 'Total Spend',
      value: 45000,
      change: 15.7,
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-orange-600'
    },
    {
      label: 'ROI',
      value: 24.8,
      change: 5.2,
      changeType: 'increase',
      icon: TrendingUp,
      color: 'text-emerald-600'
    },
    {
      label: 'Conversions',
      value: 1250,
      change: 18.9,
      changeType: 'increase',
      icon: Target,
      color: 'text-red-600'
    }
  ]);

  const [campaigns, setCampaigns] = useState<CampaignPerformance[]>([
    {
      id: '1',
      name: 'Summer Collection Launch',
      impressions: 450000,
      reach: 320000,
      engagement: 5.2,
      clicks: 12500,
      conversions: 450,
      spend: 15000,
      roi: 28.5,
      status: 'active'
    },
    {
      id: '2',
      name: 'Tech Product Launch',
      impressions: 380000,
      reach: 280000,
      engagement: 3.8,
      clicks: 8900,
      conversions: 320,
      spend: 12000,
      roi: 22.1,
      status: 'completed'
    },
    {
      id: '3',
      name: 'Holiday Campaign',
      impressions: 420000,
      reach: 290000,
      engagement: 4.1,
      clicks: 10200,
      conversions: 480,
      spend: 18000,
      roi: 26.7,
      status: 'completed'
    }
  ]);

  const [channelData, setChannelData] = useState<ChannelData[]>([
    {
      platform: 'instagram',
      impressions: 650000,
      reach: 480000,
      engagement: 4.8,
      posts: 45,
      icon: Instagram,
      color: 'text-pink-600'
    },
    {
      platform: 'youtube',
      impressions: 420000,
      reach: 280000,
      engagement: 3.2,
      posts: 12,
      icon: Youtube,
      color: 'text-red-600'
    },
    {
      platform: 'tiktok',
      impressions: 180000,
      reach: 130000,
      engagement: 6.1,
      posts: 28,
      icon: TikTok,
      color: 'text-black'
    }
  ]);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    // TODO: Implement data export
    console.log('Exporting analytics data...');
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your campaign performance and ROI</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={cn('h-4 w-4 mr-2', isLoading && 'animate-spin')} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Campaigns</option>
              <option value="active">Active Only</option>
              <option value="completed">Completed Only</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {metric.label === 'Engagement Rate' || metric.label === 'ROI' 
                    ? `${metric.value}%` 
                    : metric.label === 'Total Spend' 
                    ? `₹${formatNumber(metric.value)}`
                    : formatNumber(metric.value)
                  }
                </p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <metric.icon className={cn('h-5 w-5', metric.color)} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {metric.changeType === 'increase' ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span className={cn(
                'text-sm font-medium',
                metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              )}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </span>
              <span className="text-sm text-gray-500">vs last period</span>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="campaigns">Campaign Performance</TabsTrigger>
          <TabsTrigger value="channels">Channel Breakdown</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Campaign</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Impressions</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Reach</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Engagement</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Conversions</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <p className="font-medium text-gray-900">{campaign.name}</p>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-900">{formatNumber(campaign.impressions)}</td>
                        <td className="py-3 px-4 text-gray-900">{formatNumber(campaign.reach)}</td>
                        <td className="py-3 px-4 text-gray-900">{campaign.engagement}%</td>
                        <td className="py-3 px-4 text-gray-900">{campaign.conversions}</td>
                        <td className="py-3 px-4 text-gray-900">
                          <span className="text-green-600 font-medium">+{campaign.roi}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {channelData.map((channel) => (
              <Card key={channel.platform} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <channel.icon className={cn('h-5 w-5', channel.color)} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {channel.platform}
                    </h3>
                    <p className="text-sm text-gray-600">{channel.posts} posts</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Impressions</span>
                    <span className="font-medium">{formatNumber(channel.impressions)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Reach</span>
                    <span className="font-medium">{formatNumber(channel.reach)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Engagement</span>
                    <span className="font-medium">{channel.engagement}%</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Content</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Summer Collection Launch</p>
                    <p className="text-sm text-gray-600">Instagram Post</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">4.8%</p>
                    <p className="text-sm text-gray-600">Engagement</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Tech Product Demo</p>
                    <p className="text-sm text-gray-600">YouTube Video</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">3.2%</p>
                    <p className="text-sm text-gray-600">Engagement</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Behind the Scenes</p>
                    <p className="text-sm text-gray-600">TikTok Video</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">6.1%</p>
                    <p className="text-sm text-gray-600">Engagement</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Increase TikTok Content</p>
                  <p className="text-sm text-blue-700">TikTok shows highest engagement rates. Consider posting more frequently.</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-900">Optimize Posting Times</p>
                  <p className="text-sm text-green-700">Posts between 6-8 PM show 23% higher engagement.</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-900">A/B Test CTAs</p>
                  <p className="text-sm text-purple-700">Try different call-to-action phrases to improve conversion rates.</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
