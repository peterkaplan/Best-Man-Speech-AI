"use client";
import React from 'react';
import FormContent from './FormContent';
import Results from './Results';

interface FormyProps {
  formState: ReturnType<typeof import('@/app/form/useFormState').default>;
}

const Formy: React.FC<FormyProps> = ({ formState }) => {
  const {
    currentStep,
    answers,
    formStage,
    apiResponse,
    handleAnswerChange,
    handleNext,
    handlePrevious,
    handleSubmit,
    handleRegenerate,
    questions,
  } = formState;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md relative">
      {formStage === 'form' && (
        <FormContent
          currentStep={currentStep}
          totalSteps={questions.length}
          question={questions[currentStep]}
          answer={answers[currentStep] || (questions[currentStep].type === 'checkbox' ? [] : '')}
          onAnswerChange={handleAnswerChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isFirstStep={currentStep === 0}
          isLastStep={currentStep === questions.length - 1}
        />
      )}
      {formStage === 'results' && (
        <Results 
          speech={apiResponse || ''}
          onRegenerate={handleRegenerate}
        />
      )}
    </div>
  );
};

export default Formy;