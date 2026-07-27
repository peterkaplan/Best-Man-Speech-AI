import React from 'react'
import { contentDates, formatDate } from '@/lib/content-dates'

/**
 * Visible published / updated byline. Uses <time datetime> so the dates are
 * machine-readable in the DOM, not only in JSON-LD.
 */
export default function ArticleDates({ path }: { path: string }) {
  const dates = contentDates[path]
  if (!dates) return null

  const changed = dates.updated !== dates.published

  return (
    <p className="text-sm text-muted-foreground">
      <time dateTime={dates.published}>Published {formatDate(dates.published)}</time>
      {changed && (
        <>
          {' · '}
          <time dateTime={dates.updated}>Updated {formatDate(dates.updated)}</time>
        </>
      )}
    </p>
  )
}
