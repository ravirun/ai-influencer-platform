import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
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
} from 'lucide-react';
import Link from 'next/link';

export default function CreatorsPage() {
  const creators = [
    {
      id: 1,
      name: 'Sarah Johnson',
      username: '@sarahjohnson',
      avatar: '/api/placeholder/80/80',
      followers: '125K',
      engagement: '8.2%',
      category: 'Fashion',
      location: 'Los Angeles, CA',
      platforms: ['instagram', 'tiktok'],
      verified: true,
      rating: 4.8,
      priceRange: '$500-1000',
      bio: 'Fashion enthusiast sharing daily style tips and lifestyle content. Partnered with 50+ brands.',
      recentPosts: 12,
      avgLikes: '8.5K',
      avgComments: '420'
    },
    {
      id: 2,
      name: 'Mike Chen',
      username: '@mikechen_tech',
      avatar: '/api/placeholder/80/80',
      followers: '89K',
      engagement: '12.5%',
      category: 'Technology',
      location: 'San Francisco, CA',
      platforms: ['youtube', 'twitter'],
      verified: true,
      rating: 4.9,
      priceRange: '$1000-2000',
      bio: 'Tech reviewer and gadget enthusiast. Unboxing the latest tech with honest reviews.',
      recentPosts: 8,
      avgLikes: '12.3K',
      avgComments: '890'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      username: '@emmarodriguez',
      avatar: '/api/placeholder/80/80',
      followers: '340K',
      engagement: '6.8%',
      category: 'Beauty',
      location: 'Miami, FL',
      platforms: ['instagram', 'youtube', 'tiktok'],
      verified: true,
      rating: 4.7,
      priceRange: '$800-1500',
      bio: 'Beauty guru sharing makeup tutorials and skincare routines. Certified makeup artist.',
      recentPosts: 15,
      avgLikes: '15.2K',
      avgComments: '1.2K'
    },
    {
      id: 4,
      name: 'David Park',
      username: '@davidpark_fitness',
      avatar: '/api/placeholder/80/80',
      followers: '67K',
      engagement: '15.2%',
      category: 'Fitness',
      location: 'Austin, TX',
      platforms: ['instagram', 'youtube'],
      verified: false,
      rating: 4.6,
      priceRange: '$300-600',
      bio: 'Personal trainer helping people achieve their fitness goals. Nutrition and workout expert.',
      recentPosts: 20,
      avgLikes: '5.8K',
      avgComments: '340'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      username: '@lisawang_food',
      avatar: '/api/placeholder/80/80',
      followers: '156K',
      engagement: '9.4%',
      category: 'Food',
      location: 'New York, NY',
      platforms: ['instagram', 'tiktok', 'youtube'],
      verified: true,
      rating: 4.8,
      priceRange: '$600-1200',
      bio: 'Food blogger and recipe developer. Sharing delicious meals and cooking tips.',
      recentPosts: 18,
      avgLikes: '11.7K',
      avgComments: '680'
    },
    {
      id: 6,
      name: 'Alex Thompson',
      username: '@alexthompson_travel',
      avatar: '/api/placeholder/80/80',
      followers: '78K',
      engagement: '11.3%',
      category: 'Travel',
      location: 'Seattle, WA',
      platforms: ['instagram', 'youtube'],
      verified: false,
      rating: 4.5,
      priceRange: '$400-800',
      bio: 'Travel photographer and adventure seeker. Exploring the world one destination at a time.',
      recentPosts: 10,
      avgLikes: '7.2K',
      avgComments: '450'
    }
  ];

  const categories = ['All', 'Fashion', 'Beauty', 'Technology', 'Fitness', 'Food', 'Travel', 'Lifestyle'];
  const platforms = ['Instagram', 'YouTube', 'TikTok', 'Twitter'];
  const priceRanges = ['Any', '$100-500', '$500-1000', '$1000-2000', '$2000+'];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'youtube': return <Youtube className="h-4 w-4" />;
      case 'tiktok': return <div className="h-4 w-4 bg-black rounded text-white text-xs flex items-center justify-center">T</div>;
      case 'twitter': return <Twitter className="h-4 w-4" />;
      default: return null;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Fashion': 'bg-pink-100 text-pink-800',
      'Beauty': 'bg-purple-100 text-purple-800',
      'Technology': 'bg-blue-100 text-blue-800',
      'Fitness': 'bg-green-100 text-green-800',
      'Food': 'bg-orange-100 text-orange-800',
      'Travel': 'bg-cyan-100 text-cyan-800',
      'Lifestyle': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Creator Directory</h1>
          <p className="text-gray-600">Discover and connect with top influencers</p>
        </div>
        <Button>
          <Users className="h-4 w-4 mr-2" />
          Invite Creators
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search creators by name, category, or location..."
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Categories</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Platforms</option>
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
          {priceRanges.map(range => (
            <Button key={range} variant="outline" size="sm">
              {range}
            </Button>
          ))}
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Creators</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Star className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-gray-900">892</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Engagement</p>
              <p className="text-2xl font-bold text-gray-900">9.8%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Heart className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reach</p>
              <p className="text-2xl font-bold text-gray-900">12.5M</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creators.map((creator) => (
          <Card key={creator.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {creator.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{creator.name}</h3>
                    {creator.verified && (
                      <Badge className="bg-blue-100 text-blue-800 text-xs">Verified</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{creator.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{creator.rating}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{creator.bio}</p>

            <div className="flex items-center gap-2 mb-4">
              <Badge className={getCategoryColor(creator.category)}>
                {creator.category}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-3 w-3" />
                {creator.location}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">{creator.followers}</p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">{creator.engagement}</p>
                <p className="text-xs text-gray-500">Engagement</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">{creator.priceRange}</p>
                <p className="text-xs text-gray-500">Price Range</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              {creator.platforms.map((platform) => (
                <div key={platform} className="p-1 bg-gray-100 rounded">
                  {getPlatformIcon(platform)}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {creator.avgLikes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  {creator.avgComments}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {creator.recentPosts} posts
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                View Profile
              </Button>
              <Button size="sm" variant="outline">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">
          Load More Creators
        </Button>
      </div>
    </div>
  );
}
