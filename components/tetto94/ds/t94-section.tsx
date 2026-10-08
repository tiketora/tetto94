import * as React from 'react'
import { cn } from '@/lib/utils'

type Tone = 'white' | 'grey' | 'dark'

const tones: Record<Tone, string> = {
  white: 'bg-white text-t94-text',
  grey: 'bg-t94-grey text-t94-text',
  dark: 'bg-t94-dark text-white',
}

type T94SectionProps = {
  tone?: Tone
  id?: string
  labelledBy?: string
  className?: string
  containerClassName?: string
  children: React.ReactNode
}

export function T94Section({
  tone = 'white',
  id,
  labelledBy,
  className,
  containerClassName,
  children,
}: T94SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('t94-type scroll-mt-28 py-16 md:py-24', tones[tone], className)}
    >
      <div className={cn('mx-auto w-full max-w-[1200px] px-5 md:px-8', containerClassName)}>
        {children}
      </div>
    </section>
  )
}

type HeadingLevel = 'h1' | 'h2' | 'h3'

const headingClass: Record<HeadingLevel, string> = {
  h1: 't94-h1',
  h2: 't94-h2',
  h3: 't94-h3',
}

type T94HeadingProps = {
  as?: HeadingLevel
  size?: HeadingLevel
  id?: string
  className?: string
  children: React.ReactNode
}

export function T94Heading({ as = 'h2', size, id, className, children }: T94HeadingProps) {
  const Tag = as
  return (
    <Tag id={id} className={cn(headingClass[size ?? as], 'text-balance', className)}>
      {children}
    </Tag>
  )
}
