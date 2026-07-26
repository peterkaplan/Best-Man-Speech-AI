import React from 'react';
import FormProgress from './FormProgress';
import QuestionCard from './QuestionCard';
import NavigationButtons from './NavigationButtons';
import { Question } from '@/app/form/questions';

interface FormContentProps {
  currentStep: number;
  totalSteps: number;
  question: Question;
  answer: string | string[];
  onAnswerChange: (answer: string | string[]) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSkip: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
}

const FormContent: React.FC<FormContentProps> = ({
  currentStep,
  totalSteps,
  question,
  answer,
  onAnswerChange,
  onPrevious,
  onNext,
  onSkip,
  isFirstStep,
  isLastStep,
  isSubmitting
}) => {
  return (
    <>
      <QuestionCard
        question={question}
        answer={answer}
        onChange={onAnswerChange}
        currentStep={currentStep + 1}
        totalSteps={totalSteps}
        onPrevious={onPrevious}
        onNext={onNext}
        onSkip={onSkip}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default FormContent;