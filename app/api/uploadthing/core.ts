import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { getSession } from '@/lib/auth/session'

const f = createUploadthing()

/**
 * Single route for blog cover + inline images. Gated by the same admin
 * session as /admin — an unauthenticated request is rejected before
 * UploadThing ever issues an upload URL, so this can't be used as an
 * anonymous file-upload endpoint.
 */
export const ourFileRouter = {
  blogImage: f({ image: { maxFileSize: '8MB', maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getSession()
      if (!session) throw new UploadThingError('Unauthorized')
      return { admin: session.sub }
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
