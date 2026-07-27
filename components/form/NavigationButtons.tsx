import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Send } from 'lucide-react';
import { useScroll } from './ScrollContext';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  onSkip: () => void;
  canSkip: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onPrevious, onNext, onSkip, canSkip, isFirstStep, isLastStep, isSubmitting }) => {
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };
  const { scrollToForm } = useScroll();

  const nextButtonRef = useRef<HTMLDivElement>(null);

  const combinedClick = () => {
    scrollToForm();
    onNext();
  }

  const skipClick = () => {
    scrollToForm();
    onSkip();
  }

  // Tapping a button normally blurs the answer field, which on mobile
  // collapses the keyboard between every question. Suppressing the default
  // mousedown focus behaviour means focus never leaves the input, so the
  // keyboard stays up. Click still fires, and Tab focus is unaffected.
  const keepFocusInField = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (isSubmitting) return;

        // Enter belongs to the element that has focus when that element does
        // something with it: a newline in a textarea, a press on a button (the
        // prompt chips). Only treat it as "next" otherwise.
        const target = event.target as HTMLElement | null;
        if (
          target &&
          (target.tagName === 'TEXTAREA' ||
            target.tagName === 'BUTTON' ||
            target.isContentEditable)
        ) {
          return;
        }

        onNext();
        if (nextButtonRef.current) {
          nextButtonRef.current.classList.add('glow');
          setTimeout(() => {
            nextButtonRef.current?.classList.remove('glow');
          }, 1000); // Glow effect lasts for 1 second
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onNext, isSubmitting]);

  return (
    // Skip gets its own line rather than sitting between Previous and Next:
    // three items in one row overflows a phone-width card and clips Next.
    <div className="flex flex-col gap-2 mt-8">
      {canSkip && (
        <div className="flex justify-center">
          <Button
            onClick={skipClick}
            onMouseDown={keepFocusInField}
            disabled={isSubmitting}
            variant="ghost"
            className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-dotted"
          >
            Can&apos;t think of one? Skip
          </Button>
        </div>
      )}
      <div className="flex justify-between">
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            onClick={onPrevious}
            onMouseDown={keepFocusInField}
            disabled={isFirstStep}
            variant="outline"
            className="flex items-center space-x-2 bg-background text-primary border-primary hover:bg-muted transition-colors duration-300"
          >
            <ArrowLeft size={16} />
            <span>Previous</span>
          </Button>
        </motion.div>
        <motion.div
          ref={nextButtonRef}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="glow-container"
        >
          <Button
            onClick={combinedClick}
            onMouseDown={keepFocusInField}
            disabled={isSubmitting}
            className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
          >
            {isSubmitting ? (
              <>
                <span>Writing...</span>
                <Loader2 size={16} className="animate-spin" />
              </>
            ) : isLastStep ? (
              <>
                <span>Submit</span>
                <Send size={16} />
              </>
            ) : (
              <>
                <span>Next</span>
                <ArrowRight size={16} />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NavigationButtons;
