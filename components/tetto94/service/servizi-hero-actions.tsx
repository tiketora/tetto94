'use client'

import { Phone } from 'lucide-react'
import { trackCTAClick, trackPhoneClick } from '@/lib/gtag'
import { T94Button } from '@/components/tetto94/ds/t94-button'
import { PHONE_LABEL, PHONE_TEL } from '@/components/tetto94/service/service-utils'

export default function ServiziHeroActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <T94Button
        href="/calcola-preventivo"
        className="whitespace-nowrap"
        onClick={() => trackCTAClick('service_hero_servizi', '/calcola-preventivo')}
      >
        Richiedi preventivo gratuito
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
  )
}
