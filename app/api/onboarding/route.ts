import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { profile, permissions, smartwatchProvider } = await req.json()
    await connectDB()
    await User.findByIdAndUpdate(session.user.id, {
      profile,
      permissions,
      smartwatchProvider,
      onboardingCompleted: true,
    })
    return NextResponse.json({ message: 'Onboarding complete' })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json()
    await connectDB()
    await User.findByIdAndUpdate(session.user.id, { $set: body })
    return NextResponse.json({ message: 'Updated' })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
