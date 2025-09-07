import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  Heart, 
  MessageCircle, 
  Share,
  Instagram,
  Youtube,
  Twitter,
  Download,
  Edit,
  Trash2,
  Calendar,
  User,
  BarChart3,
  AlertCircle
} from 'lucide-react';

export default function ContentLibraryPage() {
  const content = [
    {
      id: 1,
      title: 'Summer Fashion Collection Launch',
      influencer: 'Sarah Johnson',
      platform: 'Instagram',
      type: 'Post',
      status: 'approved',
      image: '/api/placeholder/300/300',
      content: 'Just launched my new fashion collection! 🎉 Swipe to see all the looks...',
      scheduledDate: '2024-01-20 10:00 AM',
      publishedDate: '2024-01-20 10:05 AM',
      performance: {
        reach: '45K',
        engagement: '9.2%',
        likes: '12.5K',
        comments: '890',
        shares: '234'
      },
      campaign: 'Summer Fashion 2024',
      tags: ['fashion', 'launch', 'collection'],
      submittedDate: '2024-01-18',
      approvedDate: '2024-01-19'
    },
    {
      id: 2,
      title: 'Behind the Scenes Photoshoot',
      influencer: 'Mike Chen',
      platform: 'Instagram',
      type: 'Story',
      status: 'pending',
      image: '/api/placeholder/300/300',
      content: 'Behind the scenes of my latest photoshoot 📸',
      scheduledDate: '2024-01-22 2:00 PM',
      publishedDate: null,
      performance: {
        reach: '0',
        engagement: '0%',
        likes: '0',
        comments: '0',
        shares: '0'
      },
      campaign: 'Summer Fashion 2024',
      tags: ['behind-scenes', 'photoshoot'],
      submittedDate: '2024-01-21',
      approvedDate: null
    },
    {
      id: 3,
      title: 'GRWM Summer Date Night',
      influencer: 'Emma Rodriguez',
      platform: 'TikTok',
      type: 'Video',
      status: 'rejected',
      image: '/api/placeholder/300/300',
      content: 'Get ready with me for a summer date night ✨ #GRWM #SummerFashion',
      scheduledDate: '2024-01-25 6:00 PM',
      publishedDate: null,
      performance: {
        reach: '0',
        engagement: '0%',
        likes: '0',
        comments: '0',
        shares: '0'
      },
      campaign: 'Summer Fashion 2024',
      tags: ['grwm', 'date-night', 'summer'],
      submittedDate: '2024-01-23',
      approvedDate: null,
      rejectionReason: 'Content does not align with brand guidelines'
    },
    {
      id: 4,
      title: 'Product Unboxing',
      influencer: 'David Park',
      platform: 'YouTube',
      type: 'Video',
      status: 'draft',
      image: '/api/placeholder/300/300',
      content: 'Unboxing the latest tech gadget from our partners...',
      scheduledDate: '2024-01-28 3:00 PM',
      publishedDate: null,
      performance: {
        reach: '0',
        engagement: '0%',
        likes: '0',
        comments: '0',
        shares: '0'
      },
      campaign: 'Tech Launch 2024',
      tags: ['unboxing', 'tech', 'review'],
      submittedDate: null,
      approvedDate: null
    },
    {
      id: 5,
      title: 'Fitness Routine',
      influencer: 'Lisa Wang',
      platform: 'Instagram',
      type: 'Post',
      status: 'approved',
      image: '/api/placeholder/300/300',
      content: 'Morning fitness routine to start your day right! 💪',
      scheduledDate: '2024-01-15 7:00 AM',
      publishedDate: '2024-01-15 7:02 AM',
      performance: {
        reach: '32K',
        engagement: '11.5%',
        likes: '8.9K',
        comments: '456',
        shares: '123'
      },
      campaign: 'Fitness Campaign',
      tags: ['fitness', 'morning', 'routine'],
      submittedDate: '2024-01-13',
      approvedDate: '2024-01-14'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'draft': return <Edit className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
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

  const stats = {
    total: content.length,
    approved: content.filter(c => c.status === 'approved').length,
    pending: content.filter(c => c.status === 'pending').length,
    rejected: content.filter(c => c.status === 'rejected').length,
    draft: content.filter(c => c.status === 'draft').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Library</h1>
          <p className="text-gray-600">Manage and approve influencer content</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Create Content
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Edit className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Draft</p>
              <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search content by title, influencer, or campaign..."
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
              <option value="twitter">Twitter</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
          <Button variant="outline" size="sm">This Week</Button>
          <Button variant="outline" size="sm">This Month</Button>
          <Button variant="outline" size="sm">All Time</Button>
        </div>
      </Card>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item) => (
          <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                {getPlatformIcon(item.platform)}
                <Badge variant="outline">{item.type}</Badge>
              </div>
              <Badge className={getStatusColor(item.status)}>
                <div className="flex items-center gap-1">
                  {getStatusIcon(item.status)}
                  {item.status}
                </div>
              </Badge>
            </div>

            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-sm text-gray-500">Content Preview</span>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.content}</p>

            <div className="flex items-center gap-2 mb-3">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{item.influencer}</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {item.scheduledDate ? new Date(item.scheduledDate).toLocaleDateString() : 'Not scheduled'}
              </span>
            </div>

            {item.status === 'approved' && item.publishedDate && (
              <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                <div className="text-center">
                  <p className="font-medium text-gray-900">{item.performance.likes}</p>
                  <p className="text-gray-500">Likes</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900">{item.performance.comments}</p>
                  <p className="text-gray-500">Comments</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900">{item.performance.shares}</p>
                  <p className="text-gray-500">Shares</p>
                </div>
              </div>
            )}

            {item.status === 'rejected' && item.rejectionReason && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  <strong>Rejection Reason:</strong> {item.rejectionReason}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
              {item.status === 'pending' && (
                <>
                  <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                    <XCircle className="h-4 w-4" />
                  </Button>
                </>
              )}
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">
          Load More Content
        </Button>
      </div>
    </div>
  );
}
