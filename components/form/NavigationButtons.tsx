import React from 'react';
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
      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
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