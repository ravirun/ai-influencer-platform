'use client';

import { useState, useCallback, useRef } from 'react';
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';
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
  Loader2,
  FileText,
  Hash,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIWorkbenchProps {
  campaignId: string;
  personaId?: string;
  className?: string;
}

export function AIWorkbench({ campaignId, personaId, className }: AIWorkbenchProps) {
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

  // Make current state available to CopilotKit
  useCopilotReadable({
    description: "Current AI Workbench state including campaign context, tone settings, and generated variants",
    value: {
      campaignId,
      personaId,
      toneSettings,
      variants: variants.map(v => ({ id: v.id, text: v.text, score: v.score })),
      totalCost,
      contextChips: contextChips.map(c => ({ id: c.id, title: c.title, type: c.type }))
    }
  });

  // CopilotKit action to generate content variants
  useCopilotAction({
    name: "generateContentVariants",
    description: "Generate AI-powered content variants for social media campaigns",
    parameters: [
      {
        name: "brief",
        type: "string",
        description: "The campaign brief or content description",
        required: true
      },
      {
        name: "targetAudience",
        type: "string", 
        description: "Target audience description",
        required: false
      },
      {
        name: "numVariants",
        type: "number",
        description: "Number of variants to generate (default: 3)",
        required: false
      },
      {
        name: "contentType",
        type: "string",
        description: "Type of content (caption, script, story)",
        required: false
      }
    ],
    handler: async ({ brief, targetAudience, numVariants = 3, contentType = "caption" }) => {
      setIsGenerating(true);
      try {
        const response = await fetch('/api/generate-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            campaignId,
            personaId,
            brief,
            target: targetAudience || 'General audience',
            tone: toneSettings.tone,
            emoji: toneSettings.emoji,
            cta: toneSettings.cta,
            numVariants
          }),
        });

        const result = await response.json();
        if (result.variants) {
          setVariants(result.variants);
          setTotalCost(result.totalCost || 0);
          setActiveTab('variants');
          return `Generated ${result.variants.length} content variants successfully! Total cost: ₹${result.totalCost?.toFixed(3) || '0.000'}`;
        }
        throw new Error('Failed to generate variants');
      } catch (error) {
        console.error('Generation failed:', error);
        return `Failed to generate content variants: ${error}`;
      } finally {
        setIsGenerating(false);
      }
    }
  });

  // CopilotKit action to analyze content performance
  useCopilotAction({
    name: "analyzeContentPerformance",
    description: "Analyze the performance and quality of generated content variants",
    parameters: [
      {
        name: "variantId",
        type: "string",
        description: "ID of the variant to analyze",
        required: false
      }
    ],
    handler: async ({ variantId }) => {
      const variant = variantId ? variants.find(v => v.id === variantId) : variants[0];
      if (!variant) {
        return "No variants available for analysis. Generate some content first.";
      }

      const analysis = {
        score: variant.score,
        reasons: variant.reasons,
        safety: variant.safety,
        text: variant.text,
        hashtags: variant.hashtags || [],
        topics: variant.topics || []
      };

      return `Content Analysis for variant ${variant.id}:
      
Score: ${analysis.score}/100
Reasons: ${analysis.reasons.join(', ')}
Safety: ${analysis.safety.ok ? 'Passed' : 'Issues found: ' + analysis.safety.reasons.join(', ')}
Hashtags: ${analysis.hashtags.join(', ')}
Topics: ${analysis.topics.join(', ')}
Text: "${analysis.text}"`;
    }
  });

  // CopilotKit action to update tone settings
  useCopilotAction({
    name: "updateToneSettings",
    description: "Update the tone and style settings for content generation",
    parameters: [
      {
        name: "tone",
        type: "number",
        description: "Tone level (0-1): 0=formal, 0.5=conversational, 1=playful",
        required: false
      },
      {
        name: "emoji",
        type: "number", 
        description: "Emoji usage level (0-3): 0=none, 1=minimal, 2=moderate, 3=heavy",
        required: false
      },
      {
        name: "cta",
        type: "number",
        description: "Call-to-action strength (0-3): 0=subtle, 1=clear, 2=strong, 3=aggressive",
        required: false
      }
    ],
    handler: async ({ tone, emoji, cta }) => {
      const newSettings = {
        ...toneSettings,
        ...(tone !== undefined && { tone }),
        ...(emoji !== undefined && { emoji }),
        ...(cta !== undefined && { cta })
      };
      setToneSettings(newSettings);
      
      const changes = [];
      if (tone !== undefined) changes.push(`tone to ${tone < 0.3 ? 'formal' : tone < 0.7 ? 'conversational' : 'playful'}`);
      if (emoji !== undefined) changes.push(`emoji usage to ${emoji < 1 ? 'minimal' : emoji < 2 ? 'moderate' : 'heavy'}`);
      if (cta !== undefined) changes.push(`CTA strength to ${cta < 1 ? 'subtle' : cta < 2 ? 'clear' : 'strong'}`);
      
      return `Updated ${changes.join(', ')}. New settings applied for future content generation.`;
    }
  });

  // CopilotKit action to add context
  useCopilotAction({
    name: "addContextChip",
    description: "Add a context chip to provide additional information for content generation",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "Title of the context chip",
        required: true
      },
      {
        name: "content",
        type: "string",
        description: "Content or description for the context",
        required: true
      },
      {
        name: "type",
        type: "string",
        description: "Type of context (guideline, brand, audience, etc.)",
        required: false
      }
    ],
    handler: async ({ title, content, type = "guideline" }) => {
      const newChip: ContextChip = {
        id: `chip_${Date.now()}`,
        type: type as any,
        title,
        excerpt: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
        refId: `ref_${Date.now()}`
      };
      
      setContextChips(prev => [...prev, newChip]);
      return `Added context chip "${title}" successfully. This will be used to inform future content generation.`;
    }
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
            <h2 className="text-lg font-semibold text-gray-900">AI Workbench with CopilotKit</h2>
            <p className="text-sm text-gray-600">AI-powered content generation with intelligent assistance</p>
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
                      <p className="text-sm font-medium text-blue-900 mb-1">CopilotKit Integration Active</p>
                      <p className="text-xs text-blue-700">
                        I can help you generate content, analyze performance, update settings, and manage your campaigns. 
                        Try asking me to "generate 5 content variants for a fitness brand" or "analyze the performance of my latest content."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => {
                        // This will trigger the CopilotKit action
                        console.log('Trigger generateContentVariants action');
                      }}
                    >
                      <Sparkles className="h-3 w-3 mr-2" />
                      Generate Content
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => {
                        console.log('Trigger analyzeContentPerformance action');
                      }}
                    >
                      <TrendingUp className="h-3 w-3 mr-2" />
                      Analyze Performance
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => {
                        console.log('Trigger updateToneSettings action');
                      }}
                    >
                      <Settings className="h-3 w-3 mr-2" />
                      Update Tone
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => {
                        console.log('Trigger addContextChip action');
                      }}
                    >
                      <FileText className="h-3 w-3 mr-2" />
                      Add Context
                    </Button>
                  </div>
                </div>
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
              Generate multiple AI-powered content variants with different tones and styles using CopilotKit integration
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
                Use the AI Chat or Generate tab to create AI-powered content variants with CopilotKit
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
