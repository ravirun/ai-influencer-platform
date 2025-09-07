# Google Authentication Setup Guide

## Firebase Configuration

Your app is now configured to use **Google Authentication only**. Here's how to set it up:

### 1. Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Enable Authentication:
   - Go to **Authentication** > **Sign-in method**
   - Enable **Google** provider
   - Add your domain to authorized domains

### 2. Environment Variables

Create a `.env.local` file in your project root with these variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id_here
```

### 3. Get Firebase Config Values

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click on your web app or create a new one
4. Copy the config values to your `.env.local` file

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Go to **APIs & Services** > **Credentials**
4. Create OAuth 2.0 Client ID if not exists
5. Add authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)

## What's Been Cleaned Up

✅ **Removed email/password authentication**
✅ **Removed signup form** (redirects to login)
✅ **Simplified login page** (Google only)
✅ **Updated auth provider** (Google sign-in only)
✅ **Removed demo credentials** (no longer needed)

## Usage

1. Users visit `/login`
2. Click "Continue with Google"
3. Complete Google OAuth flow
4. Redirected to onboarding or dashboard

The authentication is now clean and simple - just Google login!
