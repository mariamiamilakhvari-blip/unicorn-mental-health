'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Zap, Star, Activity } from 'lucide-react'
import { SmartWatchBar } from '@/components/dashboard/SmartWatchBar'
import { CircleOfLife } from '@/components/dashboard/CircleOfLife'
import { CalendarWidget } from '@/components/dashboard/CalendarWidget'
import { MicroActionCard } from '@/components/dashboard/MicroActionCard'
import { getUser } from '@/lib/mock-auth'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

const SAMPLE_NOTIFICATIONS = [
  { id: '1', type: 'circle-of-life', title: 'Joy check-in', body: 'Did something bring you joy today? Take 5 minutes to reflect.' },
  { id: '2', type: 'challenge', title: 'Challenge reminder', body: "Don't forget to check in on your 21-day challenge today." },
  { id: '3', type: 'hobby', title: 'Hobby milestone', body: 'Week 1 complete! Time to gather your basic knowledge.' },
]

function loadCircleScores(): Record<string, number> {
  try { return JSON.parse(localStorage.getItem('unicorn_circle') || '{}') } catch { return {} }
}

function saveCircleScores(s: Record<string, number>) {
  localStorage.setItem('unicorn_circle', JSON.stringify(s))
}

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

export default function HomePage() {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [targetIntervention, setTargetIntervention] = useState<string | undefined>()
  const [circleScores, setCircleScores] = useState<Record<string, number>>({})
  const [activityDates, setActivityDates] = useState<string[]>([])

  useEffect(() => {
    const user = getUser()
    if (!user) { router.replace('/login'); return }
    setUserName(user.name.split(' ')[0])
    try {
      const profile = JSON.parse(localStorage.getItem('unicorn_profile') || '{}')
      setTargetIntervention(profile.targetIntervention)
    } catch {}
    setCircleScores(loadCircleScores())
    setActivityDates(getActivityDates())
  }, [router])

  function handleScoreChange(id: string, score: number) {
    const updated = { ...circleScores, [id]: score }
    setCircleScores(updated)
    saveCircleScores(updated)
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{getGreeting()},</p>
          <h1 className="text-3xl font-bold text-gray-900">{userName || '…'} 🦄</h1>
          <p className="text-muted-foreground mt-0.5">Your wellness dashboard is ready.</p>
        </div>
        <button className="relative p-2.5 rounded-xl bg-white border border-border hover:bg-gray-50 transition-colors shadow-sm">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-[10px] font-bold flex items-center justify-center text-white">
            {SAMPLE_NOTIFICATIONS.length}
          </span>
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
              <h2 className="text-lg font-semibold text-gray-900">Circle of Life</h2>
            </div>
            <CircleOfLife scores={circleScores} onScoreChange={handleScoreChange} />
          </div>
        </div>

        {/* Right: sidebar (1/3) */}
        <div className="space-y-6">
          <CalendarWidget activeDates={activityDates} />

          {/* Notifications */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-ochre-400" />
              Recent Nudges
            </h3>
            <div className="space-y-3">
              {SAMPLE_NOTIFICATIONS.map(n => (
                <div key={n.id} className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-xl bg-ochre-50 flex items-center justify-center text-sm shrink-0">
                    {n.type === 'circle-of-life' ? '🌀' : n.type === 'challenge' ? '⚡' : '🌟'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{n.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-gradient-to-br from-ochre-400 to-velvet-600 rounded-2xl p-5 text-white">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Star className="h-4 w-4" /> Quick Actions
            </h3>
            <div className="space-y-2">
              {[
                { href: '/challenges', label: '⚡ Start a challenge' },
                { href: '/hobbies', label: '🎯 Pick a hobby' },
                { href: '/subscription', label: '👑 Upgrade to Premium' },
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
