import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'

async function requireAdmin() {
  const session = await auth()
  if (!session?.user?.id) return null
  if (session.user.role !== 'admin') return null
  return session
}

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  await connectDB()
  const users = await User.find({}, 'name email role provider onboardingCompleted subscription.plan subscription.status createdAt image').lean()
  return NextResponse.json({ users })
}

export async function PATCH(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { id, name, email, role } = await req.json()
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  await connectDB()
  const update: Record<string, string> = {}
  if (name) update.name = name
  if (email) update.email = email.toLowerCase()
  if (role && ['user', 'admin'].includes(role)) update.role = role
  const user = await User.findByIdAndUpdate(id, { $set: update }, { new: true, select: 'name email role provider onboardingCompleted subscription.plan createdAt' })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  return NextResponse.json({ user })
}

export async function DELETE(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  await connectDB()
  await User.findByIdAndDelete(id)
  return NextResponse.json({ ok: true })
}
