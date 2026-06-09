import Link from 'next/link'

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#cce6f7] via-[#ddf0fb] to-[#e8f5fd] flex flex-col">
      {/* Top bar */}
      <header className="border-b border-gray-100 bg-white/70 backdrop-blur-sm px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-velvet-500 flex items-center justify-center text-base">🦄</div>
          <span className="font-bold text-black">Unicorn</span>
        </Link>
        <p className="text-sm text-muted-foreground">Setting up your profile</p>
      </header>

      {/* Centered wide card */}
      <div className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-100">
          <div className="p-8 sm:p-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
