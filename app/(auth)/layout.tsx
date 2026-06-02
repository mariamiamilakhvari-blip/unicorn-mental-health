'use client'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage()
  const bullets = [t('authBullet1'), t('authBullet2'), t('authBullet3'), t('authBullet4')]

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-velvet-600 flex-col justify-between p-12 text-white">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-velvet-500 flex items-center justify-center text-lg">🦄</div>
            <span className="text-xl font-bold">Unicorn</span>
          </Link>
          <LanguageSwitcher variant="dark" />
        </div>

        <div>
          <h2 className="text-4xl font-black leading-tight mb-6">{t('authPanelTitle')}</h2>
          <div className="space-y-4">
            {bullets.map(text => (
              <div key={text} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-ochre-400 mt-2 shrink-0" />
                <p className="text-white/80 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-velvet-500 flex items-center justify-center text-base">🦄</div>
              <span className="text-lg font-bold text-black">Unicorn</span>
            </Link>
            <LanguageSwitcher />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
