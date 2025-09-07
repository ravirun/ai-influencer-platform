'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Plus, 
  Target, 
  DollarSign, 
  Users, 
  Calendar,
  Instagram,
  Youtube,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Channel } from '@/lib/types';

interface CampaignCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (campaign: any) => void;
}

export function CampaignCreateModal({ isOpen, onClose, onSubmit }: CampaignCreateModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    brief: '',
    target: '',
    channels: [] as Channel[],
    budget: '',
    impressionsGoal: '',
    ctrGoal: '',
    conversionGoal: '',
    startDate: '',
    endDate: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const channelOptions: { value: Channel; label: string; icon: any }[] = [
    { value: 'instagram', label: 'Instagram', icon: Instagram },
    { value: 'youtube', label: 'YouTube', icon: Youtube },
    { value: 'tiktok', label: 'TikTok', icon: MessageSquare }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Campaign name is required';
    if (!formData.brief.trim()) newErrors.brief = 'Campaign brief is required';
    if (!formData.target.trim()) newErrors.target = 'Target audience is required';
    if (formData.channels.length === 0) newErrors.channels = 'At least one channel is required';
    if (!formData.budget || parseFloat(formData.budget) <= 0) newErrors.budget = 'Valid budget is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const campaign = {
        ...formData,
        budget: parseFloat(formData.budget),
        impressionsGoal: formData.impressionsGoal ? parseInt(formData.impressionsGoal) : undefined,
        ctrGoal: formData.ctrGoal ? parseFloat(formData.ctrGoal) : undefined,
        conversionGoal: formData.conversionGoal ? parseInt(formData.conversionGoal) : undefined,
        status: 'draft' as const,
        createdBy: 'current_user', // TODO: Get from auth context
        createdAt: Date.now()
      };
      onSubmit(campaign);
      onClose();
    }
  };

  const handleChannelToggle = (channel: Channel) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Create New Campaign</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
            
            <div>
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Summer Collection Launch"
                className={cn(errors.name && 'border-red-500')}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="brief">Campaign Brief</Label>
              <Textarea
                id="brief"
                value={formData.brief}
                onChange={(e) => handleInputChange('brief', e.target.value)}
                placeholder="Describe your campaign goals, key messages, and requirements..."
                rows={4}
                className={cn(errors.brief && 'border-red-500')}
              />
              {errors.brief && <p className="text-sm text-red-500 mt-1">{errors.brief}</p>}
            </div>

            <div>
              <Label htmlFor="target">Target Audience</Label>
              <Input
                id="target"
                value={formData.target}
                onChange={(e) => handleInputChange('target', e.target.value)}
                placeholder="e.g., Young adults aged 18-25 interested in sustainable fashion"
                className={cn(errors.target && 'border-red-500')}
              />
              {errors.target && <p className="text-sm text-red-500 mt-1">{errors.target}</p>}
            </div>
          </div>

          {/* Channels */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Social Media Channels</h3>
            <div className="flex flex-wrap gap-3">
              {channelOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleChannelToggle(option.value)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors',
                    formData.channels.includes(option.value)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  )}
                >
                  <option.icon className="h-4 w-4" />
                  {option.label}
                </button>
              ))}
            </div>
            {errors.channels && <p className="text-sm text-red-500">{errors.channels}</p>}
          </div>

          {/* Budget & Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Budget & KPIs</h3>
              
              <div>
                <Label htmlFor="budget">Total Budget (₹)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  placeholder="50000"
                  className={cn(errors.budget && 'border-red-500')}
                />
                {errors.budget && <p className="text-sm text-red-500 mt-1">{errors.budget}</p>}
              </div>

              <div>
                <Label htmlFor="impressionsGoal">Impressions Goal (Optional)</Label>
                <Input
                  id="impressionsGoal"
                  type="number"
                  value={formData.impressionsGoal}
                  onChange={(e) => handleInputChange('impressionsGoal', e.target.value)}
                  placeholder="100000"
                />
              </div>

              <div>
                <Label htmlFor="ctrGoal">CTR Goal % (Optional)</Label>
                <Input
                  id="ctrGoal"
                  type="number"
                  step="0.1"
                  value={formData.ctrGoal}
                  onChange={(e) => handleInputChange('ctrGoal', e.target.value)}
                  placeholder="3.5"
                />
              </div>

              <div>
                <Label htmlFor="conversionGoal">Conversion Goal (Optional)</Label>
                <Input
                  id="conversionGoal"
                  type="number"
                  value={formData.conversionGoal}
                  onChange={(e) => handleInputChange('conversionGoal', e.target.value)}
                  placeholder="500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Timeline</h3>
              
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className={cn(errors.startDate && 'border-red-500')}
                />
                {errors.startDate && <p className="text-sm text-red-500 mt-1">{errors.startDate}</p>}
              </div>

              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className={cn(errors.endDate && 'border-red-500')}
                />
                {errors.endDate && <p className="text-sm text-red-500 mt-1">{errors.endDate}</p>}
              </div>
            </div>
          </div>

          {/* Selected Channels Summary */}
          {formData.channels.length > 0 && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Channels</h4>
              <div className="flex flex-wrap gap-2">
                {formData.channels.map((channel) => {
                  const option = channelOptions.find(opt => opt.value === channel);
                  return (
                    <Badge key={channel} variant="secondary" className="flex items-center gap-1">
                      {option && <option.icon className="h-3 w-3" />}
                      {option?.label}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Campaign
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
