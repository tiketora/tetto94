// import type { Metadata } from 'next'
// import { notFound } from 'next/navigation'
// import Image from 'next/image'
// import Link from 'next/link'
// import { ArrowLeft } from 'lucide-react'
// import Navbar from '@/components/tetto94/navbar'
// import Footer from '@/components/tetto94/footer'
// import { getPublishedPostBySlug, getPublishedPosts } from '@/lib/blog/queries'
// import { sanitizePostHtml } from '@/lib/sanitize'
// import { SERVICES } from '@/data/services'

// const BASE_URL = 'https://www.tetto94.it'

// export async function generateStaticParams() {
//   const posts = await getPublishedPosts()
//   return posts.map((post) => ({ slug: post.slug }))
// }

// export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
//   const { slug } = await params
//   const post = await getPublishedPostBySlug(slug)
//   if (!post) return {}

//   const title = post.seoTitle || `${post.title} — Blog Tetto94`
//   const description = post.seoDescription || post.excerpt || undefined
//   const url = `${BASE_URL}/blog/${post.slug}`

//   return {
//     title,
//     description,
//     alternates: { canonical: url, languages: { 'it-IT': url } },
//     openGraph: {
//       title,
//       description,
//       url,
//       siteName: 'Tetto94',
//       locale: 'it_IT',
//       type: 'article',
//       publishedTime: post.publishedAt?.toISOString(),
//       modifiedTime: post.updatedAt.toISOString(),
//       images: post.coverImageUrl ? [{ url: post.coverImageUrl, width: 1200, height: 630, alt: post.coverImageAlt || post.title }] : undefined,
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title,
//       description,
//       images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
//     },
//     robots: { index: true, follow: true },
//   }
// }

// export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = await params
//   const post = await getPublishedPostBySlug(slug)
//   if (!post) notFound()

//   const url = `${BASE_URL}/blog/${post.slug}`
//   const safeHtml = sanitizePostHtml(post.contentHtml)

//   const articleSchema = {
//     '@context': 'https://schema.org',
//     '@type': 'Article',
//     '@id': `${url}#article`,
//     headline: post.title,
//     description: post.seoDescription || post.excerpt || undefined,
//     image: post.coverImageUrl ? [post.coverImageUrl] : undefined,
//     datePublished: post.publishedAt?.toISOString(),
//     dateModified: post.updatedAt.toISOString(),
//     author: { '@type': 'Organization', name: 'Tetto94', url: BASE_URL },
//     publisher: { '@id': `${BASE_URL}/#business` },
//     mainEntityOfPage: { '@type': 'WebPage', '@id': url },
//     inLanguage: 'it-IT',
//   }

//   const breadcrumbSchema = {
//     '@context': 'https://schema.org',
//     '@type': 'BreadcrumbList',
//     itemListElement: [
//       { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
//       { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
//       { '@type': 'ListItem', position: 3, name: post.title, item: url },
//     ],
//   }

//   // Internal link back to the most relevant service — spreads authority
//   // from the blog into the core service pages, per the SEO plan.
//   const relatedService = SERVICES[0]

//   return (
//     <>
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
//       <Navbar />
//       <main className="bg-[#161616] pt-24 pb-20">
//         <article className="mx-auto max-w-3xl px-6">
//           <Link href="/blog" className="mb-8 flex items-center gap-1.5 text-xs font-semibold text-white/50 transition-colors hover:text-white">
//             <ArrowLeft className="size-3.5" />
//             Torna al blog
//           </Link>

//           <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">Blog Tetto94</p>
//           <h1 className="text-3xl font-bold leading-tight text-white text-balance sm:text-4xl">{post.title}</h1>
//           <time dateTime={post.publishedAt?.toISOString()} className="mt-4 block text-xs font-medium uppercase tracking-wide text-white/40">
//             {post.publishedAt &&
//               new Date(post.publishedAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
//           </time>

//           {post.coverImageUrl && (
//             <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden">
//               <Image
//                 src={post.coverImageUrl}
//                 alt={post.coverImageAlt || post.title}
//                 fill
//                 priority
//                 sizes="(max-width: 768px) 100vw, 768px"
//                 className="object-cover"
//               />
//             </div>
//           )}

//           <div
//             className="prose-content mt-10 text-[15px] leading-relaxed text-white/80 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_p]:my-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-[#EB1C26] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-white/60 [&_a]:text-[#EB1C26] [&_a]:underline [&_img]:my-6 [&_img]:w-full"
//             dangerouslySetInnerHTML={{ __html: safeHtml }}
//           />

//           <div className="mt-14 border border-white/10 bg-white/[0.03] p-6">
//             <p className="text-sm text-white/60">
//               Hai un problema simile al tuo tetto?{' '}
//               <Link href={`/${relatedService.slug}`} className="font-semibold text-[#EB1C26] hover:underline">
//                 Scopri il servizio di {relatedService.name.toLowerCase()}
//               </Link>{' '}
//               o{' '}
//               <Link href="/contatti" className="font-semibold text-[#EB1C26] hover:underline">
//                 richiedi un preventivo gratuito
//               </Link>
//               .
//             </p>
//           </div>
//         </article>
//       </main>
//       <Footer />
//     </>
//   )
// }

// import type { Metadata } from 'next'
// import { notFound } from 'next/navigation'
// import Image from 'next/image'
// import Link from 'next/link'
// import { ArrowLeft } from 'lucide-react'
// import Navbar from '@/components/tetto94/navbar'
// import Footer from '@/components/tetto94/footer'
// import TableOfContents from '@/components/tetto94/table-of-contents'
// import ShareButtons from '@/components/tetto94/share-buttons'
// import FaqAccordion from '@/components/tetto94/faq-accordion'
// import BlogCard from '@/components/tetto94/blog-card'
// import { getPublishedPostBySlug, getPublishedPosts, getRelatedPosts } from '@/lib/blog/queries'
// import { sanitizePostHtml } from '@/lib/sanitize'
// import { extractTableOfContents } from '@/lib/blog/toc'
// import { getReadingTimeMinutes } from '@/lib/blog/reading-time'
// import { SERVICES } from '@/data/services'

// const BASE_URL = 'https://www.tetto94.it'

// export async function generateStaticParams() {
//   const posts = await getPublishedPosts()
//   return posts.map((post) => ({ slug: post.slug }))
// }

// export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
//   const { slug } = await params
//   const post = await getPublishedPostBySlug(slug)
//   if (!post) return {}

//   const title = post.seoTitle || `${post.title} — Blog Tetto94`
//   const description = post.seoDescription || post.excerpt || undefined
//   const url = `${BASE_URL}/blog/${post.slug}`

//   return {
//     title,
//     description,
//     alternates: { canonical: url, languages: { 'it-IT': url } },
//     openGraph: {
//       title,
//       description,
//       url,
//       siteName: 'Tetto94',
//       locale: 'it_IT',
//       type: 'article',
//       publishedTime: post.publishedAt?.toISOString(),
//       modifiedTime: post.updatedAt.toISOString(),
//       images: post.coverImageUrl ? [{ url: post.coverImageUrl, width: 1200, height: 630, alt: post.coverImageAlt || post.title }] : undefined,
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title,
//       description,
//       images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
//     },
//     robots: post.noindex ? { index: false, follow: true } : { index: true, follow: true },
//   }
// }

// export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = await params
//   const post = await getPublishedPostBySlug(slug)
//   if (!post) notFound()

//   const url = `${BASE_URL}/blog/${post.slug}`
//   const readingTime = getReadingTimeMinutes(post.contentHtml)
//   const { html: safeHtml, entries: tocEntries } = extractTableOfContents(sanitizePostHtml(post.contentHtml))
//   const relatedPosts = await getRelatedPosts(post)

//   const articleSchema = {
//     '@context': 'https://schema.org',
//     '@type': 'Article',
//     '@id': `${url}#article`,
//     headline: post.title,
//     description: post.seoDescription || post.excerpt || undefined,
//     image: post.coverImageUrl ? [post.coverImageUrl] : undefined,
//     datePublished: post.publishedAt?.toISOString(),
//     dateModified: post.updatedAt.toISOString(),
//     author: { '@type': 'Person', name: post.authorName, worksFor: { '@id': `${BASE_URL}/#business` } },
//     publisher: { '@id': `${BASE_URL}/#business` },
//     mainEntityOfPage: { '@type': 'WebPage', '@id': url },
//     keywords: post.tags.length > 0 ? post.tags.join(', ') : undefined,
//     inLanguage: 'it-IT',
//   }

//   const breadcrumbSchema = {
//     '@context': 'https://schema.org',
//     '@type': 'BreadcrumbList',
//     itemListElement: [
//       { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
//       { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
//       { '@type': 'ListItem', position: 3, name: post.title, item: url },
//     ],
//   }

//   const faqSchema =
//     post.faqItems.length > 0
//       ? {
//           '@context': 'https://schema.org',
//           '@type': 'FAQPage',
//           mainEntity: post.faqItems.map((item) => ({
//             '@type': 'Question',
//             name: item.question,
//             acceptedAnswer: { '@type': 'Answer', text: item.answer },
//           })),
//         }
//       : null

//   // Internal link back to the most relevant service — spreads authority
//   // from the blog into the core service pages, per the SEO plan.
//   const relatedService = SERVICES[0]

//   return (
//     <>
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
//       {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
//       <Navbar />
//       <main className="bg-[#161616] pt-24 pb-20">
//         <article className="mx-auto max-w-3xl px-6">
//           <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-xs font-semibold text-white/50">
//             <Link href="/" className="transition-colors hover:text-white">Home</Link>
//             <span aria-hidden="true">/</span>
//             <Link href="/blog" className="flex items-center gap-1 transition-colors hover:text-white">
//               <ArrowLeft className="size-3.5" />
//               Blog
//             </Link>
//           </nav>

//           <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">Blog Tetto94</p>
//           <h1 className="text-3xl font-bold leading-tight text-white text-balance sm:text-4xl">{post.title}</h1>
//           <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium uppercase tracking-wide text-white/40">
//             <span>{post.authorName}</span>
//             <span aria-hidden="true">·</span>
//             <time dateTime={post.publishedAt?.toISOString()}>
//               {post.publishedAt &&
//                 new Date(post.publishedAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
//             </time>
//             <span aria-hidden="true">·</span>
//             <span>{readingTime} min di lettura</span>
//           </div>

//           {post.tags.length > 0 && (
//             <div className="mt-4 flex flex-wrap gap-2">
//               {post.tags.map((tag) => (
//                 <Link
//                   key={tag}
//                   href={`/blog/tag/${tag}`}
//                   className="border border-white/15 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-white/60 transition-colors hover:border-[#EB1C26] hover:text-[#EB1C26]"
//                 >
//                   {tag}
//                 </Link>
//               ))}
//             </div>
//           )}

//           {post.coverImageUrl && (
//             <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden">
//               <Image
//                 src={post.coverImageUrl}
//                 alt={post.coverImageAlt || post.title}
//                 fill
//                 priority
//                 sizes="(max-width: 768px) 100vw, 768px"
//                 className="object-cover"
//               />
//             </div>
//           )}

//           <div className="mt-8">
//             <ShareButtons url={url} title={post.title} />
//           </div>

//           <TableOfContents entries={tocEntries} />

//           <div
//             className="prose-content mt-10 text-[15px] leading-relaxed text-white/80 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_p]:my-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-[#EB1C26] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-white/60 [&_a]:text-[#EB1C26] [&_a]:underline [&_img]:my-6 [&_img]:w-full"
//             dangerouslySetInnerHTML={{ __html: safeHtml }}
//           />

//           <FaqAccordion items={post.faqItems} />

//           <div className="mt-14 border border-white/10 bg-white/[0.03] p-6">
//             <p className="text-sm text-white/60">
//               Hai un problema simile al tuo tetto?{' '}
//               <Link href={`/${relatedService.slug}`} className="font-semibold text-[#EB1C26] hover:underline">
//                 Scopri il servizio di {relatedService.name.toLowerCase()}
//               </Link>{' '}
//               o{' '}
//               <Link href="/contatti" className="font-semibold text-[#EB1C26] hover:underline">
//                 richiedi un preventivo gratuito
//               </Link>
//               .
//             </p>
//           </div>

//           {relatedPosts.length > 0 && (
//             <section className="mt-14" aria-labelledby="related-posts-heading">
//               <h2 id="related-posts-heading" className="mb-5 text-xl font-bold text-white">
//                 Articoli correlati
//               </h2>
//               <div className="grid gap-6 sm:grid-cols-2">
//                 {relatedPosts.map((related) => (
//                   <BlogCard key={related.id} post={related} />
//                 ))}
//               </div>
//             </section>
//           )}
//         </article>
//       </main>
//       <Footer />
//     </>
//   )
// }


import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/tetto94/navbar'
import Footer from '@/components/tetto94/footer'
import TableOfContents from '@/components/tetto94/table-of-contents'
import ShareButtons from '@/components/tetto94/share-buttons'
import FaqAccordion from '@/components/tetto94/faq-accordion'
import BlogCard from '@/components/tetto94/blog-card'
import { getPublishedPostBySlug, getPublishedPosts, getRelatedPosts } from '@/lib/blog/queries'
import { sanitizePostHtml } from '@/lib/sanitize'
import { extractTableOfContents } from '@/lib/blog/toc'
import { getReadingTimeMinutes } from '@/lib/blog/reading-time'
import { SERVICES } from '@/data/services'

const BASE_URL = 'https://www.tetto94.it'

export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) return {}

  const title = post.seoTitle || `${post.title} — Blog Tetto94`
  const description = post.seoDescription || post.excerpt || undefined
  const url = `${BASE_URL}/blog/${post.slug}`

  return {
    title,
    description,
    alternates: { canonical: url, languages: { 'it-IT': url } },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Tetto94',
      locale: 'it_IT',
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: post.coverImageUrl ? [{ url: post.coverImageUrl, width: 1200, height: 630, alt: post.coverImageAlt || post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
    robots: post.noindex ? { index: false, follow: true } : { index: true, follow: true },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) notFound()

  const url = `${BASE_URL}/blog/${post.slug}`
  const readingTime = getReadingTimeMinutes(post.contentHtml)
  const { html: safeHtml, entries: tocEntries } = extractTableOfContents(sanitizePostHtml(post.contentHtml))
  const relatedPosts = await getRelatedPosts(post)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.seoDescription || post.excerpt || undefined,
    image: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { '@type': 'Person', name: post.authorName, worksFor: { '@id': `${BASE_URL}/#business` } },
    publisher: { '@id': `${BASE_URL}/#business` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: post.tags.length > 0 ? post.tags.join(', ') : undefined,
    inLanguage: 'it-IT',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  const faqSchema =
    post.faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }
      : null

  // Internal link back to the most relevant service — spreads authority
  // from the blog into the core service pages, per the SEO plan.
  const relatedService = SERVICES[0]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <Navbar />
      <main className="bg-background pt-24 pb-20">
        <article className="mx-auto max-w-3xl px-6">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="flex items-center gap-1 transition-colors hover:text-foreground">
              <ArrowLeft className="size-3.5" />
              Blog
            </Link>
          </nav>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">Blog Tetto94</p>
          <h1 className="text-3xl font-bold leading-tight text-foreground text-balance sm:text-4xl">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <span>{post.authorName}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt?.toISOString()}>
              {post.publishedAt &&
                new Date(post.publishedAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{readingTime} min di lettura</span>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="border border-border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {post.coverImageUrl && (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden">
              <Image
                src={post.coverImageUrl}
                alt={post.coverImageAlt || post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

          <div className="mt-8">
            <ShareButtons url={url} title={post.title} />
          </div>

          <TableOfContents entries={tocEntries} />

          <div
            className="prose-content mt-10 text-[15px] leading-relaxed text-foreground/85 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_p]:my-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_a]:text-primary [&_a]:underline [&_img]:my-6 [&_img]:w-full [&_img]:rounded-sm"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />

          <FaqAccordion items={post.faqItems} />

          <div className="mt-14 border border-border bg-muted p-6">
            <p className="text-sm text-muted-foreground">
              Hai un problema simile al tuo tetto?{' '}
              <Link href={`/${relatedService.slug}`} className="font-semibold text-primary hover:underline">
                Scopri il servizio di {relatedService.name.toLowerCase()}
              </Link>{' '}
              o{' '}
              <Link href="/contatti" className="font-semibold text-primary hover:underline">
                richiedi un preventivo gratuito
              </Link>
              .
            </p>
          </div>

          {relatedPosts.length > 0 && (
            <section className="mt-14" aria-labelledby="related-posts-heading">
              <h2 id="related-posts-heading" className="mb-5 text-xl font-bold text-foreground">
                Articoli correlati
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {relatedPosts.map((related) => (
                  <BlogCard key={related.id} post={related} />
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  )
}
