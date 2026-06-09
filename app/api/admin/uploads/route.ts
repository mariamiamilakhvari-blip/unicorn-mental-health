import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function requireAdmin() {
  const session = await auth()
  if (!session?.user?.id) return null
  if (session.user.role !== 'admin') return null
  return session
}

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const result = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'unicorn-avatars',
    max_results: 500,
    resource_type: 'image',
  })
  return NextResponse.json({ resources: result.resources })
}

export async function DELETE(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { publicId } = await req.json()
  if (!publicId) return NextResponse.json({ error: 'Missing publicId' }, { status: 400 })
  await cloudinary.uploader.destroy(publicId)
  return NextResponse.json({ ok: true })
}
