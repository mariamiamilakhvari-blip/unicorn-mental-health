'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Heart, Zap, Star, CheckCircle2, Menu, X } from 'lucide-react'
import { getUser } from '@/lib/mock-auth'

const FEATURES = [
  { icon: '🦄', title: 'Circle of Life', desc: 'Track all 8 dimensions of wellbeing — Joy, Career, Relationships, Health, and more — in one beautiful dashboard.' },
  { icon: '⚡', title: 'Random Challenges', desc: '21-day micro-challenges across social life, business, and relationships, with daily check-ins and progress tracking.' },
  { icon: '🌟', title: 'Milestone Hobbies', desc: 'Choose a hobby and follow a structured 3-month program with weekly encouragement and stage-by-stage milestones.' },
  { icon: '⌚', title: 'Garmin Integration', desc: 'Sync heart rate, stress, sleep quality, and activity data directly from your Garmin smartwatch in real time.' },
  { icon: '🎯', title: 'Daily Micro-Actions', desc: 'Receive bite-sized, personalised wellness nudges every 48 hours, tailored to your profile and goals.' },
  { icon: '📊', title: 'Smart Analytics', desc: 'See your progress across every life dimension with heatmaps, progress rings, and insightful trend charts.' },
]

const STEPS = [
  { num: '01', title: 'Create your account', desc: 'Sign up with email or continue with Google or Apple — takes under 60 seconds.' },
  { num: '02', title: 'Build your profile', desc: 'Answer 14 personalised questions about your lifestyle, goals, and motivators.' },
  { num: '03', title: 'Live your best life', desc: 'Get your personalised dashboard with daily micro-actions and smartwatch-powered insights.' },
]

const CIRCLE = ['😊 Joy', '🙏 Spirituality', '🎨 Creativity', '🫂 Social Life', '💰 Finances', '💼 Career', '📚 Education', '💪 Physical Health']

export default function LandingPage() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('yearly')

  useEffect(() => {
    const user = getUser()
    if (user && localStorage.getItem('unicorn_onboarded') === 'true') {
      router.replace('/home')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-unicorn-500 to-unicorn-700 flex items-center justify-center text-base shadow">🦄</div>
            <span className="bg-gradient-to-r from-unicorn-600 to-unicorn-800 bg-clip-text text-transparent">Unicorn</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-unicorn-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-unicorn-600 transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-unicorn-600 transition-colors">Pricing</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-unicorn-600 transition-colors px-4 py-2">Sign in</Link>
            <Link href="/signup" className="text-sm font-semibold bg-gradient-to-r from-unicorn-500 to-unicorn-700 text-white px-5 py-2.5 rounded-xl shadow-md shadow-unicorn-200 hover:from-unicorn-600 hover:to-unicorn-800 transition-all flex items-center gap-1.5">
              Get started free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button onClick={() => setMenuOpen(v => !v)} className="md:hidden p-2 rounded-lg hover:bg-muted">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 px-6 py-4 flex flex-col gap-4 text-sm font-medium">
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
            <Link href="/login">Sign in</Link>
            <Link href="/signup" className="text-unicorn-600 font-semibold">Get started free →</Link>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-unicorn-50 via-white to-sage-50 pt-24 pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-unicorn-100/40 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-unicorn-100 text-unicorn-700 text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-unicorn-500 animate-pulse" />
            21-day free trial · No credit card required
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6">
            Transform your{' '}
            <span className="bg-gradient-to-r from-unicorn-500 to-unicorn-700 bg-clip-text text-transparent">
              mental health
            </span>{' '}
            journey
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-10 leading-relaxed">
            Personalised wellness tracking powered by smartwatch data, science-backed micro-actions, and a structured milestone program — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="flex items-center gap-2 bg-gradient-to-r from-unicorn-500 to-unicorn-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-unicorn-200 hover:from-unicorn-600 hover:to-unicorn-800 transition-all text-lg">
              Start for free <ArrowRight className="h-5 w-5" />
            </Link>
            <a href="#how-it-works" className="flex items-center gap-2 text-gray-600 font-semibold px-8 py-4 rounded-2xl border border-gray-200 hover:border-unicorn-300 hover:text-unicorn-600 transition-all text-lg">
              See how it works
            </a>
          </div>

          {/* Circle of Life preview chips */}
          <div className="mt-16 flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {CIRCLE.map(c => (
              <span key={c} className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 shadow-sm hover:border-unicorn-300 hover:shadow-md transition-all cursor-default">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="border-y border-gray-100 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
          <span className="flex items-center gap-2"><Heart className="h-4 w-4 text-rose-400" /> Wellness-first design</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-sage-500" /> Garmin integration</span>
          <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-amber-500" /> 21-day challenges</span>
          <span className="flex items-center gap-2"><Star className="h-4 w-4 text-unicorn-500" /> Milestone tracking</span>
          <span className="flex items-center gap-2"><span className="text-base">🔒</span> Privacy first</span>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Everything you need to thrive</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Six powerful modules working together to support every dimension of your wellbeing.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="group p-8 rounded-2xl border border-gray-100 hover:border-unicorn-200 hover:shadow-xl hover:shadow-unicorn-50 transition-all cursor-default">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-unicorn-50 to-sage-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Up and running in minutes</h2>
            <p className="text-xl text-gray-500">Three simple steps to your personalised wellness plan.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map(s => (
              <div key={s.num} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative">
                <div className="text-6xl font-black text-unicorn-100 mb-4 leading-none">{s.num}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CIRCLE OF LIFE ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-4">The Circle of Life</h2>
              <p className="text-xl text-gray-500 mb-6 leading-relaxed">
                Track all 8 dimensions of a fulfilling life. Receive tailored notifications every 48 hours with micro-actions to strengthen each area.
              </p>
              <ul className="space-y-3">
                {CIRCLE.map(c => (
                  <li key={c} className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-unicorn-500" />
                    <span className="font-medium">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {CIRCLE.map((c, i) => (
                <div key={c} className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-center p-3 border ${
                  i % 4 === 0 ? 'bg-yellow-50 border-yellow-200' :
                  i % 4 === 1 ? 'bg-indigo-50 border-indigo-200' :
                  i % 4 === 2 ? 'bg-pink-50 border-pink-200' :
                  'bg-green-50 border-green-200'
                }`}>
                  <span className="text-2xl mb-1">{c.split(' ')[0]}</span>
                  <span className="text-[10px] font-semibold text-gray-600 leading-tight">{c.substring(c.indexOf(' ') + 1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Simple, honest pricing</h2>
            <p className="text-xl text-gray-500">Start free for 21 days. No credit card required.</p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-1 flex gap-1">
              <button onClick={() => setPlan('monthly')} className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${plan === 'monthly' ? 'bg-gray-900 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}>Monthly</button>
              <button onClick={() => setPlan('yearly')} className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all relative ${plan === 'yearly' ? 'bg-gray-900 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}>
                Yearly <span className="ml-2 px-2 py-0.5 rounded-full bg-sage-100 text-sage-700 text-xs font-bold">Save 17%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free trial */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-sm font-semibold text-gray-500 mb-2">Free Trial</div>
              <div className="text-4xl font-black text-gray-900 mb-1">$0</div>
              <div className="text-gray-500 mb-6">21 days, no card needed</div>
              <ul className="space-y-3 mb-8">
                {['Full platform access', 'All 8 Circle of Life categories', 'Hobby milestone program', '21-day challenges', 'Garmin sync'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-sage-500 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full text-center py-3 rounded-xl border-2 border-gray-200 font-semibold hover:border-unicorn-400 hover:text-unicorn-600 transition-all">
                Start free trial
              </Link>
            </div>

            {/* Premium */}
            <div className="bg-gradient-to-br from-unicorn-600 to-unicorn-800 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
              <div className="text-sm font-semibold text-unicorn-200 mb-2">Premium</div>
              <div className="text-4xl font-black mb-1">{plan === 'yearly' ? '$59.99' : '$4.99'}</div>
              <div className="text-unicorn-200 mb-6">per {plan === 'yearly' ? 'year' : 'month'} · cancel anytime</div>
              <ul className="space-y-3 mb-8">
                {['Everything in free trial', 'Unlimited challenges & hobbies', 'Advanced analytics', 'Priority notifications', 'Community access', 'Future features included'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-unicorn-100">
                    <CheckCircle2 className="h-4 w-4 text-white shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full text-center py-3 rounded-xl bg-white text-unicorn-700 font-bold hover:bg-unicorn-50 transition-colors">
                Get Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 bg-gradient-to-r from-unicorn-600 to-unicorn-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Ready to begin your wellness journey?</h2>
          <p className="text-unicorn-200 text-xl mb-8">Join thousands of people taking their mental health seriously. Start free, no commitment.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-white text-unicorn-700 font-bold px-10 py-4 rounded-2xl shadow-xl hover:bg-unicorn-50 transition-colors text-lg">
            Get started — it&apos;s free <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-unicorn-500 to-unicorn-700 flex items-center justify-center text-base">🦄</div>
              Unicorn Mental Health
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <Link href="/login" className="hover:text-white transition-colors">Sign in</Link>
              <Link href="/signup" className="hover:text-white transition-colors">Sign up</Link>
            </div>
            <p className="text-sm">© 2026 Unicorn Mental Health. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
