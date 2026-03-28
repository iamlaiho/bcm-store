'use client'

const SPICE_OPTIONS = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
]

interface Props {
  value: number
  onChange: (value: number) => void
}

export function SpiceSlider({ value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {SPICE_OPTIONS.map((option) => {
        const selected = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={[
              'flex-1 rounded-full border-[1.5px] py-[7px] text-center transition-all',
              selected
                ? 'border-orange-500 bg-orange-500 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-500',
            ].join(' ')}
          >
            <span className="text-[11px] font-bold leading-tight">
              {option.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
