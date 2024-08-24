import React from 'react';
import { TypedText } from '@/app/form/useTypingEffect';
import { motion } from 'framer-motion';
import { UnlockCard } from './UnlockCard';

export const ResultContent: React.FC<{ displayedText: TypedText | null }> = ({ displayedText }) => {
  if (!displayedText) return null;

  const words = displayedText.content.split(' ');
  const visibleWordCount = 35;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="font-sans text-base leading-relaxed h-full relative flex flex-col items-center max-w-2xl mx-auto p-8 pb-24"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold mb-6 text-center text-gray-800"
      >
        Eulogy Speech
      </motion.h1>
      <div className="relative w-full mb-8">
        <p className="whitespace-pre-wrap break-words text-gray-700 text-justify">
          {words.map((word, index) => (
            <React.Fragment key={index}>
              {index > 0 && ' '}
              <span
                style={{
                  filter: index >= visibleWordCount ? `blur(${Math.min((index - visibleWordCount) * 0.2 + 1, 5)}px)` : 'none',
                  opacity: index >= visibleWordCount ? Math.max(1 - (index - visibleWordCount) * 0.02, 0.5) : 1,
                }}
              >
                {word}
              </span>
            </React.Fragment>
          ))}
        </p>
        <div className="absolute -bottom-16 left-0 right-0 flex justify-center">
          <UnlockCard />
        </div>
      </div>
    </motion.div>
  );
};