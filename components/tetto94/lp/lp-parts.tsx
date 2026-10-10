'use client'

import * as React from 'react'
import { Phone, Star } from 'lucide-react'
import Tetto94Logo from '@/components/tetto94/logo'
import { T94Button } from '@/components/tetto94/ds/t94-button'
import { trackPhoneClick } from '@/lib/gtag'
import { cn } from '@/lib/utils'

export const LP_PHONE = '+39 351 651 9363'
export const LP_PHONE_TEL = 'tel:+393516519363'

type LPHeaderProps = {
  mobileLabel?: string
}

export function LPHeader({ mobileLabel }: LPHeaderProps) {
  return (
    <header className="t94-type sticky top-0 z-50 border-b border-t94-border bg-white">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-3 md:px-8">
        <Tetto94Logo className="h-12 w-auto md:h-14" alt="Tetto94" textFill="#1B1B1B" />
        <T94Button
          href={LP_PHONE_TEL}
          size="sm"
          variant="outline"
          onClick={() => trackPhoneClick('lp_header')}
          aria-label={`Chiama Tetto94: ${LP_PHONE}`}
          className={cn(!mobileLabel && 'hidden sm:inline-flex')}
        >
          <Phone className="size-[18px] text-t94-red" aria-hidden="true" />
          <span className={cn(mobileLabel && 'hidden sm:inline')}>{LP_PHONE}</span>
          {mobileLabel ? <span className="sm:hidden">{mobileLabel}</span> : null}
        </T94Button>
      </div>
    </header>
  )
}

export function LPStickyCallBar({ label }: { label: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-t94-border bg-white p-3 shadow-[0_-8px_24px_rgba(27,27,27,0.12)] sm:hidden">
      <T94Button
        href={LP_PHONE_TEL}
        fullWidth
        onClick={() => trackPhoneClick('lp_mobile_sticky')}
        aria-label={`Chiama Tetto94: ${LP_PHONE}`}
      >
        <Phone className="size-5" aria-hidden="true" />
        {label}
      </T94Button>
    </div>
  )
}

export function LPFooter() {
  return (
    <footer className="t94-type bg-t94-dark pb-28 pt-10 text-white sm:pb-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-5 px-5 sm:flex-row md:px-8">
        <Tetto94Logo className="h-14 w-auto md:h-16" alt="Tetto94" />
        <a
          href={LP_PHONE_TEL}
          onClick={() => trackPhoneClick('lp_footer')}
          className="inline-flex min-h-[48px] items-center gap-2 font-t94 text-[17px] font-semibold text-white/85 transition-colors hover:text-white"
        >
          <Phone className="size-[18px]" aria-hidden="true" />
          {LP_PHONE}
        </a>
      </div>
    </footer>
  )
}

export function LPStars({ value = 5, className }: { value?: number; className?: string }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${value} stelle su 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            'size-[18px]',
            i < value ? 'fill-t94-red text-t94-red' : 'fill-transparent text-t94-border',
            className,
          )}
        />
      ))}
    </div>
  )
}

export function LPEyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('font-t94 text-[15px] font-semibold text-t94-red', className)}>{children}</span>
  )
}

type LPFormCardProps = {
  title: string
  subtitle: string
  children: React.ReactNode
  badge?: React.ReactNode
}

export function LPFormCard({ title, subtitle, children, badge }: LPFormCardProps) {
  return (
    <div className="rounded-[14px] border border-t94-border bg-white p-5 shadow-[0_20px_50px_-24px_rgba(27,27,27,0.28)] md:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="t94-h3">{title}</p>
          <p className="t94-small mt-1">{subtitle}</p>
        </div>
        {badge}
      </div>
      {children}
    </div>
  )
}

export function LPPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 self-start rounded-full border border-t94-border bg-t94-grey px-4 py-1.5 font-t94 text-[15px] font-semibold text-t94-dark">
      <span className="size-2 rounded-full bg-t94-red" aria-hidden="true" />
      {children}
    </span>
  )
}
