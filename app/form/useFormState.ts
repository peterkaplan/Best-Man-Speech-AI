import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useFormValidation } from '@/app/form/useFormValidation';
import { useFormSubmission } from '@/app/form/useFormSubmission';
import { questions } from '@/app/form/questions';

export type FormStage = 'form' | 'animation' | 'results';

export const useFormState = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [formStage, setFormStage] = useState<FormStage>('form');
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const { toast } = useToast();
  const { isAnswerValid, areAllQuestionsAnswered } = useFormValidation(questions, answers);
  const { isSubmitting, apiResponse, submitForm } = useFormSubmission();

  useEffect(() => {
    if (isSubmitting) {
      setFormStage('animation');
    } else if (apiResponse && isAnimationComplete) {
      setFormStage('results');
    } else if (!isSubmitting && !apiResponse) {
      setFormStage('form');
    }
  }, [isSubmitting, apiResponse, isAnimationComplete]);

  const handleAnswerChange = (answer: string | string[]) => {
    setAnswers({ ...answers, [currentStep]: answer });
  };

  const handleNext = () => {
    if (!isAnswerValid(currentStep)) {
      toast({
        title: "Please answer the question",
        description: "This question is required before you can proceed.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (areAllQuestionsAnswered()) {
      submitForm(answers);
    } else {
      toast({
        title: "Form Incomplete",
        description: "Please answer all required questions before submitting.",
        variant: "destructive",
      });
    }
  };

  const handleRegenerate = () => {
    setFormStage('animation');
    setIsAnimationComplete(false);
    submitForm(answers);
  };

  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
    if (apiResponse) {
      setFormStage('results');
    }
  };

  return {
    currentStep,
    answers,
    formStage,
    isSubmitting,
    apiResponse,
    handleAnswerChange,
    handleNext,
    handlePrevious,
    handleRegenerate,
    handleAnimationComplete,
  };
};