import React from 'react';
import { TypedText } from '@/app/form/useTypingEffect';
import { Scroll } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const ResultContent: React.FC<{ displayedText: TypedText | null }> = ({ displayedText }) => {
  if (!displayedText) return null;

  const sentences = displayedText.content.split('. ');
  const visibleSentences = sentences.slice(0, 1);
  const partialSentence = sentences[1]?.split(' ').slice(0, Math.ceil(sentences[1].split(' ').length / 2)).join(' ');
  const remainingSentences = sentences.slice(1);

  return (
    <div className="font-serif text-base leading-relaxed h-full relative flex flex-col items-center">
      <div className="h-full w-full flex flex-col items-center">
        {displayedText.title && (
          <h1 className="text-3xl font-bold mb-6 text-center">
            {displayedText.title}
          </h1>
        )}
        <div className="whitespace-pre-wrap break-words">
          {visibleSentences.map((sentence, index) => (
            <span key={index} className="mb-4 text-justify">
              {sentence.trim() + '.'}
            </span>
          ))}
          {partialSentence && (
            <span className="mb-4 text-justify">
              {partialSentence.trim() + ' '}
            </span>
          )}
          <div className="blur inline">
            {remainingSentences.map((sentence, index) => (
              <span key={index + visibleSentences.length} className="mb-4 text-justify">
                {sentence.trim() + (index < remainingSentences.length - 1 ? '.' : '')}
              </span>
            ))}
          </div>
        </div>
      </div>
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <Button
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
          onClick={() => alert('Unlocking full eulogy...')}
        >
          <Scroll size={18} />
          Unlock Full Eulogy
        </Button>
      </motion.div>
    </div>
  );
};