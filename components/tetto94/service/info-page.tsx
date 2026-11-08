import { Fragment, type ReactNode } from 'react'
import { Plus } from 'lucide-react'
import Navbar from '@/components/tetto94/navbar'
import Footer from '@/components/tetto94/footer'
import MobileStickyBar from '@/components/tetto94/mobile-sticky-bar'
import { T94Section, T94Heading } from '@/components/tetto94/ds/t94-section'
import { T94Button } from '@/components/tetto94/ds/t94-button'
import { LPEyebrow } from '@/components/tetto94/lp/lp-parts'
import InfoHero from '@/components/tetto94/service/info-hero'
import { CheckItem } from '@/components/tetto94/service/service-body'
import { PHONE_LABEL, PHONE_TEL } from '@/components/tetto94/service/service-utils'
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema'

type Tone = 'white' | 'grey'

export type InfoSection =
  | { kind: 'text'; id: string; title: string; body: ReactNode[] }
  | { kind: 'list'; id: string; title: string; items: string[]; price?: { line: string; cta: string } }
  | { kind: 'steps'; id: string; title: string; steps: { title: string; desc: string }[]; after?: ReactNode }

export interface InfoPageSpec {
  slug: string
  breadcrumb: string
  smallLine?: string
  h1: string
  subtitle: string
  shortAnswer: string
  ticks: string[]
  formService: string
  sections: InfoSection[]
  faq: { q: string; a: string }[]
  faqTitle?: string
}

function TextSection({ section, tone }: { section: Extract<InfoSection, { kind: 'text' }>; tone: Tone }) {
  return (
    <T94Section tone={tone} labelledBy={section.id}>
      <div className="flex max-w-[46rem] flex-col gap-5">
        <T94Heading id={section.id}>{section.title}</T94Heading>
        {section.body.map((paragraph, i) => (
          <p key={i} className="t94-body text-t94-text-secondary">
            {paragraph}
          </p>
        ))}
      </div>
    </T94Section>
  )
}

function ListSection({ section, tone }: { section: Extract<InfoSection, { kind: 'list' }>; tone: Tone }) {
  return (
    <T94Section tone={tone} labelledBy={section.id}>
      <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <T94Heading id={section.id}>{section.title}</T94Heading>
          <ul className="flex flex-col gap-3">
            {section.items.map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </ul>
        </div>
        {section.price ? (
          <div className="flex flex-col gap-5 rounded-[14px] border border-t94-border bg-white p-6 shadow-[0_20px_50px_-28px_rgba(27,27,27,0.25)] md:p-8 lg:sticky lg:top-32">
            <p className="font-t94 text-[40px] font-bold leading-tight text-t94-red">{section.price.line}</p>
            <T94Button href="#hero-form" fullWidth>
              {section.price.cta}
            </T94Button>
          </div>
        ) : null}
      </div>
    </T94Section>
  )
}

function StepsSection({ section, tone }: { section: Extract<InfoSection, { kind: 'steps' }>; tone: Tone }) {
  return (
    <T94Section tone={tone} labelledBy={section.id}>
      <div className="mb-10 flex flex-col items-center gap-4 text-center md:mb-12">
        <LPEyebrow>Come lavoriamo</LPEyebrow>
        <T94Heading id={section.id}>{section.title}</T94Heading>
      </div>
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {section.steps.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-4 rounded-[14px] border border-t94-border bg-white p-6">
            <span className="flex size-12 items-center justify-center rounded-full bg-t94-red font-t94 text-[20px] font-bold text-white">
              {i + 1}
            </span>
            <h3 className="t94-h3">{step.title}</h3>
            <p className="t94-body text-t94-text-secondary">{step.desc}</p>
          </li>
        ))}
      </ol>
      {section.after ? <p className="t94-body mt-8 text-center text-t94-text-secondary">{section.after}</p> : null}
    </T94Section>
  )
}

function InfoFaq({ items, title, tone }: { items: { q: string; a: string }[]; title: string; tone: Tone }) {
  return (
    <T94Section tone={tone} labelledBy="info-faq-title">
      <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="flex flex-col gap-4 lg:sticky lg:top-32">
          <LPEyebrow>Hai dubbi?</LPEyebrow>
          <T94Heading id="info-faq-title">{title}</T94Heading>
          <a
            href={PHONE_TEL}
            className="inline-flex min-h-[48px] items-center self-start font-t94 text-[17px] font-semibold text-t94-dark underline decoration-t94-border decoration-2 underline-offset-[6px] hover:decoration-t94-red"
          >
            Oppure chiamaci: {PHONE_LABEL}
          </a>
        </div>
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <details
              key={item.q}
              open={i === 0}
              className="group rounded-[14px] border border-t94-border bg-white transition-colors open:border-t94-dark/30"
            >
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-t94 text-[17px] font-semibold text-t94-dark marker:hidden [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-t94-grey transition-transform duration-300 group-open:rotate-45">
                  <Plus className="size-[18px] text-t94-red" aria-hidden="true" />
                </span>
              </summary>
              <p className="t94-body px-5 pb-5 text-t94-text-secondary">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </T94Section>
  )
}

function InfoCtaBand() {
  return (
    <section aria-labelledby="info-cta-title" className="t94-type bg-t94-red py-16 md:py-20">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-5 text-center md:px-8">
        <h2 id="info-cta-title" className="t94-h2 max-w-[28ch] text-balance" style={{ color: '#fff' }}>
          Vuoi un preventivo per il tuo tetto?
        </h2>
        <p className="t94-lead max-w-xl" style={{ color: 'rgba(255,255,255,0.9)' }}>
          Preventivo gratuito entro 24 ore · Ispezione drone inclusa · Garanzia scritta fino a 10 anni
        </p>
        <T94Button href="/contatti" variant="outline" className="border-white">
          Richiedi Preventivo
        </T94Button>
      </div>
    </section>
  )
}

/**
 * Guide pages (ripasso, condominio): hero with lead form, then text sections
 * alternating grey/white, FAQ and the red CTA band. No price table, city list
 * or related services, as the marketing brief asks. LocalBusiness comes from the root layout.
 */
export default function InfoPage({ spec }: { spec: InfoPageSpec }) {
  const path = `/${spec.slug}`
  const jsonLd = [
    faqPageSchema(spec.faq.map((f) => ({ question: f.q, answer: f.a }))),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Servizi', path: '/servizi' },
      { name: spec.breadcrumb, path },
    ]),
  ]

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <Navbar />
      <main>
        <InfoHero
          slug={spec.slug}
          breadcrumb={spec.breadcrumb}
          smallLine={spec.smallLine}
          h1={spec.h1}
          subtitle={spec.subtitle}
          shortAnswer={spec.shortAnswer}
          ticks={spec.ticks}
          formService={spec.formService}
        />
        {spec.sections.map((section, i) => {
          const tone: Tone = i % 2 === 0 ? 'grey' : 'white'
          return (
            <Fragment key={section.id}>
              {section.kind === 'text' ? <TextSection section={section} tone={tone} /> : null}
              {section.kind === 'list' ? <ListSection section={section} tone={tone} /> : null}
              {section.kind === 'steps' ? <StepsSection section={section} tone={tone} /> : null}
            </Fragment>
          )
        })}
        <InfoFaq
          items={spec.faq}
          title={spec.faqTitle ?? 'Domande frequenti'}
          tone={spec.sections.length % 2 === 0 ? 'grey' : 'white'}
        />
        <InfoCtaBand />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  )
}
