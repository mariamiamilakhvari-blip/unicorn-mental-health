import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Challenge from '@/lib/models/Challenge'

const CHALLENGES = {
  social: [
    { title: 'Reconnect with an old friend', description: 'Reach out to someone you haven\'t spoken to in over 6 months. Send a message, make a call, or meet for coffee.' },
    { title: 'Attend a social event', description: 'Put yourself out there. Go to a meetup, community event, or gathering outside of your usual circle.' },
    { title: 'Write gratitude messages', description: 'Write heartfelt messages to 3 people who have positively impacted your life.' },
    { title: 'Host a gathering', description: 'Plan and host a small get-together. Invite people who energize you.' },
    { title: 'Digital detox day', description: 'Spend one full day phone-free and be fully present with people around you.' },
  ],
  business: [
    { title: 'Learn one new career skill', description: 'Research and start learning a skill that could advance your career in the next 12 months.' },
    { title: 'Network with someone new', description: 'Connect with a new person in your field via LinkedIn, an industry event, or a warm introduction.' },
    { title: 'Define your personal brand', description: 'Write a compelling personal brand statement that captures your unique value and direction.' },
    { title: 'Set a 90-day career goal', description: 'Write down one ambitious career goal and break it into the first 3 actionable steps.' },
    { title: 'Invest in yourself', description: 'Enroll in a course, workshop, or book that directly supports your career growth.' },
  ],
  relationships: [
    { title: 'Phone-free quality time', description: 'Spend meaningful time with a loved one with no screens — full presence and deep conversation.' },
    { title: 'Plan a thoughtful surprise', description: 'Do something unexpectedly thoughtful for someone important to you.' },
    { title: 'Daily gratitude practice', description: 'Tell someone you appreciate them every day for 21 days. Out loud or in writing.' },
    { title: 'Schedule a date with a friend', description: 'Book quality, dedicated time with a close friend or partner — put it in your calendar today.' },
    { title: 'Write a heartfelt letter', description: 'Write a handwritten letter to someone who means the world to you, telling them exactly why.' },
  ],
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await connectDB()
    const challenges = await Challenge.find({ userId: session.user.id }).sort({ createdAt: -1 })
    return NextResponse.json({ challenges })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { category } = await req.json()
    await connectDB()
    const pool = CHALLENGES[category as keyof typeof CHALLENGES] ?? CHALLENGES.social
    const pick = pool[Math.floor(Math.random() * pool.length)]
    const startDate = new Date()
    const dueDate = new Date(startDate); dueDate.setDate(dueDate.getDate() + 21)
    const reminderDate = new Date(startDate); reminderDate.setDate(reminderDate.getDate() + 14)
    const challenge = await Challenge.create({
      userId: session.user.id, title: pick.title, description: pick.description,
      category, startDate, dueDate, reminderDate,
    })
    return NextResponse.json({ challenge }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { challengeId, action } = await req.json()
    await connectDB()
    if (action === 'checkin') {
      const today = new Date(); today.setHours(0, 0, 0, 0)
      const challenge = await Challenge.findOne({ _id: challengeId, userId: session.user.id })
      if (!challenge) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      const alreadyCheckedIn = challenge.checkIns.some((d: Date) => {
        const d2 = new Date(d); d2.setHours(0, 0, 0, 0)
        return d2.getTime() === today.getTime()
      })
      if (!alreadyCheckedIn) {
        challenge.checkIns.push(today)
        await challenge.save()
      }
    } else if (action === 'complete') {
      await Challenge.findOneAndUpdate(
        { _id: challengeId, userId: session.user.id },
        { completed: true, completedAt: new Date() }
      )
    }
    return NextResponse.json({ message: 'Updated' })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
