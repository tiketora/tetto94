import { Fragment, type ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { T94Section, T94Heading } from '@/components/tetto94/ds/t94-section'
import { LPEyebrow } from '@/components/tetto94/lp/lp-parts'
import {
  CheckItem,
  CostSection,
  CtaBand,
  ExtraSection,
  FaqSection,
  PackageSection,
  SectionIntro,
  StepsSection,
  WorksReviewsSection,
  type SectionProps,
  type Tone,
} from '@/components/tetto94/service/service-body'
import ServiceCityCompare from '@/components/tetto94/service/service-city-compare'
import { sentence } from '@/components/tetto94/service/service-utils'
import { LOCATIONS, SERVICES, type LocationConfig, type ServiceConfig } from '@/data/services'
import type { CitySeoData } from '@/data/city-seo'
import type { GoogleReviewsData } from '@/lib/google-reviews'

interface CityProps extends SectionProps {
  location: LocationConfig
}

interface CitySeoProps extends CityProps {
  data: CitySeoData
}

/* ── Il servizio nella città ─────────────────────────────── */
function CityIntroSection({
  service,
  location,
  tone,
  text,
}: CityProps & { text: string }) {
  return (
    <T94Section tone={tone} labelledBy="svc-intro-title">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-4">
          <LPEyebrow>{`Il servizio a ${location.name}`}</LPEyebrow>
          <T94Heading id="svc-intro-title">{`${sentence(service.nameFull)} a ${location.name}`}</T94Heading>
          <p className="t94-body text-t94-text-secondary">{text}</p>
        </div>
        <div className="flex flex-col gap-5">
          <p className="t94-h3">Perché sceglierci</p>
          <ul className="flex flex-col gap-3">
            {service.benefits.map((benefit) => (
              <CheckItem key={benefit}>{benefit}</CheckItem>
            ))}
          </ul>
        </div>
      </div>
    </T94Section>
  )
}

/* ── Costo totale per superficie ─────────────────────────── */
function TotalCostSection({ data, location, tone }: CitySeoProps) {
  const rows = data.costiTotali ?? []
  return (
    <T94Section tone={tone} labelledBy="svc-totals-title">
      <SectionIntro
        eyebrow="Esempi di costo"
        title={`Quanto costa un tetto completo a ${location.name}?`}
        titleId="svc-totals-title"
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((row, i) => (
          <li
            key={row.superficie}
            className={`flex flex-col gap-3 rounded-[14px] border bg-white p-6 ${
              i === 2 ? 'border-t94-red' : 'border-t94-border'
            }`}
          >
            {i === 2 ? (
              <span className="self-start rounded-full bg-t94-red/10 px-2.5 py-0.5 font-t94 text-[15px] font-semibold text-t94-red">
                Più richiesto
              </span>
            ) : null}
            <p className="t94-h3">{row.superficie}</p>
            <p className="font-t94 text-[28px] font-bold leading-tight text-t94-dark">
              {row.prezzoMin} <span className="text-t94-text-secondary">–</span>{' '}
              <span className="text-t94-red">{row.prezzoMax}</span>
            </p>
            <p className="t94-small">{row.note}</p>
          </li>
        ))}
      </ul>
    </T94Section>
  )
}

/* ── Senza ponteggi nella città ──────────────────────────── */
function CityNoScaffoldingSection({ data, tone }: CitySeoProps) {
  const block = data.senzaPonteggi
  return (
    <T94Section tone={tone} labelledBy="svc-scaffold-title">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-5">
          <LPEyebrow>Il nostro vantaggio</LPEyebrow>
          <T94Heading id="svc-scaffold-title">{block.titolo}</T94Heading>
          <p className="t94-lead">{block.intro}</p>
          <div className="flex flex-col gap-1 self-start rounded-[14px] border border-t94-border bg-white px-6 py-4">
            <span className="t94-small font-semibold">Risparmio sul ponteggio</span>
            <span className="font-t94 text-[32px] font-bold leading-none text-t94-red">{block.risparmio}</span>
          </div>
          <Link
            href="/#senza-ponteggi"
            className="inline-flex min-h-[48px] items-center gap-2 self-start font-t94 text-[17px] font-semibold text-t94-dark underline decoration-t94-border decoration-2 underline-offset-[6px] transition-colors hover:decoration-t94-red"
          >
            Come funziona il rifacimento senza ponteggi
            <ArrowRight className="size-5 text-t94-red" aria-hidden="true" />
          </Link>
        </div>
        <ul className="flex flex-col gap-3">
          {block.vantaggi.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </ul>
      </div>
    </T94Section>
  )
}

/* ── Zone coperte ────────────────────────────────────────── */
function CoveredAreasSection({ data, location, tone }: CitySeoProps) {
  return (
    <T94Section tone={tone} labelledBy="svc-areas-title">
      <SectionIntro
        eyebrow="Dove operiamo"
        title={`Comuni serviti nella zona di ${location.name}`}
        titleId="svc-areas-title"
      >
        {data.mapsCaption ? <p className="t94-lead">{data.mapsCaption}</p> : null}
      </SectionIntro>
      <ul className="flex flex-wrap gap-3">
        {data.comuniCoperti.map((comune) => (
          <li
            key={comune}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-t94-border bg-white px-4 font-t94 text-[16px] font-medium text-t94-dark"
          >
            <MapPin className="size-4 text-t94-red" aria-hidden="true" />
            {comune}
          </li>
        ))}
      </ul>
    </T94Section>
  )
}

/* ── Materiali ───────────────────────────────────────────── */
function MaterialsSection({ data, location, tone }: CitySeoProps) {
  return (
    <T94Section tone={tone} labelledBy="svc-materials-title">
      <SectionIntro
        eyebrow="Materiali"
        title={`Materiali consigliati per i tetti di ${location.name}`}
        titleId="svc-materials-title"
      />
      <ul className="grid gap-5 md:grid-cols-3">
        {data.materiali.map((material) => (
          <li key={material.nome} className="flex flex-col gap-3 rounded-[14px] border border-t94-border bg-white p-6">
            <h3 className="t94-h3">{material.nome}</h3>
            <p className="t94-body text-t94-text-secondary">{material.descrizione}</p>
            <p className="t94-small mt-auto border-t border-t94-border pt-3">
              <span className="font-semibold text-t94-dark">Perché qui: </span>
              {material.adatto}
            </p>
          </li>
        ))}
      </ul>
    </T94Section>
  )
}

/* ── Bonus ───────────────────────────────────────────────── */
function BonusSection({ data, location, tone }: CitySeoProps) {
  return (
    <T94Section tone={tone} labelledBy="svc-bonus-title">
      <SectionIntro
        eyebrow="Incentivi"
        title={`Bonus e detrazioni per il tetto a ${location.name}`}
        titleId="svc-bonus-title"
      />
      <ul className="grid gap-5 md:grid-cols-3">
        {data.bonus.map((bonus) => (
          <li key={bonus.nome} className="flex flex-col gap-3 rounded-[14px] border border-t94-border bg-white p-6">
            <h3 className="t94-h3">{bonus.nome}</h3>
            <p className="font-t94 text-[32px] font-bold leading-none text-t94-red">{bonus.percentuale}</p>
            <dl className="flex flex-col gap-1 font-t94 text-[16px]">
              <div className="flex justify-between gap-4">
                <dt className="text-t94-text-secondary">Massimale</dt>
                <dd className="font-semibold text-t94-dark">{bonus.massimale}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-t94-text-secondary">Scadenza</dt>
                <dd className="font-semibold text-t94-dark">{bonus.scadenza}</dd>
              </div>
            </dl>
            <p className="t94-small">{bonus.note}</p>
          </li>
        ))}
      </ul>
      <p className="t94-small mt-6 max-w-[44rem]">
        <span className="font-semibold text-t94-dark">Nota importante: </span>
        le aliquote e i massimali possono variare con la Legge di Bilancio annuale. Verifica sempre le condizioni
        aggiornate con il tuo commercialista.
      </p>
    </T94Section>
  )
}

/* ── Prima e dopo ────────────────────────────────────────── */
function BeforeAfterSection({ data, location, tone }: CitySeoProps) {
  return (
    <T94Section tone={tone} labelledBy="svc-compare-title">
      <SectionIntro
        eyebrow="Prima e dopo"
        title={`Un tetto rifatto a ${location.name}`}
        titleId="svc-compare-title"
      />
      <ServiceCityCompare beforeSrc={data.beforeImage} afterSrc={data.afterImage} cityName={location.name} />
    </T94Section>
  )
}

/* ── Mappa ───────────────────────────────────────────────── */
function MapSection({ data, location, tone }: CitySeoProps) {
  return (
    <T94Section tone={tone} labelledBy="svc-map-title">
      <SectionIntro eyebrow="Zona di intervento" title={`Interveniamo a ${location.name}`} titleId="svc-map-title" />
      <div className="aspect-[4/3] w-full overflow-hidden rounded-[14px] border border-t94-border md:aspect-[16/7]">
        <iframe
          src={data.mapsEmbedSrc}
          title={`Mappa della zona di ${location.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-same-origin allow-popups"
          className="size-full border-0"
        />
      </div>
    </T94Section>
  )
}

/* ── Altre città e altri servizi ─────────────────────────── */
function CityRelatedSection({ service, location, tone }: CityProps) {
  const sameRegion = LOCATIONS.filter((l) => l.slug !== location.slug && l.region === location.region)
  const cities = (sameRegion.length >= 6 ? sameRegion : LOCATIONS.filter((l) => l.slug !== location.slug)).slice(0, 12)
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug)

  return (
    <T94Section tone={tone} labelledBy="svc-related-title">
      <SectionIntro
        eyebrow="Altre zone e servizi"
        title={`${service.name} nelle città vicine`}
        titleId="svc-related-title"
      />
      <ul className="mb-12 flex flex-wrap gap-3">
        {cities.map((city) => (
          <li key={city.slug}>
            <Link
              href={`/${service.slug}/${city.slug}`}
              prefetch={false}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-t94-border bg-white px-5 font-t94 text-[17px] font-medium text-t94-dark transition-colors hover:border-t94-dark"
            >
              {city.name}
              <span className="text-[15px] font-semibold text-t94-red">{city.province}</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="t94-h3 mb-5">{`Altri servizi a ${location.name}`}</p>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {otherServices.map((other) => (
          <li key={other.slug}>
            <Link
              href={`/${other.slug}/${location.slug}`}
              prefetch={false}
              className="group flex h-full flex-col gap-3 rounded-[14px] border border-t94-border bg-white p-6 transition-colors hover:border-t94-dark"
            >
              <h3 className="t94-h3">{`${other.name} a ${location.name}`}</h3>
              <p className="t94-small line-clamp-3">{other.description}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-2 font-t94 text-[16px] font-semibold text-t94-red">
                Scopri di più
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </T94Section>
  )
}

/**
 * Everything below the hero + trust strip on a city page. Same alternating
 * white / grey rhythm as the service page; city-specific blocks only render
 * when the city has the data for them.
 */
export default function ServiceCityBody({
  service,
  location,
  google,
  citySeoData,
  cityParagraph,
}: {
  service: ServiceConfig
  location: LocationConfig
  google: GoogleReviewsData | null
  citySeoData?: CitySeoData
  cityParagraph?: string
}) {
  const blocks: { key: string; render: (tone: Tone) => ReactNode }[] = []
  const city = location.name

  if (citySeoData) {
    blocks.push({
      key: 'cost',
      render: (tone) => (
        <CostSection
          service={service}
          tone={tone}
          override={{
            eyebrow: `Prezzi ${city}`,
            title: `Quanto costa rifare il tetto a ${city}?`,
            intro: citySeoData.priceIntro,
            note: 'I prezzi sono indicativi e includono IVA. Il preventivo definitivo arriva dopo il sopralluogo gratuito con drone.',
            rows: citySeoData.prezzi,
          }}
        />
      ),
    })
    if (citySeoData.costiTotali?.length) {
      blocks.push({
        key: 'totals',
        render: (tone) => <TotalCostSection service={service} location={location} data={citySeoData} tone={tone} />,
      })
    }
    blocks.push({
      key: 'scaffold',
      render: (tone) => <CityNoScaffoldingSection service={service} location={location} data={citySeoData} tone={tone} />,
    })
    blocks.push({
      key: 'areas',
      render: (tone) => <CoveredAreasSection service={service} location={location} data={citySeoData} tone={tone} />,
    })
  } else if (service.prezziTable?.length) {
    blocks.push({ key: 'cost', render: (tone) => <CostSection service={service} tone={tone} /> })
  }

  blocks.push({
    key: 'intro',
    render: (tone) => (
      <CityIntroSection
        service={service}
        location={location}
        tone={tone}
        text={citySeoData?.heroLongText ?? cityParagraph ?? `${service.longDescription} ${location.description}`}
      />
    ),
  })

  service.extraSections?.forEach((extra, index) => {
    blocks.push({
      key: `extra-${index}`,
      render: (tone) => <ExtraSection extra={extra} index={index} tone={tone} />,
    })
  })

  if (citySeoData) {
    blocks.push({
      key: 'materials',
      render: (tone) => <MaterialsSection service={service} location={location} data={citySeoData} tone={tone} />,
    })
    blocks.push({
      key: 'bonus',
      render: (tone) => <BonusSection service={service} location={location} data={citySeoData} tone={tone} />,
    })
  }

  if (service.checklistItems?.length) {
    blocks.push({ key: 'package', render: (tone) => <PackageSection service={service} tone={tone} /> })
  }

  blocks.push({ key: 'steps', render: (tone) => <StepsSection service={service} tone={tone} /> })

  if (citySeoData) {
    blocks.push({
      key: 'compare',
      render: (tone) => <BeforeAfterSection service={service} location={location} data={citySeoData} tone={tone} />,
    })
  }

  blocks.push({
    key: 'works',
    render: (tone) => <WorksReviewsSection service={service} tone={tone} google={google} cityName={city} />,
  })

  if (citySeoData) {
    blocks.push({
      key: 'map',
      render: (tone) => <MapSection service={service} location={location} data={citySeoData} tone={tone} />,
    })
  }

  blocks.push(
    {
      key: 'faq',
      render: (tone) => (
        <FaqSection service={service} tone={tone} cityName={city} extraItems={citySeoData?.faqExtra} />
      ),
    },
    { key: 'related', render: (tone) => <CityRelatedSection service={service} location={location} tone={tone} /> },
  )

  return (
    <>
      {blocks.map((block, i) => (
        <Fragment key={block.key}>{block.render(i % 2 === 0 ? 'white' : 'grey')}</Fragment>
      ))}
      <CtaBand service={service} cityName={city} />
    </>
  )
}
