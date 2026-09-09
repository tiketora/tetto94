// import type { Metadata } from 'next'
// import Navbar from '@/components/tetto94/navbar'
// import Footer from '@/components/tetto94/footer'
// import BlogCard from '@/components/tetto94/blog-card'
// import { getPublishedPosts } from '@/lib/blog/queries'

// export const metadata: Metadata = {
//   title: 'Blog | Consigli e Guide sulla Manutenzione del Tetto — Tetto94',
//   description:
//     'Guide, consigli tecnici e approfondimenti su riparazione, rifacimento e manutenzione tetti a Venezia e in tutto il Nord-Est Italia. Dal team Tetto94, esperti dal 1994.',
//   alternates: {
//     canonical: 'https://www.tetto94.it/blog',
//     languages: { 'it-IT': 'https://www.tetto94.it/blog' },
//   },
//   openGraph: {
//     title: 'Blog Tetto94 — Consigli e Guide sulla Manutenzione del Tetto',
//     description: 'Guide e approfondimenti tecnici su riparazione, rifacimento e manutenzione tetti.',
//     url: 'https://www.tetto94.it/blog',
//     siteName: 'Tetto94',
//     locale: 'it_IT',
//     type: 'website',
//   },
//   robots: { index: true, follow: true },
// }

// const blogSchema = {
//   '@context': 'https://schema.org',
//   '@type': 'Blog',
//   '@id': 'https://www.tetto94.it/blog#blog',
//   name: 'Blog Tetto94',
//   description: 'Guide e approfondimenti tecnici su riparazione, rifacimento e manutenzione tetti.',
//   url: 'https://www.tetto94.it/blog',
//   inLanguage: 'it-IT',
//   isPartOf: { '@id': 'https://www.tetto94.it/#website' },
//   publisher: { '@id': 'https://www.tetto94.it/#business' },
// }

// export default async function BlogIndexPage() {
//   const posts = await getPublishedPosts()

//   return (
//     <>
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
//       <Navbar />
//       <main className="bg-[#161616] pt-24 pb-20">
//         <div className="mx-auto max-w-6xl px-6">
//           <header className="mb-12 max-w-2xl">
//             <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">Blog Tetto94</p>
//             <h1 className="text-3xl font-bold text-white sm:text-4xl">
//               Guide e Consigli sulla Manutenzione del Tetto
//             </h1>
//             <p className="mt-4 text-sm leading-relaxed text-white/60">
//               Approfondimenti tecnici scritti dal nostro team, per aiutarti a capire quando intervenire, quali
//               materiali scegliere e come riconoscere i primi segnali di un problema alla copertura.
//             </p>
//           </header>

//           {posts.length === 0 ? (
//             <p className="border border-white/10 bg-white/[0.03] p-10 text-center text-sm text-white/50">
//               Nuovi articoli in arrivo a breve.
//             </p>
//           ) : (
//             <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//               {posts.map((post) => (
//                 <BlogCard key={post.id} post={post} />
//               ))}
//             </div>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </>
//   )
// }


import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/tetto94/navbar'
import Footer from '@/components/tetto94/footer'
import BlogCard from '@/components/tetto94/blog-card'
import { getAllPublishedTags, getPublishedPosts } from '@/lib/blog/queries'

export const metadata: Metadata = {
  title: 'Blog | Consigli e Guide sulla Manutenzione del Tetto — Tetto94',
  description:
    'Guide, consigli tecnici e approfondimenti su riparazione, rifacimento e manutenzione tetti a Venezia e in tutto il Nord-Est Italia. Dal team Tetto94, esperti dal 1994.',
  alternates: {
    canonical: 'https://www.tetto94.it/blog',
    languages: { 'it-IT': 'https://www.tetto94.it/blog' },
  },
  openGraph: {
    title: 'Blog Tetto94 — Consigli e Guide sulla Manutenzione del Tetto',
    description: 'Guide e approfondimenti tecnici su riparazione, rifacimento e manutenzione tetti.',
    url: 'https://www.tetto94.it/blog',
    siteName: 'Tetto94',
    locale: 'it_IT',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': 'https://www.tetto94.it/blog#blog',
  name: 'Blog Tetto94',
  description: 'Guide e approfondimenti tecnici su riparazione, rifacimento e manutenzione tetti.',
  url: 'https://www.tetto94.it/blog',
  inLanguage: 'it-IT',
  isPartOf: { '@id': 'https://www.tetto94.it/#website' },
  publisher: { '@id': 'https://www.tetto94.it/#business' },
}

export default async function BlogIndexPage() {
  const [posts, tags] = await Promise.all([getPublishedPosts(), getAllPublishedTags()])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Navbar />
      <main className="bg-[#161616] pt-24 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <header className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">Blog Tetto94</p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Guide e Consigli sulla Manutenzione del Tetto
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Approfondimenti tecnici scritti dal nostro team, per aiutarti a capire quando intervenire, quali
              materiali scegliere e come riconoscere i primi segnali di un problema alla copertura.
            </p>
          </header>

          {tags.length > 0 && (
            <div className="mb-10 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="border border-white/15 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-white/60 transition-colors hover:border-[#EB1C26] hover:text-[#EB1C26]"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {posts.length === 0 ? (
            <p className="border border-white/10 bg-white/[0.03] p-10 text-center text-sm text-white/50">
              Nuovi articoli in arrivo a breve.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
