import React from 'react'
import type { FaqInput } from '@/lib/schema'

/**
 * Server-rendered FAQ. Uses native <details> rather than a client-side
 * accordion so every answer is present in the initial HTML — that is what
 * crawlers and AI search engines extract, and it costs no JavaScript.
 */
export default function FaqSection({
  items,
  title = 'Frequently Asked Questions',
}: {
  items: FaqInput[]
  title?: string
}) {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="font-display text-3xl font-medium text-center mb-10 text-foreground">
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <details
            key={index}
            className="group bg-card border border-border/60 rounded-lg px-5 py-4 transition-colors hover:border-primary/40"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium text-foreground list-none [&::-webkit-details-marker]:hidden">
              <h3 className="text-base sm:text-lg font-medium">{item.question}</h3>
              <span
                aria-hidden="true"
                className="shrink-0 text-primary text-xl leading-none transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-muted-foreground leading-relaxed">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
