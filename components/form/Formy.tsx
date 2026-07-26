import React, { useEffect, useRef, useState } from 'react';
import FormContent from './FormContent';
import CheckmarkAnimation from './CheckmarkAnimation';
import CheckpointCard from './CheckpointCard';
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
    isSubmitting,
    totalSteps,
    isAtCheckpoint,
    bonusQuestionCount,
    handleAnswerChange,
    handleNext,
    handleSkip,
    handlePrevious,
    handleFinishNow,
    handleAddMoreDetail,
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
    const fill = (text?: string) => text?.replace(/\[name\]/g, name);
    return questions.map(question => ({
      ...question,
      text: fill(question.text),
      hint: fill(question.hint),
      placeholder: fill(question.placeholder),
      prompts: question.prompts?.map(fill)
    }));
  };

  const currentQuestions = answers[0] ? replaceNameInQuestions(questions, answers[0] as string) : questions;

  return (
    <Card
      ref={formRef}
      className={`bg-card shadow-lg rounded-lg overflow-hidden relative
                  ${isMobile 
                    ? 'w-full max-w-md mx-auto' 
                    : 'max-w-2xl mx-auto sm:w-full sm:mx-0 sm:h-[750px] sm:flex sm:flex-col'}`}
    >
      <CardHeader className="bg-transparent py-4 px-4 sm:py-6 sm:px-6">
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-xl font-bold text-card-foreground sm:text-3xl">
            Best Man Speech Assistant
          </CardTitle>
          {isMobile && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HelpCircle size={20} className="text-primary" />
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
          <CardDescription className="text-sm text-muted-foreground mt-2 sm:text-lg">
            Complete these questions to create a memorable and entertaining best man speech.
          </CardDescription>
        )}
        <div className="w-full bg-accent h-1 mt-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-300 ease-in-out"
            style={{ width: `${isAtCheckpoint ? 100 : Math.min(100, (currentStep / (totalSteps - 1)) * 100)}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent 
        className={`p-4 ${isMobile 
          ? '' 
          : 'sm:p-6 sm:flex-grow sm:flex sm:flex-col sm:overflow-y-auto'}`}
      >
        {formStage === 'form' && isAtCheckpoint && (
          <CheckpointCard
            bonusQuestionCount={bonusQuestionCount}
            onFinishNow={handleFinishNow}
            onAddMoreDetail={handleAddMoreDetail}
            onPrevious={handlePrevious}
            isSubmitting={isSubmitting}
          />
        )}
        {formStage === 'form' && !isAtCheckpoint && (
          <FormContent
            currentStep={currentStep}
            totalSteps={totalSteps}
            question={currentQuestions[currentStep]}
            answer={answers[currentStep] || (currentQuestions[currentStep].type === 'checkbox' ? [] : '')}
            onAnswerChange={handleAnswerChange}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSkip={handleSkip}
            isFirstStep={currentStep === 0}
            // Only the true final question submits; the last core question
            // leads to the checkpoint, so it stays a "Next".
            isLastStep={currentStep === questions.length - 1}
            isSubmitting={isSubmitting}
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