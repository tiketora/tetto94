// import type { TocEntry } from '@/lib/blog/toc'

// /**
//  * Pure anchor-link list to the post's H2/H3 sections — no client JS needed
//  * since browsers already handle #id smooth-scroll targets. Improves dwell
//  * time and gives long-form guides a scannable structure Google can surface
//  * as sitelinks.
//  */
// export default function TableOfContents({ entries }: { entries: TocEntry[] }) {
//   if (entries.length < 2) return null

//   return (
//     <nav aria-label="Indice dell'articolo" className="mb-10 border border-white/10 bg-white/[0.03] p-5">
//       <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/50">In questo articolo</p>
//       <ol className="flex flex-col gap-1.5">
//         {entries.map((entry) => (
//           <li key={entry.id} className={entry.level === 3 ? 'ml-4' : ''}>
//             <a href={`#${entry.id}`} className="text-sm text-white/70 transition-colors hover:text-[#EB1C26]">
//               {entry.text}
//             </a>
//           </li>
//         ))}
//       </ol>
//     </nav>
//   )
// }

import type { TocEntry } from '@/lib/blog/toc'

/**
 * Pure anchor-link list to the post's H2/H3 sections — no client JS needed
 * since browsers already handle #id smooth-scroll targets. Improves dwell
 * time and gives long-form guides a scannable structure Google can surface
 * as sitelinks.
 */
export default function TableOfContents({ entries }: { entries: TocEntry[] }) {
  if (entries.length < 2) return null

  return (
    <nav aria-label="Indice dell'articolo" className="mb-10 border border-border bg-muted p-5">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">In questo articolo</p>
      <ol className="flex flex-col gap-1.5">
        {entries.map((entry) => (
          <li key={entry.id} className={entry.level === 3 ? 'ml-4' : ''}>
            <a href={`#${entry.id}`} className="text-sm text-foreground/75 transition-colors hover:text-primary">
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
