'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Globe, 
  Target, 
  DollarSign, 
  Calendar,
  ArrowRight,
  CheckCircle,
  Settings
} from 'lucide-react';
import { Role } from '@/lib/types';

interface PreferencesSetupProps {
  role: Role;
  onComplete: () => void;
}

export default function PreferencesSetup({ role, onComplete }: PreferencesSetupProps) {
  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      push: true,
      campaignUpdates: true,
      newOpportunities: role === 'creator',
      weeklyReports: true
    },
    privacy: {
      profileVisibility: 'public',
      showEarnings: false,
      allowDirectMessages: true
    },
    content: {
      tone: 0.5, // 0 = formal, 1 = casual
      emojiUsage: 1, // 0 = none, 3 = heavy
      ctaStrength: 1, // 0 = subtle, 3 = strong
      language: 'en'
    },
    business: role === 'brand' ? {
      budgetRange: [1000, 10000],
      targetAudience: '18-34',
      campaignTypes: ['product', 'brand_awareness']
    } : {
      minCPM: 5,
      maxCampaigns: 5,
      preferredChannels: ['instagram', 'youtube']
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleNotificationChange = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key: string, value: string | boolean) => {
    setPreferences(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const handleContentChange = (key: string, value: number) => {
    setPreferences(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [key]: value
      }
    }));
  };

  const handleBusinessChange = (key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      business: {
        ...prev.business,
        [key]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Here you would typically save the preferences to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      onComplete();
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Settings className="h-8 w-8 text-purple-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">Inspire AI</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Customize your preferences
          </h1>
          <p className="text-lg text-gray-600">
            Set up your preferences to get the most out of your experience
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Notifications */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Notifications</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive updates via email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.notifications.email}
                      onChange={(e) => handleNotificationChange('email', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-gray-600">Get notified in real-time</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.notifications.push}
                      onChange={(e) => handleNotificationChange('push', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Campaign Updates</Label>
                      <p className="text-sm text-gray-600">Updates about your campaigns</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.notifications.campaignUpdates}
                      onChange={(e) => handleNotificationChange('campaignUpdates', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </div>
                  
                  {role === 'creator' && (
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>New Opportunities</Label>
                        <p className="text-sm text-gray-600">New brand collaboration opportunities</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.notifications.newOpportunities}
                        onChange={(e) => handleNotificationChange('newOpportunities', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Weekly Reports</Label>
                      <p className="text-sm text-gray-600">Performance summaries</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.notifications.weeklyReports}
                      onChange={(e) => handleNotificationChange('weeklyReports', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </div>
                </div>
              </Card>

              {/* Privacy Settings */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold">Privacy & Visibility</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Profile Visibility</Label>
                    <select
                      value={preferences.privacy.profileVisibility}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="public">Public - Anyone can see your profile</option>
                      <option value="verified">Verified Only - Only verified users</option>
                      <option value="private">Private - Only you can see</option>
                    </select>
                  </div>
                  
                  {role === 'creator' && (
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Earnings</Label>
                        <p className="text-sm text-gray-600">Display earnings on your profile</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.privacy.showEarnings}
                        onChange={(e) => handlePrivacyChange('showEarnings', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Direct Messages</Label>
                      <p className="text-sm text-gray-600">Let others send you messages</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.privacy.allowDirectMessages}
                      onChange={(e) => handlePrivacyChange('allowDirectMessages', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Content Preferences */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold">Content Preferences</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <Label>Tone: {preferences.content.tone < 0.3 ? 'Formal' : preferences.content.tone > 0.7 ? 'Casual' : 'Balanced'}</Label>
                    <Slider
                      value={[preferences.content.tone]}
                      onValueChange={(value) => handleContentChange('tone', value[0])}
                      max={1}
                      step={0.1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>Formal</span>
                      <span>Casual</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Emoji Usage: {preferences.content.emojiUsage === 0 ? 'None' : preferences.content.emojiUsage === 1 ? 'Light' : preferences.content.emojiUsage === 2 ? 'Moderate' : 'Heavy'}</Label>
                    <Slider
                      value={[preferences.content.emojiUsage]}
                      onValueChange={(value) => handleContentChange('emojiUsage', value[0])}
                      max={3}
                      step={1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>None</span>
                      <span>Heavy</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Call-to-Action Strength: {preferences.content.ctaStrength === 0 ? 'Subtle' : preferences.content.ctaStrength === 1 ? 'Light' : preferences.content.ctaStrength === 2 ? 'Moderate' : 'Strong'}</Label>
                    <Slider
                      value={[preferences.content.ctaStrength]}
                      onValueChange={(value) => handleContentChange('ctaStrength', value[0])}
                      max={3}
                      step={1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>Subtle</span>
                      <span>Strong</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Business Preferences */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold">
                    {role === 'brand' ? 'Campaign Preferences' : 'Business Preferences'}
                  </h3>
                </div>
                
                {role === 'brand' ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Budget Range: ${preferences.business.budgetRange?.[0]?.toLocaleString() || '0'} - ${preferences.business.budgetRange?.[1]?.toLocaleString() || '0'}</Label>
                      <div className="mt-2 space-y-2">
                        <Slider
                          value={preferences.business.budgetRange}
                          onValueChange={(value) => handleBusinessChange('budgetRange', value)}
                          max={50000}
                          step={500}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>$0</span>
                          <span>$50,000+</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Target Audience</Label>
                      <select
                        value={preferences.business.targetAudience}
                        onChange={(e) => handleBusinessChange('targetAudience', e.target.value)}
                        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="18-24">18-24 (Gen Z)</option>
                        <option value="18-34">18-34 (Millennials)</option>
                        <option value="25-44">25-44 (Young Adults)</option>
                        <option value="35-54">35-54 (Gen X)</option>
                        <option value="55+">55+ (Boomers)</option>
                        <option value="all">All Ages</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label>Campaign Types</Label>
                      <div className="mt-2 space-y-2">
                        {[
                          { value: 'product', label: 'Product Promotion' },
                          { value: 'brand_awareness', label: 'Brand Awareness' },
                          { value: 'event', label: 'Event Marketing' },
                          { value: 'launch', label: 'Product Launch' }
                        ].map((type) => (
                          <label key={type.value} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={preferences.business.campaignTypes?.includes(type.value) || false}
                              onChange={(e) => {
                                const currentTypes = preferences.business.campaignTypes || [];
                                const newTypes = e.target.checked
                                  ? [...currentTypes, type.value]
                                  : currentTypes.filter(t => t !== type.value);
                                handleBusinessChange('campaignTypes', newTypes);
                              }}
                              className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="text-sm">{type.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label>Minimum CPM: ${preferences.business.minCPM || 0}</Label>
                      <Slider
                        value={[preferences.business.minCPM || 0]}
                        onValueChange={(value) => handleBusinessChange('minCPM', value[0])}
                        max={50}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>$1</span>
                        <span>$50+</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Max Active Campaigns: {preferences.business.maxCampaigns || 0}</Label>
                      <Slider
                        value={[preferences.business.maxCampaigns || 0]}
                        onValueChange={(value) => handleBusinessChange('maxCampaigns', value[0])}
                        max={20}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>1</span>
                        <span>20+</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Preferred Channels</Label>
                      <div className="mt-2 space-y-2">
                        {[
                          { value: 'instagram', label: 'Instagram' },
                          { value: 'youtube', label: 'YouTube' },
                          { value: 'tiktok', label: 'TikTok' },
                          { value: 'twitter', label: 'Twitter' }
                        ].map((channel) => (
                          <label key={channel.value} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={preferences.business.preferredChannels?.includes(channel.value) || false}
                              onChange={(e) => {
                                const currentChannels = preferences.business.preferredChannels || [];
                                const newChannels = e.target.checked
                                  ? [...currentChannels, channel.value]
                                  : currentChannels.filter(c => c !== channel.value);
                                handleBusinessChange('preferredChannels', newChannels);
                              }}
                              className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="text-sm">{channel.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="px-8 py-4 text-lg"
            >
              {isLoading ? (
                'Saving Preferences...'
              ) : (
                <>
                  Complete Setup
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
