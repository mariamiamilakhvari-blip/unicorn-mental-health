'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Heart, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PERMISSIONS = [
  {
    id: 'notifications',
    icon: Bell,
    bgColor: 'bg-ochre-50',
    iconColor: 'text-velvet-500',
    title: 'Push Notifications',
    description: 'Receive timely micro-action reminders, wellness nudges, and circle-of-life check-ins every 48 hours.',
    allowLabel: 'Allow Notifications',
  },
  {
    id: 'healthData',
    icon: Heart,
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-600',
    title: 'Health Data Access',
    description: 'Read biometric baselines to personalise your wellness journey — heart rate, sleep quality, and more.',
    allowLabel: 'Allow Health Access',
  },
]

export default function PermissionsPage() {
  const router = useRouter()
  const [granted, setGranted] = useState<Record<string, boolean>>({})

  function handleContinue() {
    localStorage.setItem('unicorn_permissions', JSON.stringify({
      notifications: !!granted.notifications,
      healthData: !!granted.healthData,
      smartwatch: false,
    }))
    router.push('/smartwatch')
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ochre-100 text-velvet-600 text-xs font-semibold mb-4">
          Step 1 of 3 — Permissions
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Personalise your experience</h1>
        <p className="text-muted-foreground mt-1.5">Grant access to unlock your full wellness potential</p>
      </div>

      <div className="space-y-4 mb-8">
        {PERMISSIONS.map(({ id, icon: Icon, bgColor, iconColor, title, description, allowLabel }) => (
          <div key={id} className="bg-white rounded-2xl p-5 shadow-sm border border-border">
            <div className="flex items-start gap-4">
              <div className={`${bgColor} p-3 rounded-xl shrink-0`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>
                <div className="flex gap-2 mt-4 justify-center">
                  <button
                    onClick={() => setGranted(g => ({ ...g, [id]: true }))}
                    className={`py-2 px-5 rounded-lg text-sm font-semibold transition-all ${
                      granted[id]
                        ? 'bg-sage-500 text-white shadow-md'
                        : 'bg-velvet-500 text-white hover:bg-velvet-600'
                    }`}
                  >
                    {granted[id] ? '✓ Allowed' : allowLabel}
                  </button>
                  <button
                    onClick={() => setGranted(g => ({ ...g, [id]: false }))}
                    className="px-5 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted/70 transition-colors"
                  >
                    Skip
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
      <Button
        onClick={handleContinue}
        className="h-11 px-24 bg-velvet-500 text-white hover:bg-velvet-600 font-semibold rounded-xl"
      >
        Continue <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-4">You can change these anytime in Settings</p>
    </div>
  )
}
