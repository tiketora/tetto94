import sanitizeHtml from 'sanitize-html'

/**
 * Server-side allowlist sanitizer for blog post HTML (Tiptap output).
 * Applied on every save AND again defensively before rendering on public
 * pages — a stored-XSS payload must survive both passes to ever execute,
 * and neither pass allows script/style/event-handler content.
 */
export function sanitizePostHtml(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: [
      'p', 'br', 'strong', 'em', 'u', 's', 'blockquote',
      'h2', 'h3', 'h4',
      'ul', 'ol', 'li',
      'a', 'img',
      'code', 'pre',
    ],
    allowedAttributes: {
      a: ['href', 'title', 'rel', 'target'],
      img: ['src', 'alt', 'title', 'width', 'height'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer nofollow' }),
    },
  })
}
