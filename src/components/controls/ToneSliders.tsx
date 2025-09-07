'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Smile, 
  Target,
  Globe,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToneSettings {
  tone: number; // 0-1 (formal to playful)
  emoji: number; // 0-3 (none to heavy)
  cta: number; // 0-3 (subtle to strong)
  language: string;
}

interface ToneSlidersProps {
  settings: ToneSettings;
  onSettingsChange: (settings: ToneSettings) => void;
  className?: string;
}

export function ToneSliders({ 
  settings, 
  onSettingsChange, 
  className 
}: ToneSlidersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateSetting = <K extends keyof ToneSettings>(
    key: K,
    value: ToneSettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const getToneLabel = (value: number) => {
    if (value < 0.2) return 'Very Formal';
    if (value < 0.4) return 'Formal';
    if (value < 0.6) return 'Conversational';
    if (value < 0.8) return 'Casual';
    return 'Playful';
  };

  const getEmojiLabel = (value: number) => {
    if (value < 0.5) return 'None';
    if (value < 1.5) return 'Minimal';
    if (value < 2.5) return 'Moderate';
    return 'Heavy';
  };

  const getCtaLabel = (value: number) => {
    if (value < 0.5) return 'Subtle';
    if (value < 1.5) return 'Gentle';
    if (value < 2.5) return 'Clear';
    return 'Strong';
  };

  const getEmojiPreview = (value: number) => {
    if (value < 0.5) return '';
    if (value < 1.5) return '✨';
    if (value < 2.5) return '✨ 🎉';
    return '✨ 🎉 🚀 💫';
  };

  const getCtaPreview = (value: number) => {
    if (value < 0.5) return 'Learn more';
    if (value < 1.5) return 'Discover more';
    if (value < 2.5) return 'Shop now!';
    return 'BUY NOW! 🔥';
  };

  return (
    <Card className={cn('p-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-gray-600" />
          <h3 className="text-sm font-medium text-gray-700">Tone & Style</h3>
        </div>
        <Badge variant="outline" className="text-xs">
          {isExpanded ? 'Advanced' : 'Quick'}
        </Badge>
      </div>

      <div className="space-y-4">
        {/* Tone Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-3 w-3" />
              Tone
            </Label>
            <Badge variant="secondary" className="text-xs">
              {getToneLabel(settings.tone)}
            </Badge>
          </div>
          <Slider
            value={[settings.tone]}
            onValueChange={([value]: number[]) => updateSetting('tone', value)}
            max={1}
            min={0}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Formal</span>
            <span>Playful</span>
          </div>
        </div>

        {/* Emoji Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Smile className="h-3 w-3" />
              Emojis
            </Label>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {getEmojiLabel(settings.emoji)}
              </Badge>
              <span className="text-sm">{getEmojiPreview(settings.emoji)}</span>
            </div>
          </div>
          <Slider
            value={[settings.emoji]}
            onValueChange={([value]: number[]) => updateSetting('emoji', value)}
            max={3}
            min={0}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>None</span>
            <span>Heavy</span>
          </div>
        </div>

        {/* CTA Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Target className="h-3 w-3" />
              Call-to-Action
            </Label>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {getCtaLabel(settings.cta)}
              </Badge>
              <span className="text-sm">{getCtaPreview(settings.cta)}</span>
            </div>
          </div>
          <Slider
            value={[settings.cta]}
            onValueChange={([value]: number[]) => updateSetting('cta', value)}
            max={3}
            min={0}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Subtle</span>
            <span>Strong</span>
          </div>
        </div>

        {/* Language Selector */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Globe className="h-3 w-3" />
            Language
          </Label>
          <select
            value={settings.language}
            onChange={(e) => updateSetting('language', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <div className="text-xs text-gray-600 mb-1">Preview:</div>
        <div className="text-sm text-gray-800">
          &quot;Check out our amazing new product! {getEmojiPreview(settings.emoji)} 
          Perfect for your lifestyle. {getCtaPreview(settings.cta)}&quot;
        </div>
      </div>
    </Card>
  );
}
