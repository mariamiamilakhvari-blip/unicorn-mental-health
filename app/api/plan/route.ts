import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'
import Notification from '@/lib/models/Notification'
import { generateRitual, generateInvitation } from '@/lib/ai'

const MS_48H = 48 * 60 * 60 * 1000
const MS_24H = 24 * 60 * 60 * 1000
const MS_14D = 14 * 24 * 60 * 60 * 1000

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const user = await User.findById(session.user.id)
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const plan = user.wellbeingPlan
    if (!plan) return NextResponse.json({ plan: null })

    const now = new Date()

    // Check if new ritual needed (every 48h)
    const lastRitual = plan.lastRitualAt ? new Date(plan.lastRitualAt) : new Date(0)
    const ritualDue = now.getTime() - lastRitual.getTime() >= MS_48H

    if (ritualDue) {
      const nextIndex = (plan.ritualIndex ?? 0) + 1
      const profile = user.profile as Record<string, string | string[]>
      const ritual = await generateRitual(profile)
      const nextScheduled = new Date(lastRitual.getTime() + MS_48H)

      await Notification.create({
        userId: user._id,
        type: 'ritual',
        title: ritual.title,
        body: ritual.body,
        scheduledFor: nextScheduled,
      })

      await User.findByIdAndUpdate(user._id, {
        'wellbeingPlan.ritualIndex': nextIndex,
        'wellbeingPlan.lastRitualAt': now,
        'wellbeingPlan.lastReminderAt': now,
      })
    }

    // Check if reminder needed (24h after ritual, if ritual not completed)
    const lastReminder = plan.lastReminderAt ? new Date(plan.lastReminderAt) : new Date(0)
    const reminderDue = now.getTime() - lastReminder.getTime() >= MS_24H

    // Check if invitation needed (every 14 days)
    const lastInvitation = plan.lastInvitationAt ? new Date(plan.lastInvitationAt) : new Date(0)
    const invitationDue = now.getTime() - lastInvitation.getTime() >= MS_14D

    if (invitationDue) {
      const nextInvIndex = (plan.invitationIndex ?? 0) + 1
      const profile = user.profile as Record<string, string | string[]>
      const invitation = await generateInvitation(profile)

      await Notification.create({
        userId: user._id,
        type: 'invitation',
        title: invitation.title,
        body: invitation.body,
        scheduledFor: now,
      })

      await User.findByIdAndUpdate(user._id, {
        'wellbeingPlan.lastInvitationAt': now,
        'wellbeingPlan.invitationIndex': nextInvIndex,
      })
    }

    // Fetch current active ritual (latest unCompleted)
    const currentRitual = await Notification.findOne({
      userId: user._id,
      type: 'ritual',
      completedAt: { $exists: false },
    }).sort({ createdAt: -1 })

    // Fetch latest invitation
    const currentInvitation = await Notification.findOne({
      userId: user._id,
      type: 'invitation',
      completedAt: { $exists: false },
    }).sort({ createdAt: -1 })

    return NextResponse.json({
      hobby: plan.hobby,
      ritual: currentRitual,
      invitation: currentInvitation,
      reminderDue,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { notificationId } = await req.json()
    await connectDB()
    await Notification.findOneAndUpdate(
      { _id: notificationId, userId: session.user.id },
      { completedAt: new Date() }
    )
    return NextResponse.json({ message: 'Marked as done' })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
