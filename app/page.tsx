import FormPage from '@/components/form/FormPage';
import { ScrollProvider } from '@/components/form/ScrollContext';
import HeroWrapper from '@/components/HeroWrapper'
import RestOfHomepage from '@/components/RestOfHomepage';

export default function Home() {
  return (
    <div>
      <ScrollProvider>
        <HeroWrapper />
        <RestOfHomepage />
      </ScrollProvider>
    </div>
  );
}
