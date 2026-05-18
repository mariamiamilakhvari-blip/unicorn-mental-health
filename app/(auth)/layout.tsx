export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-unicorn-50 via-white to-sage-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-unicorn-500 to-unicorn-700 shadow-lg shadow-unicorn-200 mb-4">
            <span className="text-3xl">🦄</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Unicorn</h1>
          <p className="text-sm text-muted-foreground mt-1">Mental Health & Well-being</p>
        </div>
        {children}
      </div>
    </div>
  )
}
