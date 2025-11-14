import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { AlertTriangle, Shield, Activity, TrendingUp } from 'lucide-react'
import { VulnerabilityList } from '@/components/VulnerabilityList'

// Server-Side Rendering - Data fetched on every request
// This ensures real-time data for authenticated users
export const dynamic = 'force-dynamic'

async function getDashboardData(userId: string) {
  // In production, this would fetch from your database
  // Simulating database query with mock data
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    stats: {
      totalAssets: 12,
      criticalVulnerabilities: 3,
      resolvedThisWeek: 8,
      complianceScore: 87
    },
    vulnerabilities: [
      {
        id: '1',
        title: 'SQL Injection in Login Form',
        severity: 'CRITICAL' as const,
        cvssScore: 9.8,
        status: 'OPEN' as const,
        assetName: 'Web Application',
        discoveredAt: new Date('2025-01-12')
      },
      {
        id: '2',
        title: 'Outdated SSL Certificate',
        severity: 'HIGH' as const,
        cvssScore: 7.5,
        status: 'IN_PROGRESS' as const,
        assetName: 'API Server',
        discoveredAt: new Date('2025-01-10')
      },
      {
        id: '3',
        title: 'Missing CSRF Token',
        severity: 'MEDIUM' as const,
        cvssScore: 5.3,
        status: 'OPEN' as const,
        assetName: 'Admin Portal',
        discoveredAt: new Date('2025-01-08')
      },
      {
        id: '4',
        title: 'Weak Password Policy',
        severity: 'LOW' as const,
        cvssScore: 3.2,
        status: 'RESOLVED' as const,
        assetName: 'User Management',
        discoveredAt: new Date('2025-01-05')
      }
    ]
  }
}

export default async function DashboardPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Fetch dashboard data server-side
  const data = await getDashboardData(userId)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 mt-2">Monitor your security posture in real-time</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Assets</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{data.stats.totalAssets}</p>
            </div>
            <Shield className="w-12 h-12 text-blue-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical Issues</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{data.stats.criticalVulnerabilities}</p>
            </div>
            <AlertTriangle className="w-12 h-12 text-red-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved This Week</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{data.stats.resolvedThisWeek}</p>
            </div>
            <Activity className="w-12 h-12 text-green-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Compliance Score</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{data.stats.complianceScore}%</p>
            </div>
            <TrendingUp className="w-12 h-12 text-blue-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Vulnerabilities Section */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">Recent Vulnerabilities</h3>
          <p className="text-sm text-gray-600 mt-1">Latest security findings across your assets</p>
        </div>
        
        {/* React Server Component for vulnerability list */}
        <VulnerabilityList vulnerabilities={data.vulnerabilities} />
      </div>
    </div>
  )
}
