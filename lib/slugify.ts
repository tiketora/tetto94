/**
 * Client-safe: no imports from lib/db, so this can be used from the
 * 'use client' admin post form without pulling the Postgres driver into
 * the browser bundle.
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
