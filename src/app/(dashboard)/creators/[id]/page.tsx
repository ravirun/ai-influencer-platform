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
  DollarSign
} from 'lucide-react';
import Link from 'next/link';

interface CreatorProfilePageProps {
  params: {
    id: string;
  };
}

export default function CreatorProfilePage({ params }: CreatorProfilePageProps) {
  // Mock creator data - in real app, fetch based on params.id
  const creator = {
    id: params.id,
    name: 'Sarah Johnson',
    username: '@sarahjohnson',
    avatar: '/api/placeholder/120/120',
    followers: '125K',
    engagement: '8.2%',
    category: 'Fashion',
    location: 'Los Angeles, CA',
    platforms: [
      { name: 'Instagram', handle: '@sarahjohnson', followers: '125K', engagement: '8.2%' },
      { name: 'TikTok', handle: '@sarahjohnson', followers: '89K', engagement: '12.5%' }
    ],
    verified: true,
    rating: 4.8,
    priceRange: '$500-1000',
    bio: 'Fashion enthusiast sharing daily style tips and lifestyle content. Partnered with 50+ brands and featured in major fashion magazines.',
    email: 'sarah@example.com',
    phone: '+1 (555) 123-4567',
    website: 'https://sarahjohnson.com',
    languages: ['English', 'Spanish'],
    specialties: ['Fashion', 'Lifestyle', 'Beauty', 'Travel'],
    achievements: [
      'Featured in Vogue Magazine',
      'Brand Ambassador for 10+ companies',
      '1M+ total reach across platforms'
    ],
    recentPosts: 12,
    avgLikes: '8.5K',
    avgComments: '420',
    responseTime: '< 2 hours',
    completionRate: '98%'
  };

  const recentContent = [
    {
      id: 1,
      platform: 'Instagram',
      type: 'Post',
      content: 'Just launched my new fashion collection! 🎉 Swipe to see all the looks...',
      image: '/api/placeholder/300/300',
      likes: '12.5K',
      comments: '890',
      shares: '234',
      date: '2 days ago'
    },
    {
      id: 2,
      platform: 'TikTok',
      type: 'Video',
      content: 'Get ready with me for a summer date night ✨ #GRWM #SummerFashion',
      image: '/api/placeholder/300/300',
      likes: '45.2K',
      comments: '1.2K',
      shares: '567',
      date: '4 days ago'
    },
    {
      id: 3,
      platform: 'Instagram',
      type: 'Story',
      content: 'Behind the scenes of my latest photoshoot 📸',
      image: '/api/placeholder/300/300',
      likes: '8.9K',
      comments: '456',
      shares: '123',
      date: '1 week ago'
    }
  ];

  const campaigns = [
    {
      id: 1,
      brand: 'FashionCo',
      title: 'Summer Collection Launch',
      status: 'completed',
      date: '2024-01-15',
      performance: {
        reach: '45K',
        engagement: '9.2%',
        clicks: '1.2K'
      }
    },
    {
      id: 2,
      brand: 'BeautyBrand',
      title: 'Skincare Routine',
      status: 'active',
      date: '2024-01-20',
      performance: {
        reach: '32K',
        engagement: '11.5%',
        clicks: '890'
      }
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="h-5 w-5" />;
      case 'youtube': return <Youtube className="h-5 w-5" />;
      case 'tiktok': return <div className="h-5 w-5 bg-black rounded text-white text-xs flex items-center justify-center">T</div>;
      case 'twitter': return <Twitter className="h-5 w-5" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/creators">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Creators
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Creator Profile</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button>
            <Mail className="h-4 w-4 mr-2" />
            Contact
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-medium text-gray-600">
                  {creator.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <h2 className="text-xl font-bold text-gray-900">{creator.name}</h2>
                {creator.verified && (
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                )}
              </div>
              <p className="text-gray-600 mb-4">{creator.username}</p>
              
              <div className="flex items-center justify-center gap-1 mb-4">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">{creator.rating}</span>
                <span className="text-sm text-gray-500">(127 reviews)</span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{creator.bio}</p>

              <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-4">
                <MapPin className="h-4 w-4" />
                {creator.location}
              </div>

              <Badge className="bg-pink-100 text-pink-800 mb-4">
                {creator.category}
              </Badge>
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Response Time</span>
                <span className="text-sm font-medium">{creator.responseTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completion Rate</span>
                <span className="text-sm font-medium">{creator.completionRate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Price Range</span>
                <span className="text-sm font-medium">{creator.priceRange}</span>
              </div>
            </div>
          </Card>

          {/* Contact Info */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{creator.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{creator.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{creator.website}</span>
              </div>
            </div>
          </Card>

          {/* Specialties */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {creator.specialties.map((specialty) => (
                <Badge key={specialty} variant="outline">
                  {specialty}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Platform Stats */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Platform Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {creator.platforms.map((platform) => (
                <div key={platform.name} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    {getPlatformIcon(platform.name)}
                    <div>
                      <h4 className="font-medium text-gray-900">{platform.name}</h4>
                      <p className="text-sm text-gray-600">{platform.handle}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{platform.followers}</p>
                      <p className="text-xs text-gray-500">Followers</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{platform.engagement}</p>
                      <p className="text-xs text-gray-500">Engagement</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="content" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Recent Content</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <div className="space-y-4">
                {recentContent.map((content) => (
                  <Card key={content.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-500">Image</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getPlatformIcon(content.platform)}
                          <Badge variant="outline">{content.type}</Badge>
                          <span className="text-sm text-gray-500">{content.date}</span>
                        </div>
                        <p className="text-sm text-gray-900 mb-3">{content.content}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {content.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {content.comments}
                          </div>
                          <div className="flex items-center gap-1">
                            <Share className="h-4 w-4" />
                            {content.shares}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-4">
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{campaign.title}</h4>
                        <p className="text-sm text-gray-600">{campaign.brand}</p>
                      </div>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-900">{campaign.performance.reach}</p>
                        <p className="text-gray-500">Reach</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{campaign.performance.engagement}</p>
                        <p className="text-gray-500">Engagement</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{campaign.performance.clicks}</p>
                        <p className="text-gray-500">Clicks</p>
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
                  <h4 className="font-medium text-gray-900 mb-3">Audience Demographics</h4>
                  <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
