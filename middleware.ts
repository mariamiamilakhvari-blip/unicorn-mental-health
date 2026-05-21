import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const session = req.auth
  const { pathname } = req.nextUrl

  const isDashboard = ['/home', '/challenges', '/hobbies', '/profile', '/subscription'].some(p => pathname.startsWith(p))
  const isOnboarding = ['/questions', '/permissions', '/smartwatch'].some(p => pathname.startsWith(p))
  const isAuthPage = ['/login', '/signup', '/forgot-password', '/reset-password'].some(p => pathname.startsWith(p))

  if (!session && (isDashboard || isOnboarding)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (session && !session.user.onboardingCompleted && isDashboard) {
    return NextResponse.redirect(new URL('/permissions', req.url))
  }

  if (session && session.user.onboardingCompleted && isAuthPage) {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
