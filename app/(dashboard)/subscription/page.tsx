'use client'
import { useState } from 'react'
import { Check, Loader2, Crown, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const FEATURES = [
  { icon: '🌀', text: 'Full Circle of Life tracking' },
  { icon: '🎯', text: 'Unlimited hobby milestones' },
  { icon: '⚡', text: 'Unlimited random challenges' },
  { icon: '⌚', text: 'Garmin smartwatch sync' },
  { icon: '🧠', text: 'Personalised micro-actions' },
  { icon: '🔔', text: 'Priority wellness notifications' },
  { icon: '📊', text: 'Advanced analytics & insights' },
  { icon: '🫂', text: 'Community access' },
]

export default function SubscriptionPage() {
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('yearly')
  const [loading, setLoading] = useState(false)

  const TRIAL_DAYS = 21
  const savings = Math.round(((4.99 * 12 - 59.99) / (4.99 * 12)) * 100)

  function subscribe() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('Stripe checkout will be connected in Phase 2. Your plan: ' + plan)
    }, 800)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Unlock Unicorn Premium</h1>
        <p className="text-muted-foreground mt-2">Everything you need for your wellness journey</p>
      </div>

      {/* Trial banner */}
      <div className="bg-gradient-to-r from-unicorn-500 to-unicorn-700 rounded-2xl p-5 text-white flex items-center gap-4 max-w-2xl mx-auto">
        <div className="bg-white/20 p-3 rounded-xl shrink-0">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <p className="font-semibold">Free Trial Active — {TRIAL_DAYS} days remaining</p>
          <p className="text-sm opacity-90 mt-0.5">No payment needed yet. Cancel any time before the trial ends.</p>
        </div>
      </div>

      {/* Plan toggle */}
      <div className="flex justify-center">
        <div className="bg-muted rounded-xl p-1 flex gap-1 w-64">
          <button
            onClick={() => setPlan('monthly')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${plan === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-muted-foreground'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPlan('yearly')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all relative ${plan === 'yearly' ? 'bg-white shadow-sm text-gray-900' : 'text-muted-foreground'}`}
          >
            Yearly
            <span className="absolute -top-2.5 -right-1 px-1.5 py-0.5 rounded-full bg-sage-500 text-white text-[9px] font-bold">
              -{savings}%
            </span>
          </button>
        </div>
      </div>

      {/* Side-by-side plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
          <div className="mb-6">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Free Trial</span>
            <div className="mt-2">
              <span className="text-4xl font-black text-gray-900">$0</span>
              <span className="text-muted-foreground ml-1">/ 21 days</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">No credit card required</p>
          </div>
          <div className="space-y-3 mb-8">
            {['Circle of Life (3 categories)', '1 active challenge', '1 hobby milestone track', 'Basic notifications'].map(f => (
              <div key={f} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-gray-500" />
                </div>
                <span className="text-sm text-gray-600">{f}</span>
              </div>
            ))}
          </div>
          <div className="h-11 flex items-center justify-center rounded-xl border border-border text-sm font-semibold text-muted-foreground bg-gray-50">
            Current plan
          </div>
        </div>

        {/* Premium card */}
        <div className="bg-gradient-to-br from-unicorn-600 to-unicorn-800 rounded-2xl p-8 text-white shadow-xl shadow-unicorn-200 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <Crown className="h-8 w-8 text-white/30" />
          </div>
          <div className="mb-6">
            <span className="text-sm font-semibold text-unicorn-200 uppercase tracking-wide">Premium</span>
            <div className="mt-2">
              <span className="text-4xl font-black">
                {plan === 'yearly' ? '$59.99' : '$4.99'}
              </span>
              <span className="text-unicorn-200 ml-1">/ {plan === 'yearly' ? 'year' : 'month'}</span>
            </div>
            {plan === 'yearly'
              ? <p className="text-sage-300 text-sm font-semibold mt-1">That&apos;s just $5/month — save ${(4.99 * 12 - 59.99).toFixed(2)}</p>
              : <p className="text-unicorn-200 text-sm mt-1">Billed monthly · cancel anytime</p>}
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-8">
            {FEATURES.map(f => (
              <div key={f.text} className="flex items-center gap-2">
                <span className="text-sm shrink-0">{f.icon}</span>
                <span className="text-xs text-unicorn-100 leading-tight">{f.text}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={subscribe}
            disabled={loading}
            className="w-full h-12 bg-white text-unicorn-700 hover:bg-unicorn-50 font-bold rounded-xl text-base shadow-lg"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Zap className="h-5 w-5 mr-2" />}
            Start after trial · {plan === 'yearly' ? '$59.99/yr' : '$4.99/mo'}
          </Button>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Secure payment via Stripe · Cancel anytime · No hidden fees
      </p>
    </div>
  )
}
