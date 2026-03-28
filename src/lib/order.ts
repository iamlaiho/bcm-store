// src/lib/order.ts

export type NoodleType = 'mee-pok' | 'mee-kia' | 'bee-hoon'
export type Style = 'dry' | 'soup'
export type Size = 'small' | 'medium' | 'large'
export type Addon = 'lard' | 'chili' | 'vinegar' | 'fishballs' | 'egg' | 'ribs'

export interface Order {
  noodle: NoodleType
  style: Style
  size: Size
  spice: number
  addons: Addon[]
}

export const DEFAULT_ORDER: Order = {
  noodle: 'mee-pok',
  style: 'dry',
  size: 'medium',
  spice: 1,
  addons: [],
}

export const PRICES: Record<Size, number> = {
  small: 3,
  medium: 4,
  large: 5,
}

const NOODLE_TYPES: NoodleType[] = ['mee-pok', 'mee-kia', 'bee-hoon']
const STYLES: Style[] = ['dry', 'soup']
const SIZES: Size[] = ['small', 'medium', 'large']
const ADDONS: Addon[] = ['lard', 'chili', 'vinegar', 'fishballs', 'egg', 'ribs']

export function serializeOrder(order: Order): URLSearchParams {
  const params = new URLSearchParams()
  params.set('noodle', order.noodle)
  params.set('style', order.style)
  params.set('size', order.size)
  params.set('spice', String(order.spice))
  params.set('addons', order.addons.join(','))
  return params
}

export function parseOrder(
  params: Record<string, string | string[] | undefined>,
): Order | null {
  const getRaw = (key: string): string | undefined => {
    const val = params[key]
    if (Array.isArray(val)) return val[0]
    return val
  }

  const noodle = getRaw('noodle')
  const style = getRaw('style')
  const size = getRaw('size')
  const spiceRaw = getRaw('spice')
  const addonsRaw = getRaw('addons')

  if (
    !noodle ||
    !style ||
    !size ||
    spiceRaw === undefined ||
    addonsRaw === undefined
  ) {
    return null
  }

  if (!(NOODLE_TYPES as string[]).includes(noodle)) return null
  if (!(STYLES as string[]).includes(style)) return null
  if (!(SIZES as string[]).includes(size)) return null

  const spice = parseInt(spiceRaw, 10)
  if (isNaN(spice) || spice < 1 || spice > 3) return null

  let addons: Addon[] = []
  if (addonsRaw !== '') {
    const tokens = addonsRaw.split(',')
    if (!tokens.every((a) => (ADDONS as string[]).includes(a))) return null
    addons = tokens as Addon[]
  }

  return {
    noodle: noodle as NoodleType,
    style: style as Style,
    size: size as Size,
    spice,
    addons,
  }
}
