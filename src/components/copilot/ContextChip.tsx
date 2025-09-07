'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  X, 
  Eye, 
  FileText, 
  Users, 
  Target, 
  Lightbulb,
  Shield,
  Hash
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ContextChip {
  id: string;
  type: 'guideline' | 'brand' | 'audience' | 'campaign' | 'hashtag' | 'trend';
  title: string;
  excerpt: string;
  refId: string;
}

interface ContextChipListProps {
  chips: ContextChip[];
  onAdd: () => void;
  onRemove: (chipId: string) => void;
  onPreview: (chip: ContextChip) => void;
}

export function ContextChipList({ chips, onAdd, onRemove, onPreview }: ContextChipListProps) {
  const getTypeIcon = (type: ContextChip['type']) => {
    switch (type) {
      case 'guideline':
        return <Shield className="h-3 w-3" />;
      case 'brand':
        return <FileText className="h-3 w-3" />;
      case 'audience':
        return <Users className="h-3 w-3" />;
      case 'campaign':
        return <Target className="h-3 w-3" />;
      case 'hashtag':
        return <Hash className="h-3 w-3" />;
      case 'trend':
        return <Lightbulb className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  const getTypeColor = (type: ContextChip['type']) => {
    switch (type) {
      case 'guideline':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'brand':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'audience':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'campaign':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'hashtag':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'trend':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">Context Chips</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={onAdd}
          className="h-6 w-6 p-0"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-2">
        {chips.length === 0 ? (
          <div className="text-center py-4">
            <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-xs text-gray-500">No context chips added</p>
            <p className="text-xs text-gray-400">Add context to improve AI generation</p>
          </div>
        ) : (
          chips.map((chip) => (
            <div
              key={chip.id}
              className={cn(
                'p-2 rounded-lg border transition-all duration-200 hover:shadow-sm',
                getTypeColor(chip.type)
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <div className="mt-0.5">
                    {getTypeIcon(chip.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{chip.title}</p>
                    <p className="text-xs opacity-75 line-clamp-2">{chip.excerpt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onPreview(chip)}
                    className="h-5 w-5 p-0 opacity-60 hover:opacity-100"
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemove(chip.id)}
                    className="h-5 w-5 p-0 opacity-60 hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {chips.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            {chips.length} context {chips.length === 1 ? 'chip' : 'chips'} active
          </p>
        </div>
      )}
    </Card>
  );
}
