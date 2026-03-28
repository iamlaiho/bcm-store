'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { PRICES } from '@/lib/order'
import type { Order, Addon } from '@/lib/order'

const NOODLE_LABELS: Record<Order['noodle'], string> = {
  'mee-pok': 'Mee Pok',
  'mee-kia': 'Mee Kia',
  'bee-hoon': 'Bee Hoon',
}

const ADDON_LABELS: Record<Addon, string> = {
  lard: 'Extra Lard',
  chili: 'Extra Chili',
  vinegar: 'Extra Vinegar',
  fishballs: 'Extra Fishballs',
  egg: 'Braised Egg',
  ribs: 'Pork Ribs',
}

const SIZE_LABELS: Record<Order['size'], string> = {
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
}

interface Props {
  order: Order
}

export function OrderSummary({ order }: Props) {
  const [progressStarted, setProgressStarted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setProgressStarted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const price = PRICES[order.size]
  const dishName = `${NOODLE_LABELS[order.noodle]} — ${order.style === 'dry' ? 'Dry' : 'Soup'}`

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-10">
      <div className="animate-header-pop space-y-2 text-center">
        <h1 className="font-display text-3xl font-black text-orange-500">
          ORDER RECEIVED!
        </h1>
        <p className="text-2xl">🎉</p>
      </div>

      <Card className="border-slate-200 bg-white font-mono shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-3">
          <CardTitle className="text-center text-[11px] uppercase tracking-widest text-slate-400">
            — BCM Store Receipt —
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-slate-900">
              {dishName}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Size</span>
            <span className="font-bold text-orange-500">
              {SIZE_LABELS[order.size]} — ${price}
            </span>
          </div>

          <Separator className="bg-slate-100" />

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Spice</span>
            <div className="flex gap-1">
              {Array.from({ length: 3 }, (_, i) => (
                <span
                  key={i}
                  className={i < order.spice ? 'text-red-500' : 'opacity-20'}
                >
                  🌶️
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm text-slate-400">Add-ons</span>
            <div className="flex flex-wrap gap-1.5">
              {order.addons.length > 0 ? (
                order.addons.map((addon) => (
                  <Badge
                    key={addon}
                    className="border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
                  >
                    {ADDON_LABELS[addon]}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-slate-400">No add-ons</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">⏱️ Your bowl is ready in</span>
          <span className="font-bold text-orange-500">~8 mins</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className={[
              'h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500',
              progressStarted ? 'animate-progress-fill' : 'w-0',
            ].join(' ')}
          />
        </div>
      </div>

      <Link
        href="/"
        className="flex w-full items-center justify-center rounded-full border border-slate-200 bg-white py-4 text-sm font-bold text-slate-600 hover:bg-slate-50"
      >
        Order Again
      </Link>
    </div>
  )
}
