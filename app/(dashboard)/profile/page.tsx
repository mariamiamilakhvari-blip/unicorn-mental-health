'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, LogOut, RefreshCw, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getUser, clearUser } from '@/lib/mock-auth'

const QUESTION_LABELS: Record<string, string> = {
  genderIdentity: 'Gender Identity',
  ageCohort: 'Age Group',
  nationality: 'Nationality',
  maritalStatus: 'Relationship Status',
  relaxationTriggers: 'Relaxation Triggers',
  fatigueState: 'Post-Work Feeling',
  microDesire: 'Current Micro-Desire',
  environmentalComfort: 'Ideal Environment',
  primaryMotivators: 'Primary Motivators',
  stressCoping: 'Stress Coping',
  contentFilters: 'Content Interests',
  focalPriority: 'Core Focus',
  productivityWindows: 'Productivity Windows',
  targetIntervention: 'Target Intervention',
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [profile, setProfile] = useState<Record<string, string | string[]>>({})
  const [permissions, setPermissions] = useState<Record<string, boolean>>({})
  const [smartwatch, setSmartwatch] = useState('Garmin')

  useEffect(() => {
    const u = getUser()
    if (!u) { router.replace('/login'); return }
    setUser(u)
    try { setProfile(JSON.parse(localStorage.getItem('unicorn_profile') || '{}')) } catch {}
    try { setPermissions(JSON.parse(localStorage.getItem('unicorn_permissions') || '{}')) } catch {}
    setSmartwatch(localStorage.getItem('unicorn_smartwatch') ?? 'Garmin')
  }, [router])

  function signOut() {
    clearUser()
    router.replace('/login')
  }

  function reDoOnboarding() {
    localStorage.removeItem('unicorn_onboarded')
    localStorage.removeItem('unicorn_profile')
    router.push('/permissions')
  }

  const profileEntries = Object.entries(QUESTION_LABELS).filter(([key]) => profile[key] !== undefined)

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile & Settings</h1>
        <p className="text-muted-foreground mt-1">Your account details and wellness preferences</p>
      </div>

      {/* Account card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Account</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ochre-300 to-velvet-500 flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{user?.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <p className="text-xs text-sage-600 font-semibold mt-1">✓ Free Trial Active — 21 days remaining</p>
          </div>
        </div>
      </div>

      {/* Permissions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Permissions</h2>
        <div className="space-y-3">
          {[
            { key: 'notifications', label: 'Push Notifications', icon: '🔔' },
            { key: 'healthData', label: 'Health Data Access', icon: '❤️' },
          ].map(p => (
            <div key={p.key} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <span>{p.icon}</span>
                <span className="text-sm font-medium text-gray-800">{p.label}</span>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${permissions[p.key] ? 'bg-sage-100 text-sage-700' : 'bg-gray-100 text-gray-500'}`}>
                {permissions[p.key] ? 'Allowed' : 'Skipped'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Wellness profile */}
      {profileEntries.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Wellness Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {profileEntries.map(([key, label]) => {
              const val = profile[key]
              const display = Array.isArray(val) ? val.join(', ') : val
              return (
                <div key={key} className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-muted-foreground">{label}</span>
                  <span className="text-sm font-medium text-gray-800">{display || '—'}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Smartwatch */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Connected Devices</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⌚</span>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {smartwatch}
              </p>
              <p className="text-xs text-muted-foreground">Smartwatch — Phase 2: live sync</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-ochre-100 text-velvet-600">Connected</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={reDoOnboarding}
          className="flex items-center gap-2 rounded-xl"
        >
          <RefreshCw className="h-4 w-4" />
          Redo Onboarding
          <ChevronRight className="h-4 w-4 ml-auto" />
        </Button>

        <Button
          variant="outline"
          onClick={signOut}
          className="flex items-center gap-2 rounded-xl text-red-600 hover:bg-red-50 hover:border-red-200"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
