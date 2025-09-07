'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Target, 
  Users, 
  BarChart3, 
  ArrowRight,
  CheckCircle,
  Play,
  Zap,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2
} from 'lucide-react';
import { Role } from '@/lib/types';
import { useAuth } from '@/lib/auth';

interface DemoCampaignSetupProps {
  role: Role;
  onComplete: () => void;
}

export default function DemoCampaignSetup({ role, onComplete }: DemoCampaignSetupProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [campaignCreated, setCampaignCreated] = useState(false);
  const { user } = useAuth();

  const handleCreateDemoCampaign = async () => {
    if (!user) return;
    
    setIsCreating(true);
    
    try {
      const token = await user.getIdToken();
      const response = await fetch('/api/create-demo-campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });

      if (response.ok) {
        setCampaignCreated(true);
        // Auto-advance after 2 seconds
        setTimeout(() => {
          onComplete();
        }, 2000);
      } else {
        console.error('Failed to create demo campaign');
      }
    } catch (error) {
      console.error('Error creating demo campaign:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const getRoleSpecificContent = () => {
    if (role === 'brand') {
      return {
        title: 'Let\'s create your first campaign! 🚀',
        subtitle: 'We\'ll set up a demo campaign to show you how Inspire AI works',
        features: [
          {
            icon: Target,
            title: 'AI-Powered Content Generation',
            description: 'Create engaging captions and content ideas in seconds'
          },
          {
            icon: Users,
            title: 'Creator Network Access',
            description: 'Connect with verified creators who match your brand'
          },
          {
            icon: BarChart3,
            title: 'Performance Analytics',
            description: 'Track campaign performance with detailed insights'
          },
          {
            icon: Sparkles,
            title: 'Smart Recommendations',
            description: 'Get AI-powered suggestions for optimal content strategy'
          }
        ],
        demoStats: {
          impressions: '10.2K',
          engagement: '847',
          reach: '5.1K',
          ctr: '3.2%'
        }
      };
    } else {
      return {
        title: 'Welcome to your creator journey! ✨',
        subtitle: 'We\'ll set up a demo opportunity to show you what\'s possible',
        features: [
          {
            icon: Zap,
            title: 'AI Content Tools',
            description: 'Generate amazing content ideas and captions with AI'
          },
          {
            icon: TrendingUp,
            title: 'Growth Opportunities',
            description: 'Discover brand collaborations that match your niche'
          },
          {
            icon: Heart,
            title: 'Engagement Boost',
            description: 'Create content that resonates with your audience'
          },
          {
            icon: MessageCircle,
            title: 'Community Connection',
            description: 'Connect with brands and fellow creators'
          }
        ],
        demoStats: {
          likes: '2.1K',
          comments: '156',
          shares: '89',
          saves: '234'
        }
      };
    }
  };

  const content = getRoleSpecificContent();

  if (campaignCreated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl text-center">
          <div className="mb-8">
            <div className="p-4 bg-green-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Demo {role === 'brand' ? 'Campaign' : 'Opportunity'} Created! 🎉
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Your demo {role === 'brand' ? 'campaign' : 'opportunity'} is ready. 
              You can explore it in your dashboard to see how Inspire AI works.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {Object.entries(content.demoStats).map(([key, value]) => (
              <Card key={key} className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{value}</div>
                <div className="text-sm text-gray-600 capitalize">{key}</div>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Redirecting to your dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 bg-purple-100 rounded-full">
              <Sparkles className="h-12 w-12 text-purple-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">Inspire AI</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            {content.subtitle}
          </p>
          
          <Badge variant="outline" className="text-lg px-4 py-2">
            {role === 'brand' ? 'Brand Manager' : 'Content Creator'} • Demo Setup
          </Badge>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {content.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Demo Preview */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            What you'll get in your demo:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Demo Content Preview */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 mb-3">Sample Content</h4>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-medium text-sm">Demo Creator</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  🚀 Just discovered this amazing AI tool that's changing how I create content! 
                  The results speak for themselves - better engagement, more authentic content, 
                  and way less time spent on the creative process.
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {content.demoStats.likes || '2.1K'}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {content.demoStats.comments || '156'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 className="h-3 w-3" />
                    {content.demoStats.shares || '89'}
                  </span>
                </div>
              </div>
            </div>

            {/* Demo Analytics */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 mb-3">Sample Analytics</h4>
              <div className="space-y-3">
                {Object.entries(content.demoStats).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-lg font-bold text-blue-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Button
            onClick={handleCreateDemoCampaign}
            disabled={isCreating}
            size="lg"
            className="px-8 py-4 text-lg flex items-center gap-2 mx-auto"
          >
            {isCreating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Demo {role === 'brand' ? 'Campaign' : 'Opportunity'}...
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                Create Demo {role === 'brand' ? 'Campaign' : 'Opportunity'}
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </Button>
          
          <p className="text-sm text-gray-500">
            This will create a sample {role === 'brand' ? 'campaign' : 'opportunity'} 
            that you can explore and customize
          </p>
        </div>

        {/* Quick Tips */}
        <Card className="p-6 mt-8 bg-yellow-50 border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-3">💡 What happens next?</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              • Explore your demo {role === 'brand' ? 'campaign' : 'opportunity'} in the dashboard
            </div>
            <div>
              • Try the AI content generation tools
            </div>
            <div>
              • {role === 'brand' ? 'Browse the creator network' : 'Discover brand opportunities'}
            </div>
            <div>
              • Set up your preferences and start creating
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
