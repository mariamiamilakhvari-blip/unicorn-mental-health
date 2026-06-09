'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, CheckCircle2, Sparkles, Heart, BookOpen, Clock } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

type Ritual = { _id: string; title: string; body: string; completedAt?: string }
type Invitation = { _id: string; title: string; body: string }
type Hobby = { name: string; duration: number; learningMethod: string; description: string }

export default function HomePage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { data: session, status } = useSession()
  const [ritual, setRitual] = useState<Ritual | null>(null)
  const [invitation, setInvitation] = useState<Invitation | null>(null)
  const [hobby, setHobby] = useState<Hobby | null>(null)
  const [completing, setCompleting] = useState(false)

  const userName = session?.user?.name?.split(' ')[0] ?? ''

  function getGreeting() {
    const h = new Date().getHours()
    if (h < 12) return t('homeGreetingMorning')
    if (h < 17) return t('homeGreetingAfternoon')
    return t('homeGreetingEvening')
  }

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') { router.replace('/login'); return }

    fetch('/api/plan').then(r => r.json()).then(data => {
      if (data.ritual) setRitual(data.ritual)
      if (data.invitation) setInvitation(data.invitation)
      if (data.hobby) setHobby(data.hobby)
    }).catch(() => {})
  }, [status, router])

  async function completeRitual() {
    if (!ritual || completing) return
    setCompleting(true)
    await fetch('/api/plan', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notificationId: ritual._id }),
    })
    setRitual(r => r ? { ...r, completedAt: new Date().toISOString() } : r)
    setCompleting(false)
  }

  async function completeInvitation() {
    if (!invitation) return
    await fetch('/api/plan', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notificationId: invitation._id }),
    })
    setInvitation(null)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{getGreeting()},</p>
          <h1 className="text-3xl font-bold text-gray-900">{userName || '…'} 🦄</h1>
          <p className="text-muted-foreground mt-0.5">{t('homeDashboardReady')}</p>
        </div>
        <button className="relative p-2.5 rounded-xl bg-white border border-border hover:bg-gray-50 transition-colors shadow-sm">
          <Bell className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Daily Ritual */}
      {ritual && (
        <div className={`rounded-2xl p-6 border transition-all ${ritual.completedAt ? 'bg-sky-50 border-sky-200' : 'bg-white border-border shadow-sm'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-sky-500" />
              <span className="text-xs font-bold uppercase tracking-wide text-sky-500">Daily Ritual</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Every 48 hours
            </div>
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1.5">{ritual.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{ritual.body}</p>
          {ritual.completedAt ? (
            <div className="flex items-center gap-2 text-sky-600 font-semibold text-sm">
              <CheckCircle2 className="h-5 w-5" /> Done — beautifully done.
            </div>
          ) : (
            <button
              onClick={completeRitual}
              disabled={completing}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors disabled:opacity-60"
            >
              <CheckCircle2 className="h-4 w-4" />
              {completing ? 'Marking…' : 'I did this today'}
            </button>
          )}
        </div>
      )}

      {/* Hobby */}
      {hobby && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-5 w-5 text-velvet-500" />
            <span className="text-xs font-bold uppercase tracking-wide text-velvet-500">Your Hobby</span>
            <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-velvet-50 text-velvet-600">{hobby.duration} months</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{hobby.name}</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">{hobby.description}</p>
          <div className="flex items-start gap-2 bg-sky-50 rounded-xl px-4 py-3">
            <Sparkles className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
            <p className="text-xs text-sky-700 font-medium">{hobby.learningMethod}</p>
          </div>
        </div>
      )}

      {/* Connection Invitation */}
      {invitation && (
        <div className="bg-gradient-to-br from-velvet-50 to-sky-50 rounded-2xl p-6 border border-velvet-100">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="h-5 w-5 text-velvet-500" />
            <span className="text-xs font-bold uppercase tracking-wide text-velvet-500">Connection Invitation</span>
            <span className="ml-auto text-xs text-muted-foreground">Every 14 days</span>
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1.5">{invitation.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{invitation.body}</p>
          <button
            onClick={completeInvitation}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-velvet-500 text-white text-sm font-semibold hover:bg-velvet-600 transition-colors"
          >
            <CheckCircle2 className="h-4 w-4" /> I did this
          </button>
        </div>
      )}
    </div>
  )
}
