import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, Eye, Heart, MessageCircle, Share, Download } from 'lucide-react';

export default function AnalyticsPage() {
  const metrics = [
    {
      title: 'Total Reach',
      value: '1.2M',
      change: '+12.5%',
      trend: 'up',
      icon: Eye
    },
    {
      title: 'Engagement Rate',
      value: '9.8%',
      change: '+2.1%',
      trend: 'up',
      icon: Heart
    },
    {
      title: 'Total Followers',
      value: '456K',
      change: '+8.3%',
      trend: 'up',
      icon: Users
    },
    {
      title: 'Comments',
      value: '12.4K',
      change: '+15.2%',
      trend: 'up',
      icon: MessageCircle
    }
  ];

  const topCampaigns = [
    {
      name: 'Summer Fashion Collection',
      reach: '340K',
      engagement: '12.5%',
      likes: '42K',
      comments: '3.2K',
      shares: '1.8K'
    },
    {
      name: 'Tech Product Launch',
      reach: '280K',
      engagement: '10.8%',
      likes: '30K',
      comments: '2.1K',
      shares: '1.2K'
    },
    {
      name: 'Holiday Campaign',
      reach: '520K',
      engagement: '8.9%',
      likes: '46K',
      comments: '4.1K',
      shares: '2.3K'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your campaign performance and insights</p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <metric.icon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">{metric.title}</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <Badge className={metric.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {metric.change}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Engagement Trends</h2>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chart visualization would go here</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Reach Distribution</h2>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chart visualization would go here</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Campaigns */}
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Campaigns</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Campaign</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Reach</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Engagement</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Likes</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Comments</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Shares</th>
                </tr>
              </thead>
              <tbody>
                {topCampaigns.map((campaign, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{campaign.name}</td>
                    <td className="py-3 px-4 text-gray-900">{campaign.reach}</td>
                    <td className="py-3 px-4 text-gray-900">{campaign.engagement}</td>
                    <td className="py-3 px-4 text-gray-900">{campaign.likes}</td>
                    <td className="py-3 px-4 text-gray-900">{campaign.comments}</td>
                    <td className="py-3 px-4 text-gray-900">{campaign.shares}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
