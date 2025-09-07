'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Copy, 
  Edit, 
  Calendar,
  TrendingUp,
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
  hashtags?: string[];
  topics?: string[];
  safety: {
    ok: boolean;
    reasons: string[];
  };
  cost: {
    input: number;
    output: number;
  };
}

interface VariantCardProps {
  variant: Variant;
  onApprove: (variant: Variant) => void;
  onReject: (variant: Variant) => void;
  onSchedule: (variant: Variant) => void;
  onCopy: (variant: Variant) => void;
  onEdit: (variant: Variant) => void;
  isSelected?: boolean;
}

export function VariantCard({
  variant,
  onApprove,
  onReject,
  onSchedule,
  onCopy,
  onEdit,
  isSelected = false
}: VariantCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4" />;
    if (score >= 60) return <TrendingUp className="h-4 w-4" />;
    return <AlertTriangle className="h-4 w-4" />;
  };

  return (
    <Card className={cn(
      'p-4 transition-all duration-200 hover:shadow-md',
      isSelected && 'ring-2 ring-blue-500 shadow-md'
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Badge className={cn('text-xs', getScoreColor(variant.score))}>
            {getScoreIcon(variant.score)}
            <span className="ml-1">{variant.score}/100</span>
          </Badge>
          {!variant.safety.ok && (
            <Badge variant="destructive" className="text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Safety Issues
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onCopy(variant)}
            className="h-6 w-6 p-0"
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(variant)}
            className="h-6 w-6 p-0"
          >
            <Edit className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="mb-3">
        <p className="text-sm text-gray-800 leading-relaxed">
          {variant.text}
        </p>
      </div>

      {/* Hashtags */}
      {variant.hashtags && variant.hashtags.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {variant.hashtags.map((hashtag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {hashtag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Topics */}
      {variant.topics && variant.topics.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {variant.topics.map((topic, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Score Reasons */}
      {variant.reasons.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-gray-600 mb-1">Score reasons:</p>
          <ul className="text-xs text-gray-500 space-y-1">
            {variant.reasons.map((reason, index) => (
              <li key={index} className="flex items-center gap-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                {reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Safety Issues */}
      {!variant.safety.ok && variant.safety.reasons.length > 0 && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded">
          <p className="text-xs text-red-700 font-medium mb-1">Safety Issues:</p>
          <ul className="text-xs text-red-600 space-y-1">
            {variant.safety.reasons.map((reason, index) => (
              <li key={index} className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cost Info */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
        <div className="flex items-center gap-1">
          <DollarSign className="h-3 w-3" />
          <span>₹{((variant.cost.input + variant.cost.output) * 0.00001).toFixed(3)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{variant.text.length} chars</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onReject(variant)}
          className="flex-1"
        >
          <XCircle className="h-3 w-3 mr-1" />
          Reject
        </Button>
        <Button
          size="sm"
          onClick={() => onApprove(variant)}
          className="flex-1"
        >
          <CheckCircle className="h-3 w-3 mr-1" />
          Approve
        </Button>
      </div>

      {/* Schedule Button */}
      {variant.score >= 80 && (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onSchedule(variant)}
          className="w-full mt-2"
        >
          <Calendar className="h-3 w-3 mr-1" />
          Schedule Post
        </Button>
      )}
    </Card>
  );
}
