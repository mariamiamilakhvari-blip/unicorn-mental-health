'use client'
import { useState } from 'react'

const CATEGORIES = [
  { id: 'joy', label: 'Joy', emoji: '😊', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', ring: 'bg-yellow-400' },
  { id: 'spirituality', label: 'Spirituality', emoji: '🙏', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', ring: 'bg-indigo-400' },
  { id: 'creativity', label: 'Creativity', emoji: '🎨', color: 'bg-pink-50 text-pink-700 border-pink-200', ring: 'bg-pink-400' },
  { id: 'social', label: 'Social Life', emoji: '🫂', color: 'bg-orange-50 text-orange-700 border-orange-200', ring: 'bg-orange-400' },
  { id: 'finances', label: 'Finances', emoji: '💰', color: 'bg-green-50 text-green-700 border-green-200', ring: 'bg-green-400' },
  { id: 'career', label: 'Career', emoji: '💼', color: 'bg-blue-50 text-blue-700 border-blue-200', ring: 'bg-blue-400' },
  { id: 'education', label: 'Education', emoji: '📚', color: 'bg-violet-50 text-violet-700 border-violet-200', ring: 'bg-violet-400' },
  { id: 'health', label: 'Physical Health', emoji: '💪', color: 'bg-rose-50 text-rose-700 border-rose-200', ring: 'bg-rose-400' },
]

interface CircleOfLifeProps {
  scores?: Record<string, number>
  onScoreChange?: (id: string, score: number) => void
}

export function CircleOfLife({ scores = {}, onScoreChange }: CircleOfLifeProps) {
  const [active, setActive] = useState<string | null>(null)

  function handleScore(id: string, val: number) {
    onScoreChange?.(id, val)
    setActive(null)
  }

  const avg = CATEGORIES.length
    ? Math.round(CATEGORIES.reduce((s, c) => s + (scores[c.id] ?? 0), 0) / CATEGORIES.length)
    : 0

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Circle of Life</h3>
        {avg > 0 && (
          <span className="text-xs text-muted-foreground">
            Average: <span className="font-semibold text-unicorn-600">{avg}/10</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {CATEGORIES.map(({ id, label, emoji, color, ring }) => {
          const score = scores[id] ?? 0
          const isOpen = active === id
          return (
            <div key={id} className="flex flex-col">
              <button
                onClick={() => setActive(isOpen ? null : id)}
                className={`flex flex-col items-center p-3 rounded-xl border transition-all hover:scale-105 active:scale-95 ${color} ${isOpen ? 'ring-2 ring-unicorn-400 shadow-md' : ''}`}
              >
                <span className="text-2xl leading-none mb-1">{emoji}</span>
                <span className="text-[10px] font-semibold text-center leading-tight">{label}</span>
                {score > 0 && (
                  <div className="mt-2 w-full bg-white/60 rounded-full h-1.5 overflow-hidden">
                    <div className={`h-full rounded-full ${ring}`} style={{ width: `${score * 10}%`, transition: 'width 0.4s ease' }} />
                  </div>
                )}
                {score > 0 && (
                  <span className="text-[10px] font-bold mt-1 opacity-70">{score}/10</span>
                )}
              </button>

              {/* Inline score picker */}
              {isOpen && (
                <div className="mt-1.5 bg-white border border-border rounded-xl p-2 shadow-lg z-10">
                  <p className="text-[10px] text-muted-foreground text-center mb-1.5">Rate {label}</p>
                  <div className="grid grid-cols-5 gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <button
                        key={n}
                        onClick={() => handleScore(id, n)}
                        className={`h-7 rounded-lg text-[11px] font-bold transition-all ${
                          score === n
                            ? 'bg-unicorn-500 text-white shadow'
                            : 'bg-muted hover:bg-unicorn-100 hover:text-unicorn-700 text-gray-600'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {Object.keys(scores).length === 0 && (
        <p className="text-center text-xs text-muted-foreground mt-3">
          Tap any category to rate it (1–10)
        </p>
      )}
    </div>
  )
}
