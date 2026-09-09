const WORDS_PER_MINUTE = 200

/** Strips HTML tags to approximate a plain-text word count. */
export function getWordCount(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ')
  const words = text.trim().split(/\s+/).filter(Boolean)
  return words.length
}

/** Rounded-up reading time in minutes, always at least 1. */
export function getReadingTimeMinutes(html: string): number {
  return Math.max(1, Math.ceil(getWordCount(html) / WORDS_PER_MINUTE))
}
