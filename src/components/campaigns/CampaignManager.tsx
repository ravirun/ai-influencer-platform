'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  DollarSign, 
  Target, 
  Users, 
  BarChart3,
  Edit,
  Trash2,
  Play,
  Pause,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CampaignDoc,  CampaignStatus } from '@/lib/types';
import { Timestamp } from 'firebase/firestore';

interface CampaignManagerProps {
  className?: string;
  onCreateCampaign?: () => void;
}

export function CampaignManager({ className, onCreateCampaign }: CampaignManagerProps) {
  const [campaigns, setCampaigns] = useState<CampaignDoc[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | 'all'>('all');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignDoc | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockCampaigns: CampaignDoc[] = [
      {
        brandId: 'brand_1',
        name: 'Summer Collection Launch',
        brief: 'Launch our new summer collection targeting young adults aged 18-25. Focus on sustainability and fashion-forward designs.',
        target: 'Young adults interested in sustainable fashion',
        personaId: 'persona_summer',
        channels: ['instagram', 'tiktok'],
        budget: 50000,
        currency: 'USD',
        status: 'live',
        startDate: Timestamp.fromDate(new Date()),
        endDate: Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
        kpis: {
          impressionsGoal: 100000,
          ctrGoal: 3.5,
          conversionGoal: 500
        },
        createdBy: 'user_1',
        createdAt: Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
        updatedAt: Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
      },
      {
        brandId: 'brand_1',
        name: 'Holiday Gift Guide',
        brief: 'Create content for our holiday gift guide featuring our best-selling products.',
        target: 'Holiday shoppers looking for unique gifts',
        channels: ['instagram', 'youtube'],
        budget: 30000,
        currency: 'USD',
        status: 'draft',
        startDate: Timestamp.fromDate(new Date()),
        endDate: Timestamp.fromDate(new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)),
        kpis: {
          impressionsGoal: 75000,
          ctrGoal: 2.8,
          conversionGoal: 300
        },
        createdBy: 'user_1',
        createdAt: Timestamp.fromDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)),
        updatedAt: Timestamp.fromDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)),
      },
      {
        brandId: 'brand_1',
        name: 'Back to School Campaign',
        brief: 'Promote our student-friendly products for the back-to-school season.',
        target: 'Students and parents preparing for school',
        channels: ['instagram', 'tiktok', 'youtube'],
        budget: 40000,
        currency: 'USD',
        status: 'paused',
        startDate: Timestamp.fromDate(new Date()),
        endDate: Timestamp.fromDate(new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)),
        kpis: {
          impressionsGoal: 80000,
          ctrGoal: 3.0,
          conversionGoal: 400
        },
        createdBy: 'user_1',
        createdAt: Timestamp.fromDate(new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)),
        updatedAt: Timestamp.fromDate(new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)),
      }
    ];
    setCampaigns(mockCampaigns);
  }, []);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.brief.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: CampaignStatus) => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: CampaignStatus) => {
    switch (status) {
      case 'live': return <Play className="h-3 w-3" />;
      case 'draft': return <Edit className="h-3 w-3" />;
      case 'paused': return <Pause className="h-3 w-3" />;
      case 'completed': return <CheckCircle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const handleCreateCampaign = () => {
    if (onCreateCampaign) {
      onCreateCampaign();
    } else {
      setIsCreating(true);
      // TODO: Open campaign creation modal
    }
  };

  const handleEditCampaign = (campaign: CampaignDoc) => {
    setSelectedCampaign(campaign);
    // TODO: Open campaign edit modal
  };

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.filter(c => c.name !== campaignId));
    // TODO: Implement actual deletion
  };

  const handleStatusChange = (campaignId: string, newStatus: CampaignStatus) => {
    setCampaigns(prev => prev.map(c => 
      c.name === campaignId ? { ...c, status: newStatus } : c
    ));
    // TODO: Update in Firestore
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaign Management</h1>
          <p className="text-gray-600">Create and manage your influencer marketing campaigns</p>
        </div>
        <Button onClick={handleCreateCampaign} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Play className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {campaigns.filter(c => c.status === 'live').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BarChart3 className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. ROI</p>
              <p className="text-2xl font-bold text-gray-900">+24%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as CampaignStatus | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="live">Live</option>
              <option value="paused">Paused</option>
              <option value="done">Done</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.name} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  <Badge className={cn('flex items-center gap-1', getStatusColor(campaign.status))}>
                    {getStatusIcon(campaign.status)}
                    {campaign.status}
                  </Badge>
                </div>
                
                <p className="text-gray-600 mb-4">{campaign.brief}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Target:</span>
                    <span className="font-medium">{campaign.target}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Budget:</span>
                    <span className="font-medium">₹{campaign.budget.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Channels:</span>
                    <div className="flex gap-1">
                      {campaign.channels.map((channel) => (
                        <Badge key={channel} variant="outline" className="text-xs">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">
                      {campaign.createdAt.toDate().toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                {campaign.kpis && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">KPIs</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Impressions Goal:</span>
                        <span className="font-medium ml-2">{campaign.kpis.impressionsGoal?.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">CTR Goal:</span>
                        <span className="font-medium ml-2">{campaign.kpis.ctrGoal}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Conversion Goal:</span>
                        <span className="font-medium ml-2">{campaign.kpis.conversionGoal}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditCampaign(campaign)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                
                {campaign.status === 'live' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(campaign.name, 'paused')}
                  >
                    <Pause className="h-4 w-4" />
                  </Button>
                ) : campaign.status === 'paused' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(campaign.name, 'live')}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                ) : campaign.status === 'draft' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(campaign.name, 'live')}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                ) : null}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteCampaign(campaign.name)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        
        {filteredCampaigns.length === 0 && (
          <Card className="p-8 text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No campaigns found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Create your first campaign to get started'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button onClick={handleCreateCampaign}>
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
