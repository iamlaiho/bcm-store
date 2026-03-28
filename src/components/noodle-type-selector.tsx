'use client'

import type { NoodleType } from '@/lib/order'

const NOODLES: { value: NoodleType; label: string; subtitle: string }[] = [
  { value: 'mee-pok', label: 'Mee Pok', subtitle: 'Flat' },
  { value: 'mee-kia', label: 'Mee Kia', subtitle: 'Thin' },
  { value: 'bee-hoon', label: 'Bee Hoon', subtitle: 'Vermicelli' },
]

interface Props {
  value: NoodleType
  onChange: (value: NoodleType) => void
}

export function NoodleTypeSelector({ value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {NOODLES.map((noodle) => {
        const selected = value === noodle.value
        return (
          <button
            key={noodle.value}
            type="button"
            onClick={() => onChange(noodle.value)}
            className={[
              'flex-1 rounded-full border-[1.5px] py-[6px] text-center transition-all',
              selected
                ? 'border-orange-500 bg-orange-500 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-500',
            ].join(' ')}
          >
            <span className="block text-[11px] font-700 font-bold">
              {noodle.label}
            </span>
            <span
              className={`block text-[9px] ${selected ? 'text-orange-100' : 'text-slate-400'}`}
            >
              {noodle.subtitle}
            </span>
          </button>
        )
      })}
    </div>
  )
}
