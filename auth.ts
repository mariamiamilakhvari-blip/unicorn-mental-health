import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Apple from 'next-auth/providers/apple'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        await connectDB()
        const user = await User.findOne({ email: (credentials.email as string).toLowerCase() })
        if (!user || !user.password) return null
        const valid = await bcrypt.compare(credentials.password as string, user.password)
        if (!valid) return null
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
          onboardingCompleted: user.onboardingCompleted,
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    Apple({
      clientId: process.env.APPLE_ID ?? '',
      clientSecret: process.env.APPLE_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' || account?.provider === 'apple') {
        await connectDB()
        const existing = await User.findOne({ email: user.email })
        if (!existing) {
          const newUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account.provider,
            googleId: account.provider === 'google' ? account.providerAccountId : undefined,
            appleId: account.provider === 'apple' ? account.providerAccountId : undefined,
            subscription: {
              plan: 'free_trial',
              status: 'active',
              trialEndsAt: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
            },
          })
          user.id = newUser._id.toString()
          user.onboardingCompleted = false
        } else {
          user.id = existing._id.toString()
          user.onboardingCompleted = existing.onboardingCompleted
        }
      }
      return true
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id ?? ''
        token.onboardingCompleted = user.onboardingCompleted ?? false
      }
      if (trigger === 'update') {
        await connectDB()
        const dbUser = await User.findById(token.id)
        if (dbUser) token.onboardingCompleted = dbUser.onboardingCompleted
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.onboardingCompleted = token.onboardingCompleted
      return session
    },
  },
  pages: { signIn: '/login', error: '/login' },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
})
