import { slugify } from '@/lib/slugify'

export interface TocEntry {
  id: string
  text: string
  level: 2 | 3
}

/**
 * Walks already-sanitized post HTML, assigns every <h2>/<h3> a stable slug
 * id (for in-page anchors + a generated table of contents), and returns
 * both the annotated HTML and the extracted heading list.
 *
 * Must run AFTER sanitizePostHtml — the input is trusted at this point, so
 * this only touches heading tags and never introduces attributes the
 * sanitizer allowlist would need to account for.
 */
export function extractTableOfContents(html: string): { html: string; entries: TocEntry[] } {
  const entries: TocEntry[] = []
  const seen = new Map<string, number>()

  const annotated = html.replace(/<h([23])>(.*?)<\/h\1>/g, (match, level: string, inner: string) => {
    const text = inner.replace(/<[^>]*>/g, '').trim()
    if (!text) return match

    let id = slugify(text) || 'section'
    const count = seen.get(id) ?? 0
    seen.set(id, count + 1)
    if (count > 0) id = `${id}-${count}`

    entries.push({ id, text, level: Number(level) as 2 | 3 })
    return `<h${level} id="${id}">${inner}</h${level}>`
  })

  return { html: annotated, entries }
}
