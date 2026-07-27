import { ScrollProvider } from '@/components/form/ScrollContext';
import HeroWrapper from '@/components/HeroWrapper'
import RestOfHomepage from '@/components/RestOfHomepage';
import JsonLd from '@/components/JsonLd';
import FaqSection from '@/components/FaqSection';
import { softwareApplicationSchema, faqSchema } from '@/lib/schema';
import { homeFaqs } from '@/lib/faqs';

export default function Home() {
  return (
    <div>
      <JsonLd data={softwareApplicationSchema()} />
      <JsonLd data={faqSchema(homeFaqs, '/')} />
      <ScrollProvider>
        <HeroWrapper />
        <RestOfHomepage />
      </ScrollProvider>
      <FaqSection items={homeFaqs} />
    </div>
  );
}
