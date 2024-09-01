import React from 'react';
import QuestionText from './QuestionText';
import AnswerInput from './AnswerInput';
import FormProgress from './FormProgress';
import { motion } from "framer-motion";
import NavigationButtons from './NavigationButtons';

interface Question {
  text: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox';
  options?: string[];
}

interface QuestionCardProps {
  question: Question;
  answer: string | string[];
  onChange: (answer: string | string[]) => void;
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  answer, 
  onChange, 
  currentStep, 
  totalSteps,
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep
}) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
//     <FormProgress currentStep={currentStep} totalSteps={totalSteps} />

  return (
    <motion.div
      className="md:bg-white md:shadow-lg md:rounded-xl md:px-8 md:py-6 md:mb-4 md:border md:border-indigo-100"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <QuestionText text={question.text} />
      <AnswerInput
        type={question.type}
        options={question.options}
        value={answer}
        onChange={onChange}
      />
      <NavigationButtons
        onPrevious={onPrevious}
        onNext={onNext}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </motion.div>
  );
};

export default QuestionCard;