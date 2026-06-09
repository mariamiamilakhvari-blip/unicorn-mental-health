'use client'

function CategoryIcon({ label }: { label: string }) {
  if (label === 'Joy') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M4 24 Q8 8 16 7 Q24 6 28 24" stroke="#5e2d8f" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M7 24 Q10 12 16 11 Q22 10 25 24" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M10 24 Q12 16 16 15 Q20 14 22 24" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
  if (label === 'Spirituality') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M16 3L17.8 13H27L19.5 19L22 29L16 23.5L10 29L12.5 19L5 13H14.2Z" fill="#7a4bdf" opacity="0.9"/>
      <circle cx="16" cy="14" r="3" fill="#fef08a"/>
    </svg>
  )
  if (label === 'Creativity') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <circle cx="12" cy="13" r="6" fill="#c4a8fc" opacity="0.8"/>
      <circle cx="21" cy="13" r="6" fill="#fef08a" opacity="0.8"/>
      <circle cx="16" cy="21" r="6" fill="#86efac" opacity="0.8"/>
    </svg>
  )
  if (label === 'Social Life') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M10 7C7.5 7 5 9 5 12C5 17 10 22 10 22C10 22 15 17 15 12C15 9 12.5 7 10 7Z" fill="#f472b6" opacity="0.85"/>
      <path d="M22 10C19.5 10 17 12 17 15C17 20 22 25 22 25C22 25 27 20 27 15C27 12 24.5 10 22 10Z" fill="#7a4bdf" opacity="0.75"/>
    </svg>
  )
  if (label === 'Finances') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <polygon points="16,3 27,11 23,27 9,27 5,11" fill="#fef08a" stroke="#d4962a" strokeWidth="1.5"/>
      <polygon points="16,7 23,13 20,23 12,23 9,13" fill="#fde047" opacity="0.5"/>
      <polygon points="16,11 20,14 18,20 14,20 12,14" fill="#fff" opacity="0.7"/>
    </svg>
  )
  if (label === 'Career') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M19 3L9 17H16L12 29L24 13H17Z" fill="#5e2d8f"/>
      <circle cx="25" cy="8" r="3" fill="#fef08a"/>
    </svg>
  )
  if (label === 'Education') return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <rect x="5" y="7" width="22" height="18" rx="2" fill="#e2d4fe" stroke="#7a4bdf" strokeWidth="1.5"/>
      <line x1="16" y1="7" x2="16" y2="25" stroke="#7a4bdf" strokeWidth="1.5"/>
      <line x1="8" y1="13" x2="14" y2="13" stroke="#9f74f0" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="17" x2="14" y2="17" stroke="#9f74f0" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="18" y1="13" x2="24" y2="13" stroke="#9f74f0" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="18" y1="17" x2="24" y2="17" stroke="#9f74f0" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 4L16 7L22 4" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M16 28C16 28 5 20 5 12C5 7.5 8.5 5 12 5C14 5 15.5 6 16 7C16.5 6 18 5 20 5C23.5 5 27 7.5 27 12C27 20 16 28 16 28Z" fill="#4ade80" opacity="0.85"/>
      <line x1="16" y1="12" x2="16" y2="28" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

const CATEGORIES = [
  { id: 'joy', label: 'Joy', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { id: 'spirituality', label: 'Spirituality', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'creativity', label: 'Creativity', color: 'bg-pink-50 text-pink-700 border-pink-200' },
  { id: 'social', label: 'Social Life', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'finances', label: 'Finances', color: 'bg-green-50 text-green-700 border-green-200' },
  { id: 'career', label: 'Career', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'education', label: 'Education', color: 'bg-violet-50 text-violet-700 border-violet-200' },
  { id: 'health', label: 'Physical Health', color: 'bg-rose-50 text-rose-700 border-rose-200' },
]

export function CircleOfLife() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {CATEGORIES.map(({ id, label, color }) => (
        <div
          key={id}
          className={`flex flex-col items-center p-3 rounded-xl border ${color}`}
        >
          <CategoryIcon label={label} />
          <span className="text-[10px] font-semibold text-center leading-tight mt-1">{label}</span>
        </div>
      ))}
    </div>
  )
}
