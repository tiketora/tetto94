'use client'

import Link from 'next/link'
import { Check, ChevronRight, Phone } from 'lucide-react'
import { trackCTAClick, trackPhoneClick } from '@/lib/gtag'
import { T94Button } from '@/components/tetto94/ds/t94-button'
import HeroForm from '@/components/tetto94/hero-form'
import type { ServiceConfig } from '@/data/services'
import { FORM_SERVICE, PHONE_LABEL, PHONE_TEL, sentence } from '@/components/tetto94/service/service-utils'

/**
 * Service page hero — same structure as the homepage hero: breadcrumb, one H1,
 * one sentence, three ticks, a primary action and the phone, with the lead form
 * (service already selected) on the right and directly under the text on mobile.
 */
export default function ServiceHero({ service }: { service: ServiceConfig }) {
  const ticks = service.benefits.slice(0, 3)

  return (
    <section aria-labelledby="service-hero-title" className="t94-type bg-white pt-[88px] md:pt-[132px]">
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
              <li aria-current="page" className="font-semibold text-t94-dark">
                {service.name}
              </li>
            </ol>
          </nav>

          <h1 id="service-hero-title" className="t94-h1 text-balance">
            {sentence(service.headline)} <span className="text-t94-red">nel Nord-Est Italia</span>
          </h1>

          <p className="t94-lead max-w-xl">{service.subheadline}</p>

          <p className="t94-small max-w-xl">
            Veneto, Emilia-Romagna e Friuli-Venezia Giulia. Garanzia scritta 10 anni su ogni intervento.
          </p>

          {service.priceFrom ? (
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 self-start rounded-t94 border border-t94-border bg-t94-grey px-5 py-4">
              <span className="t94-small font-semibold">A partire da</span>
              {service.oldPrice ? (
                <span className="font-t94 text-[18px] text-t94-text-secondary line-through">{service.oldPrice}</span>
              ) : null}
              <span className="font-t94 text-[32px] font-bold leading-none text-t94-red">{service.priceFrom}</span>
              <span className="t94-small basis-full">Preventivo gratuito entro 24 ore</span>
            </div>
          ) : null}

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
              onClick={() => trackCTAClick(`service_hero_${service.slug}`, '#hero-form')}
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

        <HeroForm defaultService={FORM_SERVICE[service.slug] ?? ''} pageId={`service_${service.slug}`} />
      </div>
    </section>
  )
}
