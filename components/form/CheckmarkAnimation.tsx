import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface CheckmarkAnimationProps {
  width: number;
  height: number;
  steps?: string[];
  stepDuration?: number;
  primaryColor?: string;
  secondaryColor?: string;
  onComplete?: () => void;
}

const CheckmarkAnimation: React.FC<CheckmarkAnimationProps> = ({
  width,
  height,
  steps = [
    'Analyzing speech content...',
    'Generating witty anecdotes...',
    'Polishing opening lines...',
    'Crafting emotional moments...',
    'Finalizing your speech...'
  ],
  stepDuration = 1000,
  primaryColor = '#3498db',
  secondaryColor = '#4CAF50',
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (currentStep < steps.length) {
        setCurrentStep(prev => prev + 1);
        setProgress((currentStep + 1) / steps.length * 100);
      } else {
        clearInterval(progressInterval);
        setShowCheckmark(true);
        setTimeout(() => {
          onComplete && onComplete();
        }, 1000); // Wait for 1 second after showing the checkmark
      }
    }, stepDuration);

    return () => clearInterval(progressInterval);
  }, [currentStep, steps.length, stepDuration, onComplete]);

  return (
    <motion.div 
      className="relative flex flex-col items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden"
      style={{ width: `${width}px`, height: `${height}px` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="absolute top-0 left-0 h-1 bg-gray-200"
        style={{ width: '100%' }}
      >
        <motion.div 
          className="h-full"
          style={{ backgroundColor: primaryColor }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </motion.div>
      
      <AnimatePresence mode="wait">
        {!showCheckmark ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <Loader2 className="w-12 h-12 mb-4 animate-spin" color={primaryColor} />
            <motion.p 
              className="text-lg text-gray-600 text-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {steps[Math.min(currentStep, steps.length - 1)]}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center"
          >
            <CheckCircle2 className="w-16 h-16 mb-4" color={secondaryColor} />
            <p className="text-lg text-gray-600 mt-4">Speech ready!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CheckmarkAnimation;