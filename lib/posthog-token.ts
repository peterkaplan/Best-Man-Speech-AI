/**
 * The project token, under either of the two names it has gone by.
 *
 * These must be read as full static `process.env.NEXT_PUBLIC_*` expressions:
 * Next.js inlines them at build time by literal text match, so a dynamic
 * lookup like `process.env[name]` compiles to undefined in the browser.
 *
 * NEXT_PUBLIC_POSTHOG_KEY is the legacy name. Keeping the fallback means a
 * deploy whose env vars predate the rename still reports - dropping it is
 * silent in production, which is exactly how this broke before.
 */
export const POSTHOG_TOKEN =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
  process.env.NEXT_PUBLIC_POSTHOG_KEY ||
  undefined;

export const POSTHOG_TOKEN_MISSING_MESSAGE =
  'PostHog is disabled: set NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN (or the legacy ' +
  'NEXT_PUBLIC_POSTHOG_KEY) in this environment. Analytics events are being ' +
  'dropped silently until it is set.';
