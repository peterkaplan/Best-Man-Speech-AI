import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.bestmanspeechai.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: `${BASE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/creator`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/how-to-write-a-speech`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/bachelor-party-speech`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/tips`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/twogrooms`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
