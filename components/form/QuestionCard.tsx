import React from 'react';
import QuestionText from './QuestionText';
import AnswerInput from './AnswerInput';
import FormProgress from './FormProgress';
import { motion } from "framer-motion";

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
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, answer, onChange, currentStep, totalSteps }) => {
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

  return (
    <motion.div
      className="bg-white shadow-lg rounded-xl px-8 py-6 mb-4 border border-indigo-100"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <FormProgress currentStep={currentStep} totalSteps={totalSteps} />
      <QuestionText text={question.text} />
      <AnswerInput
        type={question.type}
        options={question.options}
        value={answer}
        onChange={onChange}
      />
    </motion.div>
  );
};

export default QuestionCard;