import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-card'

export const alt = 'Best Man Speech Generator — Write Yours Free'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OpengraphImage() {
  return renderOgCard({
    title: 'Best Man Speech',
    accentTitle: 'Generator',
    subtitle: '7 quick questions. A personalized speech in under 5 minutes.',
  })
}
