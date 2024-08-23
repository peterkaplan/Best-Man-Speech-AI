import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateSentence, generateTitle } from "@/app/form/textGenerationUtils";

const MIN_SENTENCES_PER_PARAGRAPH = 3;
const MAX_SENTENCES_PER_PARAGRAPH = 5;
const INITIAL_SENTENCES = 5;
const SENTENCES_INCREMENT = 3;

export const useTypingEffect = (progress: number) => {
  const [displayedText, setDisplayedText] = useState({ title: '', content: '' });
  const [isTyping, setIsTyping] = useState(false);
  const fullTextRef = useRef({ title: '', content: '' });
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const lastProgressRef = useRef(0);
  const sentencesGeneratedRef = useRef(0);
  const isTypingCycleActiveRef = useRef(false);
  const typingQueueRef = useRef<Array<{ text: string; isTitle: boolean }>>([]);

  const generateContent = (sentenceCount: number) => {
    let content = '';
    let sentencesInCurrentParagraph = 0;
    let paragraphLength = Math.floor(Math.random() * (MAX_SENTENCES_PER_PARAGRAPH - MIN_SENTENCES_PER_PARAGRAPH + 1)) + MIN_SENTENCES_PER_PARAGRAPH;

    for (let i = 0; i < sentenceCount; i++) {
      content += generateSentence();
      sentencesInCurrentParagraph++;

      if (sentencesInCurrentParagraph >= paragraphLength && i < sentenceCount - 1) {
        content += '\n\n';
        sentencesInCurrentParagraph = 0;
        paragraphLength = Math.floor(Math.random() * (MAX_SENTENCES_PER_PARAGRAPH - MIN_SENTENCES_PER_PARAGRAPH + 1)) + MIN_SENTENCES_PER_PARAGRAPH;
      }
    }

    sentencesGeneratedRef.current += sentenceCount;
    return content.trim();
  };
  
  const typeText = useCallback((text: string, isTitle: boolean = false) => {
    if (isTypingCycleActiveRef.current) {
      typingQueueRef.current.push({ text, isTitle });
      return;
    }
    
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
        isTypingCycleActiveRef.current = false;
        if (typingRef.current) {
          clearTimeout(typingRef.current);
          typingRef.current = null;
        }
        
        if (typingQueueRef.current.length > 0) {
          const nextTyping = typingQueueRef.current.shift();
          if (nextTyping) {
            typeText(nextTyping.text, nextTyping.isTitle);
          }
        }
      }
    };

    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }
    type();
  }, []);

  
  const resetState = useCallback(() => {
    setDisplayedText({ title: '', content: '' });
    fullTextRef.current = { title: '', content: '' };
    sentencesGeneratedRef.current = 0;
    isTypingCycleActiveRef.current = false;
    if (typingRef.current) {
      clearTimeout(typingRef.current);
      typingRef.current = null;
    }
    setIsTyping(false);
  }, []);

  useEffect(() => {
    if (progress !== lastProgressRef.current) {
      if (progress > lastProgressRef.current) {
        if (progress === 1 && fullTextRef.current.title === '') {
          // Generate title and initial content
          const newTitle = generateTitle();
          const initialContent = generateContent(INITIAL_SENTENCES);
          fullTextRef.current = { title: newTitle, content: initialContent };
          typeText(newTitle, true);  // Start with the title
          typingQueueRef.current.push({ text: initialContent, isTitle: false });  // Queue the content
        } else if (fullTextRef.current.title && fullTextRef.current.content) {
          // Generate additional content
          const newContent = generateContent(SENTENCES_INCREMENT);
          fullTextRef.current.content += (fullTextRef.current.content ? ' ' : '') + newContent;
          
          // If not currently typing, start typing the new content
          if (!isTypingCycleActiveRef.current) {
            typeText(newContent);
          } else {
            // If currently typing, add the new content to the queue
            typingQueueRef.current.push({ text: newContent, isTitle: false });
          }
        }
      } else if (progress < lastProgressRef.current) {
        // Handle reverting text
        if (progress === 0) {
          resetState();
        } else {
          const contentWords = fullTextRef.current.content.split(' ');
          const newContentLength = Math.max(0, contentWords.length - SENTENCES_INCREMENT * 5);
          fullTextRef.current.content = contentWords.slice(0, newContentLength).join(' ');
          setDisplayedText(fullTextRef.current);
          sentencesGeneratedRef.current = Math.max(0, sentencesGeneratedRef.current - SENTENCES_INCREMENT);
          isTypingCycleActiveRef.current = false;
          typingQueueRef.current = [];  // Clear the typing queue when reverting
        }
      }
      lastProgressRef.current = progress;
    }

    return () => {
      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }
    };
  }, [progress, typeText, resetState]);

  return { displayedText, isTyping };
};

export const TypingIndicator: React.FC<{ isTyping: boolean }> = ({ isTyping }) => (
  <motion.div
    animate={{ opacity: isTyping ? [0.5, 1, 0.5] : 0 }}
    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    className="w-2 h-2 bg-green-500 rounded-full"
  />
);