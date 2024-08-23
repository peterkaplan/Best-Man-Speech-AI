import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateTitle, generateSentence } from "@/app/form/textGenerationUtils";

export const useTypingEffect = (progress: number) => {
  const [displayedText, setDisplayedText] = useState({ title: '', content: '' });
  const [isTyping, setIsTyping] = useState(false);
  const fullTextRef = useRef({ title: '', content: '' });
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const lastProgressRef = useRef(0);
  const sectionsRef = useRef<number[]>([0]);
  const currentSentenceRef = useRef('');
  const isTypingCycleActiveRef = useRef(false);
  const hasTitleRef = useRef(false);

  const typeText = useCallback((text: string, isTitle: boolean = false) => {
    if (isTypingCycleActiveRef.current) return;
    isTypingCycleActiveRef.current = true;
    setIsTyping(true);
    let index = 0;

    const type = () => {
      if (index < text.length) {
        const newChar = text[index];
        setDisplayedText(prev => {
          const newText = isTitle 
            ? { ...prev, title: prev.title + newChar }
            : { ...prev, content: prev.content + newChar };
          return newText;
        });
        index++;
        typingRef.current = setTimeout(type, Math.random() * 30 + 10);
      } else {
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
      if (progress > lastProgressRef.current) {
        if (!isTypingCycleActiveRef.current) {
          if (!hasTitleRef.current) {
            const newTitle = generateTitle();
            fullTextRef.current.title = newTitle;
            hasTitleRef.current = true;
            typeText(newTitle, true);
          } else {
            const newSentence = generateSentence();
            fullTextRef.current.content += (fullTextRef.current.content ? ' ' : '') + newSentence;
            sectionsRef.current.push(fullTextRef.current.content.length);
            currentSentenceRef.current = newSentence;
            typeText(newSentence);
          }
        }
      } else if (progress < lastProgressRef.current) {
        // Handle reverting text (if needed)
        const lastSectionStart = sectionsRef.current[sectionsRef.current.length - 2] || 0;
        fullTextRef.current.content = fullTextRef.current.content.substring(0, lastSectionStart);
        sectionsRef.current.pop();
        setDisplayedText(fullTextRef.current);
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