'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, GripVertical, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PromptBlock {
  id: string;
  kind: 'system' | 'user' | 'tool' | 'guard';
  text: string;
  version?: string;
  inputs?: any;
  policies?: string[];
}

interface LLMEditorProps {
  blocks: PromptBlock[];
  onBlocksChange: (blocks: PromptBlock[]) => void;
  onGenerate: () => void;
  isGenerating?: boolean;
  className?: string;
}

export function LLMEditor({ 
  blocks, 
  onBlocksChange, 
  onGenerate, 
  isGenerating = false,
  className 
}: LLMEditorProps) {
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);
  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  const addBlock = (kind: PromptBlock['kind']) => {
    const newBlock: PromptBlock = {
      id: `block_${Date.now()}`,
      kind,
      text: getDefaultText(kind),
    };
    onBlocksChange([...blocks, newBlock]);
  };

  const updateBlock = (id: string, updates: Partial<PromptBlock>) => {
    onBlocksChange(blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    ));
  };

  const removeBlock = (id: string) => {
    onBlocksChange(blocks.filter(block => block.id !== id));
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    onBlocksChange(newBlocks);
  };

  const getDefaultText = (kind: PromptBlock['kind']): string => {
    switch (kind) {
      case 'system':
        return 'You are a brand-safe social media copywriter for D2C brands.';
      case 'user':
        return 'Write an engaging Instagram caption for...';
      case 'tool':
        return 'Retrieve relevant brand guidelines and examples.';
      case 'guard':
        return 'Ensure content is brand-safe and compliant.';
      default:
        return '';
    }
  };

  const getBlockIcon = (kind: PromptBlock['kind']) => {
    switch (kind) {
      case 'system':
        return '🤖';
      case 'user':
        return '👤';
      case 'tool':
        return '🔧';
      case 'guard':
        return '🛡️';
      default:
        return '📝';
    }
  };

  const getBlockColor = (kind: PromptBlock['kind']) => {
    switch (kind) {
      case 'system':
        return 'bg-blue-50 border-blue-200';
      case 'user':
        return 'bg-green-50 border-green-200';
      case 'tool':
        return 'bg-purple-50 border-purple-200';
      case 'guard':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Block List */}
      <div className="space-y-3">
        {blocks.map((block, index) => (
          <Card
            key={block.id}
            className={cn(
              'p-4 transition-all duration-200 hover:shadow-md',
              getBlockColor(block.kind),
              draggedBlock === block.id && 'opacity-50'
            )}
          >
            <div className="flex items-start gap-3">
              {/* Drag Handle */}
              <div className="flex flex-col gap-1 mt-1">
                <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                <span className="text-lg">{getBlockIcon(block.kind)}</span>
              </div>

              {/* Block Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 capitalize">
                    {block.kind} Block
                  </span>
                  <div className="flex items-center gap-2">
                    {block.kind === 'system' && (
                      <span className="text-xs text-gray-500">
                        v{block.version || '1.0'}
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBlock(block.id)}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <Textarea
                  ref={(el) => (textareaRefs.current[block.id] = el)}
                  value={block.text}
                  onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                  placeholder={`Enter ${block.kind} prompt...`}
                  className="min-h-[80px] resize-none"
                />

                {block.kind === 'tool' && (
                  <div className="text-xs text-gray-500">
                    Retrieval: k=5, filters: brand guidelines
                  </div>
                )}

                {block.kind === 'guard' && (
                  <div className="text-xs text-gray-500">
                    Policies: brand safety, compliance, tone
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Block Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => addBlock('system')}
          className="text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          System
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addBlock('user')}
          className="text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          User
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addBlock('tool')}
          className="text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          Tool
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addBlock('guard')}
          className="text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          Guard
        </Button>
      </div>

      {/* Generate Button */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={onGenerate}
          disabled={isGenerating || blocks.length === 0}
          className="px-8"
        >
          {isGenerating ? 'Generating...' : 'Generate Variants'}
        </Button>
      </div>
    </div>
  );
}
