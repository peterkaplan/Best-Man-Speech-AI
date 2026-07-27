import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.bestmanspeechai.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // AI crawlers are allowed deliberately: the domain has effectively no
        // link authority, so citations in AI search surfaces are a meaningful
        // acquisition channel. Revisit if that trade-off changes.
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/ingest/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
