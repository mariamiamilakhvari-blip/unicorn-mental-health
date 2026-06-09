import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    await connectDB()
    const user = await User.findOne({ email: email?.toLowerCase() })

    if (user) {
      const token = crypto.randomBytes(32).toString('hex')
      user.resetToken = token
      user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000)
      await user.save()

      const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`
      // TODO: wire up nodemailer — for now the URL is logged to console
      console.log('[Password Reset]', resetUrl)
    }

    return NextResponse.json({ message: 'If that email exists, a reset link has been sent.' })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
