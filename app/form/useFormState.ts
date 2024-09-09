import { useState, useCallback, useEffect } from 'react';
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
  const [documentProgress, setDocumentProgress] = useState(0);
  
  useEffect(() => {
    if (isSubmitting) {
      setFormStage('animation');
    } else if (apiResponse && isAnimationComplete) {
      setFormStage('results');
    } else if (!isSubmitting && !apiResponse) {
      setFormStage('form');
    }
  }, [isSubmitting, apiResponse, isAnimationComplete]);

  const handleAnswerChange = useCallback((answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [currentStep]: answer }));
  }, [currentStep]);

  const handleNext = useCallback(() => {
    if (!isAnswerValid(currentStep)) {
      toast({
        title: "Please answer the question",
        description: "This question is required before you can proceed.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
      setDocumentProgress(prev => prev + 1);
    } else {
      handleSubmit();
    }
  }, [currentStep, isAnswerValid, questions.length, toast]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setDocumentProgress(prev => prev - 1);
    }
  }, [currentStep]);

  const handleSubmit = useCallback(() => {
    if (areAllQuestionsAnswered()) {
      submitForm(answers);
      setDocumentProgress(prev => prev + 1);
    } else {
      toast({
        title: "Form Incomplete",
        description: "Please answer all required questions before submitting.",
        variant: "destructive",
      });
    }
  }, [areAllQuestionsAnswered, answers, submitForm, toast]);

  const handleAnimationComplete = useCallback(() => {
    setIsAnimationComplete(true);
    if (apiResponse) {
      setFormStage('results');
    }
  }, [apiResponse]);

  const getResults = useCallback(() => {
    if (apiResponse) {
      return {
        message: apiResponse.message || '',
        result1: apiResponse.result1 || '',
        result2: apiResponse.result2 || '',
        result3: apiResponse.result3 || ''
      };
    }
    return null;
  }, [apiResponse]);

  return {
    currentStep,
    setCurrentStep,
    answers,
    setAnswers,
    formStage,
    setFormStage,
    isAnimationComplete,
    setIsAnimationComplete,
    documentProgress,
    apiResponse,
    handleAnswerChange,
    handleNext,
    handlePrevious,
    handleSubmit,
    handleAnimationComplete,
    getResults,
    questions,
  };
};

export default useFormState;