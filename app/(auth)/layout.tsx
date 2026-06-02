import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-velvet-600 flex-col justify-between p-12 text-white">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-velvet-500 flex items-center justify-center text-lg">🦄</div>
          <span className="text-xl font-bold">Unicorn</span>
        </Link>

        <div>
          <h2 className="text-4xl font-black leading-tight mb-6">
            Your wellness journey<br />starts here.
          </h2>
          <div className="space-y-4">
            {[
              'Circle of Life — track all 8 dimensions of wellbeing',
              'Random 21-day challenges to build healthy habits',
              'Milestone-based hobby program over 3 months',
              'Garmin smartwatch sync for real-time metrics',
            ].map(text => (
              <div key={text} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-ochre-400 mt-2 shrink-0" />
                <p className="text-white/80 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-velvet-500 flex items-center justify-center text-base">🦄</div>
            <span className="text-lg font-bold text-black">Unicorn</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  )
}
