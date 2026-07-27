/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/array/:path*',
        destination: 'https://us-assets.i.posthog.com/array/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ];
  },
  // Required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,

  async redirects() {
    return [
      {
        // Canonical host. Vercel's domain-level redirect (307) fires at the
        // edge before Next.js runs, so this only takes effect once the apex
        // domain is pointed at the project without a dashboard redirect.
        source: '/:path*',
        has: [{ type: 'host', value: 'bestmanspeechai.com' }],
        destination: 'https://www.bestmanspeechai.com/:path*',
        permanent: true, // 308
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Documents are same-origin only. Next.js cannot delete a header, so
          // the wildcard that was being served on HTML is narrowed to the
          // canonical origin rather than left as "*".
          { key: 'Access-Control-Allow-Origin', value: 'https://www.bestmanspeechai.com' },
        ],
        // Content-Security-Policy is intentionally omitted. The app loads
        // PostHog, GA4, Vercel Analytics and Speed Insights, so a policy needs
        // to be built and verified in report-only mode first — shipping a
        // guessed one would silently break analytics.
      },
    ];
  },
};

export default nextConfig;
