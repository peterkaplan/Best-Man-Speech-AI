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
  isFirstStep: boolean;
  isLastStep: boolean;
}

const FormContent: React.FC<FormContentProps> = ({
  currentStep,
  totalSteps,
  question,
  answer,
  onAnswerChange,
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep
}) => {
  return (
    <>
      <FormProgress currentStep={currentStep + 1} totalSteps={totalSteps} />
      <QuestionCard
        question={question}
        answer={answer}
        onChange={onAnswerChange}
      />
      <NavigationButtons
        onPrevious={onPrevious}
        onNext={onNext}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </>
  );
};

export default FormContent;