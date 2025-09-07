'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Camera,
  CheckCircle,
  ArrowRight,
  Shield
} from 'lucide-react';
import { Role } from '@/lib/types';
import { cn } from '@/lib/utils';

interface RoleSelectionProps {
  onRoleSelect: (role: Role) => void;
  isLoading?: boolean;
}

export default function RoleSelection({ onRoleSelect, isLoading = false }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const roles = [
    {
      id: 'brand' as Role,
      title: 'Brand Manager',
      subtitle: 'I manage campaigns and work with creators',
      icon: Building2,
      color: 'blue',
      features: [
        'Create and manage influencer campaigns',
        'Access AI-powered content generation',
        'Connect with verified creators',
        'Track campaign performance',
        'Manage budgets and payments'
      ],
      stats: 'Join 10,000+ brands',
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100'
    },
    {
      id: 'creator' as Role,
      title: 'Content Creator',
      subtitle: 'I create content and work with brands',
      icon: Camera,
      color: 'green',
      features: [
        'Discover brand collaboration opportunities',
        'Showcase your content portfolio',
        'Access AI content tools',
        'Manage your creator profile',
        'Track earnings and analytics'
      ],
      stats: 'Join 50,000+ creators',
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100'
    },
    {
      id: 'admin' as Role,
      title: 'Platform Administrator',
      subtitle: 'I manage the platform and oversee operations',
      icon: Shield,
      color: 'red',
      features: [
        'Manage all users and roles',
        'Oversee platform operations',
        'Access system analytics',
        'Configure platform settings',
        'Monitor security and compliance'
      ],
      stats: 'Platform administrators',
      gradient: 'from-red-500 to-red-600',
      bgGradient: 'from-red-50 to-red-100'
    }
  ];

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">Inspire AI</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose your role to get started
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us about yourself so we can personalize your experience and show you the most relevant features
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <Card 
                key={role.id}
                className={cn(
                  'relative p-8 cursor-pointer transition-all duration-300 hover:shadow-lg',
                  isSelected 
                    ? 'ring-2 ring-blue-500 shadow-lg scale-105' 
                    : 'hover:shadow-md'
                )}
                onClick={() => setSelectedRole(role.id)}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                )}

                {/* Role Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={cn(
                    'p-4 rounded-xl',
                    isSelected 
                      ? `bg-gradient-to-r ${role.gradient} text-white` 
                      : `bg-gradient-to-r ${role.bgGradient} text-${role.color}-600`
                  )}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{role.title}</h3>
                    <p className="text-gray-600">{role.subtitle}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={cn(
                        'p-1 rounded-full',
                        isSelected 
                          ? 'bg-blue-100' 
                          : `bg-${role.color}-100`
                      )}>
                        <CheckCircle className={cn(
                          'h-4 w-4',
                          isSelected 
                            ? 'text-blue-600' 
                            : `text-${role.color}-600`
                        )} />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      isSelected 
                        ? 'border-blue-500 text-blue-600' 
                        : `border-${role.color}-500 text-${role.color}-600`
                    )}
                  >
                    {role.stats}
                  </Badge>
                  
                  {isSelected && (
                    <div className="flex items-center gap-2 text-blue-600 font-medium">
                      <span>Selected</span>
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedRole || isLoading}
            size="lg"
            className="px-8 py-4 text-lg"
          >
            {isLoading ? (
              'Setting up your account...'
            ) : (
              <>
                Continue to Onboarding
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
          
          {!selectedRole && (
            <p className="text-sm text-gray-500 mt-3">
              Please select a role to continue
            </p>
          )}
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            You can change your role later in your account settings
          </p>
        </div>
      </div>
    </div>
  );
}
