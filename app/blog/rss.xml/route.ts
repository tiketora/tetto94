// import { getPublishedPosts } from '@/lib/blog/queries'


// const BASE_URL = 'https://www.tetto94.it'

// function escapeXml(value: string): string {
//   return value
//     .replace(/&/g, '&amp;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;')
//     .replace(/"/g, '&quot;')
//     .replace(/'/g, '&apos;')
// }

// export async function GET() {
//   const posts = await getPublishedPosts()

//   const items = posts
//     .map((post) => {
//       const url = `${BASE_URL}/blog/${post.slug}`
//       const pubDate = (post.publishedAt ?? post.createdAt).toUTCString()
//       return `
//     <item>
//       <title>${escapeXml(post.title)}</title>
//       <link>${url}</link>
//       <guid isPermaLink="true">${url}</guid>
//       <pubDate>${pubDate}</pubDate>
//       ${post.excerpt ? `<description>${escapeXml(post.excerpt)}</description>` : ''}
//     </item>`
//     })
//     .join('')

//   const xml = `<?xml version="1.0" encoding="UTF-8"?>
// <rss version="2.0">
//   <channel>
//     <title>Blog Tetto94</title>
//     <link>${BASE_URL}/blog</link>
//     <description>Guide e approfondimenti tecnici su riparazione, rifacimento e manutenzione tetti.</description>
//     <language>it-IT</language>
//     ${items}
//   </channel>
// </rss>`

//   return new Response(xml, {
//     headers: { 'Content-Type': 'application/xml; charset=utf-8' },
//   })
// }
import { getPublishedPosts } from '@/lib/blog/queries'
import { sanitizePostHtml } from '@/lib/sanitize'

const BASE_URL = 'https://www.tetto94.it'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = (await getPublishedPosts()).filter((post) => !post.noindex)

  const items = posts
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`
      const pubDate = (post.publishedAt ?? post.createdAt).toUTCString()
      const categories = post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('')
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(post.authorName)}</author>
      ${post.excerpt ? `<description>${escapeXml(post.excerpt)}</description>` : ''}
      <content:encoded><![CDATA[${sanitizePostHtml(post.contentHtml)}]]></content:encoded>
      ${categories}
    </item>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Blog Tetto94</title>
    <link>${BASE_URL}/blog</link>
    <description>Guide e approfondimenti tecnici su riparazione, rifacimento e manutenzione tetti.</description>
    <language>it-IT</language>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
