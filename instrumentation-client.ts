import posthog from 'posthog-js';
import { POSTHOG_TOKEN, POSTHOG_TOKEN_MISSING_MESSAGE } from '@/lib/posthog-token';

if (!POSTHOG_TOKEN) {
  // Logged in production too, deliberately. A missing token disables analytics
  // entirely, and the last time this was dev-only the breakage went unnoticed.
  console.error(POSTHOG_TOKEN_MISSING_MESSAGE);
} else {
  posthog.init(POSTHOG_TOKEN, {
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
