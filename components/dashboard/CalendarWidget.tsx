'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

interface CalendarWidgetProps {
  activeDates?: string[]  // ISO date strings with activity
}

export function CalendarWidget({ activeDates = [] }: CalendarWidgetProps) {
  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  function prevMonth() { setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1)) }
  function nextMonth() { setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1)) }

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const activeSet = new Set(
    activeDates.map(d => {
      const dt = new Date(d)
      return `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`
    })
  )

  function isToday(day: number) {
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
  }

  function hasActivity(day: number) {
    return activeSet.has(`${year}-${month}-${day}`)
  }

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Personal Calendar</h3>
        <div className="flex items-center gap-1">
          <button onClick={prevMonth} className="p-1 rounded-lg hover:bg-muted transition-colors">
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
          <span className="text-xs font-semibold text-gray-700 min-w-[90px] text-center">
            {MONTHS[month]} {year}
          </span>
          <button onClick={nextMonth} className="p-1 rounded-lg hover:bg-muted transition-colors">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-muted-foreground py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => (
          <div key={i} className="aspect-square flex items-center justify-center">
            {day && (
              <div className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium transition-colors ${
                isToday(day)
                  ? 'bg-velvet-500 text-white font-bold shadow-md shadow-velvet-100'
                  : hasActivity(day)
                  ? 'bg-sage-100 text-sage-700 font-semibold'
                  : 'text-gray-600 hover:bg-muted cursor-pointer'
              }`}>
                {day}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
