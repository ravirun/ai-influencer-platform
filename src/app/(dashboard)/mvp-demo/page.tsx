'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Play, 
  Bot, 
  DollarSign, 
  History, 
  BarChart3,
  Sparkles,
  Calendar,
  CreditCard,
  Eye,
  MessageSquare,
  Users,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PaymentModal } from '@/components/payments/PaymentModal';

interface GeneratedVariant {
  id: string;
  text: string;
  score: number;
}

export default function MVPDemoPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [generatedVariants, setGeneratedVariants] = useState<GeneratedVariant[]>([]);
  const [approvedVariant, setApprovedVariant] = useState<GeneratedVariant | null>(null);
  const [scheduled, setScheduled] = useState(false);
  const [posted, setPosted] = useState(false);

  const mvpSteps = [
    {
      id: 1,
      title: 'Brand Creates Campaign',
      description: 'Brand manager creates a new campaign with brief and budget',
      icon: Target,
      status: 'completed'
    },
    {
      id: 2,
      title: 'AI Generates 3-5 Caption Variants',
      description: 'AI generates multiple caption variants using Gemini 1.5 Pro',
      icon: Bot,
      status: currentStep >= 2 ? 'completed' : 'pending'
    },
    {
      id: 3,
      title: 'One Approved → Scheduled',
      description: 'Brand approves one variant and schedules for auto-posting',
      icon: Calendar,
      status: currentStep >= 3 ? 'completed' : 'pending'
    },
    {
      id: 4,
      title: 'Auto-Posted (Dry-Run)',
      description: 'Content is automatically posted to social media platforms',
      icon: MessageSquare,
      status: currentStep >= 4 ? 'completed' : 'pending'
    },
    {
      id: 5,
      title: 'Insights Visible in Dashboard',
      description: 'Performance insights and analytics are displayed',
      icon: BarChart3,
      status: currentStep >= 5 ? 'completed' : 'pending'
    },
    {
      id: 6,
      title: 'Payment System Live (Test Mode)',
      description: 'Stripe payment processing in test mode',
      icon: CreditCard,
      status: currentStep >= 6 ? 'completed' : 'pending'
    },
    {
      id: 7,
      title: 'Audit Trail + Cost Meter',
      description: 'Complete audit trail and cost tracking per asset',
      icon: History,
      status: currentStep >= 7 ? 'completed' : 'pending'
    }
  ];

  const handleGenerateVariants = () => {
    // Simulate AI generation
    const variants = [
      {
        id: 'var_1',
        text: 'Exciting news! 🎉 Our latest innovation is here to transform your daily routine. Perfect for busy professionals who value quality and style. #NewLaunch #Innovation #ProfessionalLife',
        score: 87,
        reasons: ['Optimal length', 'Good hashtag count', 'Brand relevant'],
        safety: { ok: true, reasons: [] },
        cost: { input: 150, output: 45 }
      },
      {
        id: 'var_2',
        text: 'Ready to upgrade your lifestyle? ✨ Our new product combines cutting-edge technology with sleek design. Join thousands of satisfied customers! #Upgrade #Technology #Lifestyle',
        score: 82,
        reasons: ['Good hashtag count', 'Brand relevant'],
        safety: { ok: true, reasons: [] },
        cost: { input: 150, output: 42 }
      },
      {
        id: 'var_3',
        text: 'The future is here! 🚀 Experience the difference with our revolutionary new product. Designed for modern professionals who demand excellence. #Future #Revolutionary #Excellence',
        score: 79,
        reasons: ['Brand relevant'],
        safety: { ok: true, reasons: [] },
        cost: { input: 150, output: 48 }
      }
    ];
    setGeneratedVariants(variants);
    setCurrentStep(2);
  };

  const handleApproveVariant = (variant: GeneratedVariant) => {
    setApprovedVariant(variant);
    setCurrentStep(3);
  };

  const handleSchedule = () => {
    setScheduled(true);
    setCurrentStep(4);
    
    // Simulate auto-posting after 2 seconds
    setTimeout(() => {
      setPosted(true);
      setCurrentStep(5);
    }, 2000);
  };

  const handlePayment = () => {
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setCurrentStep(6);
    setShowPayment(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">MVP Demo</h1>
        <p className="text-gray-600">Complete end-to-end workflow demonstration</p>
      </div>

      {/* Progress Steps */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">MVP Acceptance Criteria</h2>
        <div className="space-y-4">
          {mvpSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center gap-4">
                <div className={cn('p-2 rounded-lg', getStatusColor(step.status))}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                <Badge className={cn(
                  step.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                )}>
                  {step.status === 'completed' ? '✅' : '⏳'} {step.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Interactive Demo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Actions */}
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Demo Actions</h3>
            
            {currentStep === 1 && (
              <div className="space-y-3">
                <p className="text-gray-600">Campaign &quot;Summer Collection Launch&quot; created with ₹50,000 budget</p>
                <Button onClick={handleGenerateVariants} className="w-full">
                  <Bot className="h-4 w-4 mr-2" />
                  Generate AI Caption Variants
                </Button>
              </div>
            )}

            {currentStep === 2 && generatedVariants.length > 0 && (
              <div className="space-y-3">
                <p className="text-gray-600">AI generated {generatedVariants.length} caption variants</p>
                <div className="space-y-2">
                  {generatedVariants.map((variant) => (
                    <div key={variant.id} className="p-3 border rounded-lg">
                      <p className="text-sm text-gray-800 mb-2">{variant.text}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Score: {variant.score}</Badge>
                        <Button 
                          size="sm" 
                          onClick={() => handleApproveVariant(variant)}
                        >
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && approvedVariant && (
              <div className="space-y-3">
                <p className="text-gray-600">Variant approved! Ready to schedule.</p>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">{approvedVariant.text}</p>
                </div>
                <Button onClick={handleSchedule} className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule for Auto-Posting
                </Button>
              </div>
            )}

            {currentStep === 4 && scheduled && (
              <div className="space-y-3">
                <p className="text-gray-600">Content scheduled! Simulating auto-posting...</p>
                {!posted && (
                  <div className="flex items-center gap-2 text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm">Posting to Instagram & TikTok...</span>
                  </div>
                )}
                {posted && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Posted successfully!</span>
                  </div>
                )}
              </div>
            )}

            {currentStep >= 5 && (
              <div className="space-y-3">
                <p className="text-gray-600">Content posted! View insights and process payment.</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={() => setCurrentStep(5)}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Insights
                  </Button>
                  <Button variant="outline" onClick={handlePayment}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Process Payment
                  </Button>
                </div>
              </div>
            )}

            {currentStep >= 6 && (
              <div className="space-y-3">
                <p className="text-gray-600">Payment processed! View audit trail.</p>
                <Button variant="outline" onClick={() => setCurrentStep(7)} className="w-full">
                  <History className="h-4 w-4 mr-2" />
                  View Audit Trail
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Results</h3>
            
            {currentStep >= 5 && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Performance Insights</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Eye className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-blue-600">12.3K</div>
                    <div className="text-xs text-gray-600">Impressions</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Users className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-green-600">8.9K</div>
                    <div className="text-xs text-gray-600">Reach</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-purple-600">4.2%</div>
                    <div className="text-xs text-gray-600">Engagement</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <DollarSign className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-orange-600">₹0.045</div>
                    <div className="text-xs text-gray-600">AI Cost</div>
                  </div>
                </div>
              </div>
            )}

            {currentStep >= 7 && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Audit Trail</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Bot className="h-4 w-4 text-blue-600" />
                    <span>AI generated 3 variants</span>
                    <Badge variant="outline" className="text-xs">₹0.045</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Variant approved by John Doe</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span>Scheduled for auto-posting</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                    <span>Posted to Instagram & TikTok</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="h-4 w-4 text-orange-600" />
                    <span>Payment processed: ₹50,000</span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        amount={50000}
        campaignId="summer_collection_launch"
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
