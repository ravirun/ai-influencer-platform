'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Sparkles, 
  ArrowRight, 
  Play,
  Building2,
  Camera,
  Target,
  Users,
  BarChart3,
  Settings,
  Gift
} from 'lucide-react';
import { Role } from '@/lib/types';

interface OnboardingCompleteProps {
  role: Role;
  onComplete: () => void;
}

export default function OnboardingComplete({ role, onComplete }: OnboardingCompleteProps) {
  const [showTour, setShowTour] = useState(false);

  const getRoleSpecificContent = () => {
    if (role === 'brand') {
      return {
        title: 'Welcome to your Brand Dashboard! 🎉',
        subtitle: 'You\'re all set to start creating amazing influencer campaigns',
        features: [
          {
            icon: Target,
            title: 'Create Campaigns',
            description: 'Set up your first influencer campaign with AI-powered content generation'
          },
          {
            icon: Users,
            title: 'Find Creators',
            description: 'Discover and connect with verified creators who match your brand'
          },
          {
            icon: BarChart3,
            title: 'Track Performance',
            description: 'Monitor campaign performance with detailed analytics and insights'
          },
          {
            icon: Settings,
            title: 'Manage Everything',
            description: 'Streamline your entire influencer marketing workflow in one place'
          }
        ],
        nextSteps: [
          'Explore your demo campaign',
          'Try the AI content generation',
          'Browse the creator network',
          'Set up your brand guidelines'
        ],
        ctaText: 'Start Creating Campaigns',
        ctaIcon: Target
      };
    } else {
      return {
        title: 'Welcome to your Creator Dashboard! 🎉',
        subtitle: 'You\'re ready to start collaborating with amazing brands',
        features: [
          {
            icon: Gift,
            title: 'Find Opportunities',
            description: 'Discover brand collaboration opportunities that match your niche'
          },
          {
            icon: Camera,
            title: 'Showcase Portfolio',
            description: 'Build your creator profile to attract the right brands'
          },
          {
            icon: Sparkles,
            title: 'AI Content Tools',
            description: 'Use our AI tools to create amazing content for your collaborations'
          },
          {
            icon: BarChart3,
            title: 'Track Earnings',
            description: 'Monitor your earnings and content performance across all platforms'
          }
        ],
        nextSteps: [
          'Explore your demo opportunity',
          'Try the AI content tools',
          'Browse brand opportunities',
          'Complete your creator profile'
        ],
        ctaText: 'Explore Opportunities',
        ctaIcon: Gift
      };
    }
  };

  const content = getRoleSpecificContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 bg-green-100 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Sparkles className="h-8 w-8 text-blue-600" />
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
            {role === 'brand' ? 'Brand Manager' : 'Content Creator'} • Setup Complete
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

        {/* Next Steps */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            What's Next?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.nextSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <span className="text-gray-700">{step}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onComplete}
              size="lg"
              className="px-8 py-4 text-lg flex items-center gap-2"
            >
              {content.ctaText}
              <ArrowRight className="h-5 w-5" />
            </Button>
            
            <Button
              onClick={() => setShowTour(true)}
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg flex items-center gap-2"
            >
              <Play className="h-5 w-5" />
              Take a Tour
            </Button>
          </div>
          
          <p className="text-sm text-gray-500">
            You can always access the tour from the help menu in your dashboard
          </p>
        </div>

        {/* Quick Tips */}
        <Card className="p-6 mt-8 bg-yellow-50 border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-3">💡 Quick Tips</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              • Use the search bar to quickly find what you're looking for
            </div>
            <div>
              • Check your notifications for important updates
            </div>
            <div>
              • Explore the AI workbench for content inspiration
            </div>
            <div>
              • Set up your preferences in the settings menu
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
