// PostHog is initialized via instrumentation-client.ts (Next.js 15.3+ approach).
// This file is kept to avoid breaking any existing imports during migration.
export function CSPostHogProvider({ children }) {
  return children;
}