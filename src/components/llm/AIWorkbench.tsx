'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LLMEditor, PromptBlock } from './LLMEditor';
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
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIWorkbenchProps {
  campaignId: string;
  personaId?: string;
  className?: string;
}

export function AIWorkbench({ campaignId, personaId, className }: AIWorkbenchProps) {
  const [blocks, setBlocks] = useState<PromptBlock[]>([
    {
      id: 'system_1',
      kind: 'system',
      text: 'You are a brand-safe social media copywriter for D2C brands.',
      version: '1.0'
    },
    {
      id: 'user_1',
      kind: 'user',
      text: 'Write an engaging Instagram caption for our new product launch targeting young professionals.'
    }
  ]);

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
    tone: 0.6, // conversational
    emoji: 1.5, // moderate
    cta: 2, // clear
    language: 'en'
  });

  const [variants, setVariants] = useState<Variant[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [totalCost, setTotalCost] = useState(0);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock generated variants
      const mockVariants: Variant[] = [
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

      setVariants(mockVariants);
      setTotalCost(mockVariants.reduce((sum, v) => sum + (v.cost.input + v.cost.output) * 0.00001, 0));
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [blocks, contextChips, toneSettings]);

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
            <Sparkles className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Workbench</h2>
            <p className="text-sm text-gray-600">Generate and refine content with AI</p>
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

      <Tabs defaultValue="compose" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Editor */}
            <div className="lg:col-span-2">
              <LLMEditor
                blocks={blocks}
                onBlocksChange={setBlocks}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />
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
            </div>
          </div>
        </TabsContent>

        <TabsContent value="variants" className="space-y-4">
          {variants.length === 0 ? (
            <Card className="p-8 text-center">
              <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No variants generated yet
              </h3>
              <p className="text-gray-600 mb-4">
                Click "Generate Variants" to create AI-powered content options
              </p>
              <Button onClick={handleGenerate} disabled={isGenerating}>
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

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ToneSliders
              settings={toneSettings}
              onSettingsChange={setToneSettings}
            />
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-4 w-4 text-gray-600" />
                <h3 className="text-sm font-medium text-gray-700">Generation Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Number of Variants
                  </label>
                  <select className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 rounded-md">
                    <option value="3">3 variants</option>
                    <option value="5">5 variants</option>
                    <option value="10">10 variants</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Quality Level
                  </label>
                  <select className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 rounded-md">
                    <option value="fast">Fast (lower cost)</option>
                    <option value="balanced">Balanced</option>
                    <option value="high">High quality</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
