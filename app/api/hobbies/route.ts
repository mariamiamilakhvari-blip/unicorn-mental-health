import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Hobby from '@/lib/models/Hobby'

const DEFAULT_MILESTONES = [
  { stage: 'knowledge', title: 'Gather Basic Knowledge', targetMonth: 1 },
  { stage: 'equipment', title: 'Get the Necessary Equipment', targetMonth: 1 },
  { stage: 'feedback', title: 'Take Feedback', targetMonth: 1 },
  { stage: 'guides', title: 'Follow Step-by-Step Guides', targetMonth: 2 },
  { stage: 'community', title: 'Join a Community / Sell Your Product', targetMonth: 2 },
  { stage: 'technique', title: 'Try a New Technique', targetMonth: 2 },
  { stage: 'practice', title: 'Practice Regularly', targetMonth: 3 },
]

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await connectDB()
    const hobby = await Hobby.findOne({ userId: session.user.id })
    return NextResponse.json({ hobby })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { name, icon, learningMethod } = await req.json()
    await connectDB()
    await Hobby.deleteOne({ userId: session.user.id })
    const hobby = await Hobby.create({
      userId: session.user.id, name, icon, learningMethod,
      startDate: new Date(), milestones: DEFAULT_MILESTONES,
    })
    return NextResponse.json({ hobby }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { milestoneStage, completed } = await req.json()
    await connectDB()
    await Hobby.findOneAndUpdate(
      { userId: session.user.id, 'milestones.stage': milestoneStage },
      { $set: { 'milestones.$.completedAt': completed ? new Date() : null } }
    )
    return NextResponse.json({ message: 'Updated' })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
