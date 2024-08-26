"use client";
import React, { useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import Formy from "@/components/form/Formy";
import FakeDocument from '@/components/fake_document/FakeDocument';
import useFormState from '@/app/form/useFormState';

const FormPage: React.FC = () => {
  const formState = useFormState();
  const { formStage, documentProgress, apiResponse, handleAnimationComplete } = formState;

  const memoizedFakeDocument = useMemo(() => (
    <FakeDocument 
      formStage={formStage}
      progress={documentProgress} 
      realSpeech={apiResponse}
      onAnimationComplete={handleAnimationComplete}
    />
  ), [documentProgress, formStage, apiResponse, handleAnimationComplete]);
  
  return (
    <div className="bg-gradient-to-br from-indigo-200 via-blue-200 to-blue-300 min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8 lg:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] lg:from-indigo-200 lg:via-blue-200 lg:to-blue-300">
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
                <Card className="bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200/50 rounded-lg overflow-hidden flex flex-col h-full">
                  <CardContent className="p-6 flex-grow overflow-y-auto">
                    <Formy formState={formState} />
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div 
            key="fakeDocument"
            className="flex-1 w-full lg:w-1/2 h-full overflow-hidden"
            animate={{ 
              width: '100%',
            }}
            transition={{ duration: 0.5 }}
          >
            {memoizedFakeDocument}
          </motion.div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
            <div className="flex -space-x-2 mr-3">
              <Image src="/api/placeholder/32/32" alt="User" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-indigo-100" />
              <Image src="/api/placeholder/32/32" alt="User" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-indigo-100" />
              <Image src="/api/placeholder/32/32" alt="User" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-indigo-100" />
            </div>
            <span className="text-indigo-800 font-semibold">
              ⭐⭐⭐⭐⭐ 50,000+ Speeches Delivered
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;