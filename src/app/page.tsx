import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Sparkles, 
  Users, 
  TrendingUp, 
  Zap,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-xl font-bold text-gray-900">Inspire AI</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Inspire Your Audience with
            <span className="text-blue-600"> AI-Powered Content</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Generate engaging content, manage campaigns, and scale your influencer marketing 
            with the power of AI. Perfect for brands and creators who want to maximize impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="px-8 py-3">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" size="lg" className="px-8 py-3">
                Create Account
              </Button>
            </Link>
          </div>
          
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-lg text-gray-600">
            Powerful AI tools designed for modern influencer marketing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              AI Content Generation
            </h3>
            <p className="text-gray-600">
              Generate engaging captions, scripts, and social media content 
              tailored to your brand voice and audience.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Creator Management
            </h3>
            <p className="text-gray-600">
              Onboard creators, manage campaigns, and track performance 
              all from one unified dashboard.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Analytics & Insights
            </h3>
            <p className="text-gray-600">
              Track engagement, measure ROI, and optimize campaigns 
              with detailed analytics and reporting.
            </p>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-600">
              Get started in minutes with our simple 3-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Set Up Your Campaign
              </h3>
              <p className="text-gray-600">
                Define your brand brief, target audience, and campaign goals. 
                Our AI will understand your requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Generate Content
              </h3>
              <p className="text-gray-600">
                AI creates multiple content variants tailored to your brand voice. 
                Review, approve, and customize as needed.
              </p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Launch & Track
              </h3>
              <p className="text-gray-600">
                Schedule posts, launch campaigns, and track performance 
                with real-time analytics and insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="p-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to transform your influencer marketing?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of brands and creators already using AI to scale their impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
                Create Account
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Sparkles className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Inspire AI</span>
            </div>
            <p className="text-gray-600">
              © 2024 Inspire AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}