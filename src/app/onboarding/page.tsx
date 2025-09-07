'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { 
  RoleSelection, 
  ProfileSetup, 
  PreferencesSetup, 
  DemoCampaignSetup,
  OnboardingComplete 
} from '@/components/onboarding';
import { Role } from '@/lib/types';

type OnboardingStep = 'role' | 'profile' | 'preferences' | 'demo' | 'complete';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('role');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, userRole, userDoc, updateUserRole, completeOnboarding } = useAuth();
  const router = useRouter();

  // Redirect if user is already authenticated and onboarded
  useEffect(() => {
    if (user && userDoc?.onboardingCompleted) {
      router.push('/dashboard');
    }
  }, [user, userDoc, router]);

  const handleRoleSelect = async (role: Role) => {
    setSelectedRole(role);
    setIsLoading(true);
    
    try {
      // Update user role in auth system
      await updateUserRole(role);
      
      setCurrentStep('profile');
    } catch (error) {
      console.error('Error saving role:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileComplete = () => {
    setCurrentStep('preferences');
  };

  const handlePreferencesComplete = () => {
    setCurrentStep('demo');
  };

  const handleDemoComplete = () => {
    setCurrentStep('complete');
  };

  const handleOnboardingComplete = async () => {
    try {
      // Mark onboarding as completed
      await completeOnboarding();
      router.push('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'role':
        return (
          <RoleSelection 
            onRoleSelect={handleRoleSelect}
            isLoading={isLoading}
          />
        );
      case 'profile':
        return (
          <ProfileSetup 
            role={selectedRole!}
            onComplete={handleProfileComplete}
          />
        );
      case 'preferences':
        return (
          <PreferencesSetup 
            role={selectedRole!}
            onComplete={handlePreferencesComplete}
          />
        );
      case 'demo':
        return (
          <DemoCampaignSetup 
            role={selectedRole!}
            onComplete={handleDemoComplete}
          />
        );
      case 'complete':
        return (
          <OnboardingComplete 
            role={selectedRole!}
            onComplete={handleOnboardingComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {['role', 'profile', 'preferences', 'demo', 'complete'].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep === step 
                          ? 'bg-blue-600 text-white' 
                          : ['role', 'profile', 'preferences', 'demo', 'complete'].indexOf(currentStep) > index
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < 4 && (
                      <div 
                        className={`w-12 h-1 mx-2 ${
                          ['role', 'profile', 'preferences', 'demo', 'complete'].indexOf(currentStep) > index
                            ? 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              Step {['role', 'profile', 'preferences', 'demo', 'complete'].indexOf(currentStep) + 1} of 5
            </div>
          </div>
        </div>
      </div>

      {/* Step Content */}
      {renderCurrentStep()}
    </div>
  );
}
