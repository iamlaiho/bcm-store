'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { NoodleTypeSelector } from '@/components/noodle-type-selector'
import { SpiceSlider } from '@/components/spice-slider'
import { AddonsGrid } from '@/components/addons-grid'
import { BowlIllustration } from '@/components/bowl-illustration'
import { DEFAULT_ORDER, serializeOrder } from '@/lib/order'
import type { Order } from '@/lib/order'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[9px] font-bold uppercase tracking-[1.5px] text-slate-400">
      {children}
    </h2>
  )
}

export function OrderForm() {
  const router = useRouter()
  const [order, setOrder] = useState<Order>(DEFAULT_ORDER)

  const set = <K extends keyof Order>(key: K, val: Order[K]) =>
    setOrder((prev) => ({ ...prev, [key]: val }))

  const handleSubmit = () => {
    const params = serializeOrder(order)
    router.push(`/order/confirmation?${params.toString()}`)
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden md:flex-row">
      {/* Bowl — top strip on mobile, left 65% on desktop */}
      <div className="h-72 flex-shrink-0 md:h-auto md:w-[65%]">
        <BowlIllustration order={order} />
      </div>

      {/* Form — scrollable below bowl on mobile, right 35% on desktop */}
      <div className="flex flex-1 flex-col overflow-hidden border-t border-slate-200 bg-slate-50 md:border-l md:border-t-0">
        {/* Scrollable fields */}
        <div className="flex flex-1 flex-col gap-[14px] overflow-y-auto px-6 py-6">
          {/* Noodle Type */}
          <div className="space-y-2">
            <SectionLabel>Noodle Type</SectionLabel>
            <NoodleTypeSelector
              value={order.noodle}
              onChange={(v) => set('noodle', v)}
            />
          </div>

          {/* Dry or Soup */}
          <div className="space-y-2">
            <SectionLabel>Style</SectionLabel>
            <div className="flex gap-2">
              {(
                [
                  { value: 'dry', label: 'Dry' },
                  { value: 'soup', label: 'Soup' },
                ] as const
              ).map((option) => {
                const selected = order.style === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => set('style', option.value)}
                    className={[
                      'flex-1 rounded-full border-[1.5px] py-[7px] text-[11px] font-bold transition-all',
                      selected
                        ? 'border-orange-500 bg-orange-500 text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-500',
                    ].join(' ')}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Size */}
          <div className="space-y-2">
            <SectionLabel>Size</SectionLabel>
            <div className="flex gap-2">
              {(
                [
                  { value: 'small', label: 'Small', price: '$3' },
                  { value: 'medium', label: 'Medium', price: '$4' },
                  { value: 'large', label: 'Large', price: '$5' },
                ] as const
              ).map((option) => {
                const selected = order.size === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => set('size', option.value)}
                    className={[
                      'flex-1 rounded-full border-[1.5px] py-[7px] text-[11px] font-bold transition-all',
                      selected
                        ? 'border-orange-500 bg-orange-500 text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-500',
                    ].join(' ')}
                  >
                    {option.label}
                    <span className="ml-1 text-[10px] opacity-60">
                      {option.price}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Spice Level */}
          <div className="space-y-2">
            <SectionLabel>Spice Level</SectionLabel>
            <SpiceSlider
              value={order.spice}
              onChange={(v) => set('spice', v)}
            />
          </div>

          {/* Add-ons */}
          <div className="space-y-2">
            <SectionLabel>Add-ons</SectionLabel>
            <AddonsGrid
              value={order.addons}
              onChange={(v) => set('addons', v)}
            />
          </div>
        </div>

        {/* Sticky footer */}
        <div className="border-t border-slate-200 px-6 py-4">
          <Button
            onClick={handleSubmit}
            className="h-auto w-full rounded-full bg-orange-500 py-4 text-sm font-black tracking-wide text-white hover:bg-orange-400 active:scale-[0.98]"
          >
            CONFIRM
          </Button>
        </div>
      </div>
    </div>
  )
}
