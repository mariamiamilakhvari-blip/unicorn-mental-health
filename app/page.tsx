'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle2, Menu, X, Moon, Sun } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

function CircleIcon({ iconKey }: { iconKey: string }) {
  if (iconKey === 'Joy') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <path d="M4 24 Q8 8 16 7 Q24 6 28 24" stroke="#5e2d8f" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M7 24 Q10 12 16 11 Q22 10 25 24" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M10 24 Q12 16 16 15 Q20 14 22 24" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
  if (iconKey === 'Spirituality') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <path d="M16 3L17.8 13H27L19.5 19L22 29L16 23.5L10 29L12.5 19L5 13H14.2Z" fill="#7a4bdf" opacity="0.9"/>
      <circle cx="16" cy="14" r="3" fill="#fef08a"/>
    </svg>
  )
  if (iconKey === 'Creativity') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <circle cx="12" cy="13" r="6" fill="#c4a8fc" opacity="0.8"/>
      <circle cx="21" cy="13" r="6" fill="#fef08a" opacity="0.8"/>
      <circle cx="16" cy="21" r="6" fill="#86efac" opacity="0.8"/>
    </svg>
  )
  if (iconKey === 'Social Life') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <path d="M10 7C7.5 7 5 9 5 12C5 17 10 22 10 22C10 22 15 17 15 12C15 9 12.5 7 10 7Z" fill="#f472b6" opacity="0.85"/>
      <path d="M22 10C19.5 10 17 12 17 15C17 20 22 25 22 25C22 25 27 20 27 15C27 12 24.5 10 22 10Z" fill="#7a4bdf" opacity="0.75"/>
    </svg>
  )
  if (iconKey === 'Finances') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <polygon points="16,3 27,11 23,27 9,27 5,11" fill="#fef08a" stroke="#d4962a" strokeWidth="1.5"/>
      <polygon points="16,7 23,13 20,23 12,23 9,13" fill="#fde047" opacity="0.5"/>
      <polygon points="16,11 20,14 18,20 14,20 12,14" fill="#fff" opacity="0.7"/>
    </svg>
  )
  if (iconKey === 'Career') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <path d="M19 3L9 17H16L12 29L24 13H17Z" fill="#5e2d8f"/>
      <circle cx="25" cy="8" r="3" fill="#fef08a"/>
    </svg>
  )
  if (iconKey === 'Education') return (
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

const CIRCLE_KEYS = [
  { key: 'Joy', tKey: 'circleJoy' as const },
  { key: 'Spirituality', tKey: 'circleSpirituality' as const },
  { key: 'Creativity', tKey: 'circleCreativity' as const },
  { key: 'Social Life', tKey: 'circleSocialLife' as const },
  { key: 'Finances', tKey: 'circleFinances' as const },
  { key: 'Career', tKey: 'circleCareer' as const },
  { key: 'Education', tKey: 'circleEducation' as const },
  { key: 'Physical Health', tKey: 'circlePhysicalHealth' as const },
]

export default function LandingPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('yearly')
  const [dark, setDark] = useState(false)

  const FEATURES = [
    { title: t('feature1Title'), desc: t('feature1Desc') },
    { title: t('feature2Title'), desc: t('feature2Desc') },
    { title: t('feature3Title'), desc: t('feature3Desc') },
    { title: t('feature4Title'), desc: t('feature4Desc') },
    { title: t('feature5Title'), desc: t('feature5Desc') },
    { title: t('feature6Title'), desc: t('feature6Desc') },
  ]

  const STEPS = [
    { num: t('step1Num'), title: t('step1Title'), desc: t('step1Desc') },
    { num: t('step2Num'), title: t('step2Title'), desc: t('step2Desc') },
    { num: t('step3Num'), title: t('step3Title'), desc: t('step3Desc') },
  ]

  const FREE_FEATURES = [t('pricingFreeFeature1'), t('pricingFreeFeature2'), t('pricingFreeFeature3'), t('pricingFreeFeature4'), t('pricingFreeFeature5')]
  const PREMIUM_FEATURES = [t('pricingPremiumFeature1'), t('pricingPremiumFeature2'), t('pricingPremiumFeature3'), t('pricingPremiumFeature4'), t('pricingPremiumFeature5'), t('pricingPremiumFeature6')]

  useEffect(() => {
    if (session?.user?.onboardingCompleted) {
      router.replace('/home')
    }
  }, [session, router])

  return (
    <div className={`min-h-screen bg-white text-black${dark ? ' dark' : ''}`}>

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-100 dark:border-gray-700 shadow-sm font-black text-black dark:text-white">
          <div className="w-6 h-6 rounded-md bg-velvet-500 flex items-center justify-center text-sm">🦄</div>
          Unicorn
        </Link>

        <nav className="hidden md:flex bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full border border-gray-100 dark:border-gray-700 shadow-sm px-3 py-1.5 items-center gap-1 text-sm font-medium">
          <a href="#features" className="px-3 py-1.5 text-black dark:text-white hover:text-velvet-500 transition-colors">{t('navFeatures')}</a>
          <a href="#how-it-works" className="px-3 py-1.5 text-black dark:text-white hover:text-velvet-500 transition-colors">{t('navHowItWorks')}</a>
          <a href="#pricing" className="px-3 py-1.5 text-black dark:text-white hover:text-velvet-500 transition-colors">{t('navPricing')}</a>
          <a href="#about" className="px-3 py-1.5 text-black dark:text-white hover:text-velvet-500 transition-colors">{t('navAbout')}</a>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setDark(v => !v)}
            className="p-2 rounded-full border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link href="/login" className="text-sm font-semibold px-4 py-2 rounded-full border-2 border-ochre-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-black dark:text-white hover:bg-ochre-50 dark:hover:bg-gray-800 transition-colors">{t('navSignIn')}</Link>
          <Link href="/signup" className="text-sm font-semibold bg-velvet-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-velvet-600 transition-all flex items-center gap-1.5">
            {t('navGetStarted')}
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setDark(v => !v)}
            className="p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-100 dark:border-gray-700 shadow-sm text-black dark:text-white"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={() => setMenuOpen(v => !v)} className="p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-100 dark:border-gray-700 shadow-sm text-black dark:text-white">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-20 left-4 right-4 md:hidden bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl px-6 py-5 flex flex-col gap-4 text-sm font-medium text-black dark:text-white">
            <a href="#features" onClick={() => setMenuOpen(false)}>{t('navFeatures')}</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>{t('navHowItWorks')}</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>{t('navPricing')}</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>{t('navAbout')}</a>
            <Link href="/login">{t('navSignIn')}</Link>
            <Link href="/signup" className="text-velvet-500 font-semibold">{t('navGetStarted')}</Link>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen bg-gradient-to-br from-velvet-50 via-white to-ochre-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex flex-col justify-end pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-velvet-100/30 via-transparent to-ochre-100/20 dark:from-velvet-900/10 dark:to-ochre-900/10 pointer-events-none" />

        <div className="absolute top-24 left-1/2 -translate-x-1/2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sage-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-black dark:text-white text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-sage-500 animate-pulse" />
            {t('heroBadge')}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 md:px-12 w-full">
          <p className="text-xs font-mono tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-4">{t('heroLabel')}</p>
          <h1 className="text-6xl md:text-8xl font-black text-black dark:text-white leading-none mb-6 max-w-4xl">
            {t('heroTitle1')}{' '}
            <span className="text-velvet-500">{t('heroTitleHighlight')}</span>{' '}
            {t('heroTitle2')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl mb-10 leading-relaxed">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link href="/signup" className="flex items-center gap-2 bg-velvet-500 text-white font-bold px-8 py-4 rounded-full shadow-xl hover:bg-velvet-600 transition-all text-base">
              {t('heroStartFree')} <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#how-it-works" className="flex items-center gap-2 text-black dark:text-white font-semibold px-8 py-4 rounded-full border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 hover:border-ochre-300 transition-all text-base">
              {t('heroSeeHow')}
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 right-8 hidden lg:flex flex-wrap justify-end gap-2 max-w-xs">
          {CIRCLE_KEYS.map((c, i) => (
            <span key={c.key} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-600 text-xs font-medium text-black dark:text-white shadow-sm">
              <CircleIcon iconKey={c.key} /> {t(c.tKey)}
            </span>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="border-y border-gray-100 dark:border-gray-700 py-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 text-sm text-black dark:text-white">
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5"><path d="M10 17C10 17 2 11 2 6C2 3.8 3.8 2 6 2C7.5 2 8.8 2.9 9.4 4C9.4 4 9.6 3.5 10 3C10.6 1.9 11.9 1 13.5 1C15.7 1 18 3 18 6C18 11 10 17 10 17Z" fill="#f472b6" opacity="0.85"/><circle cx="16" cy="3" r="1.5" fill="#fef08a"/></svg>
            {t('proofWellness')}
          </span>
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5"><rect x="6" y="4" width="8" height="12" rx="2" fill="#e2d4fe" stroke="#7a4bdf" strokeWidth="1.2"/><path d="M3 7.5 L6 7.5" stroke="#7a4bdf" strokeWidth="1.2" strokeLinecap="round"/><path d="M14 7.5 L17 7.5" stroke="#7a4bdf" strokeWidth="1.2" strokeLinecap="round"/><path d="M7 10 L8.5 8 L10 11 L11.5 9 L13 10" stroke="#5e2d8f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {t('proofGarmin')}
          </span>
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5"><rect x="2" y="4" width="16" height="13" rx="2" fill="#fef9c3" stroke="#d4962a" strokeWidth="1.2"/><line x1="2" y1="8" x2="18" y2="8" stroke="#d4962a" strokeWidth="1.2"/><path d="M11 5 L9 11 H12 L10 15 L14 9 H11Z" fill="#5e2d8f"/></svg>
            {t('proofChallenges')}
          </span>
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5"><path d="M10 2L11.5 7H17L12.5 10.5L14 16L10 12.5L6 16L7.5 10.5L3 7H8.5Z" fill="#fef08a" stroke="#d4962a" strokeWidth="1"/></svg>
            {t('proofMilestone')}
          </span>
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5"><path d="M10 2L17 5V10C17 14 10 18 10 18C10 18 3 14 3 10V5Z" fill="#c4a8fc" stroke="#7a4bdf" strokeWidth="1.2"/><path d="M10 6L11 10H13L10 14L9 10H7Z" fill="#5e2d8f" opacity="0.8"/></svg>
            {t('proofPrivacy')}
          </span>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-mono tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-4">{t('featuresLabel')}</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-5xl font-black text-black dark:text-white">{t('featuresTitle')}</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">{t('featuresSubtitle')}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="group p-8 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-ochre-200 dark:hover:border-ochre-700 hover:shadow-xl hover:shadow-ochre-50 dark:hover:shadow-none transition-all cursor-default dark:bg-gray-800">
                <div className="w-10 h-10 rounded-xl bg-ochre-100 dark:bg-ochre-900/30 mb-5 flex items-center justify-center">
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                    <polygon points="10,2 13,14 10,12 7,14" fill="#7a4bdf" opacity="0.9"/>
                    <circle cx="15" cy="5" r="1.2" fill="#5e2d8f" opacity="0.5"/>
                    <circle cx="5" cy="8" r="0.8" fill="#5e2d8f" opacity="0.4"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-32 bg-gradient-to-br from-ochre-50 to-sage-50 dark:from-gray-800 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-mono tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-4">{t('howLabel')}</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-5xl font-black text-black dark:text-white">{t('howTitle')}</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">{t('howSubtitle')}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map(s => (
              <div key={s.num} className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 relative">
                <div className="text-7xl font-black text-ochre-100 dark:text-ochre-900/50 mb-4 leading-none">{s.num}</div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">{s.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CIRCLE OF LIFE */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-mono tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-4">{t('circleLabel')}</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-5xl font-black text-black dark:text-white">{t('circleTitle')}</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">{t('circleSubtitle')}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 w-full">
            {CIRCLE_KEYS.map((c, i) => (
              <div key={c.key} className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-center p-3 border gap-1 ${
                i % 4 === 0 ? 'bg-ochre-50 border-ochre-200 dark:bg-amber-900/20 dark:border-amber-800' :
                i % 4 === 1 ? 'bg-velvet-50 border-velvet-100 dark:bg-violet-900/20 dark:border-violet-800' :
                i % 4 === 2 ? 'bg-sage-50 border-sage-100 dark:bg-green-900/20 dark:border-green-800' :
                'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
              }`}>
                <CircleIcon iconKey={c.key} />
                <span className="text-[11px] font-semibold text-black dark:text-white leading-tight">{t(c.tKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-mono tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-4">{t('pricingLabel')}</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-5xl font-black text-black dark:text-white">{t('pricingTitle')}</h2>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sage-200 dark:border-gray-600 bg-transparent text-black dark:text-white text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-sage-500 animate-pulse" />
                {t('pricingBadge')}
              </div>
            </div>
          </div>

          <div className="flex mb-10">
            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full p-1 flex gap-1">
              <button onClick={() => setPlan('monthly')} className={`px-6 py-2 rounded-full text-sm font-medium transition-all border-2 border-ochre-300 bg-transparent text-black dark:text-white hover:bg-ochre-50 dark:hover:bg-ochre-900/20 ${plan === 'monthly' ? 'shadow' : 'opacity-60'}`}>{t('pricingMonthly')}</button>
              <button onClick={() => setPlan('yearly')} className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${plan === 'yearly' ? 'bg-black dark:bg-white text-white dark:text-black shadow' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}>
                {t('pricingYearly')} <span className="ml-2 px-2 py-0.5 rounded-full bg-white dark:bg-gray-800 text-black dark:text-white text-xs font-bold border border-gray-200 dark:border-gray-600">{t('pricingSave')}</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">{t('pricingFreeTrial')}</div>
              <div className="text-5xl font-black text-black dark:text-white mb-1">$0</div>
              <div className="text-gray-600 dark:text-gray-400 mb-8">{t('pricingFreeDays')}</div>
              <ul className="space-y-3 mb-8">
                {FREE_FEATURES.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-black dark:text-white">
                    <CheckCircle2 className="h-4 w-4 text-sage-500 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full text-center py-3 rounded-full border-2 border-gray-200 dark:border-gray-600 font-semibold text-black dark:text-white hover:border-ochre-300 hover:bg-ochre-50 dark:hover:bg-ochre-900/20 transition-all">
                {t('pricingFreeBtn')}
              </Link>
            </div>

            <div className="bg-velvet-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
              <div className="text-sm font-semibold text-ochre-200 mb-2">{t('pricingPremium')}</div>
              <div className="text-5xl font-black mb-1">{plan === 'yearly' ? '$59.99' : '$4.99'}</div>
              <div className="text-ochre-200 mb-8">per {plan === 'yearly' ? t('pricingPerYear') : t('pricingPerMonth')} · {t('pricingCancelAnytime')}</div>
              <ul className="space-y-3 mb-8">
                {PREMIUM_FEATURES.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white">
                    <CheckCircle2 className="h-4 w-4 text-ochre-300 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full text-center py-3 rounded-full bg-ochre-300 text-black font-bold hover:bg-ochre-400 transition-colors">
                {t('pricingPremiumBtn')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className="py-32 bg-gradient-to-br from-velvet-50 to-ochre-50 dark:from-gray-800 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="mb-16">
            <p className="text-xs font-mono tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-4">{t('aboutLabel')}</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-5xl font-black text-black dark:text-white">{t('aboutTitle')}</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">{t('aboutSubtitle')}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: t('aboutCard1Title'), body: t('aboutCard1Body'), bg: 'bg-velvet-100 dark:bg-velvet-900/30', svg: <path d="M12 2L13.8 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10.2Z" fill="#7a4bdf"/> },
              { title: t('aboutCard2Title'), body: t('aboutCard2Body'), bg: 'bg-ochre-100 dark:bg-ochre-900/30', svg: <><path d="M12 3C12 3 4 7 4 13C4 17 7.6 20 12 20C16.4 20 20 17 20 13C20 7 12 3 12 3Z" fill="#d4962a" opacity="0.8"/><circle cx="12" cy="13" r="3" fill="#fef08a"/></> },
              { title: t('aboutCard3Title'), body: t('aboutCard3Body'), bg: 'bg-sage-100 dark:bg-green-900/30', svg: <><circle cx="12" cy="12" r="9" stroke="#22c55e" strokeWidth="1.5"/><path d="M12 7V12L15 15" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/></> },
            ].map(card => (
              <div key={card.title} className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-5`}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">{card.svg}</svg>
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-3">{card.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-velvet-600 text-white">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <p className="text-xs font-mono tracking-widest text-velvet-300 uppercase mb-6">{t('ctaLabel')}</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="text-5xl md:text-7xl font-black leading-none max-w-2xl">{t('ctaTitle')}</h2>
            <div className="flex flex-col items-start gap-4">
              <p className="text-ochre-200 text-lg max-w-xs">{t('ctaSubtitle')}</p>
              <Link href="/signup" className="inline-flex items-center gap-2 border-2 border-ochre-200 text-ochre-200 font-bold px-8 py-4 rounded-full hover:bg-ochre-200/10 transition-colors">
                {t('ctaBtn')} <ArrowRight className="h-5 w-5" />
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
              <a href="#features" className="hover:text-white transition-colors">{t('navFeatures')}</a>
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
