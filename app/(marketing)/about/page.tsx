import Link from 'next/link'
import { Shield, Users, Target, Award } from 'lucide-react'

// ISR: Revalidate every 3600 seconds (1 hour)
export const revalidate = 3600;

export default async function AboutPage() {
  // Fetch dynamic content like team stats, achievements
  const aboutData = await getAboutData();
  return (
    <div className="min-h-screen bg-white">

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Auto-Audit Agent</h1>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{aboutData.stats.teamSize}+</div>
            <div className="text-sm text-gray-600">Team Members</div>
          </div>
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{aboutData.stats.customers}+</div>
            <div className="text-sm text-gray-600">Customers</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{aboutData.stats.countries}+</div>
            <div className="text-sm text-gray-600">Countries</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-6 text-center">
            <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{aboutData.stats.uptime}%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">
            We're on a mission to make security auditing accessible to every organization, 
            regardless of size or technical expertise.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2024, Auto-Audit Agent was born from the frustration of manual security 
            audits and compliance reporting. Our team of security experts and engineers came 
            together to build an automated platform that delivers enterprise-grade security 
            insights at a fraction of the cost.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What We Do</h2>
          <p className="text-gray-600 mb-4">
            Auto-Audit Agent continuously monitors your digital assets for vulnerabilities, 
            misconfigurations, and compliance issues. Our AI-powered engine analyzes millions 
            of data points to provide actionable insights that help you stay secure.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Why Choose Us</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Automated 24/7 security monitoring</li>
            <li>Compliance reporting for SOC 2, ISO 27001, and GDPR</li>
            <li>Real-time vulnerability alerts</li>
            <li>Expert security recommendations</li>
            <li>Easy integration with your existing tools</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

async function getAboutData() {
  // Simulate fetching data from CMS or database
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    stats: {
      teamSize: 50,
      customers: 1000,
      countries: 25,
      uptime: 99.9
    },
    mission: 'Making security auditing accessible to every organization',
    foundedYear: 2024
  };
}
