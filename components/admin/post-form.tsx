// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Loader2, ImagePlus, X } from 'lucide-react'
// import RichTextEditor from '@/components/admin/rich-text-editor'
// import { UploadButton } from '@/lib/uploadthing'
// import { slugify } from '@/lib/slugify'
// import type { BlogPost } from '@/lib/blog/queries'

// interface PostFormProps {
//   post?: BlogPost
// }

// export default function PostForm({ post }: PostFormProps) {
//   const router = useRouter()
//   const isEditing = Boolean(post)

//   const [title, setTitle] = useState(post?.title ?? '')
//   const [slug, setSlug] = useState(post?.slug ?? '')
//   const [slugTouched, setSlugTouched] = useState(isEditing)
//   const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
//   const [contentHtml, setContentHtml] = useState(post?.contentHtml ?? '')
//   const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImageUrl ?? '')
//   const [coverImageAlt, setCoverImageAlt] = useState(post?.coverImageAlt ?? '')
//   const [seoTitle, setSeoTitle] = useState(post?.seoTitle ?? '')
//   const [seoDescription, setSeoDescription] = useState(post?.seoDescription ?? '')
//   const [status, setStatus] = useState<'draft' | 'published'>(post?.status === 'published' ? 'published' : 'draft')
//   const [error, setError] = useState<string | null>(null)
//   const [saving, setSaving] = useState(false)

//   function handleTitleChange(value: string) {
//     setTitle(value)
//     if (!slugTouched) setSlug(slugify(value))
//   }

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault()
//     setError(null)

//     if (!title.trim() || !slug.trim() || !contentHtml.trim()) {
//       setError('Title, slug, and content are required.')
//       return
//     }

//     setSaving(true)
//     try {
//       const payload = {
//         title,
//         slug,
//         excerpt: excerpt || null,
//         contentHtml,
//         coverImageUrl: coverImageUrl || null,
//         coverImageAlt: coverImageAlt || null,
//         seoTitle: seoTitle || null,
//         seoDescription: seoDescription || null,
//         status,
//       }

//       const res = await fetch(isEditing ? `/api/admin/posts/${post!.id}` : '/api/admin/posts', {
//         method: isEditing ? 'PATCH' : 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       })

//       const data = await res.json().catch(() => ({}))
//       if (!res.ok) {
//         setError(data.error || 'Error saving the post.')
//         setSaving(false)
//         return
//       }

//       router.push('/admin')
//       router.refresh()
//     } catch {
//       setError('Connection error. Please try again.')
//       setSaving(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//       <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
//         {/* Main column */}
//         <div className="flex flex-col gap-5">
//           <div>
//             <label htmlFor="title" className="mb-1.5 block text-xs font-medium text-white/60">
//               Title
//             </label>
//             <input
//               id="title"
//               required
//               value={title}
//               onChange={(e) => handleTitleChange(e.target.value)}
//               className="w-full border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#EB1C26]"
//             />
//           </div>

//           <div>
//             <label htmlFor="slug" className="mb-1.5 block text-xs font-medium text-white/60">
//               Slug (URL: /blog/{slug || '...'})
//             </label>
//             <input
//               id="slug"
//               required
//               value={slug}
//               onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true) }}
//               className="w-full border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#EB1C26]"
//             />
//           </div>

//           <div>
//             <label htmlFor="excerpt" className="mb-1.5 block text-xs font-medium text-white/60">
//               Excerpt (preview shown in the blog list)
//             </label>
//             <textarea
//               id="excerpt"
//               rows={2}
//               value={excerpt}
//               onChange={(e) => setExcerpt(e.target.value)}
//               className="w-full resize-none border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#EB1C26]"
//             />
//           </div>

//           <div>
//             <label className="mb-1.5 block text-xs font-medium text-white/60">Content</label>
//             <RichTextEditor content={contentHtml} onChange={setContentHtml} />
//           </div>
//         </div>

//         {/* Sidebar column */}
//         <div className="flex flex-col gap-5">
//           <div className="border border-white/15 bg-white/[0.03] p-4">
//             <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/50">Publishing</h3>
//             <label htmlFor="status" className="mb-1.5 block text-xs font-medium text-white/60">
//               Status
//             </label>
//             <select
//               id="status"
//               value={status}
//               onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
//               className="w-full border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#EB1C26]"
//             >
//               <option value="draft" className="bg-[#161616]">Draft</option>
//               <option value="published" className="bg-[#161616]">Published</option>
//             </select>
//           </div>

//           <div className="border border-white/15 bg-white/[0.03] p-4">
//             <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/50">Cover image</h3>
//             {coverImageUrl ? (
//               <div className="relative mb-3">
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img src={coverImageUrl} alt="" className="aspect-video w-full object-cover" />
//                 <button
//                   type="button"
//                   onClick={() => setCoverImageUrl('')}
//                   aria-label="Remove cover image"
//                   className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center bg-black/70 text-white"
//                 >
//                   <X className="size-3.5" />
//                 </button>
//               </div>
//             ) : (
//               <div className="mb-3 [&_button]:!flex [&_button]:!w-full [&_button]:!items-center [&_button]:!justify-center [&_button]:!gap-2 [&_button]:!border [&_button]:!border-dashed [&_button]:!border-white/20 [&_button]:!bg-transparent [&_button]:!py-6 [&_button]:!text-xs [&_button]:!text-white/60 [&_button:hover]:!border-white/40">
//                 <UploadButton
//                   endpoint="blogImage"
//                   onClientUploadComplete={(res) => {
//                     const url = res?.[0]?.ufsUrl
//                     if (url) setCoverImageUrl(url)
//                   }}
//                   onUploadError={(err) => window.alert(`Upload error: ${err.message}`)}
//                   content={{
//                     button: (
//                       <span className="flex items-center gap-2">
//                         <ImagePlus className="size-4" /> Upload cover
//                       </span>
//                     ),
//                     allowedContent: '',
//                   }}
//                 />
//               </div>
//             )}
//             <label htmlFor="coverAlt" className="mb-1.5 block text-xs font-medium text-white/60">
//               Alt text (accessibility / SEO)
//             </label>
//             <input
//               id="coverAlt"
//               value={coverImageAlt}
//               onChange={(e) => setCoverImageAlt(e.target.value)}
//               className="w-full border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#EB1C26]"
//             />
//           </div>

//           <div className="border border-white/15 bg-white/[0.03] p-4">
//             <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/50">SEO</h3>
//             <div className="flex flex-col gap-3">
//               <div>
//                 <div className="mb-1.5 flex items-center justify-between">
//                   <label htmlFor="seoTitle" className="block text-xs font-medium text-white/60">
//                     SEO title (optional)
//                   </label>
//                   <span className={`text-[10px] ${seoTitle.length > 60 ? 'text-[#EB1C26]' : 'text-white/40'}`}>
//                     {seoTitle.length}/60
//                   </span>
//                 </div>
//                 <input
//                   id="seoTitle"
//                   value={seoTitle}
//                   onChange={(e) => setSeoTitle(e.target.value)}
//                   placeholder={title || 'Falls back to the post title'}
//                   className="w-full border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#EB1C26]"
//                 />
//               </div>
//               <div>
//                 <div className="mb-1.5 flex items-center justify-between">
//                   <label htmlFor="seoDescription" className="block text-xs font-medium text-white/60">
//                     Meta description (optional)
//                   </label>
//                   <span className={`text-[10px] ${seoDescription.length > 160 ? 'text-[#EB1C26]' : 'text-white/40'}`}>
//                     {seoDescription.length}/160
//                   </span>
//                 </div>
//                 <textarea
//                   id="seoDescription"
//                   rows={3}
//                   value={seoDescription}
//                   onChange={(e) => setSeoDescription(e.target.value)}
//                   placeholder={excerpt || 'Falls back to the excerpt'}
//                   className="w-full resize-none border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#EB1C26]"
//                 />
//               </div>
//               <p className="text-[11px] leading-relaxed text-white/40">
//                 Keep the title under ~60 characters and the description under ~160 so Google doesn&apos;t truncate them in search results.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {error && (
//         <p role="alert" className="text-sm text-[#EB1C26]">
//           {error}
//         </p>
//       )}

//       <div className="flex items-center gap-3">
//         <button
//           type="submit"
//           disabled={saving}
//           className="flex items-center gap-2 bg-[#EB1C26] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
//         >
//           {saving && <Loader2 className="size-4 animate-spin" />}
//           {isEditing ? 'Save changes' : 'Create post'}
//         </button>
//         <button
//           type="button"
//           onClick={() => router.push('/admin')}
//           className="border border-white/15 px-5 py-2.5 text-sm text-white/70 transition-colors hover:text-white"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   )
// }

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, ImagePlus, X, Plus } from 'lucide-react'
import RichTextEditor from '@/components/admin/rich-text-editor'
import { UploadButton } from '@/lib/uploadthing'
import { slugify } from '@/lib/slugify'
import type { BlogPost, FaqItem } from '@/lib/blog/queries'

interface PostFormProps {
  post?: BlogPost
}

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter()
  const isEditing = Boolean(post)

  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(isEditing)
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
  const [contentHtml, setContentHtml] = useState(post?.contentHtml ?? '')
  const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImageUrl ?? '')
  const [coverImageAlt, setCoverImageAlt] = useState(post?.coverImageAlt ?? '')
  const [seoTitle, setSeoTitle] = useState(post?.seoTitle ?? '')
  const [seoDescription, setSeoDescription] = useState(post?.seoDescription ?? '')
  const [tagsInput, setTagsInput] = useState(post?.tags.join(', ') ?? '')
  const [authorName, setAuthorName] = useState(post?.authorName ?? 'Team Tetto94')
  const [noindex, setNoindex] = useState(post?.noindex ?? false)
  const [faqItems, setFaqItems] = useState<FaqItem[]>(post?.faqItems ?? [])
  const [status, setStatus] = useState<'draft' | 'published'>(post?.status === 'published' ? 'published' : 'draft')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  function updateFaqItem(index: number, field: keyof FaqItem, value: string) {
    setFaqItems((items) => items.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
  }

  function removeFaqItem(index: number) {
    setFaqItems((items) => items.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!title.trim() || !slug.trim() || !contentHtml.trim()) {
      setError('Title, slug, and content are required.')
      return
    }

    setSaving(true)
    try {
      const payload = {
        title,
        slug,
        excerpt: excerpt || null,
        contentHtml,
        coverImageUrl: coverImageUrl || null,
        coverImageAlt: coverImageAlt || null,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        status,
        tags: tagsInput
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        authorName: authorName || null,
        noindex,
        faqItems: faqItems.filter((f) => f.question.trim() && f.answer.trim()),
      }

      const res = await fetch(isEditing ? `/api/admin/posts/${post!.id}` : '/api/admin/posts', {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'Error saving the post.')
        setSaving(false)
        return
      }

      router.push('/admin')
      router.refresh()
    } catch {
      setError('Connection error. Please try again.')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Main column */}
        <div className="flex flex-col gap-5">
          <div>
            <label htmlFor="title" className="mb-1.5 block text-xs font-medium text-white/60">
              Title
            </label>
            <input
              id="title"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#EB1C26]"
            />
          </div>

          <div>
            <label htmlFor="slug" className="mb-1.5 block text-xs font-medium text-white/60">
              Slug (URL: /blog/{slug || '...'})
            </label>
            <input
              id="slug"
              required
              value={slug}
              onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true) }}
              className="w-full border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#EB1C26]"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="mb-1.5 block text-xs font-medium text-white/60">
              Excerpt (preview shown in the blog list)
            </label>
            <textarea
              id="excerpt"
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full resize-none border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#EB1C26]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">Content</label>
            <RichTextEditor content={contentHtml} onChange={setContentHtml} />
          </div>

          <div className="border border-white/15 bg-white/[0.03] p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">FAQ (optional)</h3>
                <p className="mt-1 text-[11px] text-white/40">
                  Rendered as an accordion on the post and marked up as FAQPage schema for rich snippet eligibility.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFaqItems((items) => [...items, { question: '', answer: '' }])}
                className="flex shrink-0 items-center gap-1 border border-white/15 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:text-white"
              >
                <Plus className="size-3.5" />
                Add question
              </button>
            </div>
            {faqItems.length > 0 && (
              <div className="flex flex-col gap-3">
                {faqItems.map((item, index) => (
                  <div key={index} className="border border-white/10 bg-white/[0.02] p-3">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-white/40">
                        Question {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFaqItem(index)}
                        aria-label="Remove question"
                        className="text-white/40 transition-colors hover:text-[#EB1C26]"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                    <input
                      value={item.question}
                      onChange={(e) => updateFaqItem(index, 'question', e.target.value)}
                      placeholder="Question"
                      className="mb-2 w-full border border-white/15 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none focus:border-[#EB1C26]"
                    />
                    <textarea
                      value={item.answer}
                      onChange={(e) => updateFaqItem(index, 'answer', e.target.value)}
                      placeholder="Answer"
                      rows={2}
                      className="w-full resize-none border border-white/15 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none focus:border-[#EB1C26]"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar column */}
        <div className="flex flex-col gap-5">
          <div className="border border-white/15 bg-white/[0.03] p-4">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/50">Publishing</h3>
            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="status" className="mb-1.5 block text-xs font-medium text-white/60">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                  className="w-full border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#EB1C26]"
                >
                  <option value="draft" className="bg-[#161616]">Draft</option>
                  <option value="published" className="bg-[#161616]">Published</option>
                </select>
              </div>
              <div>
                <label htmlFor="authorName" className="mb-1.5 block text-xs font-medium text-white/60">
                  Author (shown on the post + in schema markup)
                </label>
                <input
                  id="authorName"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Team Tetto94"
                  className="w-full border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#EB1C26]"
                />
              </div>
              <label className="flex items-start gap-2 text-xs text-white/60">
                <input
                  type="checkbox"
                  checked={noindex}
                  onChange={(e) => setNoindex(e.target.checked)}
                  className="mt-0.5 size-3.5 accent-[#EB1C26]"
                />
                <span>
                  Hide from search engines (noindex) — post stays live at its URL but is excluded from Google and
                  the sitemap.
                </span>
              </label>
            </div>
          </div>

          <div className="border border-white/15 bg-white/[0.03] p-4">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/50">Tags</h3>
            <label htmlFor="tags" className="mb-1.5 block text-xs font-medium text-white/60">
              Comma-separated (topic pages + related posts)
            </label>
            <input
              id="tags"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="rifacimento tetto, manutenzione, venezia"
              className="w-full border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#EB1C26]"
            />
          </div>

          <div className="border border-white/15 bg-white/[0.03] p-4">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/50">Cover image</h3>
            {coverImageUrl ? (
              <div className="relative mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverImageUrl} alt="" className="aspect-video w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setCoverImageUrl('')}
                  aria-label="Remove cover image"
                  className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center bg-black/70 text-white"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ) : (
              <div className="mb-3 [&_button]:!flex [&_button]:!w-full [&_button]:!items-center [&_button]:!justify-center [&_button]:!gap-2 [&_button]:!border [&_button]:!border-dashed [&_button]:!border-white/20 [&_button]:!bg-transparent [&_button]:!py-6 [&_button]:!text-xs [&_button]:!text-white/60 [&_button:hover]:!border-white/40">
                <UploadButton
                  endpoint="blogImage"
                  onClientUploadComplete={(res) => {
                    const url = res?.[0]?.ufsUrl
                    if (url) setCoverImageUrl(url)
                  }}
                  onUploadError={(err) => window.alert(`Upload error: ${err.message}`)}
                  content={{
                    button: (
                      <span className="flex items-center gap-2">
                        <ImagePlus className="size-4" /> Upload cover
                      </span>
                    ),
                    allowedContent: '',
                  }}
                />
              </div>
            )}
            <label htmlFor="coverAlt" className="mb-1.5 block text-xs font-medium text-white/60">
              Alt text (accessibility / SEO)
            </label>
            <input
              id="coverAlt"
              value={coverImageAlt}
              onChange={(e) => setCoverImageAlt(e.target.value)}
              className="w-full border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#EB1C26]"
            />
          </div>

          <div className="border border-white/15 bg-white/[0.03] p-4">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/50">SEO</h3>
            <div className="flex flex-col gap-3">
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="seoTitle" className="block text-xs font-medium text-white/60">
                    SEO title (optional)
                  </label>
                  <span className={`text-[10px] ${seoTitle.length > 60 ? 'text-[#EB1C26]' : 'text-white/40'}`}>
                    {seoTitle.length}/60
                  </span>
                </div>
                <input
                  id="seoTitle"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder={title || 'Falls back to the post title'}
                  className="w-full border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#EB1C26]"
                />
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="seoDescription" className="block text-xs font-medium text-white/60">
                    Meta description (optional)
                  </label>
                  <span className={`text-[10px] ${seoDescription.length > 160 ? 'text-[#EB1C26]' : 'text-white/40'}`}>
                    {seoDescription.length}/160
                  </span>
                </div>
                <textarea
                  id="seoDescription"
                  rows={3}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder={excerpt || 'Falls back to the excerpt'}
                  className="w-full resize-none border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-[#EB1C26]"
                />
              </div>
              <p className="text-[11px] leading-relaxed text-white/40">
                Keep the title under ~60 characters and the description under ~160 so Google doesn&apos;t truncate them in search results.
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-[#EB1C26]">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-[#EB1C26] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {saving && <Loader2 className="size-4 animate-spin" />}
          {isEditing ? 'Save changes' : 'Create post'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="border border-white/15 px-5 py-2.5 text-sm text-white/70 transition-colors hover:text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
