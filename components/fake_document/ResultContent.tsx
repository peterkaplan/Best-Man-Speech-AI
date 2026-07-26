import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UnlockCard from './UnlockCard';
import { Button } from "@/components/ui/button";
import { Download, Copy, CheckCircle } from 'lucide-react';
import { usePdfGenerator } from './PdfGenerator';
import posthog from 'posthog-js';

interface ResultContentProps {
  results: {
    message: string;
    result1: string;
  } | null;
}

export const ResultContent: React.FC<ResultContentProps> = ({ results }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const speech = results?.result1 || '';
  const { generatePdf, PdfContent } = usePdfGenerator(speech);

  if (!results) return null;

  const words = speech.split(' ');
  const visibleWordCount = isUnlocked ? words.length : 35;

  const handleUnlock = () => {
    posthog.capture('speech_unlocked');
    setIsUnlocked(true);
  };

  const handleCopy = () => {
    if (isUnlocked) {
      navigator.clipboard.writeText(speech)
        .then(() => {
          posthog.capture('speech_copied');
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch(err => {
          posthog.captureException(err);
          console.error('Failed to copy text: ', err);
        });
    }
  };
  const handleDownloadPDF = () => {
    if (isUnlocked) {
      posthog.capture('speech_pdf_downloaded');
      generatePdf();
    }
  };

  return (
    <div className="font-sans text-base leading-relaxed min-h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow flex flex-col items-center max-w-2xl mx-auto p-8 pb-24 overflow-y-auto"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold mb-6 text-center text-foreground"
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
            <p className="text-primary font-semibold mb-4 text-center">
              You&apos;ve unlocked your full speech!
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button onClick={handleCopy} className="flex items-center w-full sm:w-auto">
                {isCopied ? <CheckCircle className="mr-2" size={16} /> : <Copy className="mr-2" size={16} />}
                {isCopied ? 'Copied!' : 'Copy Text'}
              </Button>
              <Button onClick={handleDownloadPDF} className="flex items-center w-full sm:w-auto">
                <Download className="mr-2" size={16} />
                Download PDF
              </Button>
            </div>
          </motion.div>
        )}

        <div className="w-full mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p ref={contentRef} className={`whitespace-pre-wrap break-words text-foreground text-justify ${isUnlocked ? 'select-text' : 'select-none pointer-events-none'}`}>
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

        <PdfContent />
      </motion.div>

      {!isUnlocked && (
        <>
          <div className="fixed inset-x-0 bottom-0 flex items-center justify-center z-50 md:hidden mx-4">
            <div className="bg-background rounded-t-lg shadow-lg p-6 w-full">
              <UnlockCard onUnlock={handleUnlock} />
            </div>
          </div>
          <div className="absolute bottom-[6.5rem] left-0 right-0 hidden md:flex justify-center mx-4">
            <UnlockCard onUnlock={handleUnlock} />
          </div>
        </>
      )}
    </div>
  );
};
