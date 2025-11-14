'use client'

// Client-Side Rendering for interactive forms and state management
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Key, Plus, Trash2, Copy, Check } from 'lucide-react'

export default function SettingsPage() {
  const { user } = useUser()
  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'Production API Key',
      key: 'aaa_live_1234567890abcdef',
      lastUsed: new Date('2025-01-13'),
      createdAt: new Date('2024-12-01')
    },
    {
      id: '2',
      name: 'Development Key',
      key: 'aaa_dev_abcdefghijklmnop',
      lastUsed: new Date('2025-01-14'),
      createdAt: new Date('2025-01-05')
    }
  ])
  
  const [newKeyName, setNewKeyName] = useState('')
  const [showNewKeyForm, setShowNewKeyForm] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    criticalOnly: false,
    weeklyReport: true
  })

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return
    
    const newKey = {
      id: String(apiKeys.length + 1),
      name: newKeyName,
      key: `aaa_${Math.random().toString(36).substring(2, 15)}`,
      lastUsed: null as any,
      createdAt: new Date()
    }
    
    setApiKeys([...apiKeys, newKey])
    setNewKeyName('')
    setShowNewKeyForm(false)
  }

  const handleDeleteKey = (id: string) => {
    if (confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      setApiKeys(apiKeys.filter(key => key.id !== id))
    }
  }

  const handleCopyKey = async (key: string) => {
    await navigator.clipboard.writeText(key)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleNotificationChange = (setting: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-2">Manage your account and API integrations</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              value={user?.primaryEmailAddress?.emailAddress || ''}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
            <input 
              type="text" 
              value={user?.id || ''}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">Notification Preferences</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Alerts</p>
              <p className="text-sm text-gray-600">Receive email notifications for security events</p>
            </div>
            <button
              onClick={() => handleNotificationChange('emailAlerts')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                notifications.emailAlerts ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  notifications.emailAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Critical Only</p>
              <p className="text-sm text-gray-600">Only notify for critical vulnerabilities</p>
            </div>
            <button
              onClick={() => handleNotificationChange('criticalOnly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                notifications.criticalOnly ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  notifications.criticalOnly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Weekly Report</p>
              <p className="text-sm text-gray-600">Receive a weekly summary of security findings</p>
            </div>
            <button
              onClick={() => handleNotificationChange('weeklyReport')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                notifications.weeklyReport ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  notifications.weeklyReport ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* API Keys Section */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-6 border-b flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">API Keys</h3>
            <p className="text-sm text-gray-600 mt-1">Manage your API keys for integrations</p>
          </div>
          <button
            onClick={() => setShowNewKeyForm(!showNewKeyForm)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
            New Key
          </button>
        </div>

        {showNewKeyForm && (
          <div className="p-6 border-b bg-blue-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">Key Name</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g., Production API Key"
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleCreateKey}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewKeyForm(false)
                  setNewKeyName('')
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="divide-y">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Key className="w-5 h-5 text-gray-600" />
                    <h4 className="font-semibold text-gray-900">{apiKey.name}</h4>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <code className="text-sm bg-gray-100 px-3 py-1 rounded font-mono">
                      {apiKey.key}
                    </code>
                    <button
                      onClick={() => handleCopyKey(apiKey.key)}
                      className="text-gray-600 hover:text-gray-900 transition"
                      title="Copy to clipboard"
                    >
                      {copiedKey === apiKey.key ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    Created: {apiKey.createdAt.toLocaleDateString()}
                    {apiKey.lastUsed && ` • Last used: ${apiKey.lastUsed.toLocaleDateString()}`}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteKey(apiKey.id)}
                  className="text-red-600 hover:text-red-700 p-2 transition"
                  title="Delete key"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
