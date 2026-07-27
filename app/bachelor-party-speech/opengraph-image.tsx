import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-card'

export const alt = 'How to Write a Killer Bachelor Party Speech'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OpengraphImage() {
  return renderOgCard({
    title: 'How to Write a Killer',
    accentTitle: 'Bachelor Party Speech',
    subtitle: 'Funny tips, one-liners, and examples that land.',
  })
}
