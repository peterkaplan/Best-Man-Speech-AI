import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onPrevious, onNext, isFirstStep, isLastStep }) => {
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const nextButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
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
  }, [onNext]);

  return (
    <div className="flex justify-between mt-8">
      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <Button
          onClick={onPrevious}
          disabled={isFirstStep}
          variant="outline"
          className="flex items-center space-x-2 bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
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
          onClick={onNext}
          className="flex items-center space-x-2 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300"
        >
          {isLastStep ? (
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
  );
};

export default NavigationButtons;
