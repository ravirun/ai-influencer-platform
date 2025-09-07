# ✨ Inspire AI - AI Influencer Platform

**Inspire Your Audience with AI-Powered Content**

A comprehensive platform for AI-powered influencer marketing, built with Next.js, Firebase, and Google Gemini AI. Generate engaging content, manage campaigns, and scale your influence with the power of artificial intelligence.

## 🚀 Features

### Core Features
- **AI Content Generation**: Generate engaging captions, scripts, and social media content using Google Gemini
- **LLM Workbench**: Interactive interface for prompt engineering and content refinement
- **Campaign Management**: Create, manage, and track influencer marketing campaigns
- **Role-Based Access**: Support for Brands, Creators, and Admin users
- **Real-time Analytics**: Track engagement, reach, and ROI metrics
- **Content Scheduling**: Schedule posts across multiple social media platforms

### AI-Powered Tools
- **Smart Prompt Builder**: Drag-and-drop interface for creating AI prompts
- **Context Chips**: Add brand guidelines, product info, and examples for better AI output
- **Tone Sliders**: Fine-tune content tone, emoji usage, and call-to-action strength
- **Variant Generation**: Generate multiple content options with scoring and safety checks
- **Brand Safety**: Built-in moderation and compliance checking

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Backend**: Firebase (Auth, Firestore, Storage, Functions)
- **AI**: Google Gemini 1.5 Pro
- **Payments**: Stripe, Razorpay
- **Social APIs**: Meta Graph API, YouTube Data API
- **State Management**: Zustand, React Query

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Dashboard layout and pages
│   ├── api/               # API routes
│   ├── login/             # Authentication pages
│   └── page.tsx           # Landing page
├── components/
│   ├── llm/               # LLM Workbench components
│   ├── controls/          # UI controls (sliders, etc.)
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── types.ts           # TypeScript interfaces
│   ├── firebase.ts        # Firebase client config
│   ├── firebase-admin.ts  # Firebase admin config
│   └── gemini.ts          # Gemini AI service
└── services/              # Business logic services
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Firebase project
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inspire-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Firebase Admin
   FIREBASE_ADMIN_PROJECT_ID=your_project_id
   FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email
   FIREBASE_ADMIN_PRIVATE_KEY=your_private_key

   # AI Services
   GEMINI_API_KEY=your_gemini_api_key

   # Payment Gateways
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

4. **Set up Firebase**
   ```bash
   # Install Firebase CLI
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   
   # Initialize Firebase
   firebase init
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Firebase Setup

1. Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication, Firestore, and Storage
3. Download your service account key and add it to environment variables
4. Set up Firestore security rules (see `firestore.rules`)

### Gemini API Setup

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add the key to your environment variables
3. The app will automatically use Gemini 1.5 Pro for content generation

### Social Media APIs

1. **Meta (Instagram/Facebook)**:
   - Create a Meta App at [developers.facebook.com](https://developers.facebook.com)
   - Add your App ID and Secret to environment variables

2. **YouTube**:
   - Create a project in [Google Cloud Console](https://console.cloud.google.com)
   - Enable YouTube Data API v3
   - Create OAuth 2.0 credentials

## 📊 Database Schema

### Core Collections

- **users**: User profiles with role-based access
- **campaigns**: Marketing campaigns and briefs
- **assets**: Generated content (captions, images, videos)
- **schedules**: Post scheduling information
- **posts**: Published content with analytics
- **personas**: AI influencer personas and traits

### Example Document Structure

```typescript
// User Document
{
  role: 'brand' | 'creator' | 'admin',
  displayName: string,
  email: string,
  brandId?: string,
  creatorProfile?: {
    niches: string[],
    languages: string[],
    minCPM?: number
  }
}

// Campaign Document
{
  brandId: string,
  name: string,
  brief: string,
  target: string,
  channels: ('instagram' | 'youtube' | 'tiktok')[],
  status: 'draft' | 'live' | 'paused' | 'done',
  kpis?: {
    impressionsGoal?: number,
    ctrGoal?: number
  }
}
```

## 🎯 Usage

### For Brands

1. **Create Campaign**: Set up campaign brief, target audience, and goals
2. **Generate Content**: Use AI Workbench to create engaging content
3. **Review & Approve**: Review AI-generated variants and approve the best ones
4. **Schedule Posts**: Set up posting schedule across social platforms
5. **Track Performance**: Monitor engagement and ROI through analytics

### For Creators

1. **Join Campaigns**: Accept brand invitations to participate in campaigns
2. **Customize Content**: Use AI tools to personalize content for your audience
3. **Schedule Posts**: Plan your content calendar with optimal posting times
4. **Track Growth**: Monitor your performance and audience engagement

### For Admins

1. **Manage Users**: Assign roles and manage user permissions
2. **Monitor Platform**: Track system usage and performance
3. **Configure AI**: Set up prompt templates and safety guidelines
4. **Analytics**: View platform-wide metrics and insights

## 🔒 Security

- **Authentication**: Firebase Auth with role-based access control
- **Authorization**: Firestore security rules prevent unauthorized access
- **Content Moderation**: Built-in safety checks and brand compliance
- **API Security**: Rate limiting and input validation
- **Data Privacy**: GDPR-compliant data handling

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Firebase Hosting

```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy
```

## 📈 Performance

- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Bundle Size**: Code splitting and lazy loading
- **Caching**: React Query for efficient data fetching
- **CDN**: Static assets served via Vercel Edge Network

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs and request features via GitHub Issues
- **Discord**: Join our community Discord for real-time support
- **Email**: Contact us at support@inspireai.com

## 🗺 Roadmap

### Phase 1 (Current)
- ✅ Core AI Workbench
- ✅ Basic campaign management
- ✅ User authentication
- ✅ Content generation

### Phase 2 (Next)
- 🔄 Advanced analytics
- 🔄 Video content generation
- 🔄 Multi-language support
- 🔄 API integrations

### Phase 3 (Future)
- 📅 AI influencer avatars
- 📅 AR/VR content
- 📅 Advanced automation
- 📅 Marketplace features

---

Built with ❤️ by the Inspire AI team