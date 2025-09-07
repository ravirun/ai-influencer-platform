# Demo Setup Guide

## Quick Demo Instructions

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Access the Application
- Open [http://localhost:3000](http://localhost:3000)
- You'll see the landing page with the AI Influencer Platform

### 3. Demo the AI Workbench
- Click "Get Started" or navigate to `/workbench`
- You'll see the AI Workbench interface with:
  - **Prompt Blocks**: System, User, Tool, and Guard blocks
  - **Context Chips**: Brand guidelines and examples
  - **Tone Sliders**: Adjust tone, emoji usage, and CTA strength
  - **Generate Button**: Creates AI-powered content variants

### 4. Test Content Generation
1. **Modify the prompt blocks** in the Compose tab
2. **Adjust tone settings** using the sliders
3. **Click "Generate Variants"** to see AI-generated content
4. **Review variants** with scores, safety checks, and cost estimates
5. **Approve or schedule** content directly from the interface

### 5. Explore the Dashboard
- Navigate to `/dashboard` to see:
  - **Stats Overview**: Campaign metrics and performance
  - **Recent Campaigns**: Active and completed campaigns
  - **Top Posts**: Best performing content
  - **Quick Actions**: Fast access to key features

## Demo Features to Highlight

### 🎯 AI Workbench
- **Interactive Prompt Builder**: Drag-and-drop interface for creating AI prompts
- **Real-time Generation**: See content variants appear as they're generated
- **Smart Scoring**: AI evaluates content quality and brand fit
- **Safety Checks**: Built-in moderation and compliance checking
- **Cost Tracking**: Real-time cost estimation for AI operations

### 📊 Dashboard Analytics
- **Performance Metrics**: Track engagement, reach, and ROI
- **Campaign Overview**: Visual progress tracking
- **Content Performance**: Top-performing posts and insights
- **Quick Actions**: Streamlined workflow for common tasks

### 🎨 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Automatic theme switching
- **Keyboard Shortcuts**: Power user features (⌘K for command palette)
- **Real-time Updates**: Live data synchronization

## Demo Script

### Opening (30 seconds)
"Welcome to the AI-Powered Influencer Platform. This is a comprehensive solution for brands and creators to scale their influencer marketing with AI."

### Core Demo (2-3 minutes)
1. **Show Landing Page**: "Clean, modern interface designed for both brands and creators"
2. **Navigate to Workbench**: "This is our AI Workbench - the heart of content generation"
3. **Demonstrate Prompt Building**: "You can build complex prompts using these blocks"
4. **Show Tone Controls**: "Fine-tune content style with these intuitive sliders"
5. **Generate Content**: "Watch as AI creates multiple variants with scoring"
6. **Review Results**: "Each variant includes safety checks, cost estimates, and quality scores"

### Dashboard Tour (1-2 minutes)
1. **Show Overview**: "Real-time metrics and campaign performance"
2. **Highlight Quick Actions**: "Streamlined workflow for common tasks"
3. **Show Analytics**: "Detailed insights into content performance"

### Technical Highlights (1 minute)
- **Next.js 14**: Latest React framework with App Router
- **Firebase**: Scalable backend with real-time updates
- **Gemini AI**: Google's most advanced language model
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Modern, responsive design

## Key Talking Points

### For Brands
- "Reduce content creation time by 80%"
- "Generate brand-safe content at scale"
- "Track ROI with detailed analytics"
- "Manage multiple creators from one dashboard"

### For Creators
- "AI-powered content suggestions"
- "Streamlined campaign management"
- "Performance insights and growth tracking"
- "Easy collaboration with brands"

### Technical Benefits
- "Built for scale with Firebase"
- "Real-time collaboration features"
- "Advanced AI with safety guardrails"
- "Modern, responsive interface"

## Troubleshooting

### Common Issues
1. **Port 3000 in use**: Try `npm run dev -- -p 3001`
2. **Environment variables**: Make sure `.env.local` is properly configured
3. **Firebase connection**: Verify your Firebase project settings
4. **Gemini API**: Ensure your API key is valid and has quota

### Demo Tips
- **Keep it interactive**: Let the audience suggest prompts or settings
- **Show real results**: Use actual brand examples if possible
- **Highlight speed**: Emphasize how quickly content is generated
- **Address concerns**: Be ready to discuss AI safety and brand compliance

## Next Steps

After the demo, you can:
1. **Set up Firebase**: Follow the README for full configuration
2. **Add your API keys**: Configure Gemini, Stripe, and social media APIs
3. **Customize branding**: Update colors, logos, and content
4. **Deploy to production**: Use Vercel or Firebase Hosting

---

**Ready to demo?** Start with `npm run dev` and navigate to the workbench!
