'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Building2, 
  Camera, 
  Globe, 
  Plus, 
  X,
  ArrowRight,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { Role } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProfileSetupProps {
  role: Role;
  onComplete: () => void;
}

export default function ProfileSetup({ role, onComplete }: ProfileSetupProps) {
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    company: '',
    website: '',
    location: '',
    socialHandles: {
      instagram: '',
      youtube: '',
      tiktok: '',
      twitter: ''
    },
    niches: [] as string[],
    languages: [] as string[],
    profileImage: null as File | null
  });

  const [newNiche, setNewNiche] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const availableNiches = [
    'Fashion & Beauty', 'Technology', 'Food & Cooking', 'Travel', 'Fitness & Wellness',
    'Gaming', 'Lifestyle', 'Business', 'Education', 'Entertainment', 'Sports',
    'Art & Design', 'Music', 'Photography', 'Parenting', 'Finance'
  ];

  const availableLanguages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Russian'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialHandleChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialHandles: {
        ...prev.socialHandles,
        [platform]: value
      }
    }));
  };

  const addNiche = () => {
    if (newNiche.trim() && !formData.niches.includes(newNiche.trim())) {
      setFormData(prev => ({
        ...prev,
        niches: [...prev.niches, newNiche.trim()]
      }));
      setNewNiche('');
    }
  };

  const removeNiche = (niche: string) => {
    setFormData(prev => ({
      ...prev,
      niches: prev.niches.filter(n => n !== niche)
    }));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== language)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Here you would typically save the profile data to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      onComplete();
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return formData.displayName.trim() && 
           formData.bio.trim() && 
           (role === 'brand' ? formData.company.trim() : formData.niches.length > 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              {role === 'brand' ? (
                <Building2 className="h-8 w-8 text-blue-600" />
              ) : (
                <Camera className="h-8 w-8 text-blue-600" />
              )}
            </div>
            <span className="text-3xl font-bold text-gray-900">Inspire AI</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Set up your {role === 'brand' ? 'brand' : 'creator'} profile
          </h1>
          <p className="text-lg text-gray-600">
            Tell us about yourself so we can personalize your experience
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Image */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Profile Picture</h3>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                    {formData.profileImage ? (
                      <img 
                        src={URL.createObjectURL(formData.profileImage)} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      id="profile-image"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="profile-image"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Photo
                    </label>
                    <p className="text-sm text-gray-500 mt-1">
                      JPG, PNG up to 5MB
                    </p>
                  </div>
                </div>
              </Card>

              {/* Basic Information */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="displayName">Display Name *</Label>
                    <Input
                      id="displayName"
                      value={formData.displayName}
                      onChange={(e) => handleInputChange('displayName', e.target.value)}
                      placeholder="Enter your display name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio *</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder={role === 'brand' 
                        ? "Tell us about your brand and what makes it unique..."
                        : "Tell us about yourself and your content..."
                      }
                      rows={4}
                      required
                    />
                  </div>

                  {role === 'brand' && (
                    <div>
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Enter your company name"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://yourwebsite.com"
                      type="url"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </Card>

              {/* Social Media Handles */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Social Media Handles</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(formData.socialHandles).map(([platform, handle]) => (
                    <div key={platform}>
                      <Label htmlFor={platform} className="capitalize">
                        {platform === 'youtube' ? 'YouTube' : platform}
                      </Label>
                      <Input
                        id={platform}
                        value={handle}
                        onChange={(e) => handleSocialHandleChange(platform, e.target.value)}
                        placeholder={`@${platform}handle`}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column - Preferences */}
            <div className="space-y-6">
              {/* Niches/Interests */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {role === 'brand' ? 'Industry Vertical' : 'Content Niches'}
                </h3>
                
                {/* Selected Niches */}
                {formData.niches.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {formData.niches.map((niche) => (
                        <Badge key={niche} variant="secondary" className="flex items-center gap-1">
                          {niche}
                          <button
                            type="button"
                            onClick={() => removeNiche(niche)}
                            className="ml-1 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add New Niche */}
                <div className="flex gap-2 mb-4">
                  <Input
                    value={newNiche}
                    onChange={(e) => setNewNiche(e.target.value)}
                    placeholder="Add a niche..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNiche())}
                  />
                  <Button type="button" onClick={addNiche} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Available Niches */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Popular options:</p>
                  <div className="flex flex-wrap gap-2">
                    {availableNiches.slice(0, 8).map((niche) => (
                      <button
                        key={niche}
                        type="button"
                        onClick={() => {
                          if (!formData.niches.includes(niche)) {
                            setFormData(prev => ({
                              ...prev,
                              niches: [...prev.niches, niche]
                            }));
                          }
                        }}
                        disabled={formData.niches.includes(niche)}
                        className={cn(
                          "px-3 py-1 text-sm rounded-full border transition-colors",
                          formData.niches.includes(niche)
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                        )}
                      >
                        {niche}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Languages */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Languages</h3>
                
                {/* Selected Languages */}
                {formData.languages.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {formData.languages.map((language) => (
                        <Badge key={language} variant="secondary" className="flex items-center gap-1">
                          {language}
                          <button
                            type="button"
                            onClick={() => removeLanguage(language)}
                            className="ml-1 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add New Language */}
                <div className="flex gap-2 mb-4">
                  <Input
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="Add a language..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                  />
                  <Button type="button" onClick={addLanguage} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Available Languages */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Popular languages:</p>
                  <div className="flex flex-wrap gap-2">
                    {availableLanguages.slice(0, 6).map((language) => (
                      <button
                        key={language}
                        type="button"
                        onClick={() => {
                          if (!formData.languages.includes(language)) {
                            setFormData(prev => ({
                              ...prev,
                              languages: [...prev.languages, language]
                            }));
                          }
                        }}
                        disabled={formData.languages.includes(language)}
                        className={cn(
                          "px-3 py-1 text-sm rounded-full border transition-colors",
                          formData.languages.includes(language)
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                        )}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <Button
              type="submit"
              disabled={!isFormValid() || isLoading}
              size="lg"
              className="px-8 py-4 text-lg"
            >
              {isLoading ? (
                'Saving Profile...'
              ) : (
                <>
                  Continue to Preferences
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
