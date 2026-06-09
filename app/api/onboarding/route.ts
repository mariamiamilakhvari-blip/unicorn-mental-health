import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'
import Notification from '@/lib/models/Notification'
import { suggestHobby } from '@/lib/plan'
import { generateRitual, generateInvitation, generateHobbyPlan } from '@/lib/ai'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { profile, permissions, smartwatchProvider } = await req.json()
    await connectDB()

    const hobby = suggestHobby(profile)
    const now = new Date()

    // Generate AI-personalized content in parallel
    const [firstRitual, firstInvitation, aiLearningMethod] = await Promise.all([
      generateRitual(profile),
      generateInvitation(profile),
      generateHobbyPlan(profile, hobby.name, hobby.duration),
    ])

    const personalizedHobby = { ...hobby, learningMethod: aiLearningMethod, startedAt: now }

    await User.findByIdAndUpdate(session.user.id, {
      profile,
      permissions,
      smartwatchProvider,
      onboardingCompleted: true,
      wellbeingPlan: {
        hobby: personalizedHobby,
        ritualIndex: 0,
        lastRitualAt: now,
        lastReminderAt: now,
        lastInvitationAt: now,
        invitationIndex: 0,
      },
    })

    await Promise.all([
      Notification.create({
        userId: session.user.id,
        type: 'ritual',
        title: firstRitual.title,
        body: firstRitual.body,
        scheduledFor: now,
      }),
      Notification.create({
        userId: session.user.id,
        type: 'invitation',
        title: firstInvitation.title,
        body: firstInvitation.body,
        scheduledFor: now,
      }),
    ])

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
