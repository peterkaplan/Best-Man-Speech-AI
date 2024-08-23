import React from 'react';
import { motion } from 'framer-motion';

interface DisplayedText {
  title: string;
  content: string;
}

export const DocumentContent: React.FC<{ isLoading: boolean; displayedText: DisplayedText; isTyping: boolean }> = ({ isLoading, displayedText, isTyping }) => (
  <div className="font-serif text-base leading-relaxed min-h-[700px] relative">
    {isLoading ? (
      <div className="flex items-center justify-center h-full">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-t-2 border-blue-500 rounded-full"
        />
      </div>
    ) : (
      <div>
        {displayedText.title && <h1 className="text-2xl font-bold mb-4">{displayedText.title}</h1>}
        <div className="whitespace-pre-wrap">
          {displayedText.content}
          <motion.div
            animate={{ opacity: isTyping ? 1 : [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="inline-block w-[1px] h-[1.2em] bg-black ml-[1px] align-middle"
          />
        </div>
      </div>
    )}
  </div>
);