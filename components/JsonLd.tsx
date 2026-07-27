import React from 'react'

/**
 * Renders a JSON-LD block. Next.js recommends this over next/script for
 * structured data so the markup is present in the server-rendered HTML,
 * which is what crawlers and AI agents read.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is authored in lib/schema.ts, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
