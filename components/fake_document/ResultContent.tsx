import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
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

// Words shown sharp before the teaser starts fading out.
const PREVIEW_WORDS = 35;
// How far past the fade point we keep rendering. The gradient does most of the
// "there is more speech here" work, so this only needs enough blurred text to
// look like a cut-off page. Kept short because every line here pushes the
// unlock button closer to the bottom of a phone screen.
const TEASER_WORDS = 15;

export const ResultContent: React.FC<ResultContentProps> = ({ results }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const speech = results?.result1 || '';
  const { generatePdf, PdfContent } = usePdfGenerator(speech);

  // The speech replaces a form the user was looking at further down the page,
  // so bring the top of it into view rather than leaving them mid-document.
  useEffect(() => {
    // Anchor on the document card, not the text inside it, so the card's own
    // chrome doesn't end up tucked behind the site's fixed header.
    const el = rootRef.current?.closest('[data-speech-document]') ?? rootRef.current;
    if (!el) return;
    // Just clears the 57px fixed header. Anything more is screen height spent on
    // empty space, which pushes the unlock button off the bottom of a phone.
    const headerOffset = 64;
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' });
  }, []);

  if (!results) return null;

  const teaserWords = speech.split(' ').slice(0, PREVIEW_WORDS + TEASER_WORDS);

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
    <div ref={rootRef} className="font-sans text-base leading-relaxed">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center w-full max-w-2xl mx-auto"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="font-display text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-foreground"
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
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          // While locked, the teaser is capped in viewport units rather than by
          // word count alone. A fixed number of words is a different number of
          // pixels on every phone, and on a short screen it pushed the unlock
          // button below the fold. This keeps the button in roughly the same
          // place regardless of device height; the word cap below is now just a
          // guard so we don't hand the DOM a whole speech to clip.
          className={`w-full relative ${isUnlocked ? '' : 'max-h-[26vh] sm:max-h-none overflow-hidden'}`}
        >
          <p
            ref={contentRef}
            className={`whitespace-pre-wrap break-words text-foreground text-left sm:text-justify ${isUnlocked ? 'select-text' : 'select-none'}`}
          >
            {/* Once unlocked there is nothing to blur, so skip the per-word
                spans entirely - a long speech is well over a thousand of them,
                which is a lot of DOM to hand a phone for no visual gain. */}
            {isUnlocked
              ? speech
              : teaserWords.map((word, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && ' '}
                    <span
                      style={{
                        filter: index >= PREVIEW_WORDS ? `blur(${Math.min((index - PREVIEW_WORDS) * 0.2 + 1, 5)}px)` : 'none',
                        opacity: index >= PREVIEW_WORDS ? Math.max(1 - (index - PREVIEW_WORDS) * 0.02, 0.5) : 1,
                      }}
                    >
                      {word}
                    </span>
                  </React.Fragment>
                ))}
          </p>
          {!isUnlocked && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-card" />
          )}
        </motion.div>

        {!isUnlocked && (
          <div className="w-full flex justify-center mt-4 sm:mt-6">
            <UnlockCard onUnlock={handleUnlock} />
          </div>
        )}

        <PdfContent />
      </motion.div>
    </div>
  );
};
