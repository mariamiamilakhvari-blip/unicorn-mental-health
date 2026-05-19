'use client'
import { useEffect, useState } from 'react'
import { Search, ArrowLeft, Trophy } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MilestoneTracker } from '@/components/dashboard/MilestoneTracker'

const HOBBIES = [
  { name: 'Painting', icon: '🎨', category: 'Creative' },
  { name: 'Photography', icon: '📸', category: 'Creative' },
  { name: 'Writing', icon: '✍️', category: 'Creative' },
  { name: 'Drawing', icon: '🖊️', category: 'Creative' },
  { name: 'Music', icon: '🎸', category: 'Creative' },
  { name: 'Dancing', icon: '💃', category: 'Creative' },
  { name: 'Cooking', icon: '🍳', category: 'Life Skills' },
  { name: 'Baking', icon: '🎂', category: 'Life Skills' },
  { name: 'Gardening', icon: '🌱', category: 'Nature' },
  { name: 'Hiking', icon: '🥾', category: 'Nature' },
  { name: 'Yoga', icon: '🧘', category: 'Wellness' },
  { name: 'Meditation', icon: '🧠', category: 'Wellness' },
  { name: 'Running', icon: '🏃', category: 'Fitness' },
  { name: 'Swimming', icon: '🏊', category: 'Fitness' },
  { name: 'Cycling', icon: '🚴', category: 'Fitness' },
  { name: 'Reading', icon: '📚', category: 'Knowledge' },
  { name: 'Coding', icon: '💻', category: 'Knowledge' },
  { name: 'Language Learning', icon: '🗣️', category: 'Knowledge' },
  { name: 'Chess', icon: '♟️', category: 'Mind' },
  { name: 'Knitting', icon: '🧶', category: 'Crafts' },
  { name: 'Pottery', icon: '🏺', category: 'Crafts' },
  { name: 'Woodworking', icon: '🪚', category: 'Crafts' },
]

const LEARNING_METHODS = [
  { id: 'youtube', label: 'YouTube & Online Videos', icon: '▶️' },
  { id: 'course', label: 'Online Course (Udemy, Coursera)', icon: '🎓' },
  { id: 'books', label: 'Books & Guides', icon: '📖' },
  { id: 'class', label: 'Local Class or Workshop', icon: '🏫' },
  { id: 'mentor', label: 'Find a Mentor', icon: '👨‍🏫' },
  { id: 'self', label: 'Self-Taught Practice', icon: '🔄' },
]

const DEFAULT_MILESTONES = [
  { stage: 'knowledge', title: 'Gather Basic Knowledge', targetMonth: 1, completedAt: null },
  { stage: 'equipment', title: 'Get the Necessary Equipment', targetMonth: 1, completedAt: null },
  { stage: 'feedback', title: 'Take Feedback', targetMonth: 1, completedAt: null },
  { stage: 'guides', title: 'Follow Step-by-Step Guides', targetMonth: 2, completedAt: null },
  { stage: 'community', title: 'Join a Community / Sell Your Product', targetMonth: 2, completedAt: null },
  { stage: 'technique', title: 'Try a New Technique', targetMonth: 2, completedAt: null },
  { stage: 'practice', title: 'Practice Regularly', targetMonth: 3, completedAt: null },
]

type Milestone = { stage: string; title: string; targetMonth: number; completedAt: string | null }
type Hobby = { name: string; icon: string; learningMethod: string; startDate: string; milestones: Milestone[] }
type Step = 'pick' | 'learn' | 'tracker'

export default function HobbiesPage() {
  const [step, setStep] = useState<Step>('pick')
  const [hobby, setHobby] = useState<Hobby | null>(null)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<{ name: string; icon: string } | null>(null)
  const [method, setMethod] = useState('')

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('unicorn_hobby') || 'null')
      if (saved) { setHobby(saved); setStep('tracker') }
    } catch {}
  }, [])

  function saveHobby() {
    if (!selected || !method) return
    const h: Hobby = { name: selected.name, icon: selected.icon, learningMethod: method, startDate: new Date().toISOString(), milestones: DEFAULT_MILESTONES }
    localStorage.setItem('unicorn_hobby', JSON.stringify(h))
    setHobby(h)
    setStep('tracker')
  }

  function updateMilestone(stage: string, completed: boolean) {
    return new Promise<void>(resolve => {
      setHobby(prev => {
        if (!prev) return prev
        const updated = { ...prev, milestones: prev.milestones.map(m => m.stage === stage ? { ...m, completedAt: completed ? new Date().toISOString() : null } : m) }
        localStorage.setItem('unicorn_hobby', JSON.stringify(updated))
        return updated
      })
      resolve()
    })
  }

  function resetHobby() { localStorage.removeItem('unicorn_hobby'); setHobby(null); setSelected(null); setMethod(''); setStep('pick') }

  const categories = Array.from(new Set(HOBBIES.map(h => h.category)))
  const filtered = HOBBIES.filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.category.toLowerCase().includes(search.toLowerCase()))

  // --- PICK step ---
  if (step === 'pick') return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">The Milestone Program</h1>
          <p className="text-muted-foreground mt-1">Choose a hobby to master over the next 3 months</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search hobbies…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="space-y-6">
        {categories.map(cat => {
          const items = filtered.filter(h => h.category === cat)
          if (!items.length) return null
          return (
            <div key={cat}>
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">{cat}</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
                {items.map(h => (
                  <button
                    key={h.name}
                    onClick={() => { setSelected(h); setStep('learn') }}
                    className="flex flex-col items-center p-3 rounded-xl bg-white border border-border hover:border-unicorn-400 hover:shadow-md transition-all group"
                  >
                    <span className="text-3xl mb-1.5 group-hover:scale-110 transition-transform">{h.icon}</span>
                    <span className="text-xs font-medium text-gray-700 text-center leading-tight">{h.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  // --- LEARN step ---
  if (step === 'learn' && selected) return (
    <div className="space-y-6">
      <button onClick={() => setStep('pick')} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to hobbies
      </button>

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-unicorn-50 border border-unicorn-200 flex items-center justify-center text-4xl">
          {selected.icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{selected.name}</h2>
          <p className="text-muted-foreground">How will you learn it?</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {LEARNING_METHODS.map(m => (
          <button
            key={m.id}
            onClick={() => setMethod(m.label)}
            className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${method === m.label ? 'border-unicorn-500 bg-unicorn-50 ring-2 ring-unicorn-500/20' : 'border-border bg-white hover:border-unicorn-300 hover:shadow-sm'}`}
          >
            <span className="text-2xl">{m.icon}</span>
            <span className="text-sm font-medium text-gray-800">{m.label}</span>
          </button>
        ))}
      </div>

      <Button
        onClick={saveHobby}
        disabled={!method}
        className="h-12 px-8 bg-gradient-to-r from-unicorn-500 to-unicorn-700 text-white font-semibold rounded-xl shadow-lg shadow-unicorn-200"
      >
        Start My Milestone Journey 🚀
      </Button>
    </div>
  )

  // --- TRACKER step ---
  if (step === 'tracker' && hobby) return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Hobby Journey</h1>
          <p className="text-muted-foreground mt-1">Track your 3-month milestone program</p>
        </div>
        <button onClick={resetHobby} className="text-sm font-semibold text-unicorn-600 hover:underline">
          Change hobby
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: hobby info (1/3) */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border text-center">
            <div className="text-6xl mb-3">{hobby.icon}</div>
            <h2 className="text-xl font-bold text-gray-900">{hobby.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">{hobby.learningMethod}</p>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">Started</p>
              <p className="text-sm font-semibold text-gray-700">
                {new Date(hobby.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Completion stats */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-unicorn-500" /> Progress
            </h3>
            <div className="space-y-2">
              {[1, 2, 3].map(month => {
                const total = hobby.milestones.filter(m => m.targetMonth === month).length
                const done = hobby.milestones.filter(m => m.targetMonth === month && m.completedAt).length
                return (
                  <div key={month}>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Month {month}</span>
                      <span>{done}/{total}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-unicorn-400 to-unicorn-600 rounded-full transition-all"
                        style={{ width: `${total ? (done / total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-gradient-to-r from-sage-400 to-sage-600 rounded-2xl p-4 text-white">
            <p className="font-semibold text-sm">💪 Keep going!</p>
            <p className="text-xs opacity-90 mt-0.5">Check in every 7 days to receive your encouragement notification.</p>
          </div>
        </div>

        {/* Right: milestone tracker (2/3) */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-border">
          <MilestoneTracker
            hobbyName={hobby.name}
            hobbyIcon={hobby.icon}
            startDate={hobby.startDate}
            milestones={hobby.milestones}
            onUpdate={updateMilestone}
          />
        </div>
      </div>
    </div>
  )

  return null
}
