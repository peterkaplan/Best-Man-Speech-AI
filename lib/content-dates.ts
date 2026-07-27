/**
 * Publication dates for editorial content, in one place so the visible
 * byline and the Article JSON-LD can never disagree.
 *
 * Recency is one of the strongest AI-citation signals: content under three
 * months old is roughly 3x more likely to be cited, and pages left untouched
 * for 6+ months lose citation eligibility (SE Ranking, 1.3M-citation study).
 *
 * When you materially revise a page, bump `updated`. Do not bump it for
 * typo fixes — a dishonest freshness signal is worse than a stale one.
 */

export type ContentDates = {
  published: string // ISO date
  updated: string // ISO date
}

export const contentDates: Record<string, ContentDates> = {
  '/how-to-write-a-speech': { published: '2025-07-25', updated: '2026-07-27' },
  '/bachelor-party-speech': { published: '2025-07-25', updated: '2026-07-27' },
  '/tips': { published: '2025-06-23', updated: '2026-07-27' },
  '/twogrooms': { published: '2025-06-23', updated: '2026-07-27' },
}

const FORMATTER = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
})

export function formatDate(iso: string): string {
  return FORMATTER.format(new Date(`${iso}T00:00:00Z`))
}
