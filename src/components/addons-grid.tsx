'use client'

import { Checkbox } from '@/components/ui/checkbox'
import type { Addon } from '@/lib/order'

const ADDON_OPTIONS: { value: Addon; label: string; icon: string }[] = [
  { value: 'lard', label: 'Extra Lard', icon: '🥓' },
  { value: 'chili', label: 'Extra Chili', icon: '🌶️' },
  { value: 'vinegar', label: 'Extra Vinegar', icon: '🍶' },
  { value: 'fishballs', label: 'Extra Fishballs', icon: '🐟' },
  { value: 'egg', label: 'Braised Egg', icon: '🥚' },
  { value: 'ribs', label: 'Pork Ribs', icon: '🍖' },
]

interface Props {
  value: Addon[]
  onChange: (value: Addon[]) => void
}

export function AddonsGrid({ value, onChange }: Props) {
  const toggle = (addon: Addon) => {
    if (value.includes(addon)) {
      onChange(value.filter((a) => a !== addon))
    } else {
      onChange([...value, addon])
    }
  }

  return (
    <div className="grid grid-cols-2 gap-1.5">
      {ADDON_OPTIONS.map((option) => {
        const checked = value.includes(option.value)
        return (
          <label
            key={option.value}
            className={[
              'flex cursor-pointer items-center gap-2 rounded-[8px] border-[1.5px] px-2.5 py-[7px] transition-all duration-150',
              checked
                ? 'border-orange-400 bg-orange-50 text-orange-800'
                : 'border-slate-200 bg-white text-slate-600 hover:border-orange-300',
            ].join(' ')}
          >
            <Checkbox
              checked={checked}
              onCheckedChange={() => toggle(option.value)}
              className="border-slate-300 data-[checked]:border-orange-500 data-[checked]:bg-orange-500"
            />
            <span className="text-[13px]">{option.icon}</span>
            <span className="text-[11px] font-semibold">{option.label}</span>
          </label>
        )
      })}
    </div>
  )
}
