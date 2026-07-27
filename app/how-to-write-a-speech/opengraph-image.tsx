import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-card'

export const alt = 'How to Write a Great Best Man Speech: The Ultimate Guide'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OpengraphImage() {
  return renderOgCard({
    title: 'How to Write a Great',
    accentTitle: 'Best Man Speech',
    subtitle: 'Structure, examples, and a step-by-step process.',
  })
}
