"use client";
import React, { useRef, useEffect, useState } from 'react';
import CheckmarkAnimation from './CheckmarkAnimation';
import FormContent from './FormContent';
import Results from './Results';
import { questions } from '@/app/form/questions';
import { useFormState } from '@/app/form/useFormState';

const Formy: React.FC = () => {
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
    handleRegenerate,
    handleAnimationComplete,
  } = useFormState();

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
      {formStage === 'animation' && (
        <CheckmarkAnimation 
          width={formDimensions.width} 
          height={formDimensions.height}
          onComplete={handleAnimationComplete}
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