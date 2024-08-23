import React from 'react';
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

const FormProgress: React.FC<FormProgressProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <motion.div 
      className="flex items-center space-x-2 mb-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Progress value={progress} className="flex-grow h-2" />
      <span className="text-sm font-medium text-gray-600">
        {currentStep}/{totalSteps}
      </span>
    </motion.div>
  );
};

export default FormProgress;