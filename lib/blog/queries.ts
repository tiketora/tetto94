// import { and, desc, eq, ne } from 'drizzle-orm'
// import { db } from '@/lib/db'
// import { blogPosts } from '@/lib/db/schema'
// import { sanitizePostHtml } from '@/lib/sanitize'

// export type BlogPost = typeof blogPosts.$inferSelect
// export type BlogPostStatus = 'draft' | 'published'

// export interface BlogPostInput {
//   slug: string
//   title: string
//   excerpt?: string | null
//   contentHtml: string
//   coverImageUrl?: string | null
//   coverImageAlt?: string | null
//   status: BlogPostStatus
//   seoTitle?: string | null
//   seoDescription?: string | null
// }

// /** Public: only ever returns published posts, newest first. */
// export async function getPublishedPosts(): Promise<BlogPost[]> {
//   return db
//     .select()
//     .from(blogPosts)
//     .where(eq(blogPosts.status, 'published'))
//     .orderBy(desc(blogPosts.publishedAt))
// }

// /** Public: a single published post by slug, or null. */
// export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
//   const [post] = await db
//     .select()
//     .from(blogPosts)
//     .where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, 'published')))
//     .limit(1)
//   return post ?? null
// }

// /** Admin: every post regardless of status, newest first. */
// export async function getAllPostsForAdmin(): Promise<BlogPost[]> {
//   return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt))
// }

// /** Admin: a single post by id regardless of status, for editing. */
// export async function getPostById(id: string): Promise<BlogPost | null> {
//   const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1)
//   return post ?? null
// }

// export async function isSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
//   const rows = excludeId
//     ? await db.select({ id: blogPosts.id }).from(blogPosts).where(and(eq(blogPosts.slug, slug), ne(blogPosts.id, excludeId)))
//     : await db.select({ id: blogPosts.id }).from(blogPosts).where(eq(blogPosts.slug, slug))
//   return rows.length > 0
// }

// export async function createPost(input: BlogPostInput): Promise<BlogPost> {
//   const [post] = await db
//     .insert(blogPosts)
//     .values({
//       slug: input.slug,
//       title: input.title,
//       excerpt: input.excerpt ?? null,
//       contentHtml: sanitizePostHtml(input.contentHtml),
//       coverImageUrl: input.coverImageUrl ?? null,
//       coverImageAlt: input.coverImageAlt ?? null,
//       status: input.status,
//       seoTitle: input.seoTitle ?? null,
//       seoDescription: input.seoDescription ?? null,
//       publishedAt: input.status === 'published' ? new Date() : null,
//     })
//     .returning()
//   return post
// }

// export async function updatePost(id: string, input: BlogPostInput): Promise<BlogPost | null> {
//   const existing = await getPostById(id)
//   if (!existing) return null

//   const willBePublishedNow = input.status === 'published' && existing.status !== 'published'

//   const [post] = await db
//     .update(blogPosts)
//     .set({
//       slug: input.slug,
//       title: input.title,
//       excerpt: input.excerpt ?? null,
//       contentHtml: sanitizePostHtml(input.contentHtml),
//       coverImageUrl: input.coverImageUrl ?? null,
//       coverImageAlt: input.coverImageAlt ?? null,
//       status: input.status,
//       seoTitle: input.seoTitle ?? null,
//       seoDescription: input.seoDescription ?? null,
//       publishedAt: willBePublishedNow ? new Date() : existing.publishedAt,
//       updatedAt: new Date(),
//     })
//     .where(eq(blogPosts.id, id))
//     .returning()
//   return post ?? null
// }

// export async function deletePost(id: string): Promise<void> {
//   await db.delete(blogPosts).where(eq(blogPosts.id, id))
// }


import { and, desc, eq, ne } from 'drizzle-orm'
import { db } from '@/lib/db'
import { blogPosts } from '@/lib/db/schema'
import { sanitizePostHtml } from '@/lib/sanitize'

export type BlogPost = typeof blogPosts.$inferSelect
export type BlogPostStatus = 'draft' | 'published'
export type FaqItem = { question: string; answer: string }

export interface BlogPostInput {
  slug: string
  title: string
  excerpt?: string | null
  contentHtml: string
  coverImageUrl?: string | null
  coverImageAlt?: string | null
  status: BlogPostStatus
  seoTitle?: string | null
  seoDescription?: string | null
  tags?: string[]
  authorName?: string | null
  noindex?: boolean
  faqItems?: FaqItem[]
}

/** Public: only ever returns published posts, newest first. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  return db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, 'published'))
    .orderBy(desc(blogPosts.publishedAt))
}

/** Public: a single published post by slug, or null. */
export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, 'published')))
    .limit(1)
  return post ?? null
}

/** Admin: every post regardless of status, newest first. */
export async function getAllPostsForAdmin(): Promise<BlogPost[]> {
  return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt))
}

/** Admin: a single post by id regardless of status, for editing. */
export async function getPostById(id: string): Promise<BlogPost | null> {
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1)
  return post ?? null
}

/** Public: published posts carrying a given tag (tags are stored lowercase). */
export async function getPublishedPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getPublishedPosts()
  return posts.filter((post) => post.tags.includes(tag))
}

/**
 * Public: every distinct tag across published posts, alphabetically —
 * powers the tag cloud on the blog index and the /blog/tag/[tag] archive
 * pages, which spreads internal link authority across topics.
 */
export async function getAllPublishedTags(): Promise<string[]> {
  const posts = await getPublishedPosts()
  const tags = new Set<string>()
  for (const post of posts) for (const tag of post.tags) tags.add(tag)
  return Array.from(tags).sort((a, b) => a.localeCompare(b, 'it'))
}

/**
 * Public: other published posts sharing at least one tag with `post`,
 * newest first. Falls back to the latest other published posts when there
 * is no tag overlap, so the related-posts section (internal linking) is
 * never empty as long as more than one post exists.
 */
export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const others = (await getPublishedPosts()).filter((p) => p.id !== post.id)
  const withOverlap = others.filter((p) => p.tags.some((tag) => post.tags.includes(tag)))
  const chosen = withOverlap.length > 0 ? withOverlap : others
  return chosen.slice(0, limit)
}

export async function isSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  const rows = excludeId
    ? await db.select({ id: blogPosts.id }).from(blogPosts).where(and(eq(blogPosts.slug, slug), ne(blogPosts.id, excludeId)))
    : await db.select({ id: blogPosts.id }).from(blogPosts).where(eq(blogPosts.slug, slug))
  return rows.length > 0
}

/** Normalizes free-typed tags to a deduplicated, lowercase, trimmed list. */
function normalizeTags(tags?: string[]): string[] {
  if (!tags) return []
  const seen = new Set<string>()
  for (const raw of tags) {
    const tag = raw.trim().toLowerCase()
    if (tag) seen.add(tag)
  }
  return Array.from(seen)
}

/** Drops FAQ rows left blank in the admin editor. */
function normalizeFaqItems(items?: FaqItem[]): FaqItem[] {
  if (!items) return []
  return items
    .map((item) => ({ question: item.question.trim(), answer: item.answer.trim() }))
    .filter((item) => item.question && item.answer)
}

export async function createPost(input: BlogPostInput): Promise<BlogPost> {
  const [post] = await db
    .insert(blogPosts)
    .values({
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt ?? null,
      contentHtml: sanitizePostHtml(input.contentHtml),
      coverImageUrl: input.coverImageUrl ?? null,
      coverImageAlt: input.coverImageAlt ?? null,
      status: input.status,
      seoTitle: input.seoTitle ?? null,
      seoDescription: input.seoDescription ?? null,
      tags: normalizeTags(input.tags),
      authorName: input.authorName?.trim() || 'Team Tetto94',
      noindex: input.noindex ?? false,
      faqItems: normalizeFaqItems(input.faqItems),
      publishedAt: input.status === 'published' ? new Date() : null,
    })
    .returning()
  return post
}

export async function updatePost(id: string, input: BlogPostInput): Promise<BlogPost | null> {
  const existing = await getPostById(id)
  if (!existing) return null

  const willBePublishedNow = input.status === 'published' && existing.status !== 'published'

  const [post] = await db
    .update(blogPosts)
    .set({
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt ?? null,
      contentHtml: sanitizePostHtml(input.contentHtml),
      coverImageUrl: input.coverImageUrl ?? null,
      coverImageAlt: input.coverImageAlt ?? null,
      status: input.status,
      seoTitle: input.seoTitle ?? null,
      seoDescription: input.seoDescription ?? null,
      tags: normalizeTags(input.tags),
      authorName: input.authorName?.trim() || 'Team Tetto94',
      noindex: input.noindex ?? false,
      faqItems: normalizeFaqItems(input.faqItems),
      publishedAt: willBePublishedNow ? new Date() : existing.publishedAt,
      updatedAt: new Date(),
    })
    .where(eq(blogPosts.id, id))
    .returning()
  return post ?? null
}

export async function deletePost(id: string): Promise<void> {
  await db.delete(blogPosts).where(eq(blogPosts.id, id))
}
