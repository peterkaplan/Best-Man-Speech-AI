"use client";
import React, { useEffect, useRef, useState } from 'react';
import FormContent from './FormContent';
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
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative
                 sm:w-full sm:mx-0 sm:rounded-none sm:shadow-none sm:border-0
                 sm:min-h-screen sm:flex sm:flex-col"
      style={{ 
        minHeight: formDimensions.height > 0 ? `${formDimensions.height}px` : 'auto',
        background: 'linear-gradient(to bottom, #f0f4ff, #ffffff)'
      }}
    >
      <CardHeader className="bg-white p-6 rounded-t-lg flex items-center
                             sm:py-8 sm:px-4 sm:bg-transparent">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center
                              sm:text-3xl sm:mb-2">
          Best Man Speech Generator
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="ml-2" aria-label="Help">
                  <HelpCircle size={16} className="text-indigo-600" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Fill out the form to generate your best man speech. Watch it appear in real-time on the right!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription className="text-gray-600 mt-2 sm:text-lg sm:mb-4">
          Complete this form to create a memorable and entertaining best man speech for the groom.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 sm:p-4 sm:flex-grow sm:flex sm:flex-col sm:justify-center">
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