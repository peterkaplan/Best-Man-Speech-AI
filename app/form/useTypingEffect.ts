import { useState, useCallback, useRef, useEffect } from 'react';
import { generateTitle, generateContent, INITIAL_SENTENCES, SENTENCES_INCREMENT } from "@/app/form/textGenerationUtils";

export interface TypedText {
  title: string;
  content: string;
}

const useTypingEffect = (progress: number) => {
  const [displayedText, setDisplayedText] = useState<TypedText>({ title: '', content: '' });
  const [isTyping, setIsTyping] = useState(false);
  const fullTextRef = useRef<TypedText>({ title: '', content: '' });
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const lastProgressRef = useRef(0);
  const typingQueueRef = useRef<Array<{ text: string; isTitle: boolean }>>([]);
  const lineBreakCounterRef = useRef(0);

  const addToTypingQueue = useCallback((text: string, isTitle: boolean) => {
    typingQueueRef.current.push({ text, isTitle });
  }, []);

  const updateDisplayedText = useCallback((newChar: string, isTitle: boolean) => {
    setDisplayedText(prev => {
      if (isTitle) {
        return { ...prev, title: prev.title + newChar };
      } else {
        lineBreakCounterRef.current++;
        if (lineBreakCounterRef.current >= 100 && newChar === ' ') {
          lineBreakCounterRef.current = 0;
          return { ...prev, content: prev.content + '\n' };
        }
        return { ...prev, content: prev.content + newChar };
      }
    });
  }, []);

  const typeNextCharacter = useCallback((text: string, index: number, isTitle: boolean) => {
    if (index < text.length) {
      const newChar = text[index];
      updateDisplayedText(newChar, isTitle);
      typingRef.current = setTimeout(() => typeNextCharacter(text, index + 1, isTitle), Math.random() * 20 + 5);
    } else {
      typingQueueRef.current.shift();
      typeNextFromQueue();
    }
  }, [updateDisplayedText]);

  const typeNextFromQueue = useCallback(() => {
    if (typingQueueRef.current.length === 0) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    const { text, isTitle } = typingQueueRef.current[0];
    typeNextCharacter(text, 0, isTitle);
  }, [typeNextCharacter]);

  const generateNewContent = useCallback(() => {
    if (fullTextRef.current.title === '') {
      const newTitle = generateTitle();
      fullTextRef.current.title = newTitle;
      addToTypingQueue(newTitle, true);

      const initialContent = generateContent(INITIAL_SENTENCES);
      fullTextRef.current.content = initialContent;
      addToTypingQueue(initialContent, false);
    } else {
      const newContent = generateContent(SENTENCES_INCREMENT);
      fullTextRef.current.content += (fullTextRef.current.content ? '\n\n' : '') + newContent;
      addToTypingQueue('\n\n' + newContent, false);
    }
  }, [addToTypingQueue]);

  const reduceContent = useCallback(() => {
    const contentParagraphs = fullTextRef.current.content.split('\n\n');
    const newContentLength = Math.max(0, contentParagraphs.length - 1);
    fullTextRef.current.content = contentParagraphs.slice(0, newContentLength).join('\n\n');
    setDisplayedText(fullTextRef.current);
    
    typingQueueRef.current = [];
    if (typingRef.current) {
      clearTimeout(typingRef.current);
      typingRef.current = null;
    }
    setIsTyping(false);
  }, []);

  const resetContent = useCallback(() => {
    fullTextRef.current = { title: '', content: '' };
    typingQueueRef.current = [];
    setDisplayedText({ title: '', content: '' });
    setIsTyping(false);
    if (typingRef.current) {
      clearTimeout(typingRef.current);
      typingRef.current = null;
    }
  }, []);

  const updateContent = useCallback((newProgress: number) => {
    if (newProgress > lastProgressRef.current) {
      generateNewContent();
      if (!isTyping) {
        typeNextFromQueue();
      }
    } else if (newProgress < lastProgressRef.current) {
      if (newProgress === 0) {
        resetContent();
      } else {
        reduceContent();
      }
    }
    lastProgressRef.current = newProgress;
  }, [generateNewContent, reduceContent, resetContent, isTyping, typeNextFromQueue]);

  useEffect(() => {
    updateContent(progress);
  }, [progress, updateContent]);

  useEffect(() => {
    return () => {
      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }
    };
  }, []);

  return { displayedText, isTyping };
};

export default useTypingEffect;