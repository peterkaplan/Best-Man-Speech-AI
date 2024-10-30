"use client";
import React, { useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import Formy from "@/components/form/Formy";
import FakeDocument from '@/components/fake_document/FakeDocument';
import useFormState from '@/app/form/useFormState';
import { useScroll } from './ScrollContext';

const FormPage: React.FC = () => {
  const formState = useFormState();
  const { formStage, documentProgress, handleAnimationComplete, getResults } = formState;
  const results = getResults();
  const { formRef } = useScroll();

  const memoizedFakeDocument = useMemo(() => (
    <FakeDocument
      formStage={formStage}
      progress={documentProgress}
      results={results}
      onAnimationComplete={handleAnimationComplete}
    />
  ), [documentProgress, formStage, results, handleAnimationComplete]);
  return (
    <div 
      ref={formRef}
      className="pb-12 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 h-full relative">
          <AnimatePresence>
            {formStage === 'form' && (
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 lg:w-1/2"
              >
                <Card className="bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200/50 rounded-lg overflow-hidden flex flex-col min-h-[400px] lg:h-auto">
                  <CardContent className="p-6 flex-grow overflow-y-auto">
                    <Formy formState={formState} />
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            key="fakeDocument"
            className="flex-1 w-full lg:w-1/2 h-full md:overflow-hidden overflow-y-scroll max-h-[600px] lg:max-h-none"
            animate={{
              width: '100%',
            }}
            transition={{ duration: 0.5 }}
          >
            {memoizedFakeDocument}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;