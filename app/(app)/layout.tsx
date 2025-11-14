import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { Shield, LayoutDashboard, Settings, FileText } from 'lucide-react'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold">Auto-Audit</span>
          </Link>
        </div>
        
        <nav className="px-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/dashboard/reports"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
          >
            <FileText className="w-5 h-5" />
            <span>Reports</span>
          </Link>
          <Link
            href="/dashboard/pro-audits"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
          >
            <Shield className="w-5 h-5" />
            <span className="flex items-center gap-2">
              Pro Audits
              <span className="text-xs bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full font-semibold">
                PRO
              </span>
            </span>
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        <header className="bg-white border-b h-16 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-800">Security Dashboard</h1>
          <UserButton afterSignOutUrl="/" />
        </header>
        
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
