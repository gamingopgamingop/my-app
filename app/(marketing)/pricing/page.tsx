import Link from 'next/link'
import { Check } from 'lucide-react'

// ISR: Revalidate every 3600 seconds (1 hour)
export const revalidate = 3600;

export default async function PricingPage() {
  // Fetch pricing data with ISR
  const pricingData = await getPricingData();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">Choose the plan that's right for your organization</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Tier</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">${pricingData.freeTier.price}</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-600">Up to 5 assets monitored</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-600">Basic vulnerability scanning</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-600">Weekly compliance reports</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-600">Email support</span>
              </li>
            </ul>
            <Link
              href="/sign-up"
              className="block w-full text-center bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Auditor */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-xl border-2 border-blue-600 p-8 text-white relative">
            <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
              POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-2">Pro Auditor</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">${pricingData.proTier.price}</span>
              <span className="text-blue-100">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" />
                <span>Unlimited assets monitored</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" />
                <span>Advanced vulnerability detection</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" />
                <span>Real-time compliance monitoring</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" />
                <span>Priority support & dedicated account manager</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" />
                <span>API access for integrations</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" />
                <span>Custom compliance frameworks</span>
              </li>
            </ul>
            <Link
              href="/api/checkout"
              className="block w-full text-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

async function getPricingData() {
  // Simulate fetching pricing from CMS or database
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    freeTier: {
      name: 'Free Tier',
      price: 0,
      features: ['Up to 5 assets', 'Basic scanning', 'Weekly reports', 'Email support']
    },
    proTier: {
      name: 'Pro Auditor',
      price: 99,
      features: ['Unlimited assets', 'Advanced detection', 'Real-time monitoring', 'Priority support', 'API access', 'Custom frameworks']
    }
  };
}
