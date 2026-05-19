'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Star, Zap, CreditCard } from 'lucide-react'

const TABS = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/hobbies', icon: Star, label: 'Hobbies' },
  { href: '/challenges', icon: Zap, label: 'Challenges' },
  { href: '/subscription', icon: CreditCard, label: 'Plan' },
]

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-t border-border safe-area-pb">
      <div className="max-w-lg mx-auto flex">
        {TABS.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                active ? 'text-unicorn-600' : 'text-muted-foreground hover:text-unicorn-500'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-colors ${active ? 'bg-unicorn-100' : ''}`}>
                <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-medium ${active ? 'text-unicorn-600' : ''}`}>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
