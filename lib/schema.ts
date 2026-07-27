/**
 * Schema.org JSON-LD builders.
 *
 * Every claim here must be verifiable on the live site. Notably absent:
 * AggregateRating. The homepage shows testimonials and a speech counter, but
 * there is no verified rating dataset behind them, and inventing one is both a
 * structured-data policy violation and a manual-action risk. Add it only when
 * real, auditable review data exists.
 */

export const SITE_URL = 'https://www.bestmanspeechai.com'
export const SITE_NAME = 'Best Man Speech AI'
export const SITE_DESCRIPTION =
  'Craft an unforgettable best man speech in minutes. Answer a few questions and let our AI turn your stories into a speech worth applauding.'
export const CONTACT_EMAIL = 'help@bestmanspeechai.com'

const LOGO_URL = `${SITE_URL}/opengraph-image`

/** Stable @id so other nodes can reference the organisation as an entity. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT_EMAIL,
      contactType: 'customer support',
      availableLanguage: 'English',
    },
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'en-US',
    publisher: { '@id': ORGANIZATION_ID },
  }
}

/**
 * The speech generator itself. Price is genuinely $0 — the homepage pricing
 * tier shows "Now Free!" with $4.99 struck through.
 */
export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${SITE_URL}/#webapp`,
    name: 'Best Man Speech Generator',
    url: `${SITE_URL}/creator`,
    description:
      'Answer 7 quick questions and get a personalized best man speech in under 5 minutes. Free, no signup required.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    inLanguage: 'en-US',
    publisher: { '@id': ORGANIZATION_ID },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    featureList: [
      'Personalized speech generated from your own stories',
      'PDF download',
      'Ready in under a minute',
      'No signup required',
    ],
  }
}

export type HowToStepInput = {
  title: string
  description: string
}

export function howToSchema({
  name,
  description,
  path,
  steps,
  totalTime,
}: {
  name: string
  description: string
  path: string
  steps: HowToStepInput[]
  /** ISO 8601 duration, e.g. "PT30M". */
  totalTime?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE_URL}${path}#howto`,
    name,
    description,
    inLanguage: 'en-US',
    ...(totalTime ? { totalTime } : {}),
    publisher: { '@id': ORGANIZATION_ID },
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.description,
      url: `${SITE_URL}${path}#step-${i + 1}`,
    })),
  }
}

export function articleSchema({
  headline,
  description,
  path,
  datePublished,
  dateModified,
}: {
  headline: string
  description: string
  path: string
  datePublished: string
  dateModified?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}${path}#article`,
    headline,
    description,
    inLanguage: 'en-US',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
    image: `${SITE_URL}${path}/opengraph-image`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export type FaqInput = {
  question: string
  answer: string
}

export function faqSchema(items: FaqInput[], path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}${path}#faq`,
    inLanguage: 'en-US',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
