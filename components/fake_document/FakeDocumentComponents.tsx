import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateSentence } from "@/app/form/textGenerationUtils";

export const useTypingEffect = (progress: number) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fullTextRef = useRef('');
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const lastProgressRef = useRef(0);
  const sectionsRef = useRef<number[]>([0]);
  const currentSentenceRef = useRef('');
  const isTypingCycleActiveRef = useRef(false);

  const typeText = useCallback((text: string) => {
    if (isTypingCycleActiveRef.current) return;
    isTypingCycleActiveRef.current = true;
    setIsTyping(true);
    let index = 0;

    const type = () => {
      if (index < text.length) {
        const newChar = text[index];
        setDisplayedText(prev => {
          const newText = prev + newChar;
          console.log(`Adding character: "${newChar}", New text: "${newText}"`);
          return newText;
        });
        index++;
        typingRef.current = setTimeout(type, Math.random() * 30 + 10); // Random delay between 10-40ms
      } else {
        console.log("Finished typing text:", text);
        setIsTyping(false);
        currentSentenceRef.current = '';
        isTypingCycleActiveRef.current = false;
        if (typingRef.current) {
          clearTimeout(typingRef.current);
          typingRef.current = null;
        }
      }
    };

    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }
    type();
  }, []);

  useEffect(() => {
    if (progress !== lastProgressRef.current) {
      console.log(`Progress changed: ${lastProgressRef.current} -> ${progress}`);
      if (progress > lastProgressRef.current) {
        if (!isTypingCycleActiveRef.current) {
          const newSentence = generateSentence();
          console.log("Generated new sentence:", newSentence);
          if (newSentence && typeof newSentence === 'string') {
            fullTextRef.current += newSentence;
            sectionsRef.current.push(fullTextRef.current.length);
            currentSentenceRef.current = newSentence;
            typeText(newSentence);
          } else {
            console.error("Invalid sentence generated:", newSentence);
          }
        }
      } else if (progress < lastProgressRef.current) {
        const lastSectionStart = sectionsRef.current[sectionsRef.current.length - 2] || 0;
        fullTextRef.current = fullTextRef.current.substring(0, lastSectionStart);
        sectionsRef.current.pop();
        setDisplayedText(fullTextRef.current);
        console.log("Reverted text:", fullTextRef.current);
        currentSentenceRef.current = '';
        isTypingCycleActiveRef.current = false;
      }
      lastProgressRef.current = progress;
    }

    return () => {
      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }
    };
  }, [progress, typeText]);

  return { displayedText, isTyping };
};

export const TypingIndicator: React.FC<{ isTyping: boolean }> = ({ isTyping }) => (
  <motion.div
    animate={{ opacity: isTyping ? [0.5, 1, 0.5] : 0 }}
    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    className="w-2 h-2 bg-green-500 rounded-full"
  />
);