import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Star, 
  Users, 
  Heart, 
  MessageCircle, 
  Share,
  MapPin,
  Calendar,
  TrendingUp,
  Instagram,
  Youtube,
  Twitter,
  Mail,
  Phone,
  CheckCircle,
  Award,
  BarChart3,
  Clock,
  DollarSign,
  Target,
  Eye,
  MousePointer,
  Download,
  Edit,
  Settings,
  Play,
  Pause
} from 'lucide-react';
import Link from 'next/link';

interface CampaignDetailPageProps {
  params: {
    id: string;
  };
}

export default function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  // Mock campaign data - in real app, fetch based on params.id
  const campaign = {
    id: params.id,
    name: 'Summer Fashion Collection 2024',
    status: 'active',
    budget: '$5,000',
    spent: '$2,340',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    description: 'Launch campaign for our new summer fashion collection targeting young professionals aged 25-35.',
    goals: {
      reach: '100K',
      engagement: '8%',
      clicks: '5K',
      conversions: '200'
    },
    performance: {
      reach: '125K',
      engagement: '8.2%',
      clicks: '6.2K',
      conversions: '245',
      ctr: '4.96%',
      cpc: '$0.38'
    },
    targetAudience: {
      age: '25-35',
      gender: 'All',
      interests: ['Fashion', 'Lifestyle', 'Beauty'],
      location: 'United States, Canada'
    },
    contentRequirements: {
      platforms: ['Instagram', 'TikTok'],
      contentTypes: ['Post', 'Story', 'Video'],
      hashtags: ['#SummerFashion', '#NewCollection', '#Style'],
      brandMentions: '@fashionco'
    }
  };

  const influencers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      username: '@sarahjohnson',
      avatar: '/api/placeholder/40/40',
      platform: 'Instagram',
      followers: '125K',
      engagement: '8.2%',
      status: 'active',
      posts: 3,
      performance: {
        reach: '45K',
        engagement: '9.2%',
        clicks: '1.2K'
      }
    },
    {
      id: 2,
      name: 'Emma Rodriguez',
      username: '@emmarodriguez',
      avatar: '/api/placeholder/40/40',
      platform: 'TikTok',
      followers: '340K',
      engagement: '6.8%',
      status: 'pending',
      posts: 0,
      performance: {
        reach: '0',
        engagement: '0%',
        clicks: '0'
      }
    },
    {
      id: 3,
      name: 'Mike Chen',
      username: '@mikechen_tech',
      avatar: '/api/placeholder/40/40',
      platform: 'Instagram',
      followers: '89K',
      engagement: '12.5%',
      status: 'completed',
      posts: 2,
      performance: {
        reach: '32K',
        engagement: '11.5%',
        clicks: '890'
      }
    }
  ];

  const content = [
    {
      id: 1,
      influencer: 'Sarah Johnson',
      platform: 'Instagram',
      type: 'Post',
      content: 'Just launched my new fashion collection! 🎉 Swipe to see all the looks...',
      image: '/api/placeholder/300/300',
      status: 'approved',
      likes: '12.5K',
      comments: '890',
      shares: '234',
      date: '2024-01-20',
      scheduledDate: '2024-01-20 10:00 AM'
    },
    {
      id: 2,
      influencer: 'Mike Chen',
      platform: 'Instagram',
      type: 'Story',
      content: 'Behind the scenes of my latest photoshoot 📸',
      image: '/api/placeholder/300/300',
      status: 'pending',
      likes: '0',
      comments: '0',
      shares: '0',
      date: '2024-01-22',
      scheduledDate: '2024-01-22 2:00 PM'
    },
    {
      id: 3,
      influencer: 'Emma Rodriguez',
      platform: 'TikTok',
      type: 'Video',
      content: 'Get ready with me for a summer date night ✨ #GRWM #SummerFashion',
      image: '/api/placeholder/300/300',
      status: 'draft',
      likes: '0',
      comments: '0',
      shares: '0',
      date: '2024-01-25',
      scheduledDate: '2024-01-25 6:00 PM'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'approved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'youtube': return <Youtube className="h-4 w-4" />;
      case 'tiktok': return <div className="h-4 w-4 bg-black rounded text-white text-xs flex items-center justify-center">T</div>;
      case 'twitter': return <Twitter className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/campaigns">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Campaigns
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
            <p className="text-gray-600">Campaign ID: {campaign.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Play className="h-4 w-4 mr-2" />
            {campaign.status === 'active' ? 'Pause' : 'Resume'}
          </Button>
        </div>
      </div>

      {/* Campaign Status */}
      <div className="flex items-center gap-4">
        <Badge className={getStatusColor(campaign.status)}>
          {campaign.status}
        </Badge>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="h-4 w-4" />
          {campaign.spent} of {campaign.budget} spent
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Reach</p>
              <p className="text-2xl font-bold text-gray-900">{campaign.performance.reach}</p>
              <p className="text-xs text-green-600">+25% vs goal</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Heart className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Engagement</p>
              <p className="text-2xl font-bold text-gray-900">{campaign.performance.engagement}</p>
              <p className="text-xs text-green-600">+0.2% vs goal</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MousePointer className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Clicks</p>
              <p className="text-2xl font-bold text-gray-900">{campaign.performance.clicks}</p>
              <p className="text-xs text-green-600">+24% vs goal</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Target className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Conversions</p>
              <p className="text-2xl font-bold text-gray-900">{campaign.performance.conversions}</p>
              <p className="text-xs text-green-600">+22.5% vs goal</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="influencers">Influencers</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Campaign Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">{campaign.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Goals</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Reach:</span>
                          <span className="text-sm font-medium">{campaign.goals.reach}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Engagement:</span>
                          <span className="text-sm font-medium">{campaign.goals.engagement}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Clicks:</span>
                          <span className="text-sm font-medium">{campaign.goals.clicks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Conversions:</span>
                          <span className="text-sm font-medium">{campaign.goals.conversions}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Target Audience</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Age:</span>
                          <span className="text-sm font-medium">{campaign.targetAudience.age}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Gender:</span>
                          <span className="text-sm font-medium">{campaign.targetAudience.gender}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Location:</span>
                          <span className="text-sm font-medium">{campaign.targetAudience.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="influencers" className="space-y-4">
              <div className="space-y-4">
                {influencers.map((influencer) => (
                  <Card key={influencer.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {influencer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{influencer.name}</h4>
                          <p className="text-sm text-gray-600">{influencer.username}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(influencer.status)}>
                        {influencer.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-900">{influencer.followers}</p>
                        <p className="text-gray-500">Followers</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{influencer.engagement}</p>
                        <p className="text-gray-500">Engagement</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{influencer.posts}</p>
                        <p className="text-gray-500">Posts</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{influencer.performance.reach}</p>
                        <p className="text-gray-500">Reach</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <div className="space-y-4">
                {content.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-500">Image</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900">{item.influencer}</span>
                          {getPlatformIcon(item.platform)}
                          <Badge variant="outline">{item.type}</Badge>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-900 mb-3">{item.content}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {item.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {item.comments}
                          </div>
                          <div className="flex items-center gap-1">
                            <Share className="h-4 w-4" />
                            {item.shares}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {item.scheduledDate}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Engagement Trends</h4>
                  <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-gray-400" />
                  </div>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Reach by Platform</h4>
                  <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-gray-400" />
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Add Influencers
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Create Content
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Campaign Metrics</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">CTR</span>
                <span className="text-sm font-medium">{campaign.performance.ctr}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">CPC</span>
                <span className="text-sm font-medium">{campaign.performance.cpc}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Budget Used</span>
                <span className="text-sm font-medium">46.8%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
