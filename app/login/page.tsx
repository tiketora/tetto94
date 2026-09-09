import type { Metadata } from 'next'
import LoginForm from '@/components/admin/login-form'

// Hidden route: never linked from the navbar/footer, excluded from the
// sitemap, and explicitly noindexed so search engines never surface it.
export const metadata: Metadata = {
  title: 'Accesso',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#161616] px-6">
      <LoginForm />
    </main>
  )
}
