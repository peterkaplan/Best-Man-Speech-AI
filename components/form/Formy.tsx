"use client";
import React, { useEffect, useRef, useState } from 'react';
import FormContent from './FormContent';
import Results from './Results';
import CheckmarkAnimation from './CheckmarkAnimation';

interface FormyProps {
  formState: ReturnType<typeof import('@/app/form/useFormState').default>;
}

const Formy: React.FC<FormyProps> = ({ formState }) => {

  const [formDimensions, setFormDimensions] = useState({ width: 0, height: 0 });
  const formRef = useRef<HTMLDivElement>(null);

  const {
    currentStep,
    answers,
    formStage,
    apiResponse,
    handleAnswerChange,
    handleNext,
    handlePrevious,
    questions,
    handleAnimationComplete
  } = formState;

  useEffect(() => {
    if (formRef.current) {
      setFormDimensions({
        width: formRef.current.offsetWidth,
        height: formRef.current.offsetHeight
      });
    }
  }, []);

  return (
    <div
      ref={formRef}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md relative"
      style={{ minHeight: formDimensions.height > 0 ? `${formDimensions.height}px` : 'auto' }}
    >
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
        />
      )}
      {formStage === 'animation' && (
        <CheckmarkAnimation
          width={formDimensions.width}
          height={formDimensions.height}
          onComplete={handleAnimationComplete}
        />
      )}
    </div>
  );
};

export default Formy;