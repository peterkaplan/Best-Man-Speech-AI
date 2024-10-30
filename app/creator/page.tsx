import React from 'react';
import FormPage from '@/components/form/FormPage'
import { ScrollProvider } from '@/components/form/ScrollContext';

const Creator = () => {
  return (
    <ScrollProvider>
      <div className='py-12'></div>
      <FormPage />
    </ScrollProvider>
  );
};

export default Creator;