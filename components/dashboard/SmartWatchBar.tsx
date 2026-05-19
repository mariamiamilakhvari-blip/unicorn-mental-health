'use client'
import { Heart, Brain, Moon, Footprints } from 'lucide-react'

// Phase 1: static mock data — replace with Garmin API in Phase 2
const MOCK = { heartRate: 72, stressLevel: 'Low', sleepHours: 7.5, steps: 6240 }

export function SmartWatchBar() {
  const metrics = [
    { icon: Heart, label: 'Heart Rate', value: `${MOCK.heartRate} bpm`, color: 'text-rose-500', bg: 'bg-rose-50' },
    { icon: Brain, label: 'Stress', value: MOCK.stressLevel, color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: Moon, label: 'Sleep', value: `${MOCK.sleepHours}h`, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { icon: Footprints, label: 'Steps', value: MOCK.steps.toLocaleString(), color: 'text-sage-600', bg: 'bg-sage-50' },
  ]

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">⌚ Garmin Live</span>
        <span className="text-xs text-muted-foreground">Just now</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {metrics.map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className={`${bg} rounded-xl p-3 text-center`}>
            <Icon className={`h-4 w-4 ${color} mx-auto mb-1`} />
            <div className={`text-sm font-bold ${color}`}>{value}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
