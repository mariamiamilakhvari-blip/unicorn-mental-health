import { TopNav } from '@/components/dashboard/TopNav'
import { Toaster } from '@/components/ui/toaster'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
      <Toaster />
    </div>
  )
}
