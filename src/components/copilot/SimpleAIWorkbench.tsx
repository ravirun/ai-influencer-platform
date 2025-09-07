'use client';

import { useState, useCallback } from 'react';
import { useChat } from '@ai-sdk/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToneSliders, ToneSettings } from '../controls/ToneSliders';
import { 
  Sparkles, 
  Copy, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Zap,
  Settings,
  MessageSquare,
  Calendar,
  Bot,
  Send,
  Loader2,
  FileText,
  Hash,
  TrendingUp,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SimpleAIWorkbenchProps {
  campaignId: string;
  personaId?: string;
  className?: string;
}

export function SimpleAIWorkbench({ campaignId, personaId, className }: SimpleAIWorkbenchProps) {
  const [toneSettings, setToneSettings] = useState<ToneSettings>({
    tone: 0.6,
    emoji: 1.5,
    cta: 2,
    language: 'en'
  });

  const [variants, setVariants] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [activeTab, setActiveTab] = useState('chat');

  // Use Vercel AI SDK's useChat hook
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      campaignId,
      personaId,
      tone: toneSettings.tone,
      emoji: toneSettings.emoji,
      cta: toneSettings.cta,
    },
  });

  const handleGenerateVariants = useCallback(async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          personaId,
          brief: 'Generate engaging social media content for our brand',
          target: 'Young professionals aged 25-35',
          tone: toneSettings.tone,
          emoji: toneSettings.emoji,
          cta: toneSettings.cta,
          numVariants: 3
        }),
      });

      const result = await response.json();
      if (result.variants) {
        setVariants(result.variants);
        setTotalCost(result.totalCost || 0);
        setActiveTab('variants');
      }
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [campaignId, personaId, toneSettings]);

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: Show toast notification
  }, []);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Bot className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Workbench with Gemini</h2>
            <p className="text-sm text-gray-600">AI-powered content generation with Vercel AI SDK</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <DollarSign className="h-4 w-4" />
            <span>Cost: ₹{totalCost.toFixed(3)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{variants.length} variants</span>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Bot className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 mb-1">Gemini AI Integration Active</p>
                      <p className="text-xs text-blue-700">
                        I can help you generate content, analyze performance, and optimize your influencer marketing strategy. 
                        Try asking me to "generate Instagram captions for a fitness brand" or "analyze my content performance."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'p-3 rounded-lg',
                        message.role === 'user' 
                          ? 'bg-blue-50 ml-8' 
                          : 'bg-gray-50 mr-8'
                      )}
                    >
                      <div className="flex items-start gap-2">
                        <div className={cn(
                          'p-1 rounded-full',
                          message.role === 'user' 
                            ? 'bg-blue-100' 
                            : 'bg-gray-100'
                        )}>
                          {message.role === 'user' ? (
                            <Users className="h-3 w-3 text-blue-600" />
                          ) : (
                            <Bot className="h-3 w-3 text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            {message.role === 'user' ? 'You' : 'AI Assistant'}
                          </p>
                          <p className="text-sm text-gray-800 whitespace-pre-wrap">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="p-3 rounded-lg bg-gray-50 mr-8">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                        <span className="text-sm text-gray-600">AI is thinking...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask me to generate content, explain campaign strategy, or help with anything..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <ToneSliders
                settings={toneSettings}
                onSettingsChange={setToneSettings}
              />

              {/* Quick Actions */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Bot className="h-4 w-4 text-blue-600" />
                  <h3 className="text-sm font-medium text-gray-700">Quick Actions</h3>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={handleGenerateVariants}
                    disabled={isGenerating}
                  >
                    <Sparkles className="h-3 w-3 mr-2" />
                    Generate Variants
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setActiveTab('variants');
                    }}
                  >
                    <Hash className="h-3 w-3 mr-2" />
                    View Variants
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="generate" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">Generate Content Variants</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Generate multiple AI-powered content variants with different tones and styles using Gemini AI
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Number of Variants</label>
                  <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
                    <option value="3">3 variants</option>
                    <option value="5">5 variants</option>
                    <option value="10">10 variants</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Quality Level</label>
                  <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
                    <option value="fast">Fast (lower cost)</option>
                    <option value="balanced">Balanced</option>
                    <option value="high">High quality</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Content Type</label>
                  <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
                    <option value="caption">Social Media Caption</option>
                    <option value="script">Video Script</option>
                    <option value="story">Instagram Story</option>
                  </select>
                </div>
              </div>
              
              <Button 
                onClick={handleGenerateVariants} 
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Variants
                  </>
                )}
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="variants" className="space-y-4">
          {variants.length === 0 ? (
            <Card className="p-8 text-center">
              <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No variants generated yet
              </h3>
              <p className="text-gray-600 mb-4">
                Use the AI Chat or Generate tab to create AI-powered content variants with Gemini
              </p>
              <Button onClick={handleGenerateVariants} disabled={isGenerating}>
                <Zap className="h-4 w-4 mr-2" />
                Generate Now
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {variants.map((variant, index) => (
                <Card key={variant.id || index} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        Score: {variant.score || 85}/100
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy(variant.text)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {variant.text}
                    </p>
                  </div>

                  {variant.hashtags && variant.hashtags.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {variant.hashtags.map((hashtag: string, i: number) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {hashtag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      <span>₹{((variant.cost?.input + variant.cost?.output) * 0.00001 || 0).toFixed(3)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{variant.text.length} chars</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">Content Scheduler</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Schedule your approved content across social media platforms
            </p>
            {variants.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Generate and approve content first to schedule</p>
              </div>
            ) : (
              <div className="space-y-4">
                {variants.filter((v: any) => (v.score || 85) > 80).map((variant: any, index: number) => (
                  <div key={variant.id || index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {variant.text.substring(0, 100)}...
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Score: {variant.score || 85}</span>
                        <span>Cost: ₹{((variant.cost?.input + variant.cost?.output) * 0.00001 || 0).toFixed(3)}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                    >
                      Schedule
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
