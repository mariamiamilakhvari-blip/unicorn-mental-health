'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'
import { clearUser, getUser } from '@/lib/mock-auth'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '/home', label: 'Home' },
  { href: '/hobbies', label: 'Hobbies' },
  { href: '/challenges', label: 'Challenges' },
  { href: '/subscription', label: 'Premium' },
]

export function TopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const user = getUser()
    if (user) setUserName(user.name.split(' ')[0])
  }, [])

  function signOut() {
    clearUser()
    router.replace('/login')
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ochre-400 to-velvet-600 flex items-center justify-center">
            <span className="text-base">🦄</span>
          </div>
          <span className="font-bold text-gray-900 text-lg">Unicorn</span>
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-ochre-50 text-velvet-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right: user */}
        <div className="relative flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-ochre-300 to-velvet-500 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">{userName || 'Account'}</span>
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User className="h-4 w-4" />
                  Profile & Settings
                </Link>
                <div className="my-1 border-t border-gray-100" />
                <button
                  onClick={signOut}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-gray-100 px-4 py-1.5 flex gap-1 overflow-x-auto">
        {NAV_LINKS.map(link => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                active ? 'bg-ochre-50 text-velvet-600' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </header>
  )
}
