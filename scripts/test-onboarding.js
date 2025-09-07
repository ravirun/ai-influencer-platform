#!/usr/bin/env node

/**
 * Test script for onboarding flow
 * This script validates that the onboarding flow components are properly set up
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Onboarding Flow Setup...\n');

// Test 1: Check if all onboarding components exist
const onboardingComponents = [
  'src/components/onboarding/RoleSelection.tsx',
  'src/components/onboarding/ProfileSetup.tsx',
  'src/components/onboarding/PreferencesSetup.tsx',
  'src/components/onboarding/DemoCampaignSetup.tsx',
  'src/components/onboarding/OnboardingComplete.tsx',
  'src/components/onboarding/GuidedTour.tsx'
];

console.log('📁 Checking onboarding components...');
onboardingComponents.forEach(component => {
  const filePath = path.join(process.cwd(), component);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${component}`);
  } else {
    console.log(`❌ ${component} - Missing`);
  }
});

// Test 2: Check if API endpoint exists
console.log('\n🔌 Checking API endpoints...');
const apiEndpoints = [
  'src/app/api/create-demo-campaign/route.ts'
];

apiEndpoints.forEach(endpoint => {
  const filePath = path.join(process.cwd(), endpoint);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${endpoint}`);
  } else {
    console.log(`❌ ${endpoint} - Missing`);
  }
});

// Test 3: Check if demo campaign page exists
console.log('\n📄 Checking demo campaign page...');
const demoPagePath = path.join(process.cwd(), 'src/app/(dashboard)/demo-campaign/page.tsx');
if (fs.existsSync(demoPagePath)) {
  console.log('✅ Demo campaign page exists');
} else {
  console.log('❌ Demo campaign page - Missing');
}

// Test 4: Check onboarding page structure
console.log('\n📋 Checking onboarding page structure...');
const onboardingPagePath = path.join(process.cwd(), 'src/app/onboarding/page.tsx');
if (fs.existsSync(onboardingPagePath)) {
  const content = fs.readFileSync(onboardingPagePath, 'utf8');
  
  // Check for demo step
  if (content.includes("'demo'")) {
    console.log('✅ Demo step included in onboarding flow');
  } else {
    console.log('❌ Demo step missing from onboarding flow');
  }
  
  // Check for DemoCampaignSetup import
  if (content.includes('DemoCampaignSetup')) {
    console.log('✅ DemoCampaignSetup component imported');
  } else {
    console.log('❌ DemoCampaignSetup component not imported');
  }
  
  // Check for 5 steps
  if (content.includes('of 5')) {
    console.log('✅ Onboarding flow updated to 5 steps');
  } else {
    console.log('❌ Onboarding flow still has 4 steps');
  }
} else {
  console.log('❌ Onboarding page - Missing');
}

// Test 5: Check dashboard integration
console.log('\n🏠 Checking dashboard integration...');
const dashboardPath = path.join(process.cwd(), 'src/components/dashboard/RoleBasedDashboard.tsx');
if (fs.existsSync(dashboardPath)) {
  const content = fs.readFileSync(dashboardPath, 'utf8');
  
  if (content.includes('Demo Campaign')) {
    console.log('✅ Demo campaign quick action added to dashboard');
  } else {
    console.log('❌ Demo campaign quick action missing from dashboard');
  }
} else {
  console.log('❌ Dashboard component - Missing');
}

// Test 6: Check RBAC configuration
console.log('\n🔐 Checking RBAC configuration...');
const rbacPath = path.join(process.cwd(), 'src/lib/rbac.ts');
if (fs.existsSync(rbacPath)) {
  const content = fs.readFileSync(rbacPath, 'utf8');
  
  if (content.includes('demo-campaign')) {
    console.log('✅ Demo campaign widget added to RBAC');
  } else {
    console.log('❌ Demo campaign widget missing from RBAC');
  }
} else {
  console.log('❌ RBAC configuration - Missing');
}

console.log('\n🎉 Onboarding flow test completed!');
console.log('\n📝 Next steps:');
console.log('1. Start the development server: npm run dev');
console.log('2. Navigate to /onboarding to test the flow');
console.log('3. Complete the onboarding process');
console.log('4. Check that demo campaign is created');
console.log('5. Verify demo campaign page works');
console.log('6. Test dashboard integration');
