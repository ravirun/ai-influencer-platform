import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Eye, Users, Target, Calendar, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function NewCampaignPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/campaigns">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Campaigns
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Campaign</h1>
          <p className="text-gray-600">Set up a new influencer marketing campaign</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="campaignName">Campaign Name</Label>
                  <Input 
                    id="campaignName" 
                    placeholder="e.g., Summer Fashion Collection 2024"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your campaign goals, target audience, and key messaging..."
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Budget & Goals */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget & Goals</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budget">Total Budget</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="budget" 
                        type="number" 
                        placeholder="10000"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="targetReach">Target Reach</Label>
                    <Input 
                      id="targetReach" 
                      type="number" 
                      placeholder="100000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="targetEngagement">Target Engagement Rate (%)</Label>
                    <Input 
                      id="targetEngagement" 
                      type="number" 
                      placeholder="8.5"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetClicks">Target Clicks</Label>
                    <Input 
                      id="targetClicks" 
                      type="number" 
                      placeholder="5000"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Target Audience */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Target Audience</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ageRange">Age Range</Label>
                    <Input 
                      id="ageRange" 
                      placeholder="18-35"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select Gender</option>
                      <option value="all">All</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="non-binary">Non-binary</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="interests">Interests</Label>
                  <Input 
                    id="interests" 
                    placeholder="fashion, lifestyle, beauty, technology"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="United States, Canada, United Kingdom"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Content Requirements */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Requirements</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contentType">Content Type</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Instagram Post', 'Instagram Story', 'TikTok Video', 'YouTube Video', 'Blog Post'].map((type) => (
                      <Badge key={type} variant="outline" className="cursor-pointer hover:bg-blue-50">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="hashtags">Required Hashtags</Label>
                  <Input 
                    id="hashtags" 
                    placeholder="#summerfashion #style #trending"
                  />
                </div>
                <div>
                  <Label htmlFor="brandMentions">Brand Mentions</Label>
                  <Input 
                    id="brandMentions" 
                    placeholder="@yourbrand @partnerbrand"
                  />
                </div>
                <div>
                  <Label htmlFor="contentGuidelines">Content Guidelines</Label>
                  <Textarea 
                    id="contentGuidelines" 
                    placeholder="Specify any specific requirements, do's and don'ts, brand voice guidelines..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Campaign Preview */}
          <Card>
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Campaign Preview</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Status: Draft</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Influencers: 0 selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Reach: 0</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Duration: 0 days</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Find Influencers
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Target className="h-4 w-4 mr-2" />
                  Set Targeting
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Posts
                </Button>
              </div>
            </div>
          </Card>

          {/* Save Actions */}
          <Card>
            <div className="p-6">
              <div className="space-y-3">
                <Button className="w-full flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save as Draft
                </Button>
                <Button className="w-full" variant="outline">
                  Preview Campaign
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
