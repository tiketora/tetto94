'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2, ExternalLink, Loader2 } from 'lucide-react'
import type { BlogPost } from '@/lib/blog/queries'

export default function PostRow({ post }: { post: BlogPost }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!window.confirm(`Permanently delete "${post.title}"?`)) return
    setDeleting(true)
    const res = await fetch(`/api/admin/posts/${post.id}`, { method: 'DELETE' })
    if (res.ok) {
      router.refresh()
    } else {
      setDeleting(false)
      window.alert('Error deleting the post.')
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-white">{post.title}</p>
          <span
            className={`shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              post.status === 'published' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/10 text-white/50'
            }`}
          >
            {post.status === 'published' ? 'Published' : 'Draft'}
          </span>
        </div>
        <p className="mt-1 truncate text-xs text-white/40">/blog/{post.slug}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {post.status === 'published' && (
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            aria-label="View published post"
            className="flex size-8 items-center justify-center border border-white/10 text-white/60 transition-colors hover:border-white/25 hover:text-white"
          >
            <ExternalLink className="size-3.5" />
          </Link>
        )}
        <Link
          href={`/admin/${post.id}/edit`}
          aria-label="Edit post"
          className="flex size-8 items-center justify-center border border-white/10 text-white/60 transition-colors hover:border-white/25 hover:text-white"
        >
          <Pencil className="size-3.5" />
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          aria-label="Delete post"
          className="flex size-8 items-center justify-center border border-white/10 text-white/60 transition-colors hover:border-[#EB1C26]/50 hover:text-[#EB1C26] disabled:opacity-50"
        >
          {deleting ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
        </button>
      </div>
    </div>
  )
}
