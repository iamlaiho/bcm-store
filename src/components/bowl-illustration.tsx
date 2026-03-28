'use client'

import { useEffect, useRef } from 'react'
import type { Order } from '@/lib/order'

interface Props {
  order: Order
}

export function BowlIllustration({ order }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    el.classList.remove('bowl-pop')
    void el.offsetWidth
    el.classList.add('bowl-pop')
    const t = setTimeout(() => el.classList.remove('bowl-pop'), 400)
    return () => clearTimeout(t)
  }, [order.noodle, order.addons.join(',')])

  const isDry = order.style === 'dry'
  const spiceOilOpacity =
    order.spice === 3 ? 0.36 : order.spice === 2 ? 0.18 : 0
  const hasEgg = order.addons.includes('egg')
  const hasFishballs = order.addons.includes('fishballs')
  const hasRibs = order.addons.includes('ribs')
  const hasLard = order.addons.includes('lard')
  const hasChili = order.addons.includes('chili')
  const hasVinegar = order.addons.includes('vinegar')

  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-white">
      {/* Bowl SVG — outer: size scale, inner: pop animation */}
      <div
        className="relative z-10"
        style={{
          transform: `scale(${order.size === 'small' ? 0.78 : order.size === 'large' ? 1.18 : 1})`,
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div ref={wrapRef}>
          <svg
            width="300"
            height="300"
            viewBox="0 0 300 300"
            overflow="visible"
          >
            <defs>
              {/* Broth fill — slides in for soup */}
              <linearGradient
                id="bcm-broth-fill"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#fde68a" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.85" />
              </linearGradient>
              {/* Broth surface sheen */}
              <radialGradient id="bcm-broth-surface" cx="50%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#fde68a" />
              </radialGradient>
              <radialGradient id="bcm-bowl-shadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0,0,0,0.12)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
              <filter id="bcm-drop-shadow">
                <feDropShadow
                  dx="0"
                  dy="8"
                  stdDeviation="16"
                  floodColor="rgba(0,0,0,0.12)"
                />
              </filter>
              <clipPath id="bcm-bowl-clip">
                <path d="M54,148 Q54,246 150,253 Q246,246 246,148 Z" />
              </clipPath>
            </defs>

            {/* Drop shadow */}
            <ellipse
              cx="150"
              cy="272"
              rx="80"
              ry="14"
              fill="url(#bcm-bowl-shadow)"
            />

            {/* Bowl body */}
            <g filter="url(#bcm-drop-shadow)">
              <path
                d="M52,148 Q52,248 150,255 Q248,248 248,148 Z"
                fill="transparent"
                stroke="#d1d5db"
                strokeWidth="1.5"
              />
              <ellipse
                cx="150"
                cy="148"
                rx="98"
                ry="22"
                fill="transparent"
                stroke="#d1d5db"
                strokeWidth="1.5"
              />
            </g>

            {/* Bowl interior */}
            <g clipPath="url(#bcm-bowl-clip)">
              {/* Base — transparent, panel bg shows through */}
              <rect
                x="52"
                y="130"
                width="196"
                height="124"
                fill="transparent"
              />

              {/* Broth layer — slides up from below for soup, hidden for dry */}
              <g
                style={{
                  transform: isDry ? 'translateY(72px)' : 'translateY(0)',
                  transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {/* Broth body */}
                <rect
                  x="54"
                  y="184"
                  width="192"
                  height="70"
                  fill="url(#bcm-broth-fill)"
                />
                {/* Liquid surface — rounded ellipse for depth */}
                <ellipse
                  cx="150"
                  cy="184"
                  rx="96"
                  ry="9"
                  fill="url(#bcm-broth-surface)"
                />
                {/* Surface shimmer highlight */}
                <ellipse
                  cx="130"
                  cy="182"
                  rx="40"
                  ry="3.5"
                  fill="rgba(255,255,255,0.45)"
                />
              </g>

              {/* Noodles — Mee Pok (thick wavy) */}
              {order.noodle === 'mee-pok' && (
                <g>
                  <path
                    d="M80,170 C95,160 115,178 130,168 C145,158 165,175 180,165 C195,155 210,168 220,160"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M75,185 C90,175 110,192 125,182 C140,172 160,188 175,178 C190,168 208,182 222,174"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M82,200 C97,191 117,207 132,197 C147,187 166,202 180,193 C194,184 210,195 218,188"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M88,215 C100,207 118,220 132,212 C146,204 162,217 174,209 C188,201 202,212 216,205"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {/* Noodles — Mee Kia (thin springy) */}
              {order.noodle === 'mee-kia' && (
                <g>
                  <path
                    d="M85,168 C92,161 100,174 108,167 C116,160 124,173 132,166 C140,159 148,172 156,165 C164,158 172,170 180,163 C188,156 196,168 204,162 C212,156 218,165 222,160"
                    fill="none"
                    stroke="#fcd34d"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M82,180 C89,173 97,186 105,179 C113,172 121,185 129,178 C137,171 145,184 153,177 C161,170 169,182 177,175 C185,168 193,180 201,173 C209,166 216,178 221,172"
                    fill="none"
                    stroke="#fde68a"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M84,192 C91,185 99,198 107,191 C115,184 123,197 131,190 C139,183 147,196 155,189 C163,182 171,194 179,187 C187,180 195,192 203,186 C210,180 217,191 222,185"
                    fill="none"
                    stroke="#fcd34d"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M86,204 C93,197 101,210 109,203 C117,196 125,209 133,202 C141,195 149,208 157,201 C165,194 173,206 181,199 C189,192 197,204 205,198 C212,192 218,202 222,196"
                    fill="none"
                    stroke="#fde68a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M88,215 C95,208 103,221 111,214 C119,207 127,219 135,213 C143,207 151,218 159,212 C167,206 174,217 181,211 C188,205 196,216 204,210"
                    fill="none"
                    stroke="#fcd34d"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {/* Noodles — Bee Hoon (fine, near-straight) */}
              {order.noodle === 'bee-hoon' && (
                <g>
                  <path
                    d="M82,167 C100,162 120,172 140,165 C160,158 180,167 200,162 C212,158 218,164 222,161"
                    fill="none"
                    stroke="#d4b896"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M80,176 C98,171 118,181 138,174 C158,167 178,176 198,171 C210,167 217,173 222,169"
                    fill="none"
                    stroke="#c9a87a"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M83,185 C101,180 121,190 141,183 C161,176 181,185 201,180 C212,176 218,182 222,179"
                    fill="none"
                    stroke="#d4b896"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M82,194 C100,189 120,199 140,192 C160,185 180,194 200,189 C211,185 218,191 222,188"
                    fill="none"
                    stroke="#c9a87a"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M85,203 C103,198 123,208 143,201 C163,194 182,203 201,198 C212,194 218,200 222,197"
                    fill="none"
                    stroke="#c9a87a"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M86,212 C104,207 124,217 144,210 C164,203 183,212 202,207 C212,203 218,209 222,206"
                    fill="none"
                    stroke="#d4b896"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {/* Minced pork (always present) */}
              <circle
                cx="118"
                cy="162"
                r="5"
                fill="#c2410c"
                fillOpacity="0.85"
              />
              <circle
                cx="130"
                cy="157"
                r="4"
                fill="#9a3412"
                fillOpacity="0.8"
              />
              <circle
                cx="142"
                cy="163"
                r="4.5"
                fill="#c2410c"
                fillOpacity="0.8"
              />
              <circle
                cx="155"
                cy="158"
                r="4"
                fill="#9a3412"
                fillOpacity="0.75"
              />
              <circle
                cx="167"
                cy="163"
                r="5"
                fill="#c2410c"
                fillOpacity="0.85"
              />
              <circle
                cx="178"
                cy="158"
                r="3.5"
                fill="#9a3412"
                fillOpacity="0.8"
              />

              {/* Braised egg */}
              <g
                style={{
                  opacity: hasEgg ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <ellipse cx="100" cy="215" rx="18" ry="14" fill="#f59e0b" />
                <ellipse cx="100" cy="213" rx="10" ry="8" fill="#fbbf24" />
                <ellipse cx="99" cy="212" rx="5" ry="4" fill="#f97316" />
              </g>

              {/* Fishballs */}
              <g
                style={{
                  opacity: hasFishballs ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <circle
                  cx="200"
                  cy="208"
                  r="11"
                  fill="white"
                  stroke="#e2e8f0"
                  strokeWidth="1.5"
                />
                <circle cx="200" cy="207" r="6" fill="#f1f5f9" />
                <circle
                  cx="185"
                  cy="218"
                  r="9"
                  fill="white"
                  stroke="#e2e8f0"
                  strokeWidth="1.5"
                />
              </g>

              {/* Pork ribs */}
              <g
                style={{
                  opacity: hasRibs ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <rect
                  x="194"
                  y="160"
                  width="22"
                  height="8"
                  rx="4"
                  fill="#9a3412"
                  transform="rotate(-20,205,164)"
                />
                <rect
                  x="196"
                  y="172"
                  width="20"
                  height="7"
                  rx="3.5"
                  fill="#b45309"
                  transform="rotate(-15,206,175)"
                />
                <rect
                  x="190"
                  y="164"
                  width="3"
                  height="14"
                  rx="1.5"
                  fill="#7c2d12"
                  transform="rotate(-20,191.5,171)"
                />
                <rect
                  x="198"
                  y="170"
                  width="3"
                  height="14"
                  rx="1.5"
                  fill="#7c2d12"
                  transform="rotate(-15,199.5,177)"
                />
              </g>

              {/* Extra lard — cream-white fatty chunks */}
              <g
                style={{
                  opacity: hasLard ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <ellipse
                  cx="93"
                  cy="178"
                  rx="8"
                  ry="5"
                  fill="#fef9ee"
                  stroke="#fde68a"
                  strokeWidth="0.8"
                />
                <ellipse
                  cx="175"
                  cy="222"
                  rx="7"
                  ry="4"
                  fill="#fef9ee"
                  stroke="#fde68a"
                  strokeWidth="0.8"
                />
                <ellipse
                  cx="210"
                  cy="178"
                  rx="6"
                  ry="4"
                  fill="#fffbeb"
                  stroke="#fde68a"
                  strokeWidth="0.8"
                />
                <ellipse
                  cx="140"
                  cy="235"
                  rx="5"
                  ry="3.5"
                  fill="#fef9ee"
                  stroke="#fde68a"
                  strokeWidth="0.8"
                />
              </g>

              {/* Extra chili — sliced red chili rings */}
              <g
                style={{
                  opacity: hasChili ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <ellipse cx="88" cy="205" rx="4" ry="6.5" fill="#dc2626" />
                <ellipse cx="88" cy="205" rx="1.8" ry="3" fill="#fca5a5" />
                <ellipse cx="205" cy="170" rx="4" ry="6.5" fill="#b91c1c" />
                <ellipse cx="205" cy="170" rx="1.8" ry="3" fill="#fca5a5" />
                <ellipse cx="155" cy="230" rx="3.5" ry="5.5" fill="#dc2626" />
                <ellipse cx="155" cy="230" rx="1.5" ry="2.5" fill="#fca5a5" />
              </g>

              {/* Extra vinegar — dark black vinegar pools */}
              <g
                style={{
                  opacity: hasVinegar ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <ellipse
                  cx="108"
                  cy="226"
                  rx="11"
                  ry="6"
                  fill="#1c0a00"
                  fillOpacity="0.75"
                />
                <ellipse
                  cx="108"
                  cy="225"
                  rx="7"
                  ry="3.5"
                  fill="#3b1a08"
                  fillOpacity="0.6"
                />
                <ellipse
                  cx="198"
                  cy="236"
                  rx="9"
                  ry="5"
                  fill="#1c0a00"
                  fillOpacity="0.7"
                />
                <ellipse
                  cx="198"
                  cy="235"
                  rx="5.5"
                  ry="2.8"
                  fill="#3b1a08"
                  fillOpacity="0.55"
                />
                <ellipse
                  cx="162"
                  cy="216"
                  rx="7"
                  ry="4"
                  fill="#1c0a00"
                  fillOpacity="0.65"
                />
              </g>

              {/* Spice oil pools */}
              <circle
                cx="165"
                cy="195"
                r="6"
                fill="#ef4444"
                style={{
                  opacity: spiceOilOpacity,
                  transition: 'opacity 0.5s ease',
                }}
              />
              <circle
                cx="185"
                cy="175"
                r="5"
                fill="#dc2626"
                style={{
                  opacity: spiceOilOpacity,
                  transition: 'opacity 0.5s ease',
                }}
              />
              <circle
                cx="120"
                cy="200"
                r="5.5"
                fill="#ef4444"
                style={{
                  opacity: spiceOilOpacity,
                  transition: 'opacity 0.5s ease',
                }}
              />
            </g>

            {/* Bowl rim on top (depth) */}
            <ellipse
              cx="150"
              cy="148"
              rx="98"
              ry="22"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="2"
            />
            <ellipse
              cx="150"
              cy="146"
              rx="88"
              ry="17"
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="3"
            />

            {/* Steam */}
            <g transform="translate(120,90)">
              <path
                className="steam"
                d="M0,30 C-4,20 4,10 0,0"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
            <g transform="translate(150,80)">
              <path
                className="steam"
                d="M0,35 C5,22 -5,12 0,0"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
            <g transform="translate(180,88)">
              <path
                className="steam"
                d="M0,30 C4,18 -4,8 0,0"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}
