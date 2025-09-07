'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, FileText, Package, MessageSquare, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ContextChip {
  id: string;
  type: 'guideline' | 'product' | 'examplePost' | 'claim';
  title: string;
  excerpt: string;
  refId: string;
}

interface ContextChipProps {
  chip: ContextChip;
  onRemove: (chipId: string) => void;
  onPreview: (chip: ContextChip) => void;
  className?: string;
}

export function ContextChipComponent({ 
  chip, 
  onRemove, 
  onPreview,
  className 
}: ContextChipProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getChipIcon = (type: ContextChip['type']) => {
    switch (type) {
      case 'guideline':
        return <Shield className="h-3 w-3" />;
      case 'product':
        return <Package className="h-3 w-3" />;
      case 'examplePost':
        return <MessageSquare className="h-3 w-3" />;
      case 'claim':
        return <FileText className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  const getChipColor = (type: ContextChip['type']) => {
    switch (type) {
      case 'guideline':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'product':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'examplePost':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'claim':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getTypeLabel = (type: ContextChip['type']) => {
    switch (type) {
      case 'guideline':
        return 'Guideline';
      case 'product':
        return 'Product';
      case 'examplePost':
        return 'Example';
      case 'claim':
        return 'Claim';
      default:
        return 'Context';
    }
  };

  return (
    <Card
      className={cn(
        'p-3 transition-all duration-200 cursor-pointer group',
        getChipColor(chip.type),
        isHovered && 'shadow-md scale-105',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPreview(chip)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <div className="flex-shrink-0 mt-0.5">
            {getChipIcon(chip.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs">
                {getTypeLabel(chip.type)}
              </Badge>
            </div>
            
            <h4 className="text-sm font-medium truncate">
              {chip.title}
            </h4>
            
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {chip.excerpt}
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(chip.id);
          }}
          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
}

interface ContextChipListProps {
  chips: ContextChip[];
  onRemove: (chipId: string) => void;
  onPreview: (chip: ContextChip) => void;
  onAdd: () => void;
  className?: string;
}

export function ContextChipList({ 
  chips, 
  onRemove, 
  onPreview, 
  onAdd,
  className 
}: ContextChipListProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">
          Context Chips ({chips.length})
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onAdd}
          className="text-xs"
        >
          Add Context
        </Button>
      </div>

      {chips.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No context added yet</p>
          <p className="text-xs">Add guidelines, products, or examples for better AI output</p>
        </div>
      ) : (
        <div className="space-y-2">
          {chips.map((chip) => (
            <ContextChipComponent
              key={chip.id}
              chip={chip}
              onRemove={onRemove}
              onPreview={onPreview}
            />
          ))}
        </div>
      )}
    </div>
  );
}
