'use client'

import { Shield, Cpu, BadgeCheck, Zap, Star } from 'lucide-react'

const items = [
  { icon: Shield, text: 'Sicurezza totale, senza ponteggi.' },
  { icon: Cpu,    text: 'Ispezione gratuita con drone.' },
  { icon: BadgeCheck, text: 'Garanzia scritta su ogni lavoro.' },
  { icon: Zap,    text: 'Intervento entro 24 ore.' },
  { icon: Star,   text: 'Oltre 500 tetti completati.' },
  { icon: Shield, text: 'Sicurezza totale, senza ponteggi.' },
  { icon: Cpu,    text: 'Ispezione gratuita con drone.' },
  { icon: BadgeCheck, text: 'Garanzia scritta su ogni lavoro.' },
  { icon: Zap,    text: 'Intervento entro 24 ore.' },
  { icon: Star,   text: 'Oltre 500 tetti completati.' },
]

export default function MarqueeBar() {
  return (
    <div className="relative bg-[#161616] overflow-hidden py-3 border-y border-white/5">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-[#161616] to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-[#161616] to-transparent" />

      <div className="flex w-max animate-marquee">
        {items.map((item, i) => {
          const Icon = item.icon
          return (
            <div
              key={i}
              className="flex items-center gap-2.5 px-8 whitespace-nowrap"
            >
              <Icon className="size-3.5 text-[#EB1C26] shrink-0" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white">
                {item.text}
              </span>
              <span className="ml-4 text-[#EB1C26] font-black text-sm">·</span>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </div>
  )
}
