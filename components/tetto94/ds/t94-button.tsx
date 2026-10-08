import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'whatsapp' | 'outline' | 'ghost'
type Size = 'md' | 'sm'

const variants: Record<Variant, string> = {
  primary: 'bg-t94-red text-white hover:bg-t94-red-hover border border-transparent',
  whatsapp: 'bg-t94-green text-white hover:bg-t94-green-hover border border-transparent',
  outline: 'bg-white text-t94-dark border border-t94-dark hover:bg-t94-grey',
  ghost: 'bg-transparent text-t94-dark border border-transparent hover:bg-t94-grey',
}

const sizes: Record<Size, string> = {
  md: 'min-h-[58px] px-7',
  sm: 'min-h-[48px] px-5',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-t94 font-t94 text-[18px] font-semibold leading-tight ' +
  'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t94-dark ' +
  'focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60'

type CommonProps = {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  className?: string
  children: React.ReactNode
}

type AnchorProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string }

type NativeButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined }

export type T94ButtonProps = AnchorProps | NativeButtonProps

export function T94Button(props: T94ButtonProps) {
  const { variant = 'primary', size = 'md', fullWidth, className, children, ...rest } = props
  const classes = cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)

  if (typeof rest.href === 'string') {
    const { href, ...anchorRest } = rest as AnchorProps
    const isInternal = href.startsWith('/') || href.startsWith('#')
    return isInternal ? (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    ) : (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    )
  }

  const { type = 'button', ...buttonRest } = rest as NativeButtonProps
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  )
}
