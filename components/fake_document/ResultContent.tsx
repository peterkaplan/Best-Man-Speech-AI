import React, { useState, useRef, useEffect } from 'react';
import { TypedText } from '@/app/form/useTypingEffect';
import { motion } from 'framer-motion';
import { UnlockCard } from './UnlockCard';
import { Button } from "@/components/ui/button";
import { Download, Copy, CheckCircle } from 'lucide-react';
import { usePdfGenerator } from './PdfGenerator';

interface ResultContentProps {
  displayedText: TypedText | null;
}

export const ResultContent: React.FC<ResultContentProps> = ({ displayedText }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const fullContent = displayedText?.content || '';
  const { generatePdf, PdfContent } = usePdfGenerator(fullContent);

  useEffect(() => {
    console.log('ResultContent rendered with displayedText:', displayedText);
  }, [displayedText]);

  if (!displayedText) return null;

  const words = fullContent.split(' ');
  const visibleWordCount = isUnlocked ? words.length : 35;

  const handleUnlock = (option: string) => {
    setIsUnlocked(true);
    setSelectedOption(option);
    console.log('Content unlocked');
  };

  const handleCopy = () => {
    if (isUnlocked && contentRef.current) {
      navigator.clipboard.writeText(contentRef.current.innerText)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
          console.log('Content copied to clipboard');
        })
        .catch(err => console.error('Failed to copy text: ', err));
    }
  };

  const handleDownloadPDF = () => {
    if (isUnlocked) {
      console.log('Initiating PDF download');
      generatePdf();
    }
  };

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
        Best Man Speech
      </motion.h1>
      
      {isUnlocked && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full mb-6"
        >
          <p className="text-green-600 font-semibold mb-4 text-center">
            {selectedOption === 'single' ? 'You\'ve unlocked this speech!' : 'You\'ve unlocked 3 unique versions of this speech!'}
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={handleCopy} className="flex items-center">
              {isCopied ? <CheckCircle className="mr-2" size={16} /> : <Copy className="mr-2" size={16} />}
              {isCopied ? 'Copied!' : 'Copy Text'}
            </Button>
            <Button onClick={handleDownloadPDF} className="flex items-center">
              <Download className="mr-2" size={16} />
              Download PDF
            </Button>
          </div>
        </motion.div>
      )}
      
      <div className="relative w-full mb-8 md:mb-8 mobile:mb-0">
        <p ref={contentRef} className={`whitespace-pre-wrap break-words text-gray-700 text-justify ${isUnlocked ? 'select-text' : 'select-none pointer-events-none'}`}>
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
      </div>
      
      {!isUnlocked && (
        <>
          <div className="fixed inset-x-0 bottom-0 flex items-center justify-center z-50 md:hidden mx-4">
            <div className="bg-white rounded-t-lg shadow-lg p-6 w-full h-full">
              <UnlockCard onUnlock={handleUnlock} />
            </div>
          </div>
          <div className="absolute bottom-[6.5rem] left-0 right-0 hidden md:flex justify-center mx-4">
            <UnlockCard onUnlock={handleUnlock} />
          </div>
        </>
      )}

      <PdfContent />
    </motion.div>
  );
};