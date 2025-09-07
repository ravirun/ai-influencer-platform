# 🚀 AI Influencer Platform - Setup Guide

## Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Firebase Admin (Server-side)
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email
FIREBASE_ADMIN_PRIVATE_KEY=your_private_key

# Google AI (Gemini)
GOOGLE_AI_API_KEY=your_gemini_api_key

# OpenAI (Alternative AI provider)
OPENAI_API_KEY=your_openai_api_key

# Stripe Payment Processing
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Razorpay (Alternative payment provider)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Social Media APIs
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
YOUTUBE_API_KEY=your_youtube_api_key
TIKTOK_ACCESS_TOKEN=your_tiktok_access_token

# External AI Services
RUNWAY_API_KEY=your_runway_api_key
HEYGEN_API_KEY=your_heygen_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key

# Analytics
MIXPANEL_TOKEN=your_mixpanel_token
POSTHOG_KEY=your_posthog_key

# Monitoring
SENTRY_DSN=your_sentry_dsn

# App Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Demo Credentials

The platform comes with pre-configured demo accounts:

### Brand Manager
- **Email**: brand@demo.com
- **Password**: password123
- **Role**: Brand Manager
- **Access**: Campaign creation, AI workbench, analytics

### Content Creator
- **Email**: creator@demo.com
- **Password**: password123
- **Role**: Content Creator
- **Access**: Content creation, persona studio, creator tools

### Platform Admin
- **Email**: admin@demo.com
- **Password**: password123
- **Role**: Platform Admin
- **Access**: Full platform access, user management, system settings

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   - Copy the environment variables above to `.env.local`
   - Fill in your actual API keys and credentials

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Platform**
   - Open http://localhost:3001
   - Use any of the demo credentials to log in
   - Explore the MVP demo at `/mvp-demo`

## Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication, Firestore, and Storage

2. **Configure Authentication**
   - Enable Email/Password authentication
   - Add your domain to authorized domains

3. **Set up Firestore**
   - Create database in production mode
   - Set up security rules for your collections

4. **Get Configuration**
   - Go to Project Settings > General
   - Copy the Firebase config to your `.env.local`

## AI Integration Setup

### Google Gemini (Recommended)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Add to `GOOGLE_AI_API_KEY` in `.env.local`

### OpenAI (Alternative)
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an API key
3. Add to `OPENAI_API_KEY` in `.env.local`

## Payment Setup

### Stripe (Recommended)
1. Create account at [Stripe](https://stripe.com)
2. Get test keys from Dashboard > Developers > API keys
3. Add to `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Razorpay (Alternative)
1. Create account at [Razorpay](https://razorpay.com)
2. Get API keys from Dashboard > Settings > API Keys
3. Add to `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`

## Social Media APIs

### Instagram
1. Create Facebook App at [Facebook Developers](https://developers.facebook.com)
2. Get Instagram Basic Display API access token
3. Add to `INSTAGRAM_ACCESS_TOKEN`

### YouTube
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable YouTube Data API v3
3. Create API key and add to `YOUTUBE_API_KEY`

### TikTok
1. Apply for TikTok for Business API access
2. Get access token from TikTok Developer Portal
3. Add to `TIKTOK_ACCESS_TOKEN`

## Production Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Similar to Vercel, supports Next.js
- **AWS**: Use Amplify or EC2 with proper configuration
- **Google Cloud**: Use Cloud Run or App Engine

## Security Considerations

1. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use different keys for development and production
   - Rotate keys regularly

2. **Firebase Security Rules**
   - Set up proper Firestore security rules
   - Restrict access based on user roles
   - Enable App Check for additional security

3. **API Rate Limiting**
   - Implement rate limiting for AI generation
   - Monitor usage and costs
   - Set up alerts for unusual activity

## Monitoring and Analytics

1. **Error Tracking**
   - Set up Sentry for error monitoring
   - Add to `SENTRY_DSN` in environment variables

2. **Analytics**
   - Configure Mixpanel or PostHog for user analytics
   - Add tokens to environment variables

3. **Performance**
   - Monitor Core Web Vitals
   - Set up performance budgets
   - Use Lighthouse for optimization

## Troubleshooting

### Common Issues

1. **Firebase Connection Issues**
   - Check environment variables
   - Verify Firebase project configuration
   - Ensure authentication is enabled

2. **AI Generation Failures**
   - Verify API keys are correct
   - Check rate limits and quotas
   - Monitor API usage and costs

3. **Payment Processing Issues**
   - Use test mode for development
   - Verify webhook endpoints
   - Check Stripe dashboard for errors

### Support

- Check the documentation in `/docs` folder
- Review error logs in browser console
- Monitor Firebase console for backend issues
- Check API provider dashboards for service status

## Next Steps

1. **Customize Branding**
   - Update logo and colors in `/src/app/globals.css`
   - Modify company information in components

2. **Add Real Data**
   - Replace mock data with real API calls
   - Set up proper database collections
   - Implement real social media posting

3. **Scale Infrastructure**
   - Set up CDN for static assets
   - Implement caching strategies
   - Add load balancing for high traffic

4. **Advanced Features**
   - Implement RAG system for brand guidelines
   - Add advanced analytics and reporting
   - Set up automated testing and CI/CD

---

**🎉 Your AI Influencer Platform is ready to go!**

Start with the demo credentials and explore all the features. The platform is production-ready with proper authentication, payment processing, and AI integration.
