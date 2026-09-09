import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getAllPostsForAdmin } from '@/lib/blog/queries'
import PostRow from '@/components/admin/post-row'

export default async function AdminPostsPage() {
  const posts = await getAllPostsForAdmin()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Blog Posts</h1>
        <Link
          href="/admin/new"
          className="flex items-center gap-1.5 bg-[#EB1C26] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" />
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/50">
          No posts yet. Create your first blog post.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-white/10 border border-white/10 bg-white/[0.03]">
          {posts.map((post) => (
            <PostRow key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
