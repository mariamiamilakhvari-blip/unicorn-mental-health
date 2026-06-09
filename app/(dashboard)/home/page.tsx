'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Star, Activity } from 'lucide-react'
import { SmartWatchBar } from '@/components/dashboard/SmartWatchBar'
import { CircleOfLife } from '@/components/dashboard/CircleOfLife'
import { CalendarWidget } from '@/components/dashboard/CalendarWidget'
import { MicroActionCard } from '@/components/dashboard/MicroActionCard'
import { getUser } from '@/lib/mock-auth'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { getActiveNotifications, type ActiveNotif } from '@/lib/notifications'

function getActivityDates(): string[] {
  const dates: string[] = []
  try {
    const challenges: { checkIns: string[] }[] = JSON.parse(localStorage.getItem('unicorn_challenges') || '[]')
    challenges.forEach(c => dates.push(...c.checkIns))
    const hobby = JSON.parse(localStorage.getItem('unicorn_hobby') || 'null')
    if (hobby?.milestones) {
      hobby.milestones.forEach((m: { completedAt: string | null }) => { if (m.completedAt) dates.push(m.completedAt) })
    }
  } catch {}
  return dates
}

function DimIcon({ dimension }: { dimension: string }) {
  if (dimension === 'health') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
      <path d="M16 28C16 28 5 20 5 12C5 7.5 8.5 5 12 5C14 5 15.5 6 16 7C16.5 6 18 5 20 5C23.5 5 27 7.5 27 12C27 20 16 28 16 28Z" fill="#4ade80" opacity="0.85"/>
      <line x1="16" y1="12" x2="16" y2="28" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
  if (dimension === 'spirituality') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
      <path d="M16 3L17.8 13H27L19.5 19L22 29L16 23.5L10 29L12.5 19L5 13H14.2Z" fill="#7a4bdf" opacity="0.9"/>
      <circle cx="16" cy="14" r="3" fill="#fef08a"/>
    </svg>
  )
  if (dimension === 'creativity') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
      <circle cx="12" cy="13" r="6" fill="#c4a8fc" opacity="0.8"/>
      <circle cx="21" cy="13" r="6" fill="#fef08a" opacity="0.8"/>
      <circle cx="16" cy="21" r="6" fill="#86efac" opacity="0.8"/>
    </svg>
  )
  if (dimension === 'social') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
      <path d="M10 7C7.5 7 5 9 5 12C5 17 10 22 10 22C10 22 15 17 15 12C15 9 12.5 7 10 7Z" fill="#f472b6" opacity="0.85"/>
      <path d="M22 10C19.5 10 17 12 17 15C17 20 22 25 22 25C22 25 27 20 27 15C27 12 24.5 10 22 10Z" fill="#7a4bdf" opacity="0.75"/>
    </svg>
  )
  if (dimension === 'career' || dimension === 'finances') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
      <path d="M19 3L9 17H16L12 29L24 13H17Z" fill="#5e2d8f"/>
      <circle cx="25" cy="8" r="3" fill="#fef08a"/>
    </svg>
  )
  if (dimension === 'education') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
      <rect x="5" y="7" width="22" height="18" rx="2" fill="#e2d4fe" stroke="#7a4bdf" strokeWidth="1.5"/>
      <line x1="16" y1="7" x2="16" y2="25" stroke="#7a4bdf" strokeWidth="1.5"/>
      <line x1="8" y1="13" x2="14" y2="13" stroke="#9f74f0" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="17" x2="14" y2="17" stroke="#9f74f0" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="18" y1="13" x2="24" y2="13" stroke="#9f74f0" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="18" y1="17" x2="24" y2="17" stroke="#9f74f0" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
      <path d="M4 24 Q8 8 16 7 Q24 6 28 24" stroke="#5e2d8f" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M7 24 Q10 12 16 11 Q22 10 25 24" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M10 24 Q12 16 16 15 Q20 14 22 24" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function HomePage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [userName, setUserName] = useState('')
  const [targetIntervention, setTargetIntervention] = useState<string | undefined>()
  const [notifications, setNotifications] = useState<ActiveNotif[]>([])
  const [activityDates, setActivityDates] = useState<string[]>([])

  function getGreeting() {
    const h = new Date().getHours()
    if (h < 12) return t('homeGreetingMorning')
    if (h < 17) return t('homeGreetingAfternoon')
    return t('homeGreetingEvening')
  }

  useEffect(() => {
    const user = getUser()
    if (!user) { router.replace('/login'); return }
    setUserName(user.name.split(' ')[0])
    let profile: Record<string, string | string[]> = {}
    try { profile = JSON.parse(localStorage.getItem('unicorn_profile') || '{}') } catch {}
    setTargetIntervention(profile.targetIntervention as string | undefined)
    setNotifications(getActiveNotifications(profile))
    setActivityDates(getActivityDates())
  }, [router])

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{getGreeting()},</p>
          <h1 className="text-3xl font-bold text-gray-900">{userName || '…'} 🦄</h1>
          <p className="text-muted-foreground mt-0.5">{t('homeDashboardReady')}</p>
        </div>
        <button className="relative p-2.5 rounded-xl bg-white border border-border hover:bg-gray-50 transition-colors shadow-sm">
          <Bell className="h-5 w-5 text-gray-600" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-[10px] font-bold flex items-center justify-center text-white">
              {notifications.length}
            </span>
          )}
        </button>
      </div>

      {/* Smartwatch metrics bar */}
      <SmartWatchBar />

      {/* Two-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: main content (2/3) */}
        <div className="xl:col-span-2 space-y-6">
          <MicroActionCard targetIntervention={targetIntervention} />

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-5">
              <Activity className="h-5 w-5 text-ochre-400" />
              <h2 className="text-lg font-semibold text-gray-900">{t('homeCircleOfLife')}</h2>
            </div>
            <CircleOfLife />
          </div>
        </div>

        {/* Right: sidebar (1/3) */}
        <div className="space-y-6">
          <CalendarWidget activeDates={activityDates} />

          {/* Personalized nudges */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border">
            <h3 className="font-semibold text-gray-900 mb-4">
              {t('homeRecentNudges')}
            </h3>
            <div className="space-y-3">
              {notifications.map(n => (
                <div key={n.id} className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-xl bg-velvet-50 flex items-center justify-center shrink-0">
                    <DimIcon dimension={n.dimension} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                      <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full ${n.kind === 'daily' ? 'bg-velvet-50 text-velvet-600' : 'bg-ochre-50 text-ochre-600'}`}>
                        {n.kind === 'daily' ? 'Today' : 'Reminder'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{n.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-velvet-500 rounded-2xl p-5 text-white">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Star className="h-4 w-4" /> {t('homeQuickActions')}
            </h3>
            <div className="space-y-2">
              {[
                { href: '/challenges', label: t('homeStartChallenge') },
                { href: '/hobbies', label: t('homePickHobby') },
              ].map(a => (
                <a
                  key={a.href}
                  href={a.href}
                  className="block w-full text-left px-3 py-2 rounded-lg bg-white/15 hover:bg-white/25 transition-colors text-sm font-medium"
                >
                  {a.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
