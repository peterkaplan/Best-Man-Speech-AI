import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-card'

export const alt = 'Best Man Speech AI — Write Your Speech in Minutes'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OpengraphImage() {
  return renderOgCard({
    title: 'Craft an Unforgettable',
    accentTitle: 'Best Man Speech',
    subtitle: 'Answer a few questions. Get a speech worth applauding.',
  })
}
