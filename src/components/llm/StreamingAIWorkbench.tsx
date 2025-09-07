'use client';

import { useState, useCallback, useRef } from 'react';
// import { useChat } from '@ai-sdk/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VariantCard, Variant } from './VariantCard';
import { ContextChipList, ContextChip } from './ContextChip';
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
  BarChart3,
  Users,
  Bot,
  Send,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreamingAIWorkbenchProps {
  campaignId: string;
  personaId?: string;
  className?: string;
}

export function StreamingAIWorkbench({ campaignId, personaId, className }: StreamingAIWorkbenchProps) {
  const [contextChips, setContextChips] = useState<ContextChip[]>([
    {
      id: 'chip_1',
      type: 'guideline',
      title: 'Brand Guidelines',
      excerpt: 'Always use positive language, avoid medical claims, keep tone conversational...',
      refId: 'guideline_1'
    }
  ]);

  const [toneSettings, setToneSettings] = useState<ToneSettings>({
    tone: 0.6,
    emoji: 1.5,
    cta: 2,
    language: 'en'
  });

  const [variants, setVariants] = useState<Variant[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [totalCost, setTotalCost] = useState(0);
  const [activeTab, setActiveTab] = useState('chat');

  // Temporary state-based chat implementation
  const [messages, setMessages] = useState<Array<{id: string, role: 'user' | 'assistant', content: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = { id: (Date.now() + 1).toString(), role: 'assistant' as const, content: 'AI response placeholder' };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

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

  const handleApprove = useCallback((variant: Variant) => {
    console.log('Approved variant:', variant);
    // TODO: Update asset status in Firestore
  }, []);

  const handleReject = useCallback((variant: Variant) => {
    setVariants(prev => prev.filter(v => v.id !== variant.id));
  }, []);

  const handleSchedule = useCallback((variant: Variant) => {
    console.log('Schedule variant:', variant);
    // TODO: Open scheduler modal
  }, []);

  const handleCopy = useCallback((variant: Variant) => {
    navigator.clipboard.writeText(variant.text);
    // TODO: Show toast notification
  }, []);

  const handleEdit = useCallback((variant: Variant) => {
    console.log('Edit variant:', variant);
    // TODO: Open edit modal
  }, []);

  const handleAddContext = useCallback(() => {
    console.log('Add context chip');
    // TODO: Open context selector modal
  }, []);

  const handleRemoveContext = useCallback((chipId: string) => {
    setContextChips(prev => prev.filter(chip => chip.id !== chipId));
  }, []);

  const handlePreviewContext = useCallback((chip: ContextChip) => {
    console.log('Preview context:', chip);
    // TODO: Open context preview modal
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
            <h2 className="text-lg font-semibold text-gray-900">AI Workbench</h2>
            <p className="text-sm text-gray-600">Streaming AI-powered content generation</p>
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
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Assistant</h3>
                
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
              <ContextChipList
                chips={contextChips}
                onAdd={handleAddContext}
                onRemove={handleRemoveContext}
                onPreview={handlePreviewContext}
              />
              
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
                      const message = `Generate content with tone: ${toneSettings.tone < 0.3 ? 'formal' : toneSettings.tone < 0.7 ? 'conversational' : 'playful'}, emoji level: ${toneSettings.emoji < 1 ? 'minimal' : toneSettings.emoji < 2 ? 'moderate' : 'heavy'}`;
                      setInput(message);
                    }}
                  >
                    <Zap className="h-3 w-3 mr-2" />
                    Apply Tone
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
              Generate multiple AI-powered content variants with different tones and styles
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
                Use the Chat or Generate tab to create AI-powered content variants
              </p>
              <Button onClick={handleGenerateVariants} disabled={isGenerating}>
                <Zap className="h-4 w-4 mr-2" />
                Generate Now
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {variants.map((variant) => (
                <VariantCard
                  key={variant.id}
                  variant={variant}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onSchedule={handleSchedule}
                  onCopy={handleCopy}
                  onEdit={handleEdit}
                  isSelected={selectedVariant === variant.id}
                />
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
                {variants.filter(v => v.score > 80).map((variant) => (
                  <div key={variant.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {variant.text.substring(0, 100)}...
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Score: {variant.score}</span>
                        <span>Cost: ₹{((variant.cost.input + variant.cost.output) * 0.00001).toFixed(3)}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleSchedule(variant)}
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
