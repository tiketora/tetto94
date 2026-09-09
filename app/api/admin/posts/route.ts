// import { NextResponse } from 'next/server'
// import { z } from 'zod'
// import { getSession } from '@/lib/auth/session'
// import { createPost, isSlugTaken } from '@/lib/blog/queries'

// // All mutating admin routes double-check the session server-side, in
// // addition to the middleware guard on the page routes — an API route is a
// // separate matcher path and must never rely solely on the page having been
// // gated.
// const postInputSchema = z.object({
//   title: z.string().min(1).max(200),
//   slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, 'Invalid slug'),
//   excerpt: z.string().max(500).nullable().optional(),
//   contentHtml: z.string().min(1),
//   coverImageUrl: z.string().url().nullable().optional(),
//   coverImageAlt: z.string().max(200).nullable().optional(),
//   seoTitle: z.string().max(200).nullable().optional(),
//   seoDescription: z.string().max(300).nullable().optional(),
//   status: z.enum(['draft', 'published']),
// })

// export async function POST(req: Request) {
//   const session = await getSession()
//   if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

//   const body = await req.json().catch(() => null)
//   const parsed = postInputSchema.safeParse(body)
//   if (!parsed.success) {
//     return NextResponse.json({ error: 'Invalid data.', details: parsed.error.flatten().fieldErrors }, { status: 400 })
//   }

//   if (await isSlugTaken(parsed.data.slug)) {
//     return NextResponse.json({ error: 'This slug is already in use.' }, { status: 409 })
//   }

//   const post = await createPost(parsed.data)
//   return NextResponse.json({ post }, { status: 201 })
// }


// import { NextResponse } from 'next/server'
// import { z } from 'zod'
// import { getSession } from '@/lib/auth/session'
// import { createPost, isSlugTaken } from '@/lib/blog/queries'

// // All mutating admin routes double-check the session server-side, in
// // addition to the middleware guard on the page routes — an API route is a
// // separate matcher path and must never rely solely on the page having been
// // gated.
// const postInputSchema = z.object({
//   title: z.string().min(1).max(200),
//   slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, 'Invalid slug'),
//   excerpt: z.string().max(500).nullable().optional(),
//   contentHtml: z.string().min(1),
//   coverImageUrl: z.string().url().nullable().optional(),
//   coverImageAlt: z.string().max(200).nullable().optional(),
//   seoTitle: z.string().max(200).nullable().optional(),
//   seoDescription: z.string().max(300).nullable().optional(),
//   status: z.enum(['draft', 'published']),
//   tags: z.array(z.string().max(50)).max(10).optional(),
//   authorName: z.string().max(100).nullable().optional(),
//   noindex: z.boolean().optional(),
//   faqItems: z
//     .array(z.object({ question: z.string().max(300), answer: z.string().max(2000) }))
//     .max(20)
//     .optional(),
// })

// export async function POST(req: Request) {
//   const session = await getSession()
//   if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

//   const body = await req.json().catch(() => null)
//   const parsed = postInputSchema.safeParse(body)
//   if (!parsed.success) {
//     return NextResponse.json({ error: 'Invalid data.', details: parsed.error.flatten().fieldErrors }, { status: 400 })
//   }

//   if (await isSlugTaken(parsed.data.slug)) {
//     return NextResponse.json({ error: 'This slug is already in use.' }, { status: 409 })
//   }

//   const post = await createPost(parsed.data)
//   return NextResponse.json({ post }, { status: 201 })
// }


import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { getSession } from '@/lib/auth/session'
import { createPost, isSlugTaken } from '@/lib/blog/queries'

// All mutating admin routes double-check the session server-side, in
// addition to the middleware guard on the page routes — an API route is a
// separate matcher path and must never rely solely on the page having been
// gated.
const postInputSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, 'Invalid slug'),
  excerpt: z.string().max(500).nullable().optional(),
  contentHtml: z.string().min(1),
  coverImageUrl: z.string().url().nullable().optional(),
  coverImageAlt: z.string().max(200).nullable().optional(),
  seoTitle: z.string().max(200).nullable().optional(),
  seoDescription: z.string().max(300).nullable().optional(),
  status: z.enum(['draft', 'published']),
  tags: z.array(z.string().max(50)).max(10).optional(),
  authorName: z.string().max(100).nullable().optional(),
  noindex: z.boolean().optional(),
  faqItems: z
    .array(z.object({ question: z.string().max(300), answer: z.string().max(2000) }))
    .max(20)
    .optional(),
})

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = postInputSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data.', details: parsed.error.flatten().fieldErrors }, { status: 400 })
  }

  if (await isSlugTaken(parsed.data.slug)) {
    return NextResponse.json({ error: 'This slug is already in use.' }, { status: 409 })
  }

  const post = await createPost(parsed.data)

  // Bust the public pages so a newly published post (and any tag pages it
  // introduces) appears immediately, without waiting for their normal
  // revalidation window.
  revalidatePath('/blog')
  revalidatePath(`/blog/${post.slug}`)
  revalidatePath('/blog/tag/[tag]', 'page')
  revalidatePath('/sitemap.xml')
  revalidatePath('/blog/rss.xml')

  return NextResponse.json({ post }, { status: 201 })
}
