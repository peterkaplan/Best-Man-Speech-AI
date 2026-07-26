import React, { useRef } from 'react';
import QuestionText from './QuestionText';
import QuestionPrompts from './QuestionPrompts';
import AnswerInput from './AnswerInput';
import FormProgress from './FormProgress';
import { motion } from "framer-motion";
import NavigationButtons from './NavigationButtons';
import { Question } from '@/app/form/questions';

interface QuestionCardProps {
  question: Question;
  answer: string | string[];
  onChange: (answer: string | string[]) => void;
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSkip: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  onChange,
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSkip,
  isFirstStep,
  isLastStep,
  isSubmitting
}) => {
  const answerRef = useRef<HTMLTextAreaElement>(null);

  // Drops the prompt in as a lead-in and leaves the caret after it. Appends
  // rather than replaces so someone can stack a couple of memories.
  const handlePromptSelect = (prompt: string) => {
    const current = typeof answer === 'string' ? answer.trimEnd() : '';
    onChange(current ? `${current}\n\n${prompt}: ` : `${prompt}: `);

    requestAnimationFrame(() => {
      const field = answerRef.current;
      if (!field) return;
      field.focus();
      field.setSelectionRange(field.value.length, field.value.length);
      field.scrollTop = field.scrollHeight;
    });
  };

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
      className="md:bg-card md:shadow-lg md:rounded-xl md:px-8 md:py-6 md:mb-4 md:border md:border-accent"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <QuestionText text={question.text} hint={question.hint} />
      <AnswerInput
          type={question.type}
          options={question.options}
          value={answer}
          onChange={onChange}
          label={question.text}
          required={question.required}
          allowCustom={question.allowCustom}
          placeholder={question.placeholder}
          textareaRef={answerRef}
        />
      {question.prompts && (
        <QuestionPrompts prompts={question.prompts} onSelect={handlePromptSelect} />
      )}
      <NavigationButtons
        onPrevious={onPrevious}
        onNext={onNext}
        onSkip={onSkip}
        canSkip={!!question.skippable}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        isSubmitting={isSubmitting}
      />
    </motion.div>
  );
};

export default QuestionCard;