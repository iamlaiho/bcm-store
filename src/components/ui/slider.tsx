'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

interface SliderProps {
  className?: string
  min?: number
  max?: number
  step?: number
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  disabled?: boolean
}

function Slider({
  className,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onValueChange,
  disabled,
}: SliderProps) {
  const controlled = value !== undefined
  const initial = controlled ? value[0] : (defaultValue?.[0] ?? min)
  const [internal, setInternal] = React.useState(initial ?? min)
  const current = controlled ? (value[0] ?? min) : internal

  const percent = max === min ? 0 : ((current - min) / (max - min)) * 100

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = Number(e.target.value)
    if (!controlled) setInternal(next)
    onValueChange?.([next])
  }

  return (
    <div
      data-slot="slider"
      className={cn(
        'relative flex w-full touch-none items-center select-none',
        className,
      )}
    >
      <div
        data-slot="slider-track"
        className="relative h-1 w-full grow overflow-hidden rounded-full bg-muted"
      >
        <div
          data-slot="slider-range"
          className="absolute h-full bg-primary"
          style={{ width: `${percent}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        disabled={disabled}
        onChange={handleChange}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
      />
      <div
        data-slot="slider-thumb"
        className="pointer-events-none absolute size-3 shrink-0 rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow]"
        style={{ left: `calc(${percent}% - 6px)` }}
      />
    </div>
  )
}

export { Slider }
export type { SliderProps }
