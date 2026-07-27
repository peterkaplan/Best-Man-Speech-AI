import { PostHog } from 'posthog-node';
import { POSTHOG_TOKEN, POSTHOG_TOKEN_MISSING_MESSAGE } from '@/lib/posthog-token';

let posthogClient: PostHog | null = null;

export function getPostHogClient(): PostHog | null {
  if (!POSTHOG_TOKEN) {
    console.error(POSTHOG_TOKEN_MISSING_MESSAGE);
    return null;
  }

  if (!posthogClient) {
    posthogClient = new PostHog(POSTHOG_TOKEN, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return posthogClient;
}
