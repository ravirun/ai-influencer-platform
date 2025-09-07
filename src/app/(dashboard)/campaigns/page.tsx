import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Users, Target, TrendingUp } from 'lucide-react';

export default function CampaignsPage() {
  const campaigns = [
    {
      id: 1,
      name: 'Summer Fashion Collection',
      status: 'active',
      budget: '$5,000',
      spent: '$2,340',
      reach: '125K',
      engagement: '8.2%',
      startDate: '2024-01-15',
      endDate: '2024-02-15'
    },
    {
      id: 2,
      name: 'Tech Product Launch',
      status: 'draft',
      budget: '$8,000',
      spent: '$0',
      reach: '0',
      engagement: '0%',
      startDate: '2024-02-01',
      endDate: '2024-03-01'
    },
    {
      id: 3,
      name: 'Holiday Campaign',
      status: 'completed',
      budget: '$12,000',
      spent: '$11,850',
      reach: '340K',
      engagement: '12.5%',
      startDate: '2023-12-01',
      endDate: '2023-12-31'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-600">Manage your influencer marketing campaigns</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reach</p>
              <p className="text-2xl font-bold text-gray-900">1.2M</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Engagement</p>
              <p className="text-2xl font-bold text-gray-900">9.8%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Campaigns</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Campaign</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Budget</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Spent</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Reach</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Engagement</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Duration</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{campaign.name}</p>
                        <p className="text-sm text-gray-500">ID: {campaign.id}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{campaign.budget}</td>
                    <td className="py-3 px-4 text-gray-900">{campaign.spent}</td>
                    <td className="py-3 px-4 text-gray-900">{campaign.reach}</td>
                    <td className="py-3 px-4 text-gray-900">{campaign.engagement}</td>
                    <td className="py-3 px-4 text-gray-900">
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </td>
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
