import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Best Man Speech AI',
    short_name: 'BestManSpeechAI',
    description:
      'Craft an unforgettable best man speech in minutes. Answer a few questions and let our AI turn your stories into a speech worth applauding.',
    start_url: '/',
    display: 'standalone',
    // Matches --background and --primary in app/globals.css.
    background_color: '#12100e',
    theme_color: '#e8a540',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  }
}
