// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
//   experimental: {
//     // Next.js sizes BOTH the "Collecting page data" and "Generating static
//     // pages" worker pools off `experimental.cpus` (which defaults to the
//     // build machine's CPU count minus 1). On Vercel's 30-core build
//     // machines that spun up 16 concurrent workers for only 30 pages — each
//     // worker loads its own copy of Turbopack/sharp/lightningcss, and 16 of
//     // them running at once blew past the ~4GB heap limit and crashed the
//     // build ("JavaScript heap out of memory"), regardless of the build
//     // machine's actual RAM.
//     // NOTE: `staticGenerationMaxConcurrency` / `staticGenerationMinPagesPerWorker`
//     // (tried previously) only tune how pages are *batched* per worker —
//     // they do NOT reduce the number of workers spawned, so the crash
//     // persisted. `cpus` is the option that actually caps worker count.
//     // Vercel can assign a small build machine (seen: 4 cores / 8GB). Node's
//     // default V8 heap ceiling on an 8GB box lands right around ~2GB per
//     // process — running 2 workers at once can make that ceiling easier to
//     // hit under load, so this is pinned to a single worker as a safety
//     // margin. Combined with the raised --max-old-space-size in the "build"
//     // script (package.json), this removes both the worker-count and the
//     // per-process heap ceiling as OOM causes.
//     cpus: 1,
//   },
//   // Give each worker more time per page since fewer workers now share the
//   // same 30 pages sequentially in smaller batches.
//   staticPageGenerationTimeout: 120,
//   // On production deployments, explicitly set X-Robots-Tag to allow indexing.
//   // Vercel auto-injects X-Robots-Tag: noindex on preview deployments — this
//   // fires ONLY when VERCEL_ENV === 'production', so previews remain protected.
//   async headers() {
//     const isProduction = process.env.VERCEL_ENV === 'production'
//     if (!isProduction) return []
//     return [
//       {
//         // Apply to all pages except static assets and API routes
//         source: '/((?!_next/static|_next/image|favicon|images|icons|api).*)',
//         headers: [
//           {
//             key: 'X-Robots-Tag',
//             value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
//           },
//         ],
//       },
//     ]
//   },
// }

// export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  compress: true,
  poweredByHeader: false,
  images: {
    // Serve responsive AVIF/WebP derivatives instead of the original PNG/JPEG
    // payloads. This changes delivery only; image content and layout remain
    // identical.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    // Next.js sizes BOTH the "Collecting page data" and "Generating static
    // pages" worker pools off `experimental.cpus` (which defaults to the
    // build machine's CPU count minus 1). On Vercel's 30-core build
    // machines that spun up 16 concurrent workers for only 30 pages — each
    // worker loads its own copy of Turbopack/sharp/lightningcss, and 16 of
    // them running at once blew past the ~4GB heap limit and crashed the
    // build ("JavaScript heap out of memory"), regardless of the build
    // machine's actual RAM.
    // NOTE: `staticGenerationMaxConcurrency` / `staticGenerationMinPagesPerWorker`
    // (tried previously) only tune how pages are *batched* per worker —
    // they do NOT reduce the number of workers spawned, so the crash
    // persisted. `cpus` is the option that actually caps worker count.
    // Vercel can assign a small build machine (seen: 4 cores / 8GB). Node's
    // default V8 heap ceiling on an 8GB box lands right around ~2GB per
    // process — running 2 workers at once can make that ceiling easier to
    // hit under load, so this is pinned to a single worker as a safety
    // margin. Combined with the raised --max-old-space-size in the "build"
    // script (package.json), this removes both the worker-count and the
    // per-process heap ceiling as OOM causes.
    cpus: 1,
  },
  // Give each worker more time per page since fewer workers now share the
  // same 30 pages sequentially in smaller batches.
  staticPageGenerationTimeout: 120,
  // On production deployments, explicitly set X-Robots-Tag to allow indexing.
  // Vercel auto-injects X-Robots-Tag: noindex on preview deployments — this
  // fires ONLY when VERCEL_ENV === 'production', so previews remain protected.
  async headers() {
    const isProduction = process.env.VERCEL_ENV === 'production'
    if (!isProduction) return []
    return [
      {
        // Apply to all pages except static assets and API routes
        source: '/((?!_next/static|_next/image|favicon|images|icons|api).*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
        ],
      },
    ]
  },
}

export default nextConfig
