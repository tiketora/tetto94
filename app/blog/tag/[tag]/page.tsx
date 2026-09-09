import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/tetto94/navbar'
import Footer from '@/components/tetto94/footer'
import BlogCard from '@/components/tetto94/blog-card'
import { getAllPublishedTags, getPublishedPostsByTag } from '@/lib/blog/queries'

const BASE_URL = 'https://www.tetto94.it'

export async function generateStaticParams() {
  const tags = await getAllPublishedTags()
  return tags.map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params
  const posts = await getPublishedPostsByTag(tag)
  if (posts.length === 0) return {}

  const url = `${BASE_URL}/blog/tag/${tag}`
  const title = `${tag} | Blog Tetto94`
  const description = `Tutti gli articoli del blog Tetto94 sul tema "${tag}": guide e consigli tecnici su riparazione e manutenzione tetti.`

  return {
    title,
    description,
    alternates: { canonical: url, languages: { 'it-IT': url } },
    openGraph: { title, description, url, siteName: 'Tetto94', locale: 'it_IT', type: 'website' },
    robots: { index: true, follow: true },
  }
}

export default async function BlogTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const posts = await getPublishedPostsByTag(tag)
  if (posts.length === 0) notFound()

  return (
    <>
      <Navbar />
      <main className="bg-[#161616] pt-24 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/blog"
            className="mb-8 flex items-center gap-1.5 text-xs font-semibold text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-3.5" />
            Torna al blog
          </Link>

          <header className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">Argomento</p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{tag}</h1>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {posts.length} {posts.length === 1 ? 'articolo' : 'articoli'} su &ldquo;{tag}&rdquo;.
            </p>
          </header>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
