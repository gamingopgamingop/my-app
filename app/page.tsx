import Link from 'next/link';
import { Shield, Zap, Lock, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export default async function Home() {
  // Simulate fetching dynamic data (e.g., stats from API)
  const stats = await getStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              <span>Powered by Next.js ISR</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-6">
              Enterprise Security
              <span className="block text-blue-600 mt-2">Made Simple</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Comprehensive vulnerability management platform that helps you identify, 
              track, and resolve security threats across your entire infrastructure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/sign-up"
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/dashboard"
                className="flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-gray-300 transition"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl opacity-30">
            <div className="w-[800px] h-[800px] bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">{stats.vulnerabilitiesScanned}</div>
              <div className="text-sm text-gray-600 mt-2">Vulnerabilities Scanned</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">{stats.activeUsers}</div>
              <div className="text-sm text-gray-600 mt-2">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">{stats.securityIssuesResolved}</div>
              <div className="text-sm text-gray-600 mt-2">Issues Resolved</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">{stats.uptimePercentage}%</div>
              <div className="text-sm text-gray-600 mt-2">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for security teams who demand excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="w-10 h-10 text-blue-600" />}
              title="Real-time Monitoring"
              description="Continuous scanning and monitoring of your infrastructure with instant alerts for critical vulnerabilities."
            />
            <FeatureCard
              icon={<Lock className="w-10 h-10 text-blue-600" />}
              title="Enterprise Security"
              description="Bank-grade encryption and compliance with industry standards including SOC 2, ISO 27001."
            />
            <FeatureCard
              icon={<TrendingUp className="w-10 h-10 text-blue-600" />}
              title="Advanced Analytics"
              description="Deep insights into your security posture with AI-powered risk assessment and predictions."
            />
            <FeatureCard
              icon={<Zap className="w-10 h-10 text-blue-600" />}
              title="Lightning Fast"
              description="Powered by Next.js ISR for blazing fast performance and optimal user experience."
            />
            <FeatureCard
              icon={<CheckCircle className="w-10 h-10 text-blue-600" />}
              title="Easy Integration"
              description="Seamless integration with your existing tools and workflows via our comprehensive API."
            />
            <FeatureCard
              icon={<Shield className="w-10 h-10 text-blue-600" />}
              title="24/7 Support"
              description="Round-the-clock expert support to help you stay protected and resolve issues quickly."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Secure Your Infrastructure?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies protecting their digital assets with our platform.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

async function getStats() {
  // Simulate API call - replace with real data fetching
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    vulnerabilitiesScanned: '2.5M+',
    activeUsers: '10K+',
    securityIssuesResolved: '50K+',
    uptimePercentage: 99.9
  };
}
