import React from 'react';
import type { Metadata } from 'next';
import FormPage from '@/components/form/FormPage'
import { ScrollProvider } from '@/components/form/ScrollContext';
import JsonLd from '@/components/JsonLd';
import { softwareApplicationSchema, breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Best Man Speech Generator — Write Yours Free',
  description:
    'Answer 7 quick questions and get a personalized best man speech in under 5 minutes. Free, no signup required.',
  alternates: {
    canonical: 'https://www.bestmanspeechai.com/creator',
  },
  openGraph: {
    type: 'website',
    title: 'Best Man Speech Generator — Write Yours Free',
    description:
      'Answer 7 quick questions and get a personalized best man speech in under 5 minutes. Free, no signup required.',
    url: 'https://www.bestmanspeechai.com/creator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Man Speech Generator — Write Yours Free',
    description: 'Answer 7 quick questions and get a personalized best man speech in under 5 minutes.',
  },
};

const Creator = () => {
  return (
    <ScrollProvider>
      <JsonLd data={softwareApplicationSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Best Man Speech Generator', path: '/creator' },
        ])}
      />
      <div className='pt-24 pb-6 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <h1 className='font-display text-3xl sm:text-4xl font-bold tracking-tight'>
            Best Man Speech Generator
          </h1>
          <p className='mt-3 text-muted-foreground max-w-2xl mx-auto'>
            Answer a few quick questions and get a personalized speech in minutes — free, no signup required.
          </p>
        </div>
      </div>
      {/* The form's own card title is an h3 from the shared Card component, so
          the page jumped h1 -> h3. This restores the level without adding
          visual noise the design does not want. */}
      <h2 className='sr-only'>Answer the speech questions</h2>
      <FormPage />
    </ScrollProvider>
  );
};

export default Creator;
