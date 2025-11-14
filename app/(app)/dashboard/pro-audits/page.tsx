import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Shield, Zap, Target } from 'lucide-react'

// Server-Side Rendering with role check
export const dynamic = 'force-dynamic'

async function getProAuditData() {
  // Simulate fetching advanced audit data
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    advancedScans: [
      {
        id: '1',
        name: 'Deep Penetration Test',
        status: 'Running',
        progress: 65,
        startedAt: new Date('2025-01-14T10:00:00'),
      },
      {
        id: '2',
        name: 'API Security Audit',
        status: 'Completed',
        progress: 100,
        completedAt: new Date('2025-01-13T15:30:00'),
        findings: 12
      },
      {
        id: '3',
        name: 'Infrastructure Scan',
        status: 'Scheduled',
        scheduledFor: new Date('2025-01-16T09:00:00'),
      }
    ]
  }
}

export default async function ProAuditsPage() {
  const { userId, sessionClaims } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Check if user has PRO_AUDITOR role
  const role = (sessionClaims?.metadata as any)?.role || 'FREE_TIER'
  
  if (role !== 'PRO_AUDITOR') {
    redirect('/dashboard')
  }

  const data = await getProAuditData()

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-3xl font-bold text-gray-900">Pro Audits</h2>
          <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
            PRO TIER
          </span>
        </div>
        <p className="text-gray-600">Advanced security audits and deep penetration testing</p>
      </div>

      {/* Pro Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <Zap className="w-10 h-10 mb-4" />
          <h3 className="text-xl font-bold mb-2">Real-Time Scanning</h3>
          <p className="text-blue-100">Continuous monitoring with instant threat detection</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <Target className="w-10 h-10 mb-4" />
          <h3 className="text-xl font-bold mb-2">Deep Penetration Tests</h3>
          <p className="text-purple-100">Advanced testing methodologies for comprehensive security</p>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white">
          <Shield className="w-10 h-10 mb-4" />
          <h3 className="text-xl font-bold mb-2">Custom Compliance</h3>
          <p className="text-indigo-100">Tailored compliance frameworks for your industry</p>
        </div>
      </div>

      {/* Advanced Scans */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">Advanced Security Scans</h3>
          <p className="text-sm text-gray-600 mt-1">Comprehensive audits running on your infrastructure</p>
        </div>
        
        <div className="divide-y">
          {data.advancedScans.map((scan) => (
            <div key={scan.id} className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-gray-900">{scan.name}</h4>
                <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                  scan.status === 'Running' 
                    ? 'bg-blue-100 text-blue-700' 
                    : scan.status === 'Completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {scan.status}
                </span>
              </div>
              
              {scan.status === 'Running' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progress: {scan.progress}%</span>
                    <span>Started: {scan.startedAt.toLocaleTimeString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${scan.progress}%` }}
                    />
                  </div>
                </div>
              )}
              
              {scan.status === 'Completed' && 'findings' in scan && (
                <div className="text-sm text-gray-600">
                  Completed: {scan.completedAt?.toLocaleString()} • {scan.findings} findings
                </div>
              )}
              
              {scan.status === 'Scheduled' && 'scheduledFor' in scan && (
                <div className="text-sm text-gray-600">
                  Scheduled for: {scan.scheduledFor?.toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
