export interface SmartWatchData {
  heartRate: number
  stressLevel: 'Low' | 'Medium' | 'High'
  sleepHours: number
  steps: number
}

// Phase 1: mock data — replace with Garmin API in Phase 2
const MOCK: SmartWatchData = { heartRate: 72, stressLevel: 'Low', sleepHours: 7.5, steps: 6240 }

export function getSmartWatchData(): SmartWatchData {
  try {
    const raw = localStorage.getItem('unicorn_smartwatch_data')
    if (raw) return JSON.parse(raw) as SmartWatchData
  } catch {}
  return MOCK
}
