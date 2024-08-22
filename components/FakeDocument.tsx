import React, { memo, useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FakeDocumentProps {
  progress: number;
  isLoading?: boolean;
}

const FakeDocument: React.FC<FakeDocumentProps> = memo(({ progress, isLoading = false }) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const fullTextRef = useRef('');
  const isTypingRef = useRef(false);
  const lastProgressRef = useRef(0);
  const sectionsRef = useRef<number[]>([0]);

  const generateWord = useCallback(() => {
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    const length = Math.floor(Math.random() * 8) + 3; // 3 to 10 characters
    let word = '';
    for (let i = 0; i < length; i++) {
      if (i % 2 === 0) {
        word += consonants[Math.floor(Math.random() * consonants.length)];
      } else {
        word += vowels[Math.floor(Math.random() * vowels.length)];
      }
    }
    return word;
  }, []);

  const generateSentence = useCallback(() => {
    const words = Math.floor(Math.random() * 10) + 5; // 5 to 14 words
    return Array(words).fill(null).map(() => generateWord()).join(' ') + '. ';
  }, [generateWord]);

  const generateParagraph = useCallback(() => {
    const sentences = Math.floor(Math.random() * 3) + 2; // 2 to 4 sentences
    return Array(sentences).fill(null).map(generateSentence).join('');
  }, [generateSentence]);

  const generateText = useCallback(() => {
    const paragraphs = Math.floor(Math.random() * 2) + 1; // 1 to 2 paragraphs
    return Array(paragraphs).fill(null).map(generateParagraph).join('\n\n');
  }, [generateParagraph]);

  const addText = useCallback((text: string) => {
    setDisplayedText(prev => prev + text);
  }, []);

  useEffect(() => {
    if (progress > lastProgressRef.current) {
      const newText = generateText();
      fullTextRef.current += newText;
      sectionsRef.current.push(fullTextRef.current.length);
      isTypingRef.current = true;
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < newText.length) {
          addText(newText.slice(index, index + 5));
          index += 5;
        } else {
          clearInterval(typeInterval);
          isTypingRef.current = false;
        }
      }, 20);
    } else if (progress < lastProgressRef.current) {
      const lastSectionStart = sectionsRef.current[sectionsRef.current.length - 2] || 0;
      fullTextRef.current = fullTextRef.current.substring(0, lastSectionStart);
      sectionsRef.current.pop();
      setDisplayedText(fullTextRef.current);
    }
    lastProgressRef.current = progress;
  }, [progress, generateText, addText]);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-center mb-6">
          <FileText className="w-8 h-8 mr-3 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-700 text-center" style={{ filter: 'blur(4px)' }}>Best Man Speech</h2>
        </div>
        <div
          className="font-serif text-lg leading-relaxed bg-gray-50 p-6 rounded-lg shadow-inner min-h-[300px] max-h-[500px] overflow-y-auto"
          style={{ filter: 'blur(3px)', width: '100%' }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-t-2 border-blue-500 rounded-full"
              />
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                key={displayedText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="whitespace-pre-wrap"
              >
                {displayedText}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-3 h-3 bg-green-500 rounded-full"
          />
        </div>
      </CardContent>
    </Card>
  );
});

FakeDocument.displayName = 'FakeDocument';

export default FakeDocument;