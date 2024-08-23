"use client";
import React, { useEffect, useRef, useState } from 'react';
import FormContent from './FormContent';
import Results from './Results';
import CheckmarkAnimation from './CheckmarkAnimation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

  const replaceNameInQuestions = (questions: any[], name: string) => {
    return questions.map(question => ({
      ...question,
      text: question.text.replace(/\[name\]/g, name)
    }));
  };

  const currentQuestions = answers[0] ? replaceNameInQuestions(questions, answers[0] as string) : questions;

  return (
    <Card
      ref={formRef}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative"
      style={{ minHeight: formDimensions.height > 0 ? `${formDimensions.height}px` : 'auto' }}
    >
      <CardHeader className="bg-white p-6 rounded-t-lg flex items-center">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
          Eulogy Generator
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="ml-2" aria-label="Help">
                  <HelpCircle size={16} className="text-indigo-600" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Fill out the form to generate your eulogy. Watch it appear in real-time on the right!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription className="text-gray-600 mt-2">Complete this form to create a heartfelt eulogy in honor of your loved one.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {formStage === 'form' && (
          <FormContent
            currentStep={currentStep}
            totalSteps={currentQuestions.length}
            question={currentQuestions[currentStep]}
            answer={answers[currentStep] || (currentQuestions[currentStep].type === 'checkbox' ? [] : '')}
            onAnswerChange={handleAnswerChange}
            onPrevious={handlePrevious}
            onNext={handleNext}
            isFirstStep={currentStep === 0}
            isLastStep={currentStep === currentQuestions.length - 1}
          />
        )}
        {formStage === 'results'}
        {formStage === 'animation' && (
          <CheckmarkAnimation
            onComplete={handleAnimationComplete}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default Formy;