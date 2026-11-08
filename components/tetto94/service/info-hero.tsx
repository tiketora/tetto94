'use client'

import Link from 'next/link'
import { Check, ChevronRight, Phone } from 'lucide-react'
import { trackCTAClick, trackPhoneClick } from '@/lib/gtag'
import { T94Button } from '@/components/tetto94/ds/t94-button'
import HeroForm from '@/components/tetto94/hero-form'
import { PHONE_LABEL, PHONE_TEL } from '@/components/tetto94/service/service-utils'

interface InfoHeroProps {
  slug: string
  breadcrumb: string
  smallLine?: string
  h1: string
  subtitle: string
  shortAnswer: string
  ticks: string[]
  formService: string
}

/** Hero for the guide pages (ripasso, condominio): same layout as the service hero, text-driven. */
export default function InfoHero({
  slug,
  breadcrumb,
  smallLine,
  h1,
  subtitle,
  shortAnswer,
  ticks,
  formService,
}: InfoHeroProps) {
  return (
    <section aria-labelledby="info-hero-title" className="t94-type bg-white pt-[88px] md:pt-[132px]">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 pb-14 pt-8 md:px-8 md:pb-20 md:pt-14 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-14">
        <div className="flex flex-col gap-6">
          <nav aria-label="Breadcrumb">
            <ol className="t94-small flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="inline-flex min-h-[32px] items-center underline-offset-4 hover:text-t94-dark hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-4" />
              </li>
              <li>
                <Link href="/servizi" className="inline-flex min-h-[32px] items-center underline-offset-4 hover:text-t94-dark hover:underline">
                  Servizi
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-4" />
              </li>
              <li aria-current="page" className="font-semibold text-t94-dark">
                {breadcrumb}
              </li>
            </ol>
          </nav>

          <p className="t94-small -mb-3">Aggiornato a ottobre 2026</p>

          <h1 id="info-hero-title" className="t94-h1 text-balance">
            {h1}
          </h1>

          <p className="t94-lead max-w-xl">{subtitle}</p>
          <p className="t94-body max-w-xl">{shortAnswer}</p>
          {smallLine ? <p className="t94-small max-w-xl">{smallLine}</p> : null}

          <ul className="flex flex-col gap-3">
            {ticks.map((tick) => (
              <li key={tick} className="flex items-start gap-3 font-t94 text-[18px] font-medium text-t94-dark">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-t94-green/12 text-t94-green">
                  <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                </span>
                {tick}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
            <T94Button
              href="#hero-form"
              onClick={() => trackCTAClick(`service_hero_${slug}`, '#hero-form')}
              className="whitespace-nowrap max-lg:hidden"
            >
              Richiedi il sopralluogo gratuito
            </T94Button>
            <T94Button
              href={PHONE_TEL}
              variant="outline"
              className="whitespace-nowrap"
              onClick={() => trackPhoneClick('lp_hero')}
            >
              <Phone className="size-5" aria-hidden="true" />
              Chiama {PHONE_LABEL}
            </T94Button>
          </div>
        </div>

        <HeroForm defaultService={formService} pageId={`service_${slug}`} />
      </div>
    </section>
  )
}
