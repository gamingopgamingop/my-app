import Link from 'next/link'
import { Shield, Lock, Activity, CheckCircle } from 'lucide-react'

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  // Fetch any dynamic data
  const stats = await getMarketingStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Automated Security Auditing
            <br />
            <span className="text-blue-600">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover vulnerabilities, ensure compliance, and protect your assets with 
            our AI-powered security audit platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/sign-up" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/pricing" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Auto-Audit Agent?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <Activity className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Real-Time Monitoring</h3>
            <p className="text-gray-600">
              Continuous vulnerability scanning and instant alerts for critical security issues.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <Lock className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Compliance Ready</h3>
            <p className="text-gray-600">
              SOC 2, ISO 27001, and GDPR compliance reporting built-in for peace of mind.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <CheckCircle className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Automated Remediation</h3>
            <p className="text-gray-600">
              Get actionable insights and automated fixes for common vulnerabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">{stats.customers}</div>
              <div className="text-gray-600 mt-2">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">{stats.scans}</div>
              <div className="text-gray-600 mt-2">Security Scans</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">{stats.vulnerabilities}</div>
              <div className="text-gray-600 mt-2">Vulnerabilities Found</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">{stats.uptime}%</div>
              <div className="text-gray-600 mt-2">Uptime</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

async function getMarketingStats() {
  // Simulate fetching dynamic stats
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    customers: '1,000+',
    scans: '50K+',
    vulnerabilities: '100K+',
    uptime: 99.9
  };
}
