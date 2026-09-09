// import { NextResponse } from 'next/server'
// import { z } from 'zod'
// import { getSession } from '@/lib/auth/session'
// import { deletePost, isSlugTaken, updatePost } from '@/lib/blog/queries'

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

// export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
//   const session = await getSession()
//   if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

//   const { id } = await params
//   const body = await req.json().catch(() => null)
//   const parsed = postInputSchema.safeParse(body)
//   if (!parsed.success) {
//     return NextResponse.json({ error: 'Invalid data.', details: parsed.error.flatten().fieldErrors }, { status: 400 })
//   }

//   if (await isSlugTaken(parsed.data.slug, id)) {
//     return NextResponse.json({ error: 'This slug is already in use.' }, { status: 409 })
//   }

//   const post = await updatePost(id, parsed.data)
//   if (!post) return NextResponse.json({ error: 'Post not found.' }, { status: 404 })

//   return NextResponse.json({ post })
// }

// export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
//   const session = await getSession()
//   if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

//   const { id } = await params
//   await deletePost(id)
//   return NextResponse.json({ success: true })
// }


// import { NextResponse } from 'next/server'
// import { z } from 'zod'
// import { getSession } from '@/lib/auth/session'
// import { deletePost, isSlugTaken, updatePost } from '@/lib/blog/queries'

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

// export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
//   const session = await getSession()
//   if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

//   const { id } = await params
//   const body = await req.json().catch(() => null)
//   const parsed = postInputSchema.safeParse(body)
//   if (!parsed.success) {
//     return NextResponse.json({ error: 'Invalid data.', details: parsed.error.flatten().fieldErrors }, { status: 400 })
//   }

//   if (await isSlugTaken(parsed.data.slug, id)) {
//     return NextResponse.json({ error: 'This slug is already in use.' }, { status: 409 })
//   }

//   const post = await updatePost(id, parsed.data)
//   if (!post) return NextResponse.json({ error: 'Post not found.' }, { status: 404 })

//   return NextResponse.json({ post })
// }

// export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
//   const session = await getSession()
//   if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

//   const { id } = await params
//   await deletePost(id)
//   return NextResponse.json({ success: true })
// }


import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { getSession } from '@/lib/auth/session'
import { deletePost, getPostById, isSlugTaken, updatePost } from '@/lib/blog/queries'

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

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  const { id } = await params
  const body = await req.json().catch(() => null)
  const parsed = postInputSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data.', details: parsed.error.flatten().fieldErrors }, { status: 400 })
  }

  if (await isSlugTaken(parsed.data.slug, id)) {
    return NextResponse.json({ error: 'This slug is already in use.' }, { status: 409 })
  }

  const existing = await getPostById(id)
  const post = await updatePost(id, parsed.data)
  if (!post) return NextResponse.json({ error: 'Post not found.' }, { status: 404 })

  // Bust both the old slug (in case it changed) and the new one, plus the
  // listing/tag/feed surfaces that embed post data.
  revalidatePath('/blog')
  revalidatePath(`/blog/${post.slug}`)
  if (existing && existing.slug !== post.slug) revalidatePath(`/blog/${existing.slug}`)
  revalidatePath('/blog/tag/[tag]', 'page')
  revalidatePath('/sitemap.xml')
  revalidatePath('/blog/rss.xml')

  return NextResponse.json({ post })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  const { id } = await params
  const existing = await getPostById(id)
  await deletePost(id)

  // Without this, the deleted post's own page and any listing/tag/feed
  // surfaces that cached it would keep serving stale content until their
  // next natural revalidation.
  revalidatePath('/blog')
  if (existing) revalidatePath(`/blog/${existing.slug}`)
  revalidatePath('/blog/tag/[tag]', 'page')
  revalidatePath('/sitemap.xml')
  revalidatePath('/blog/rss.xml')

  return NextResponse.json({ success: true })
}
