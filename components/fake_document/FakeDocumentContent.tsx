import React from 'react';
import { motion } from 'framer-motion';
import { TypedText } from '@/app/form/useTypingEffect';


export const DocumentContent: React.FC<{ displayedText: TypedText; isTyping: boolean }> = ({ displayedText, isTyping }) => (
  <div className="font-sans text-base leading-relaxed h-full relative">
    <div className="h-full">
      {displayedText.title && (
        <h1 className="font-display text-3xl font-medium mb-6 text-center text-foreground">
          {displayedText.title}
        </h1>
      )}
      <div className="whitespace-pre-wrap break-words text-muted-foreground">
        {displayedText.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-justify">{paragraph}</p>
        ))}
      </div>
      <motion.div
        animate={{ opacity: isTyping ? 1 : [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[2px] h-[1.2em] bg-primary ml-[1px] align-middle"
      />
    </div>
  </div>
);