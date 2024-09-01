import React, { useEffect, useRef, useState } from 'react';
import FormContent from './FormContent';
import CheckmarkAnimation from './CheckmarkAnimation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HelpCircle, ChevronRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface FormyProps {
  formState: ReturnType<typeof import('@/app/form/useFormState').default>;
}

const Formy: React.FC<FormyProps> = ({ formState }) => {
  const [isMobile, setIsMobile] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const {
    currentStep,
    answers,
    formStage,
    handleAnswerChange,
    handleNext,
    handlePrevious,
    questions,
    handleAnimationComplete
  } = formState;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // Adjust breakpoint as needed
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
      className={`bg-white shadow-lg rounded-lg overflow-hidden relative
                  ${isMobile 
                    ? 'w-full max-w-md mx-auto' 
                    : 'max-w-2xl mx-auto sm:w-full sm:mx-0 sm:h-[750px] sm:flex sm:flex-col'}`}
      style={{ 
        background: 'linear-gradient(to bottom, #f0f4ff, #ffffff)'
      }}
    >
      <CardHeader className="bg-transparent py-4 px-4 sm:py-6 sm:px-6">
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-xl font-bold text-gray-800 sm:text-3xl">
            Best Man Speech Assistant
          </CardTitle>
          {isMobile && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HelpCircle size={20} className="text-indigo-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Complete these questions to create a memorable and entertaining best man speech.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {!isMobile && (
          <CardDescription className="text-sm text-gray-600 mt-2 sm:text-lg">
            Complete these questions to create a memorable and entertaining best man speech.
          </CardDescription>
        )}
        <div className="w-full bg-indigo-200 h-1 mt-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / (currentQuestions.length - 1)) * 100}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent 
        className={`p-4 ${isMobile 
          ? '' 
          : 'sm:p-6 sm:flex-grow sm:flex sm:flex-col sm:overflow-y-auto'}`}
      >
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
        {formStage === 'animation' && (
          <CheckmarkAnimation onComplete={handleAnimationComplete} />
        )}
      </CardContent>
    </Card>
  );
};

export default Formy;