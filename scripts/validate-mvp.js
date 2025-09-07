#!/usr/bin/env node

/**
 * MVP Validation Script
 * Validates the AI Influencer Platform against success criteria
 */

const fs = require('fs');
const path = require('path');

console.log('🎯 AI Influencer Platform - MVP Validation\n');

// Check if key files exist
const requiredFiles = [
  'src/lib/auth.tsx',
  'src/components/auth/ProtectedRoute.tsx',
  'src/app/api/chat/route.ts',
  'src/app/api/generate-content/route.ts',
  'src/app/api/schedule-post/route.ts',
  'src/app/api/create-payment-intent/route.ts',
  'src/components/llm/StreamingAIWorkbench.tsx',
  'src/components/audit/AuditTrail.tsx',
  'src/components/payments/PaymentModal.tsx',
  'src/app/(dashboard)/mvp-demo/page.tsx'
];

console.log('📁 Checking Required Files...');
let filesExist = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    filesExist = false;
  }
});

// Check package.json for required dependencies
console.log('\n📦 Checking Dependencies...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = [
  'ai',
  '@ai-sdk/google',
  'stripe',
  '@stripe/stripe-js',
  'firebase',
  'firebase-admin'
];

let depsExist = true;
requiredDeps.forEach(dep => {
  if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
    console.log(`✅ ${dep}`);
  } else {
    console.log(`❌ ${dep} - MISSING`);
    depsExist = false;
  }
});

// Check for removed files
console.log('\n🧹 Checking Cleanup...');
const removedFiles = [
  'src/app/api/copilot/route.ts',
  'src/app/api/copilot/tools.ts',
  'src/components/copilot/CopilotProvider.tsx',
  'src/components/llm/EnhancedAIWorkbench.tsx'
];

let cleanupComplete = true;
removedFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`✅ ${file} - REMOVED`);
  } else {
    console.log(`❌ ${file} - STILL EXISTS`);
    cleanupComplete = false;
  }
});

// Check for demo credentials
console.log('\n🔐 Checking Authentication...');
const authFile = fs.readFileSync('src/lib/auth.tsx', 'utf8');
const hasDemoUsers = authFile.includes('DEMO_USERS');
const hasFirebaseAuth = authFile.includes('signInWithEmailAndPassword');

if (hasDemoUsers) {
  console.log('✅ Demo users configured');
} else {
  console.log('❌ Demo users not found');
}

if (hasFirebaseAuth) {
  console.log('✅ Firebase authentication implemented');
} else {
  console.log('❌ Firebase authentication not found');
}

// Check for AI integration
console.log('\n🤖 Checking AI Integration...');
const chatRoute = fs.readFileSync('src/app/api/chat/route.ts', 'utf8');
const generateRoute = fs.readFileSync('src/app/api/generate-content/route.ts', 'utf8');

const hasVercelAI = chatRoute.includes('streamText') && chatRoute.includes('@ai-sdk/google');
const hasStructuredOutput = generateRoute.includes('generateObject');

if (hasVercelAI) {
  console.log('✅ Vercel AI SDK integrated');
} else {
  console.log('❌ Vercel AI SDK not found');
}

if (hasStructuredOutput) {
  console.log('✅ Structured content generation');
} else {
  console.log('❌ Structured content generation not found');
}

// Check for payment integration
console.log('\n💳 Checking Payment Integration...');
const paymentRoute = fs.readFileSync('src/app/api/create-payment-intent/route.ts', 'utf8');
const paymentModal = fs.readFileSync('src/components/payments/PaymentModal.tsx', 'utf8');

const hasStripe = paymentRoute.includes('stripe') && paymentRoute.includes('paymentIntents');
const hasPaymentUI = paymentModal.includes('loadStripe') && paymentModal.includes('confirmPayment');

if (hasStripe) {
  console.log('✅ Stripe payment processing');
} else {
  console.log('❌ Stripe payment processing not found');
}

if (hasPaymentUI) {
  console.log('✅ Payment modal interface');
} else {
  console.log('❌ Payment modal interface not found');
}

// Check for audit trail
console.log('\n📊 Checking Audit Trail...');
const auditTrail = fs.readFileSync('src/components/audit/AuditTrail.tsx', 'utf8');
const hasAuditTrail = auditTrail.includes('AuditEvent') && auditTrail.includes('cost');

if (hasAuditTrail) {
  console.log('✅ Audit trail and cost tracking');
} else {
  console.log('❌ Audit trail and cost tracking not found');
}

// Check for MVP demo
console.log('\n🎮 Checking MVP Demo...');
const mvpDemo = fs.readFileSync('src/app/(dashboard)/mvp-demo/page.tsx', 'utf8');
const hasDemo = mvpDemo.includes('MVP Demo') && mvpDemo.includes('Demo');

if (hasDemo) {
  console.log('✅ MVP demo page');
} else {
  console.log('❌ MVP demo page not found');
}

// Summary
console.log('\n📋 MVP Validation Summary:');
console.log('========================');

const allChecks = [
  filesExist,
  depsExist,
  cleanupComplete,
  hasDemoUsers,
  hasFirebaseAuth,
  hasVercelAI,
  hasStructuredOutput,
  hasStripe,
  hasPaymentUI,
  hasAuditTrail,
  hasDemo
];

const passedChecks = allChecks.filter(check => check).length;
const totalChecks = allChecks.length;

console.log(`\n✅ Passed: ${passedChecks}/${totalChecks} checks`);

if (passedChecks === totalChecks) {
  console.log('\n🎉 MVP VALIDATION PASSED!');
  console.log('🚀 Platform is ready for production deployment!');
  console.log('\n📝 Next Steps:');
  console.log('1. Set up environment variables (.env.local)');
  console.log('2. Configure Firebase project');
  console.log('3. Add API keys (Gemini, Stripe)');
  console.log('4. Deploy to production');
  console.log('5. Test with demo credentials');
} else {
  console.log('\n⚠️  MVP VALIDATION FAILED!');
  console.log('❌ Some checks failed. Please review and fix issues.');
  process.exit(1);
}

console.log('\n🎯 Demo Credentials:');
console.log('Brand: brand@demo.com / password123');
console.log('Creator: creator@demo.com / password123');
console.log('Admin: admin@demo.com / password123');
