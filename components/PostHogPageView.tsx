"use client";

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';

/**
 * App Router navigations don't reload the page, so posthog-js's built-in
 * pageview capture only ever sees the first URL of a visit - anyone who lands
 * on the homepage and clicks through to /creator looks like a single pageview.
 * Capture $pageview ourselves instead (capture_pageview is off in
 * instrumentation-client.ts so these don't double-count on first load).
 */
const PageViewTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || !posthog.__loaded) return;

    const query = searchParams?.toString();
    posthog.capture('$pageview', {
      $current_url: `${window.location.origin}${pathname}${query ? `?${query}` : ''}`,
    });
  }, [pathname, searchParams]);

  return null;
};

// useSearchParams opts the subtree into client-side rendering, so it needs a
// Suspense boundary to keep the rest of the page statically rendered.
const PostHogPageView = () => (
  <Suspense fallback={null}>
    <PageViewTracker />
  </Suspense>
);

export default PostHogPageView;
