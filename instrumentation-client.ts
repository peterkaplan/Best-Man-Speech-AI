import posthog from 'posthog-js';

if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(
      'NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured'
    );
  }
} else {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, {
    api_host: '/ingest',
    ui_host: 'https://us.posthog.com',
    debug: process.env.NODE_ENV === 'development',
    // Pageviews are captured by <PostHogPageView />, which also sees App Router
    // client-side navigations. Pageleave has to be turned on explicitly once
    // capture_pageview is off - it's what makes bounce and time-on-page work.
    capture_pageview: false,
    capture_pageleave: true,
  });
}
