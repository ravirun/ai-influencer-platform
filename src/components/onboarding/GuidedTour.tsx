'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  SkipForward, 
  RotateCcw, 
  HelpCircle,
  Target,
  Users,
  BarChart3,
  Settings,
  Sparkles
} from 'lucide-react';
import { Role } from '@/lib/types';

interface GuidedTourProps {
  userRole: Role;
  onComplete: () => void;
  onSkip: () => void;
}

export default function GuidedTour({ userRole, onComplete, onSkip }: GuidedTourProps) {
  const tourRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import intro.js to avoid SSR issues
    const initTour = async () => {
      const intro = (await import('intro.js')).default;
      const introJs = intro();
      
      // Configure intro.js
      introJs.setOptions({
        nextLabel: 'Next →',
        prevLabel: '← Back',
        skipLabel: 'Skip Tour',
        doneLabel: 'Finish Tour',
        hidePrev: true,
        hideNext: false,
        showStepNumbers: false,
        showBullets: true,
        showProgress: true,
        scrollToElement: true,
        scrollPadding: 100,
        overlayOpacity: 0.8,
        highlightClass: 'intro-highlight',
        tooltipClass: 'intro-tooltip',
        exitOnOverlayClick: false,
        exitOnEsc: true,
        keyboardNavigation: true,
        disableInteraction: true,
        steps: getTourSteps(userRole)
      });

      tourRef.current = introJs;
    };

    initTour();
  }, [userRole]);

  const getTourSteps = (role: Role) => {
    const baseSteps = [
      {
        element: '#dashboard-header',
        intro: `
          <div class="text-center">
            <h3 class="text-lg font-semibold mb-2">Welcome to Inspire AI! 🎉</h3>
            <p>Let's take a quick tour to help you get started with the platform.</p>
          </div>
        `,
        position: 'bottom' as const
      },
      {
        element: '#main-navigation',
        intro: `
          <div class="text-center">
            <h3 class="text-lg font-semibold mb-2">Navigation Menu</h3>
            <p>Use the sidebar to navigate between different sections of the platform.</p>
          </div>
        `,
        position: 'right' as const
      }
    ];

    if (role === 'brand') {
      return [
        ...baseSteps,
        {
          element: '#campaigns-section',
          intro: `
            <div class="text-center">
              <h3 class="text-lg font-semibold mb-2">Campaign Management</h3>
              <p>Create and manage your influencer campaigns here. Set budgets, define targets, and track performance.</p>
            </div>
          `,
          position: 'bottom' as const
        },
        {
          element: '#creators-section',
          intro: `
            <div class="text-center">
              <h3 class="text-lg font-semibold mb-2">Creator Network</h3>
              <p>Discover and connect with verified creators who match your brand's values and target audience.</p>
            </div>
          `,
          position: 'bottom' as const
        },
        {
          element: '#workbench-section',
          intro: `
            <div class="text-center">
              <h3 class="text-lg font-semibold mb-2">AI Content Workbench</h3>
              <p>Generate engaging content using our AI-powered tools. Create captions, images, and more.</p>
            </div>
          `,
          position: 'bottom' as const
        },
        {
          element: '#analytics-section',
          intro: `
            <div class="text-center">
              <h3 class="text-lg font-semibold mb-2">Analytics Dashboard</h3>
              <p>Track your campaign performance with detailed insights and reporting.</p>
            </div>
          `,
          position: 'bottom' as const
        }
      ];
    } else {
      return [
        ...baseSteps,
        {
          element: '#opportunities-section',
          intro: `
            <div class="text-center">
              <h3 class="text-lg font-semibold mb-2">Brand Opportunities</h3>
              <p>Discover collaboration opportunities from brands looking for creators like you.</p>
            </div>
          `,
          position: 'bottom' as const
        },
        {
          element: '#portfolio-section',
          intro: `
            <div class="text-center">
              <h3 class="text-lg font-semibold mb-2">Your Portfolio</h3>
              <p>Showcase your best content and manage your creator profile to attract brands.</p>
            </div>
          `,
          position: 'bottom' as const
        },
        {
          element: '#workbench-section',
          intro: `
            <div class="text-center">
              <h3 class="text-lg font-semibold mb-2">AI Content Tools</h3>
              <p>Use our AI tools to create amazing content for your brand collaborations.</p>
            </div>
          `,
          position: 'bottom' as const
        },
        {
          element: '#earnings-section',
          intro: `
            <div class="text-center">
              <h3 class="text-lg font-semibold mb-2">Earnings & Analytics</h3>
              <p>Track your earnings and content performance across all platforms.</p>
            </div>
          `,
          position: 'bottom' as const
        }
      ];
    }
  };

  const startTour = () => {
    if (tourRef.current) {
      tourRef.current.start();
      
      // Listen for tour completion
      tourRef.current.oncomplete(() => {
        onComplete();
      });
      
      // Listen for tour exit
      tourRef.current.onexit(() => {
        onComplete();
      });
    }
  };

  const skipTour = () => {
    if (tourRef.current) {
      tourRef.current.exit();
    }
    onSkip();
  };

  return (
    <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Sparkles className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Welcome to Inspire AI! 🎉
            </h3>
            <p className="text-gray-600 mb-4">
              Let's take a quick guided tour to help you get familiar with the platform and discover all the amazing features available to you as a {userRole}.
            </p>
            <div className="flex items-center gap-4">
              <Button onClick={startTour} className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Start Tour
              </Button>
              <Button variant="outline" onClick={skipTour} className="flex items-center gap-2">
                <SkipForward className="h-4 w-4" />
                Skip Tour
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <Badge variant="outline" className="mb-2">
            {userRole === 'brand' ? 'Brand Manager' : 'Content Creator'}
          </Badge>
          <p className="text-sm text-gray-500">
            Tour duration: ~2 minutes
          </p>
        </div>
      </div>
    </Card>
  );
}

// Tour step configuration for different roles
export const getTourStepsForRole = (role: Role) => {
  const commonSteps = [
    {
      target: '#dashboard-header',
      content: 'Welcome to your dashboard! This is your central hub for managing everything.',
      placement: 'bottom'
    },
    {
      target: '#main-navigation',
      content: 'Use the sidebar to navigate between different sections of the platform.',
      placement: 'right'
    }
  ];

  if (role === 'brand') {
    return [
      ...commonSteps,
      {
        target: '#campaigns-section',
        content: 'Create and manage your influencer campaigns here. Set budgets, define targets, and track performance.',
        placement: 'bottom'
      },
      {
        target: '#creators-section',
        content: 'Discover and connect with verified creators who match your brand\'s values and target audience.',
        placement: 'bottom'
      },
      {
        target: '#workbench-section',
        content: 'Generate engaging content using our AI-powered tools. Create captions, images, and more.',
        placement: 'bottom'
      },
      {
        target: '#analytics-section',
        content: 'Track your campaign performance with detailed insights and reporting.',
        placement: 'bottom'
      }
    ];
  } else {
    return [
      ...commonSteps,
      {
        target: '#opportunities-section',
        content: 'Discover collaboration opportunities from brands looking for creators like you.',
        placement: 'bottom'
      },
      {
        target: '#portfolio-section',
        content: 'Showcase your best content and manage your creator profile to attract brands.',
        placement: 'bottom'
      },
      {
        target: '#workbench-section',
        content: 'Use our AI tools to create amazing content for your brand collaborations.',
        placement: 'bottom'
      },
      {
        target: '#earnings-section',
        content: 'Track your earnings and content performance across all platforms.',
        placement: 'bottom'
      }
    ];
  }
};
