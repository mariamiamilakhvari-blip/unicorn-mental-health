import { NextResponse } from 'next/server'
import { auth } from '@/auth'

// Mock Garmin data — replace with real Garmin Connect API integration
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const heartRate = Math.floor(Math.random() * 20) + 62  // 62–82 bpm
  const stressScore = Math.floor(Math.random() * 40) + 10 // 10–50
  const sleepHours = parseFloat((Math.random() * 2 + 6).toFixed(1)) // 6–8h
  const steps = Math.floor(Math.random() * 5000) + 3000   // 3k–8k steps

  return NextResponse.json({
    heartRate,
    stressScore,
    sleepHours,
    steps,
    stressLevel: stressScore < 25 ? 'Low' : stressScore < 50 ? 'Moderate' : 'High',
    lastSync: new Date().toISOString(),
  })
}
