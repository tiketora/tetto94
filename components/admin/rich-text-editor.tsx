'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageExtension from '@tiptap/extension-image'
import {
  Bold, Italic, Strikethrough, Heading2, Heading3, List, ListOrdered,
  Quote, LinkIcon, ImageIcon, Undo, Redo,
} from 'lucide-react'
import { UploadButton } from '@/lib/uploadthing'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={active}
      className={`flex size-8 items-center justify-center border transition-colors disabled:opacity-30 ${
        active ? 'border-[#EB1C26] bg-[#EB1C26]/15 text-[#EB1C26]' : 'border-white/10 text-white/70 hover:border-white/25 hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      // Tiptap v3's StarterKit already registers the Link extension
      // internally — configuring it here instead of also importing
      // @tiptap/extension-link separately avoids a duplicate
      // registration that was destabilizing the editor's ProseMirror
      // state (visible as a "Duplicate extension names: ['link']"
      // warning, and the root cause of a DOM insertBefore crash when
      // the form navigated away right after saving).
      StarterKit.configure({ link: { openOnClick: false, autolink: true } }),
      ImageExtension,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose-editor min-h-[320px] px-4 py-3 text-sm text-white/90 outline-none [&_p]:my-2 [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mt-3 [&_h3]:mb-1.5 [&_h3]:text-lg [&_h3]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-[#EB1C26] [&_blockquote]:pl-3 [&_blockquote]:italic [&_a]:text-[#EB1C26] [&_a]:underline [&_img]:max-w-full',
      },
    },
  })

  if (!editor) return null

  function addLink() {
    const url = window.prompt('URL del link:')
    if (!url) return
    editor.chain().focus().setLink({ href: url }).run()
  }

  return (
    <div className="border border-white/15 bg-white/[0.03]">
      <div className="flex flex-wrap items-center gap-1.5 border-b border-white/10 p-2">
        <ToolbarButton label="Grassetto" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Corsivo" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Barrato" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Titolo 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Titolo 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Elenco puntato" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Elenco numerato" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Citazione" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Link" active={editor.isActive('link')} onClick={addLink}>
          <LinkIcon className="size-4" />
        </ToolbarButton>

        <div className="mx-1 h-5 w-px bg-white/10" />

        <ToolbarButton label="Annulla" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Ripeti" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo className="size-4" />
        </ToolbarButton>

        <div className="mx-1 h-5 w-px bg-white/10" />

        <div className="[&_button]:!h-8 [&_button]:!w-8 [&_button]:!border [&_button]:!border-white/10 [&_button]:!bg-transparent [&_button]:!text-white/70 [&_button:hover]:!border-white/25 [&_button:hover]:!bg-transparent [&_svg]:!hidden">
          <UploadButton
            endpoint="blogImage"
            onClientUploadComplete={(res) => {
              const url = res?.[0]?.ufsUrl
              if (url) editor.chain().focus().setImage({ src: url }).run()
            }}
            onUploadError={(error) => {
              window.alert(`Errore upload immagine: ${error.message}`)
            }}
            content={{
              button: <ImageIcon className="size-4" />,
              allowedContent: '',
            }}
          />
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}

