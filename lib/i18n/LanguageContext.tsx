'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Lang, TranslationKey } from './translations'

interface LanguageContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => translations.en[key],
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('unicorn_lang') as Lang | null
    if (saved && ['en', 'es', 'it', 'fr'].includes(saved)) setLangState(saved)
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('unicorn_lang', l)
  }

  function t(key: TranslationKey): string {
    return (translations[lang] as Record<string, string>)[key] ?? translations.en[key]
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
