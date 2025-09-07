'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Play,
  Target,
  Users,
  BarChart3,
  Sparkles,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { campaignDb, assetDb } from '@/lib/database';
import { CampaignDoc, AssetDoc } from '@/lib/types';

export default function DemoCampaignPage() {
  const [campaign, setCampaign] = useState<CampaignDoc | null>(null);
  const [assets, setAssets] = useState<AssetDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      loadDemoCampaign();
    }
  }, [user]);

  const loadDemoCampaign = async () => {
    try {
      // Get campaigns for the user
      const userCampaigns = userRole === 'brand' 
        ? await campaignDb.getByBrand(user.uid)
        : await campaignDb.getByCreator(user.uid);
      
      // Find the demo campaign
      const demoCampaign = userCampaigns.find(c => 
        c.name.includes('Demo') || c.tags?.includes('demo')
      );
      
      if (demoCampaign) {
        setCampaign(demoCampaign);
        
        // Load assets for the campaign
        const campaignAssets = await assetDb.getByCampaign(demoCampaign.brandId);
        setAssets(campaignAssets);
      }
    } catch (error) {
      console.error('Error loading demo campaign:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your demo campaign...</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="p-4 bg-yellow-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Target className="h-8 w-8 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No Demo Campaign Found</h1>
          <p className="text-gray-600 mb-6">
            It looks like you don't have a demo campaign yet. Complete the onboarding process to create one.
          </p>
          <Button onClick={() => router.push('/onboarding')}>
            Go to Onboarding
          </Button>
        </div>
      </div>
    );
  }

  const isBrand = userRole === 'brand';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
                <p className="text-gray-600">Demo {isBrand ? 'Campaign' : 'Opportunity'}</p>
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              {campaign.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Overview */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Campaign Overview</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Brief</h3>
                  <p className="text-gray-600">{campaign.brief}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Target Audience</h3>
                  <p className="text-gray-600">{campaign.target}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Budget</h3>
                    <p className="text-2xl font-bold text-blue-600">
                      ${campaign.budget.toLocaleString()} {campaign.currency}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Duration</h3>
                    <p className="text-gray-600">
                      {campaign.startDate.toDate().toLocaleDateString()} - {campaign.endDate.toDate().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Content Requirements */}
            {campaign.contentRequirements && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Requirements</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Posts</h3>
                    <p className="text-2xl font-bold text-green-600">{campaign.contentRequirements.postCount}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Stories</h3>
                    <p className="text-2xl font-bold text-purple-600">{campaign.contentRequirements.storyCount || 0}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Reels</h3>
                    <p className="text-2xl font-bold text-pink-600">{campaign.contentRequirements.reelCount || 0}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Channels</h3>
                    <div className="flex flex-wrap gap-1">
                      {campaign.channels.map(channel => (
                        <Badge key={channel} variant="secondary" className="text-xs">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                {campaign.contentRequirements.hashtags && (
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-900 mb-2">Hashtags</h3>
                    <div className="flex flex-wrap gap-2">
                      {campaign.contentRequirements.hashtags.map(hashtag => (
                        <Badge key={hashtag} variant="outline" className="text-xs">
                          {hashtag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            )}

            {/* Generated Content */}
            {assets.length > 0 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Generated Content</h2>
                <div className="space-y-4">
                  {assets.map((asset, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {asset.type}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {asset.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {asset.createdAt.toDate().toLocaleDateString()}
                        </div>
                      </div>
                      {asset.content?.text && (
                        <div className="bg-gray-50 p-4 rounded-lg mb-3">
                          <p className="text-gray-800">{asset.content.text}</p>
                        </div>
                      )}
                      {asset.hashtags && asset.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {asset.hashtags.map(hashtag => (
                            <Badge key={hashtag} variant="outline" className="text-xs">
                              {hashtag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* KPIs */}
            {campaign.kpis && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Campaign Goals</h2>
                <div className="space-y-4">
                  {campaign.kpis.impressionsGoal && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Impressions</span>
                      </div>
                      <span className="font-semibold">{campaign.kpis.impressionsGoal.toLocaleString()}</span>
                    </div>
                  )}
                  {campaign.kpis.reachGoal && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-600">Reach</span>
                      </div>
                      <span className="font-semibold">{campaign.kpis.reachGoal.toLocaleString()}</span>
                    </div>
                  )}
                  {campaign.kpis.engagementGoal && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-600" />
                        <span className="text-sm text-gray-600">Engagement</span>
                      </div>
                      <span className="font-semibold">{campaign.kpis.engagementGoal.toLocaleString()}</span>
                    </div>
                  )}
                  {campaign.kpis.ctrGoal && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-gray-600">CTR</span>
                      </div>
                      <span className="font-semibold">{campaign.kpis.ctrGoal}%</span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate More Content
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {isBrand ? 'Find Creators' : 'Browse Opportunities'}
                </Button>
              </div>
            </Card>

            {/* Demo Notice */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Demo Campaign</h3>
                  <p className="text-sm text-blue-700">
                    This is a demo {isBrand ? 'campaign' : 'opportunity'} created during onboarding. 
                    Explore the features and try creating your own content!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
