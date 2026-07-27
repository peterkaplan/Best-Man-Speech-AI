import { ImageResponse } from 'next/og'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

// Theme tokens mirrored from app/globals.css so cards match the site.
const BACKGROUND = 'rgb(18, 16, 14)'
const FOREGROUND = 'rgb(245, 238, 226)'
const PRIMARY = 'rgb(232, 165, 64)'
const MUTED = 'rgb(160, 152, 140)'

type OgCardProps = {
  /** First headline line, rendered in the foreground colour. */
  title: string
  /** Second headline line, rendered in the accent colour. */
  accentTitle: string
  /** Supporting line beneath the headline. */
  subtitle: string
}

/**
 * Shared Open Graph card. Each route with its own `openGraph` metadata needs its
 * own `opengraph-image` file, because a child segment's `openGraph` block
 * overrides the parent's rather than merging with it.
 */
export function renderOgCard({ title, accentTitle, subtitle }: OgCardProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: BACKGROUND,
          padding: '72px 80px',
        }}
      >
        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
          </svg>
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, color: FOREGROUND, letterSpacing: '-0.02em' }}>
            BestManSpeechAI
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, color: FOREGROUND, lineHeight: 1.08, letterSpacing: '-0.03em' }}>
            {title}
          </div>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, color: PRIMARY, lineHeight: 1.08, letterSpacing: '-0.03em' }}>
            {accentTitle}
          </div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 30, color: MUTED, lineHeight: 1.4 }}>
            {subtitle}
          </div>
        </div>

        {/* Accent rule */}
        <div style={{ display: 'flex', width: 220, height: 8, background: PRIMARY, borderRadius: 4 }} />
      </div>
    ),
    OG_SIZE
  )
}
