'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { BlogPost } from '@/lib/blog/queries'
import { getReadingTimeMinutes } from '@/lib/blog/reading-time'

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' })
}

function PostCard({ post, index, featured }: { post: BlogPost; index: number; featured?: boolean }) {
  const date = post.publishedAt ?? post.createdAt
  const readingTime = getReadingTimeMinutes(post.contentHtml)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={featured ? 'lg:col-span-2 lg:row-span-2' : ''}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-[#EB1C26]/40 hover:bg-white/[0.05]"
      >
        <div className={`relative overflow-hidden ${featured ? 'aspect-[16/10] lg:aspect-[16/9]' : 'aspect-[16/10]'}`}>
          {post.coverImageUrl ? (
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt || post.title}
              fill
              sizes={featured ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 100vw, 33vw'}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-white/5 to-white/[0.02]">
              <span className="text-xs uppercase tracking-[0.3em] text-white/25">Tetto94</span>
            </div>
          )}
          {/* Gradient overlay for legibility + mood */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent opacity-80" />

          {/* Floating tag pill */}
          {post.tags[0] && (
            <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
              {post.tags[0]}
            </span>
          )}

          {/* Arrow reveal */}
          <span className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:border-[#EB1C26] group-hover:bg-[#EB1C26] group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 lg:p-6">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">
            <time dateTime={new Date(date).toISOString()}>{formatDate(date)}</time>
            <span aria-hidden="true" className="text-[#EB1C26]">
              /
            </span>
            <span>{readingTime} min</span>
          </div>

          <h3
            className={`mt-3 text-balance font-display leading-snug text-white ${
              featured ? 'text-xl lg:text-2xl' : 'text-base'
            }`}
          >
            {post.title}
          </h3>

          {featured && post.excerpt && (
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/50">{post.excerpt}</p>
          )}

          <span className="mt-auto flex items-center gap-1.5 pt-4 text-xs font-bold text-white/70 transition-colors group-hover:text-[#EB1C26]">
            Leggi l&apos;articolo
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function BlogPreviewSection({ posts }: { posts: BlogPost[] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  if (posts.length === 0) return null

  const [first, ...rest] = posts

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 lg:py-32" ref={ref}>
      {/* Ambient background: soft red glow + faint grid, matches the brand's dark sections */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 top-0 size-[36rem] rounded-full bg-[#EB1C26]/10 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 size-[30rem] rounded-full bg-[#EB1C26]/5 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">Dal Nostro Blog</span>
            <h2 className="mt-3 font-display leading-none">
              <span className="block text-[clamp(2rem,5vw,4rem)] font-black text-white">ULTIMI</span>
              <span className="block text-[clamp(2rem,5vw,4rem)] font-black text-white/25">
                APPROFONDIMENTI<span className="text-[#EB1C26]">.</span>
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/40 lg:text-right">
            Guide tecniche e consigli pratici sulla manutenzione del tetto, scritti dal nostro team.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          <PostCard post={first} index={0} featured />
          {rest.map((post, i) => (
            <PostCard key={post.id} post={post} index={i + 1} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#EB1C26] hover:bg-[#EB1C26]"
          >
            Vedi Tutti gli Articoli
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
