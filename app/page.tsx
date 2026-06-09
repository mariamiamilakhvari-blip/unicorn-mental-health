'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle2, Menu, X, Moon, Sun } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'


export default function LandingPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('yearly')
  const [dark, setDark] = useState(false)
const STEPS = [
    { num: t('step1Num'), title: t('step1Title'), desc: t('step1Desc') },
    { num: t('step2Num'), title: t('step2Title'), desc: t('step2Desc') },
    { num: t('step3Num'), title: t('step3Title'), desc: t('step3Desc') },
  ]

  const PREMIUM_FEATURES = [t('pricingPremiumFeature1'), t('pricingPremiumFeature2'), t('pricingPremiumFeature3'), t('pricingPremiumFeature4'), t('pricingPremiumFeature5'), t('pricingPremiumFeature6')]

  useEffect(() => {
    if (session?.user?.onboardingCompleted) {
      router.replace('/home')
    }
  }, [session, router])

  return (
    <div className={`min-h-screen bg-white text-black${dark ? ' dark' : ''}`}>

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-sky-100/60 dark:border-gray-700">
        <Link href="/" className="flex items-center gap-2 font-black text-slate-900 dark:text-white">
          <div className="w-6 h-6 rounded-md bg-velvet-500 flex items-center justify-center text-sm">🦄</div>
          Unicorn
        </Link>

        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-full border border-sky-100 dark:border-gray-700 shadow-sm px-3 py-1.5 items-center gap-1 text-sm font-medium">
<a href="#how-it-works" className="px-3 py-1.5 text-slate-700 dark:text-white hover:text-velvet-500 transition-colors">{t('navHowItWorks')}</a>
          <a href="#pricing" className="px-3 py-1.5 text-slate-700 dark:text-white hover:text-velvet-500 transition-colors">{t('navPricing')}</a>
          <a href="#about" className="px-3 py-1.5 text-slate-700 dark:text-white hover:text-velvet-500 transition-colors">{t('navAbout')}</a>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <button onClick={() => setDark(v => !v)} className="p-2 rounded-full border border-sky-200 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 text-slate-700 dark:text-white hover:bg-sky-50 transition-colors" aria-label="Toggle dark mode">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link href="/login" className="text-sm font-semibold px-4 py-2 rounded-full border-2 border-sky-200 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 text-slate-800 dark:text-white hover:bg-sky-50 transition-colors">{t('navSignIn')}</Link>
          <Link href="/signup" className="text-sm font-semibold bg-velvet-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-velvet-700 transition-all">{t('navGetStarted')}</Link>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <button onClick={() => setDark(v => !v)} className="p-2 rounded-full bg-white/80 dark:bg-gray-900/80 border border-sky-100 dark:border-gray-700 text-slate-700 dark:text-white" aria-label="Toggle dark mode">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={() => setMenuOpen(v => !v)} className="p-2 rounded-full bg-white/80 dark:bg-gray-900/80 border border-sky-100 dark:border-gray-700 text-slate-700 dark:text-white">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-20 left-4 right-4 md:hidden bg-white dark:bg-gray-900 rounded-2xl border border-sky-100 dark:border-gray-700 shadow-xl px-6 py-5 flex flex-col gap-4 text-sm font-medium text-slate-800 dark:text-white">
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>{t('navHowItWorks')}</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>{t('navPricing')}</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>{t('navAbout')}</a>
            <Link href="/login">{t('navSignIn')}</Link>
            <Link href="/signup" className="text-velvet-500 font-semibold">{t('navGetStarted')}</Link>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#dff0fb] via-[#e8f5fd] to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        {/* Ice blue radial glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(186,230,253,0.6)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(224,242,254,0.8)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-8 pt-28 pb-20 gap-10 w-full max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <p className="text-xs font-mono tracking-widest text-sky-400 uppercase">{t('heroLabel')}</p>
            <h1 className="text-6xl md:text-8xl font-black text-black dark:text-white leading-none">
              Stay healthy,<br />
              happy &amp; prosperous
            </h1>
            <Link href="/signup" className="flex items-center gap-2 bg-velvet-600 text-white font-bold px-10 py-4 rounded-full shadow-xl hover:bg-velvet-700 transition-all text-base mt-10">
              {t('heroStartFree')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-32 bg-gradient-to-b from-[#dff0fb] via-[#e8f5fd] to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-mono tracking-widest text-sky-400 dark:text-gray-500 uppercase mb-4">{t('howLabel')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map(s => (
              <div key={s.num} className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md border border-gray-200 dark:border-gray-700 relative">
                <div className="text-7xl font-black text-velvet-600 dark:text-velvet-400 mb-4 leading-none">{s.num}</div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">{s.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32 bg-gradient-to-b from-[#dff0fb] via-[#e8f5fd] to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-mono tracking-widest text-sky-400 dark:text-gray-500 uppercase mb-4">{t('pricingLabel')}</p>
          </div>

          <div className="flex mb-10">
            <div className="bg-white/80 dark:bg-gray-700 border border-sky-100 dark:border-gray-600 rounded-full p-1 flex gap-1">
              <button onClick={() => setPlan('monthly')} className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${plan === 'monthly' ? 'bg-[#bae6fd] text-slate-900 shadow' : 'text-gray-500 hover:text-black'}`}>{t('pricingMonthly')}</button>
              <button onClick={() => setPlan('yearly')} className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${plan === 'yearly' ? 'bg-velvet-700 text-white shadow' : 'text-gray-500 hover:text-black'}`}>
                {t('pricingYearly')} <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold">{t('pricingSave')}</span>
              </button>
            </div>
          </div>

          <div className="max-w-xl">
            <div className="bg-velvet-700 rounded-2xl p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
              <div className="text-sm font-semibold text-sky-200 mb-2">{t('pricingPremium')}</div>
              <div className="flex items-end gap-3 mb-1">
                <span className="text-6xl font-black">{plan === 'yearly' ? '$149' : '$19.9'}</span>
                <span className="text-sky-200 mb-2">/ {plan === 'yearly' ? t('pricingPerYear') : t('pricingPerMonth')}</span>
              </div>
              <div className="text-sky-300 text-sm mb-8">After your 21-day free trial · {t('pricingCancelAnytime')}</div>
              <ul className="space-y-3 mb-10">
                {PREMIUM_FEATURES.filter(f => f).map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white">
                    <CheckCircle2 className="h-4 w-4 text-sky-300 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full text-center py-4 rounded-full bg-[#e0f2fe] text-slate-900 font-bold hover:bg-[#bae6fd] transition-colors text-base">
                Start free for 21 days
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className="py-32 bg-gradient-to-b from-[#dff0fb] via-[#e8f5fd] to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-mono tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-4">{t('aboutLabel')}</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-5xl font-black text-black dark:text-white">{t('aboutTitle')}</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {[
              { title: t('aboutCard2Title'), body: t('aboutCard2Body') },
              { title: t('aboutCard3Title'), body: t('aboutCard3Body') },
            ].map(card => (
              <div key={card.title} className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-xl font-bold text-black dark:text-white mb-3">{card.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{card.body}</p>
              </div>
            ))}
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
              <a href="#pricing" className="hover:text-white transition-colors">{t('navPricing')}</a>
              <Link href="/login" className="hover:text-white transition-colors">{t('navSignIn')}</Link>
              <Link href="/signup" className="hover:text-white transition-colors">{t('navGetStarted')}</Link>
            </div>
            <p className="text-sm">{t('footerCopy')}</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
