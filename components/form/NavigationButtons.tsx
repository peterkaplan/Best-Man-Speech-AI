import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Send } from 'lucide-react';
import { useScroll } from './ScrollContext';
import useKeyboardInset from './useKeyboardInset';

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
  const barRef = useRef<HTMLDivElement>(null);

  // While the keyboard is up these buttons sit below it, so typing an answer
  // meant dismissing the keyboard just to reach Next. Lift them into a bar
  // pinned to the top of the keyboard instead.
  const keyboardInset = useKeyboardInset();
  const isDocked = keyboardInset > 0;

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

  // The browser scrolls the caret clear of the keyboard, but it knows nothing
  // about the bar we just put on top of that — so if the bar covers the field,
  // nudge the page up by the overlap.
  useEffect(() => {
    if (!isDocked) return;

    const frame = requestAnimationFrame(() => {
      const bar = barRef.current;
      const field = document.querySelector<HTMLElement>('[data-answer-field]');
      const viewport = window.visualViewport;
      if (!bar || !field || !viewport) return;

      // getBoundingClientRect is relative to the layout viewport; offsetTop
      // converts it into what's actually on screen.
      const fieldBottom = field.getBoundingClientRect().bottom - viewport.offsetTop;
      const overlap = fieldBottom - (viewport.height - bar.offsetHeight) + 8;
      if (overlap > 0) {
        window.scrollBy({ top: overlap, behavior: 'smooth' });
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [isDocked]);

  // Skip gets its own line rather than sitting between Previous and Next:
  // three items in one row overflows a phone-width card and clips Next.
  // `live` marks the copy people actually press: when docked, the in-flow copy
  // stays behind as a hidden spacer so the card keeps its height, and the
  // portalled copy takes the interactions and the glow ref.
  const renderControls = (live: boolean) => (
    <div className="flex flex-col gap-2">
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
          ref={live ? nextButtonRef : undefined}
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

  return (
    <>
      {/* visibility:hidden also takes the duplicated buttons out of the tab
          order and off the accessibility tree, so only the docked copy is
          reachable. */}
      <div className={`mt-8 ${isDocked ? 'invisible' : ''}`} aria-hidden={isDocked || undefined}>
        {renderControls(!isDocked)}
      </div>
      {isDocked &&
        createPortal(
          // Portalled to the body because the form card clips its overflow and
          // animates a transform, either of which would trap a fixed child.
          <div
            ref={barRef}
            style={{ bottom: keyboardInset }}
            className="fixed left-0 right-0 z-50 border-t border-border bg-background/95 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.12)] backdrop-blur supports-[backdrop-filter]:bg-background/85"
          >
            <div className="mx-auto w-full max-w-md">{renderControls(true)}</div>
          </div>,
          document.body
        )}
    </>
  );
};

export default NavigationButtons;
