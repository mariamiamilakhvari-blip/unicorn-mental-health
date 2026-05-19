interface HeatmapCalendarProps {
  startDate: Date
  checkIns: Date[]
  totalDays?: number
}

export function HeatmapCalendar({ startDate, checkIns, totalDays = 21 }: HeatmapCalendarProps) {
  const today = new Date(); today.setHours(0, 0, 0, 0)

  const checkInSet = new Set(
    checkIns.map(d => {
      const dt = new Date(d); dt.setHours(0, 0, 0, 0)
      return dt.getTime()
    })
  )

  const days = Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    date.setHours(0, 0, 0, 0)
    const isPast = date <= today
    const isChecked = checkInSet.has(date.getTime())
    const isToday = date.getTime() === today.getTime()
    return { date, isPast, isChecked, isToday, dayNum: i + 1 }
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-700">21-Day Tracker</span>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-sage-400 inline-block" /> Done</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-300 inline-block" /> Missed</span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map(({ dayNum, isPast, isChecked, isToday }) => (
          <div
            key={dayNum}
            title={`Day ${dayNum}`}
            className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-semibold transition-colors ${
              isToday
                ? 'ring-2 ring-unicorn-500 bg-unicorn-50 text-unicorn-700'
                : isChecked
                ? 'bg-sage-400 text-white'
                : isPast
                ? 'bg-red-200 text-red-600'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {dayNum}
          </div>
        ))}
      </div>
    </div>
  )
}
