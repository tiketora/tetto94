import { notFound } from 'next/navigation'
import PostForm from '@/components/admin/post-form'
import { getPostById } from '@/lib/blog/queries'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPostById(id)
  if (!post) notFound()

    
  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-white">Edit Post</h1>
      <PostForm post={post} />
    </div>
  )
}
