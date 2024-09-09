import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UnlockCard } from './UnlockCard';
import { Button } from "@/components/ui/button";
import { Download, Copy, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePdfGenerator } from './PdfGenerator';

interface ResultContentProps {
  results: {
    message: string;
    result1: string;
    result2: string;
    result3: string;
  } | null;
}

export const ResultContent: React.FC<ResultContentProps> = ({ results }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [currentSpeechIndex, setCurrentSpeechIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const speeches = results ? [results.result1, results.result2, results.result3] : [];
  const currentSpeech = speeches[currentSpeechIndex] || '';
  const { generatePdf, PdfContent } = usePdfGenerator(speeches);

  if (!results) return null;

  const words = currentSpeech.split(' ');
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

  const handlePrevSpeech = () => {
    setCurrentSpeechIndex((prevIndex) => (prevIndex - 1 + speeches.length) % speeches.length);
  };

  const handleNextSpeech = () => {
    setCurrentSpeechIndex((prevIndex) => (prevIndex + 1) % speeches.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="font-sans text-base leading-relaxed h-full relative flex flex-col items-center max-w-2xl mx-auto p-4 sm:p-8 pb-24"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800"
      >
        Best Man Speech
      </motion.h1>
      
      {isUnlocked && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full mb-4 sm:mb-6"
        >
          <p className="text-green-600 font-semibold mb-2 sm:mb-4 text-center text-sm sm:text-base">
            {selectedOption === 'single' ? 'You\'ve unlocked this speech! And two BONUS speeches.' : 'You\'ve unlocked 3 unique versions of this speech!'}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
            <Button onClick={handleCopy} className="flex items-center text-xs sm:text-sm">
              {isCopied ? <CheckCircle className="mr-1 sm:mr-2" size={14} /> : <Copy className="mr-1 sm:mr-2" size={14} />}
              {isCopied ? 'Copied!' : 'Copy Text'}
            </Button>
            <Button onClick={handleDownloadPDF} className="flex items-center text-xs sm:text-sm">
              <Download className="mr-1 sm:mr-2" size={14} />
              Download PDF
            </Button>
            <div className="flex items-center mt-2 sm:mt-0">
              <Button onClick={handlePrevSpeech} variant="outline" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                <ChevronLeft size={16} />
              </Button>
              <span className="text-gray-600 font-medium text-xs sm:text-sm mx-2">
                Speech {currentSpeechIndex + 1} of {speeches.length}
              </span>
              <Button onClick={handleNextSpeech} variant="outline" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="relative w-full mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSpeechIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p ref={contentRef} className={`whitespace-pre-wrap break-words text-gray-700 text-justify text-sm sm:text-base ${isUnlocked ? 'select-text' : 'select-none pointer-events-none'}`}>
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
          </motion.div>
        </AnimatePresence>
      </div>
      
      {!isUnlocked && (
        <div className="fixed inset-x-0 bottom-0 flex items-center justify-center z-50 mx-4">
          <div className="bg-white rounded-t-lg shadow-lg p-4 sm:p-6 w-full">
            <UnlockCard onUnlock={handleUnlock} />
          </div>
        </div>
      )}

      <PdfContent />
    </motion.div>
  );
};