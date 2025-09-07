# Environment Setup Guide

## The Issue
You're encountering a ConnectError because the application is missing essential environment variables, particularly the `GEMINI_API_KEY` required for AI functionality.

## Solution

### 1. Create Environment File
Create a `.env.local` file in your project root with the following variables:

```env
# Firebase Configuration
# Get these values from Firebase Console > Project Settings > Your apps
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id_here

# Google Gemini AI API Key (REQUIRED for AI functionality)
# Get this from Google AI Studio: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Stripe Configuration (for payments)
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here

# Optional: Razorpay Configuration (alternative payment)
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
```

### 2. Get Required API Keys

#### Google Gemini API Key (REQUIRED)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key and add it to your `.env.local` file as `GEMINI_API_KEY`

#### Firebase Configuration (REQUIRED)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Go to Project Settings (gear icon)
4. Scroll down to "Your apps" section
5. Click on your web app or create a new one
6. Copy the config values to your `.env.local` file

### 3. Restart Development Server
After creating the `.env.local` file:
```bash
npm run dev
```

## What This Fixes
- ✅ Resolves ConnectError with AI services
- ✅ Enables Google Gemini AI functionality
- ✅ Fixes authentication issues
- ✅ Allows the application to run properly

## Security Note
- Never commit `.env.local` to version control
- The file is already in `.gitignore`
- Keep your API keys secure and private

## Troubleshooting
If you still encounter issues:
1. Verify all environment variables are set correctly
2. Check that API keys are valid and active
3. Ensure Firebase project is properly configured
4. Restart the development server after making changes
