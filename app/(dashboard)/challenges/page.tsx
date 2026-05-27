'use client'
import { useEffect, useState } from 'react'
import { Zap, CheckCircle2, Calendar, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeatmapCalendar } from '@/components/dashboard/HeatmapCalendar'
import { ProgressRing } from '@/components/dashboard/ProgressRing'

const POOL = {
  social: [
    { title: 'Reconnect with an old friend', description: "Reach out to someone you haven't spoken to in over 6 months. Send a message, call, or meet for coffee." },
    { title: 'Attend a social event', description: 'Go to a meetup, community event, or gathering outside of your usual circle.' },
    { title: 'Write gratitude messages', description: 'Write heartfelt messages to 3 people who have positively impacted your life.' },
    { title: 'Host a gathering', description: 'Plan and host a small get-together with people who energize you.' },
  ],
  business: [
    { title: 'Learn one new career skill', description: 'Research and start learning a skill that could advance your career in the next 12 months.' },
    { title: 'Network with someone new', description: 'Connect with a new person in your field via LinkedIn or an industry event.' },
    { title: 'Define your personal brand', description: 'Write a compelling personal brand statement that captures your unique value.' },
    { title: 'Set a 90-day career goal', description: 'Write one ambitious goal and break it into 3 actionable first steps.' },
  ],
  relationships: [
    { title: 'Phone-free quality time', description: 'Spend meaningful time with a loved one — no screens, full presence.' },
    { title: 'Plan a thoughtful surprise', description: 'Do something unexpectedly thoughtful for someone important to you.' },
    { title: 'Daily gratitude practice', description: 'Tell someone you appreciate them every day for 21 days.' },
    { title: 'Write a heartfelt letter', description: 'Write a handwritten letter to someone who means the world to you.' },
  ],
}

type Category = 'social' | 'business' | 'relationships'
type Challenge = { id: string; title: string; description: string; category: Category; startDate: string; checkIns: string[] }

const COLORS: Record<Category, string> = {
  social: 'from-blue-400 to-blue-600',
  business: 'from-violet-400 to-violet-600',
  relationships: 'from-rose-400 to-rose-600',
}
const EMOJI: Record<Category, string> = { social: '🫂', business: '💼', relationships: '❤️' }
const BG: Record<Category, string> = {
  social: 'bg-blue-50 text-blue-700',
  business: 'bg-violet-50 text-violet-700',
  relationships: 'bg-rose-50 text-rose-700',
}

function load(): Challenge[] {
  try { return JSON.parse(localStorage.getItem('unicorn_challenges') || '[]') } catch { return [] }
}
function save(c: Challenge[]) { localStorage.setItem('unicorn_challenges', JSON.stringify(c)) }

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([])

  useEffect(() => { setChallenges(load()) }, [])

  function newChallenge() {
    const cats: Category[] = ['social', 'business', 'relationships']
    const cat = cats[Math.floor(Math.random() * cats.length)]
    const pool = POOL[cat]
    const pick = pool[Math.floor(Math.random() * pool.length)]
    const c: Challenge = { id: Date.now().toString(), ...pick, category: cat, startDate: new Date().toISOString(), checkIns: [] }
    const updated = [c, ...challenges]
    setChallenges(updated)
    save(updated)
  }

  function checkIn(id: string) {
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const updated = challenges.map(c => {
      if (c.id !== id) return c
      const already = c.checkIns.some(d => { const dt = new Date(d); dt.setHours(0,0,0,0); return dt.getTime() === today.getTime() })
      if (already) return c
      return { ...c, checkIns: [...c.checkIns, today.toISOString()] }
    })
    setChallenges(updated)
    save(updated)
  }

  function isToday(c: Challenge) {
    const today = new Date(); today.setHours(0,0,0,0)
    return c.checkIns.some(d => { const dt = new Date(d); dt.setHours(0,0,0,0); return dt.getTime() === today.getTime() })
  }

  const active = challenges[0]
  const daysElapsed = active ? Math.floor((Date.now() - new Date(active.startDate).getTime()) / 86400000) : 0
  const daysLeft = active ? Math.max(0, 21 - daysElapsed) : 0
  const progress = active ? Math.min((active.checkIns.length / 21) * 100, 100) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Random Challenges</h1>
          <p className="text-muted-foreground mt-1">21-day challenges across Social · Business · Relationships</p>
        </div>
        <Button
          onClick={newChallenge}
          className="bg-ochre-400 text-black hover:bg-velvet-500 hover:text-white rounded-xl h-10 px-5 font-semibold "
        >
          <Zap className="h-4 w-4 mr-2" /> New Challenge
        </Button>
      </div>

      {!active ? (
        <div className="bg-white rounded-2xl p-16 shadow-sm border border-border text-center max-w-lg mx-auto">
          <div className="text-6xl mb-4">⚡</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No active challenge yet</h3>
          <p className="text-muted-foreground mb-6">Get a random 21-day challenge across social, business, or relationships.</p>
          <Button onClick={newChallenge} className="bg-ochre-400 text-black hover:bg-velvet-500 hover:text-white rounded-xl px-6">
            Get My First Challenge
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Left: challenge card (3/5) */}
          <div className="xl:col-span-3 space-y-6">
            <div className={`bg-gradient-to-br ${COLORS[active.category]} rounded-2xl p-8 text-white shadow-lg`}>
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{EMOJI[active.category]}</span>
                <span className={`px-3 py-1 rounded-full bg-white/20 text-sm font-semibold capitalize`}>{active.category}</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{active.title}</h2>
              <p className="opacity-90 leading-relaxed mb-6">{active.description}</p>
              <div className="flex items-center gap-6 text-sm opacity-80 mb-6">
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Day {daysElapsed + 1} of 21</span>
                <span>{daysLeft} days remaining</span>
                <span>{active.checkIns.length} check-ins</span>
              </div>
              <button
                onClick={() => checkIn(active.id)}
                disabled={isToday(active)}
                className={`w-full py-3.5 rounded-xl font-semibold transition-all ${isToday(active) ? 'bg-white/30 cursor-default' : 'bg-white/20 hover:bg-white/30 active:scale-95'}`}
              >
                {isToday(active)
                  ? <span className="flex items-center justify-center gap-2"><CheckCircle2 className="h-5 w-5" /> Checked in today!</span>
                  : '✓ Check In Today'}
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Days elapsed', value: daysElapsed + 1, icon: '📅' },
                { label: 'Check-ins', value: active.checkIns.length, icon: '✅' },
                { label: 'Days left', value: daysLeft, icon: '⏳' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-border text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: progress (2/5) */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <h3 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-ochre-400" /> Your Progress
              </h3>
              <div className="flex justify-center mb-6">
                <ProgressRing progress={progress} size={120} label="Complete" />
              </div>
              <HeatmapCalendar
                startDate={new Date(active.startDate)}
                checkIns={active.checkIns.map(d => new Date(d))}
                totalDays={21}
              />
            </div>

            {/* Category badge */}
            <div className={`rounded-2xl p-4 ${BG[active.category]}`}>
              <p className="font-semibold text-sm">{EMOJI[active.category]} {active.category.charAt(0).toUpperCase() + active.category.slice(1)} Challenge</p>
              <p className="text-xs opacity-80 mt-1">Check in daily to build the habit. Consistency beats perfection.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
