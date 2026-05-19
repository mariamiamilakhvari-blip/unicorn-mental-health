import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Notification from '@/lib/models/Notification'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await connectDB()
    const notifications = await Notification.find({ userId: session.user.id })
      .sort({ createdAt: -1 }).limit(20)
    return NextResponse.json({ notifications })
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
      { readAt: new Date() }
    )
    return NextResponse.json({ message: 'Marked as read' })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
