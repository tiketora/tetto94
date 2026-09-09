// import Image from 'next/image'
// import Link from 'next/link'
// import { ArrowRight } from 'lucide-react'
// import type { BlogPost } from '@/lib/blog/queries'

// export default function BlogCard({ post }: { post: BlogPost }) {
//   const date = post.publishedAt ?? post.createdAt

//   return (
//     <Link
//       href={`/blog/${post.slug}`}
//       className="group flex flex-col overflow-hidden border border-white/10 bg-white/[0.02] transition-colors hover:border-white/25"
//     >
//       <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/5">
//         {post.coverImageUrl ? (
//           <Image
//             src={post.coverImageUrl}
//             alt={post.coverImageAlt || post.title}
//             fill
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//             className="object-cover transition-transform duration-500 group-hover:scale-105"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center text-white/20">
//             <span className="text-xs uppercase tracking-widest">Tetto94</span>
//           </div>
//         )}
//       </div>
//       <div className="flex flex-1 flex-col p-5">
//         <time dateTime={new Date(date).toISOString()} className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/35">
//           {new Date(date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
//         </time>
//         <h2 className="mt-2 text-base font-bold leading-snug text-white text-balance">{post.title}</h2>
//         {post.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/55">{post.excerpt}</p>}
//         <span className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#EB1C26]">
//           Leggi l&apos;articolo
//           <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
//         </span>
//       </div>
//     </Link>
//   )
// }

// import Image from 'next/image'
// import Link from 'next/link'
// import { ArrowRight } from 'lucide-react'
// import type { BlogPost } from '@/lib/blog/queries'
// import { getReadingTimeMinutes } from '@/lib/blog/reading-time'

// export default function BlogCard({ post }: { post: BlogPost }) {
//   const date = post.publishedAt ?? post.createdAt
//   const readingTime = getReadingTimeMinutes(post.contentHtml)

//   return (
//     <Link
//       href={`/blog/${post.slug}`}
//       className="group flex flex-col overflow-hidden border border-white/10 bg-white/[0.02] transition-colors hover:border-white/25"
//     >
//       <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/5">
//         {post.coverImageUrl ? (
//           <Image
//             src={post.coverImageUrl}
//             alt={post.coverImageAlt || post.title}
//             fill
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//             className="object-cover transition-transform duration-500 group-hover:scale-105"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center text-white/20">
//             <span className="text-xs uppercase tracking-widest">Tetto94</span>
//           </div>
//         )}
//       </div>
//       <div className="flex flex-1 flex-col p-5">
//         <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white/35">
//           <time dateTime={new Date(date).toISOString()}>
//             {new Date(date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
//           </time>
//           <span aria-hidden="true">·</span>
//           <span>{readingTime} min</span>
//         </div>
//         <h2 className="mt-2 text-base font-bold leading-snug text-white text-balance">{post.title}</h2>
//         {post.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/55">{post.excerpt}</p>}
//         {post.tags.length > 0 && (
//           <div className="mt-3 flex flex-wrap gap-1.5">
//             {post.tags.slice(0, 3).map((tag) => (
//               <span key={tag} className="border border-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/45">
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}
//         <span className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#EB1C26]">
//           Leggi l&apos;articolo
//           <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
//         </span>
//       </div>
//     </Link>
//   )
// }


import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/lib/blog/queries'
import { getReadingTimeMinutes } from '@/lib/blog/reading-time'

export default function BlogCard({ post }: { post: BlogPost }) {
  const date = post.publishedAt ?? post.createdAt
  const readingTime = getReadingTimeMinutes(post.contentHtml)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden border border-border bg-card transition-colors hover:border-primary/40"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {post.coverImageUrl ? (
          <Image
            src={post.coverImageUrl}
            alt={post.coverImageAlt || post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground/50">
            <span className="text-xs uppercase tracking-widest">Tetto94</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
          <time dateTime={new Date(date).toISOString()}>
            {new Date(date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
          <span aria-hidden="true">·</span>
          <span>{readingTime} min</span>
        </div>
        <h2 className="mt-2 text-base font-bold leading-snug text-foreground text-balance">{post.title}</h2>
        {post.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>}
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        )}
        <span className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary">
          Leggi l&apos;articolo
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
