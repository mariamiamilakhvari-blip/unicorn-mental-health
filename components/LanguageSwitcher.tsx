'use client'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { Lang } from '@/lib/i18n/translations'
import { useState } from 'react'
import { Globe } from 'lucide-react'

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
]

interface Props {
  variant?: 'light' | 'dark'
}

export function LanguageSwitcher({ variant = 'light' }: Props) {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const current = LANGS.find(l => l.code === lang) ?? LANGS[0]

  const base = variant === 'dark'
    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
    : 'bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-1.5 px-2.5 py-2 rounded-full border backdrop-blur-md text-sm font-medium transition-colors ${base}`}
        aria-label="Select language"
      >
        <Globe className="h-4 w-4" />
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg py-1 z-50">
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false) }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                  l.code === lang
                    ? 'bg-velvet-50 dark:bg-velvet-900/30 text-velvet-600 dark:text-velvet-300 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span>{l.flag}</span>
                {l.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
