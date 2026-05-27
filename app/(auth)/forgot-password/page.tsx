'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Loader2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 800)
  }

  return (
    <Card className="shadow-xl shadow-ochre-100/50 border-0">
      <CardContent className="pt-6 px-6 pb-8">
        {sent ? (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage-100 mb-4">
              <Mail className="h-8 w-8 text-sage-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Check your email</h2>
            <p className="text-sm text-muted-foreground">
              If an account with <strong>{email}</strong> exists, a reset link has been sent.
            </p>
            <Link href="/login" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-velvet-500 hover:underline">
              <ArrowLeft className="h-4 w-4" /> Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Reset password</h2>
              <p className="text-sm text-muted-foreground mt-1">Enter your email and we&apos;ll send you a recovery link</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-ochre-400 text-black hover:bg-velvet-500 hover:text-white font-semibold h-11">
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Send Reset Link
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-6">
              <Link href="/login" className="font-semibold text-velvet-500 hover:underline">Back to sign in</Link>
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
