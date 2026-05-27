'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle2, Menu, X } from 'lucide-react'
import { useSession } from 'next-auth/react'

const FEATURES = [
  { title: 'Circle of Life', desc: 'Track all 8 dimensions of well-being' },
  { title: 'Random Challenges', desc: '21-day micro-challenges and progress tracking' },
  { title: 'Milestone Hobbies', desc: 'Choose a hobby and follow stage-by-stage milestones' },
  { title: 'Garmin Integration', desc: 'Sync heart rate, stress, sleep quality, and activity data directly from your Garmin smartwatch in real time' },
  { title: 'Daily Micro-Actions', desc: 'Receive bite-sized, personalised wellness nudges every 48 hours, tailored to your profile and goals' },
  { title: 'Smart Analytics', desc: 'See your progress across every life dimension with progress rings, and insightful trend charts' },
]

const STEPS = [
  { num: '01', title: 'Create your account', desc: 'Sign up with email or continue with Google or Apple. It takes under 60 seconds.' },
  { num: '02', title: 'Build your profile', desc: 'Answer 14 personalised questions about your lifestyle, goals, and motivators.' },
  { num: '03', title: 'Live your best life', desc: 'Get your personalised dashboard with daily micro-actions and smartwatch-powered insights.' },
]

function CircleIcon({ label }: { label: string }) {
  if (label === 'Joy') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <path d="M4 24 Q8 8 16 7 Q24 6 28 24" stroke="#5e2d8f" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M7 24 Q10 12 16 11 Q22 10 25 24" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M10 24 Q12 16 16 15 Q20 14 22 24" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
  if (label === 'Spirituality') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <path d="M16 3L17.8 13H27L19.5 19L22 29L16 23.5L10 29L12.5 19L5 13H14.2Z" fill="#7a4bdf" opacity="0.9"/>
      <circle cx="16" cy="14" r="3" fill="#fef08a"/>
    </svg>
  )
  if (label === 'Creativity') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <circle cx="12" cy="13" r="6" fill="#c4a8fc" opacity="0.8"/>
      <circle cx="21" cy="13" r="6" fill="#fef08a" opacity="0.8"/>
      <circle cx="16" cy="21" r="6" fill="#86efac" opacity="0.8"/>
    </svg>
  )
  if (label === 'Social Life') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <path d="M10 7C7.5 7 5 9 5 12C5 17 10 22 10 22C10 22 15 17 15 12C15 9 12.5 7 10 7Z" fill="#f472b6" opacity="0.85"/>
      <path d="M22 10C19.5 10 17 12 17 15C17 20 22 25 22 25C22 25 27 20 27 15C27 12 24.5 10 22 10Z" fill="#7a4bdf" opacity="0.75"/>
    </svg>
  )
  if (label === 'Finances') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <polygon points="16,3 27,11 23,27 9,27 5,11" fill="#fef08a" stroke="#d4962a" strokeWidth="1.5"/>
      <polygon points="16,7 23,13 20,23 12,23 9,13" fill="#fde047" opacity="0.5"/>
      <polygon points="16,11 20,14 18,20 14,20 12,14" fill="#fff" opacity="0.7"/>
    </svg>
  )
  if (label === 'Career') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <path d="M19 3L9 17H16L12 29L24 13H17Z" fill="#5e2d8f"/>
      <circle cx="25" cy="8" r="3" fill="#fef08a"/>
    </svg>
  )
  if (label === 'Education') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect x="5" y="7" width="22" height="18" rx="2" fill="#e2d4fe" stroke="#7a4bdf" strokeWidth="1.5"/>
      <line x1="16" y1="7" x2="16" y2="25" stroke="#7a4bdf" strokeWidth="1.5"/>
      <line x1="8" y1="13" x2="14" y2="13" stroke="#9f74f0" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="17" x2="14" y2="17" stroke="#9f74f0" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="18" y1="13" x2="24" y2="13" stroke="#9f74f0" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="18" y1="17" x2="24" y2="17" stroke="#9f74f0" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 4L16 7L22 4" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <path d="M16 28C16 28 5 20 5 12C5 7.5 8.5 5 12 5C14 5 15.5 6 16 7C16.5 6 18 5 20 5C23.5 5 27 7.5 27 12C27 20 16 28 16 28Z" fill="#4ade80" opacity="0.85"/>
      <line x1="16" y1="12" x2="16" y2="28" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

const CIRCLE = [
  { label: 'Joy' },
  { label: 'Spirituality' },
  { label: 'Creativity' },
  { label: 'Social Life' },
  { label: 'Finances' },
  { label: 'Career' },
  { label: 'Education' },
  { label: 'Physical Health' },
]

export default function LandingPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('yearly')

  useEffect(() => {
    if (session?.user?.onboardingCompleted) {
      router.replace('/home')
    }
  }, [session, router])

  return (
    <div className="min-h-screen bg-white text-black">

      {/* NAVBAR — floating pills */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-100 shadow-sm font-black text-black">
          <div className="w-6 h-6 rounded-md bg-velvet-500 flex items-center justify-center text-sm">🦄</div>
          Unicorn
        </Link>

        <nav className="hidden md:flex bg-white/80 backdrop-blur-md rounded-full border border-gray-100 shadow-sm px-3 py-1.5 items-center gap-1 text-sm font-medium">
          <a href="#features" className="px-3 py-1.5 text-black hover:text-velvet-500 transition-colors">Features</a>
          <a href="#how-it-works" className="px-3 py-1.5 text-black hover:text-velvet-500 transition-colors">How it works</a>
          <a href="#pricing" className="px-3 py-1.5 text-black hover:text-velvet-500 transition-colors">Pricing</a>
          <a href="#about" className="px-3 py-1.5 text-black hover:text-velvet-500 transition-colors">About us</a>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/login" className="text-sm font-semibold px-4 py-2 rounded-full border-2 border-ochre-300 bg-white/80 backdrop-blur-md text-black hover:bg-ochre-50 transition-colors">Sign in</Link>
          <Link href="/signup" className="text-sm font-semibold bg-velvet-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-velvet-600 transition-all flex items-center gap-1.5">
            Get started +
          </Link>
        </div>

        <button onClick={() => setMenuOpen(v => !v)} className="md:hidden p-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm">
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {menuOpen && (
          <div className="absolute top-20 left-4 right-4 md:hidden bg-white rounded-2xl border border-gray-100 shadow-xl px-6 py-5 flex flex-col gap-4 text-sm font-medium text-black">
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About us</a>
            <Link href="/login">Sign in</Link>
            <Link href="/signup" className="text-velvet-500 font-semibold">Get started free</Link>
          </div>
        )}
      </header>

      {/* HERO — full height, text bottom-left */}
      <section className="relative min-h-screen bg-gradient-to-br from-velvet-50 via-white to-ochre-50 flex flex-col justify-end pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-velvet-100/30 via-transparent to-ochre-100/20 pointer-events-none" />

        {/* top center badge */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sage-200 bg-white/70 backdrop-blur-sm text-black text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-sage-500 animate-pulse" />
            21-day free trial · No credit card required
          </div>
        </div>

        {/* bottom-left editorial text */}
        <div className="max-w-7xl mx-auto px-8 md:px-12 w-full">
          <p className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-4">001/ Well-Being</p>
          <h1 className="text-6xl md:text-8xl font-black text-black leading-none mb-6 max-w-4xl">
            Transform Your{' '}
            <span className="text-velvet-500">Well-Being</span>{' '}
            Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mb-10 leading-relaxed">
            Biometric wellness tracking, actionable micro-steps and a structured path to well-being
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link href="/signup" className="flex items-center gap-2 bg-velvet-500 text-white font-bold px-8 py-4 rounded-full shadow-xl hover:bg-velvet-600 transition-all text-base">
              Start for free <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#how-it-works" className="flex items-center gap-2 text-black font-semibold px-8 py-4 rounded-full border border-gray-200 bg-white/70 hover:border-ochre-300 transition-all text-base">
              See how it works
            </a>
          </div>
        </div>

        {/* circle tags — bottom right */}
        <div className="absolute bottom-10 right-8 hidden lg:flex flex-wrap justify-end gap-2 max-w-xs">
          {CIRCLE.map(c => (
            <span key={c.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-xs font-medium text-black shadow-sm">
              <CircleIcon label={c.label} /> {c.label}
            </span>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="border-y border-gray-100 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 text-sm text-black">
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
              <path d="M10 17C10 17 2 11 2 6C2 3.8 3.8 2 6 2C7.5 2 8.8 2.9 9.4 4C9.4 4 9.6 3.5 10 3C10.6 1.9 11.9 1 13.5 1C15.7 1 18 3 18 6C18 11 10 17 10 17Z" fill="#f472b6" opacity="0.85"/>
              <circle cx="16" cy="3" r="1.5" fill="#fef08a"/>
            </svg>
            Wellness-first design
          </span>
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
              <rect x="6" y="4" width="8" height="12" rx="2" fill="#e2d4fe" stroke="#7a4bdf" strokeWidth="1.2"/>
              <path d="M3 7.5 L6 7.5" stroke="#7a4bdf" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M14 7.5 L17 7.5" stroke="#7a4bdf" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M7 10 L8.5 8 L10 11 L11.5 9 L13 10" stroke="#5e2d8f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Garmin integration
          </span>
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
              <rect x="2" y="4" width="16" height="13" rx="2" fill="#fef9c3" stroke="#d4962a" strokeWidth="1.2"/>
              <line x1="2" y1="8" x2="18" y2="8" stroke="#d4962a" strokeWidth="1.2"/>
              <path d="M11 5 L9 11 H12 L10 15 L14 9 H11Z" fill="#5e2d8f"/>
            </svg>
            21-day challenges
          </span>
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
              <path d="M10 2L11.5 7H17L12.5 10.5L14 16L10 12.5L6 16L7.5 10.5L3 7H8.5Z" fill="#fef08a" stroke="#d4962a" strokeWidth="1"/>
            </svg>
            Milestone tracking
          </span>
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
              <path d="M10 2L17 5V10C17 14 10 18 10 18C10 18 3 14 3 10V5Z" fill="#c4a8fc" stroke="#7a4bdf" strokeWidth="1.2"/>
              <path d="M10 6L11 10H13L10 14L9 10H7Z" fill="#5e2d8f" opacity="0.8"/>
            </svg>
            Privacy first
          </span>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-4">002/ Features</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-5xl font-black text-black">Everything You Need To Thrive</h2>
              <p className="text-gray-600 max-w-xs leading-relaxed">Six powerful modules working together to support every dimension of your wellbeing</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="group p-8 rounded-2xl border border-gray-100 hover:border-ochre-200 hover:shadow-xl hover:shadow-ochre-50 transition-all cursor-default">
                <div className="w-10 h-10 rounded-xl bg-ochre-100 mb-5 flex items-center justify-center">
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                    <polygon points="10,2 13,14 10,12 7,14" fill="#7a4bdf" opacity="0.9"/>
                    <circle cx="15" cy="5" r="1.2" fill="#5e2d8f" opacity="0.5"/>
                    <circle cx="5" cy="8" r="0.8" fill="#5e2d8f" opacity="0.4"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-black mb-2">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-32 bg-gradient-to-br from-ochre-50 to-sage-50">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-4">003/ Process</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-5xl font-black text-black">Up And Running In Minutes</h2>
              <p className="text-gray-600 max-w-xs leading-relaxed">Three simple steps to your personalised wellness plan</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map(s => (
              <div key={s.num} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative">
                <div className="text-7xl font-black text-ochre-100 mb-4 leading-none">{s.num}</div>
                <h3 className="text-xl font-bold text-black mb-2">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CIRCLE OF LIFE */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-4">004/ Circle</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-5xl font-black text-black">The Circle of Life</h2>
              <p className="text-gray-600 max-w-xs leading-relaxed">Eight dimensions, One fulfilled life</p>
            </div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 w-full">
            {CIRCLE.map((c, i) => (
              <div key={c.label} className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-center p-3 border gap-1 ${
                i % 4 === 0 ? 'bg-ochre-50 border-ochre-200' :
                i % 4 === 1 ? 'bg-velvet-50 border-velvet-100' :
                i % 4 === 2 ? 'bg-sage-50 border-sage-100' :
                'bg-gray-50 border-gray-200'
              }`}>
                <CircleIcon label={c.label} />
                <span className="text-[11px] font-semibold text-black leading-tight">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-4">005/ Pricing</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-5xl font-black text-black">One Price, Total Clarity</h2>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sage-200 bg-transparent text-black text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-sage-500 animate-pulse" />
                Start free for 21 days. No credit card required.
              </div>
            </div>
          </div>

          <div className="flex mb-10">
            <div className="bg-white border border-gray-200 rounded-full p-1 flex gap-1">
              <button onClick={() => setPlan('monthly')} className={`px-6 py-2 rounded-full text-sm font-medium transition-all border-2 border-ochre-300 bg-transparent text-black hover:bg-ochre-50 ${plan === 'monthly' ? 'shadow' : 'opacity-60'}`}>Monthly</button>
              <button onClick={() => setPlan('yearly')} className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${plan === 'yearly' ? 'bg-black text-white shadow' : 'text-gray-500 hover:text-black'}`}>
                Yearly <span className="ml-2 px-2 py-0.5 rounded-full bg-white text-black text-xs font-bold border border-gray-200">Save 17%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-sm font-semibold text-gray-500 mb-2">Free Trial</div>
              <div className="text-5xl font-black text-black mb-1">$0</div>
              <div className="text-gray-600 mb-8">21 days, no card needed</div>
              <ul className="space-y-3 mb-8">
                {['Full platform access', 'All 8 Circle of Life categories', 'Hobby milestone program', '21-day challenges', 'Garmin sync'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-black">
                    <CheckCircle2 className="h-4 w-4 text-sage-500 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full text-center py-3 rounded-full border-2 border-gray-200 font-semibold text-black hover:border-ochre-300 hover:bg-ochre-50 transition-all">
                Start free trial
              </Link>
            </div>

            <div className="bg-velvet-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
              <div className="text-sm font-semibold text-ochre-200 mb-2">Premium</div>
              <div className="text-5xl font-black mb-1">{plan === 'yearly' ? '$59.99' : '$4.99'}</div>
              <div className="text-ochre-200 mb-8">per {plan === 'yearly' ? 'year' : 'month'} · cancel anytime</div>
              <ul className="space-y-3 mb-8">
                {['Everything in free trial', 'Unlimited challenges & hobbies', 'Advanced analytics', 'Priority notifications', 'Community access', 'Future features included'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white">
                    <CheckCircle2 className="h-4 w-4 text-ochre-300 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full text-center py-3 rounded-full bg-ochre-300 text-black font-bold hover:bg-ochre-400 transition-colors">
                Get Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className="py-32 bg-gradient-to-br from-velvet-50 to-ochre-50">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-4">006/ About</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-5xl font-black text-black">About Unicorn</h2>
              <p className="text-gray-600 max-w-xs leading-relaxed">Built by a team that believes well-being is not a luxury, it is a foundation</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-velvet-100 flex items-center justify-center mb-5">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M12 2L13.8 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10.2Z" fill="#7a4bdf"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">What we do</h3>
              <p className="text-gray-600 leading-relaxed text-sm">Unicorn is a holistic well-being platform that tracks all 8 dimensions of life — from physical health and career to creativity and spirituality. We combine biometric data, personalised micro-actions, and structured habit programs to help you grow every day.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-ochre-100 flex items-center justify-center mb-5">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M12 3C12 3 4 7 4 13C4 17 7.6 20 12 20C16.4 20 20 17 20 13C20 7 12 3 12 3Z" fill="#d4962a" opacity="0.8"/>
                  <circle cx="12" cy="13" r="3" fill="#fef08a"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Our mission</h3>
              <p className="text-gray-600 leading-relaxed text-sm">To make holistic well-being accessible, measurable, and enjoyable for everyone. We believe small consistent actions — guided by data and personalised to you — create extraordinary life transformations over time.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center mb-5">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <circle cx="12" cy="12" r="9" stroke="#22c55e" strokeWidth="1.5"/>
                  <path d="M12 7V12L15 15" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Our vision</h3>
              <p className="text-gray-600 leading-relaxed text-sm">A world where every person has the tools and clarity to live a fully balanced life. We envision Unicorn as the global companion for personal growth — connecting body, mind, and purpose in one beautiful experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-32 bg-velvet-600 text-white">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <p className="text-xs font-mono tracking-widest text-velvet-300 uppercase mb-6">007/ Start</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="text-5xl md:text-7xl font-black leading-none max-w-2xl">Ready to begin your wellness journey?</h2>
            <div className="flex flex-col items-start gap-4">
              <p className="text-ochre-200 text-lg max-w-xs">Take your well-being seriously and start free with no commitment.</p>
              <Link href="/signup" className="inline-flex items-center gap-2 border-2 border-ochre-200 text-ochre-200 font-bold px-8 py-4 rounded-full hover:bg-ochre-200/10 transition-colors">
                Get started — it&apos;s free <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-velvet-500 flex items-center justify-center text-base">🦄</div>
              Unicorn Well-Being
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <Link href="/login" className="hover:text-white transition-colors">Sign in</Link>
              <Link href="/signup" className="hover:text-white transition-colors">Sign up</Link>
            </div>
            <p className="text-sm">© 2026 Unicorn Well-Being. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
