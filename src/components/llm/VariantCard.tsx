'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  X, 
  Copy, 
  Edit, 
  Calendar,
  TrendingUp,
  Shield,
  AlertTriangle,
  Clock,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Variant {
  id: string;
  text: string;
  score: number;
  reasons: string[];
  safety: { ok: boolean; reasons: string[] };
  cost: { input: number; output: number };
}

interface VariantCardProps {
  variant: Variant;
  onApprove: (variant: Variant) => void;
  onReject: (variant: Variant) => void;
  onSchedule: (variant: Variant) => void;
  onCopy: (variant: Variant) => void;
  onEdit: (variant: Variant) => void;
  isSelected?: boolean;
  className?: string;
}

export function VariantCard({
  variant,
  onApprove,
  onReject,
  onSchedule,
  onCopy,
  onEdit,
  isSelected = false,
  className
}: VariantCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  const formatCost = (cost: { input: number; output: number }) => {
    const totalTokens = cost.input + cost.output;
    const estimatedCost = totalTokens * 0.00001; // Rough estimate
    return `₹${estimatedCost.toFixed(3)}`;
  };

  return (
    <Card
      className={cn(
        'p-4 transition-all duration-200 cursor-pointer',
        isSelected && 'ring-2 ring-blue-500 bg-blue-50',
        isHovered && 'shadow-lg',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={cn('text-xs font-medium', getScoreColor(variant.score))}
          >
            <TrendingUp className="h-3 w-3 mr-1" />
            {variant.score}/100 - {getScoreLabel(variant.score)}
          </Badge>
          
          <Badge
            variant={variant.safety.ok ? 'default' : 'destructive'}
            className="text-xs"
          >
            {variant.safety.ok ? (
              <>
                <Shield className="h-3 w-3 mr-1" />
                Safe
              </>
            ) : (
              <>
                <AlertTriangle className="h-3 w-3 mr-1" />
                Flagged
              </>
            )}
          </Badge>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopy(variant)}
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(variant)}
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-sm text-gray-800 leading-relaxed">
          {variant.text}
        </p>
      </div>

      {/* Score Reasons */}
      {variant.reasons.length > 0 && (
        <div className="mb-3">
          <div className="text-xs text-gray-600 mb-1">Why this score:</div>
          <div className="flex flex-wrap gap-1">
            {variant.reasons.map((reason, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {reason}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Safety Issues */}
      {!variant.safety.ok && variant.safety.reasons.length > 0 && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded">
          <div className="text-xs text-red-600 mb-1">Safety concerns:</div>
          <div className="text-xs text-red-700">
            {variant.safety.reasons.join(', ')}
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {variant.text.length} chars
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            {formatCost(variant.cost)}
          </div>
        </div>
        <div className="text-xs">
          {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => onApprove(variant)}
          className="flex-1"
          disabled={!variant.safety.ok}
        >
          <Check className="h-3 w-3 mr-1" />
          Approve
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onSchedule(variant)}
          className="flex-1"
        >
          <Calendar className="h-3 w-3 mr-1" />
          Schedule
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onReject(variant)}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
}
