export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-unicorn-600 to-unicorn-900 flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">🦄</div>
          <span className="text-xl font-bold">Unicorn</span>
        </div>

        <div>
          <h2 className="text-4xl font-black leading-tight mb-6">
            Your wellness journey<br />starts here.
          </h2>
          <div className="space-y-4">
            {[
              { icon: '🌀', text: 'Circle of Life — track all 8 dimensions of wellbeing' },
              { icon: '⚡', text: 'Random 21-day challenges to build healthy habits' },
              { icon: '🎯', text: 'Milestone-based hobby program over 3 months' },
              { icon: '⌚', text: 'Garmin smartwatch sync for real-time metrics' },
            ].map(f => (
              <div key={f.text} className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{f.icon}</span>
                <p className="text-unicorn-100 text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-unicorn-300 text-sm">
          Join thousands of people taking charge of their mental health.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo (hidden on lg) */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-unicorn-500 to-unicorn-700 flex items-center justify-center">
              <span className="text-lg">🦄</span>
            </div>
            <span className="text-lg font-bold text-gray-900">Unicorn</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
