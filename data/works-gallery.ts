/**
 * Tetto94 — Shared "Lavori Eseguiti" photo library.
 * Single source of truth for the 21 project photos, reused by:
 *  - WorksCarousel (homepage, full 21-photo slider)
 *  - ServiceWorksGallery (per-service bento preview, service + city pages)
 * Each service pulls a distinct, non-overlapping subset so the same
 * photo never appears twice across different services.
 */

export interface WorkPhoto {
  src: string
  index: string
  alt: string
}

export const WORKS: WorkPhoto[] = [
  { src: '/images/works/work-1.jpg', index: '01', alt: 'Rifacimento tegole tetto a Venezia — Tetto94' },
  { src: '/images/works/work-2.jpg', index: '02', alt: 'Manutenzione copertura tetto con ispezione drone — Tetto94 Venezia' },
  { src: '/images/works/work-3.jpg', index: '03', alt: 'Sostituzione tegole tetto in cotto — lavori eseguiti da Tetto94' },
  { src: '/images/works/work-4.jpg', index: '04', alt: 'Ripristino tegole rotte copertura — Tetto94 Venezia' },
  { src: '/images/works/work-5.jpg', index: '05', alt: 'Rifacimento completo tetto con tegole nuove — Tetto94' },
  { src: '/images/works/work-6.jpg', index: '06', alt: 'Ispezione drone copertura tetto — riparazione tetto Venezia' },
  { src: '/images/works/work-7.jpg', index: '07', alt: 'Copertura tetto in corso di rifacimento — Tetto94 Venezia province' },
  { src: '/images/works/work-8.jpg', index: '08', alt: 'Lavori di riparazione tetto completati — Tetto94' },
  { src: '/images/works/work-9.jpg', index: '09', alt: 'Stop infiltrazioni tetto — intervento Tetto94 Venezia' },
  { src: '/images/works/work-10.jpg', index: '10', alt: 'Drone ispezione tetto prima del rifacimento — Tetto94' },
  { src: '/images/works/work-11.jpg', index: '11', alt: 'Sostituzione tegole danneggiate tetto — Tetto94 Venezia' },
  { src: '/images/works/work-12.jpg', index: '12', alt: 'Riparazione tegole rotte tetto — lavori Tetto94' },
  { src: '/images/works/work-13.jpg', index: '13', alt: 'Manutenzione tetto e ripristino tegole — Tetto94 provincia Venezia' },
  { src: '/images/works/work-14.jpg', index: '14', alt: 'Tegole in cotto restaurate — copertura Tetto94 Venezia' },
  { src: '/images/works/work-15.jpg', index: '15', alt: 'Rifacimento tetto completo — impermeabilizzazione Tetto94' },
  { src: '/images/works/work-16.jpg', index: '16', alt: 'Ispezione tetto al tramonto — sopralluogo gratuito Tetto94' },
  { src: '/images/works/work-17.jpg', index: '17', alt: 'Copertura tetto restaurata con tegole nuove — Tetto94 Venezia' },
  { src: '/images/works/work-18.jpg', index: '18', alt: 'Riparazione tetto con lucernari — lavori Tetto94 Venezia' },
  { src: '/images/works/work-19.jpg', index: '19', alt: 'Tetto degradato prima del rifacimento — ispezione drone Tetto94' },
  { src: '/images/works/work-20.jpg', index: '20', alt: 'Tetto al tramonto — sopralluogo Tetto94 provincia Venezia' },
  { src: '/images/works/work-21.jpg', index: '21', alt: 'Vista panoramica tetto restaurato — Tetto94 Venezia' },
]

/**
 * Per-service photo picks for the ServiceWorksGallery bento preview.
 * Kept disjoint on purpose — no photo index is reused across services,
 * so "Rifacimento" and "Riparazione" never show the same shot.
 */
export const SERVICE_WORKS_PICKS: Record<string, string[]> = {
  'rifacimento-tetto': ['work-1.jpg', 'work-5.jpg', 'work-7.jpg', 'work-17.jpg'],
  'riparazione-tetto': ['work-3.jpg', 'work-8.jpg', 'work-11.jpg', 'work-18.jpg'],
  'impermeabilizzazione-tetto': ['work-6.jpg', 'work-9.jpg', 'work-15.jpg'],
  'infiltrazioni-tetto': ['work-4.jpg', 'work-12.jpg', 'work-19.jpg'],
  'pulizia-grondaie': ['work-2.jpg', 'work-13.jpg', 'work-16.jpg'],
  'coibentazione-tetto': ['work-10.jpg', 'work-14.jpg', 'work-20.jpg', 'work-21.jpg'],
}

export function getServiceWorks(slug: string): WorkPhoto[] {
  const picks = SERVICE_WORKS_PICKS[slug]
  if (!picks) return []
  return picks
    .map((file) => WORKS.find((w) => w.src.endsWith(file)))
    .filter((w): w is WorkPhoto => Boolean(w))
}