// import type { Metadata } from 'next'
// import Link from 'next/link'
// import { LogOut } from 'lucide-react'
// import Tetto94Logo from '@/components/tetto94/logo'

// // Every /admin/* route is noindexed and unlisted — actual access control
// // happens in middleware.ts, which redirects unauthenticated requests to
// // /login before this layout ever renders.
// export const metadata: Metadata = {
//   title: 'Admin — Tetto94',
//   robots: { index: false, follow: false },
// }

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="min-h-screen bg-[#161616]">
//       <header className="border-b border-white/10 bg-[#111]">
//         <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
//           <Link href="/admin" className="flex items-center gap-2">
//             <Tetto94Logo className="h-8 w-auto" />
//             <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Blog Admin</span>
//           </Link>
//           <form action="/admin/logout" method="POST">
//             <button
//               type="submit"
//               className="flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors hover:text-white"
//             >
//               <LogOut className="size-3.5" />
//               Log out
//             </button>
//           </form>
//         </div>
//       </header>
//       <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
//     </div>
//   )
// }

import type { Metadata } from 'next'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
import Tetto94Logo from '@/components/tetto94/logo'

// Every /admin/* route is noindexed and unlisted — actual access control
// happens in middleware.ts, which redirects unauthenticated requests to
// /login before this layout ever renders.
export const metadata: Metadata = {
  title: 'Admin — Tetto94',
  robots: { index: false, follow: false },
}

// None of the /admin/* pages call a dynamic API (cookies/headers/searchParams)
// directly — auth is gated in middleware, not in the page bodies — so
// without this, Next.js has no signal to avoid statically caching the
// rendered dashboard (Full Route Cache). That made deleted/edited posts
// keep showing in the list until a redeploy, even though router.refresh()
// on the client fired correctly. Forcing dynamic rendering here (inherited
// by every page under this layout) means the dashboard always reflects the
// current database state, with zero caching, as intended for an admin tool.
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#161616]">
      <header className="border-b border-white/10 bg-[#111]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="flex items-center gap-2">
            <Tetto94Logo className="h-8 w-auto" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Blog Admin</span>
          </Link>
          <form action="/admin/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors hover:text-white"
            >
              <LogOut className="size-3.5" />
              Log out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  )
}
