import { useState, useCallback, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useFormValidation } from '@/app/form/useFormValidation';
import { useFormSubmission } from '@/app/form/useFormSubmission';
import { CORE_QUESTION_COUNT, questions } from '@/app/form/questions';

export type FormStage = 'form' | 'animation' | 'results';

export const useFormState = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [formStage, setFormStage] = useState<FormStage>('form');
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  // Set once the user opts into the bonus questions at the checkpoint.
  const [wantsBonusQuestions, setWantsBonusQuestions] = useState(false);
  const [isAtCheckpoint, setIsAtCheckpoint] = useState(false);
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

  // How many questions are in play right now: the core set, or everything once
  // the user has opted into the bonus round.
  const totalSteps = wantsBonusQuestions ? questions.length : CORE_QUESTION_COUNT;

  const advance = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      setDocumentProgress(prev => prev + 1);
    } else if (!wantsBonusQuestions) {
      // End of the core questions - offer to finish now or go deeper.
      setIsAtCheckpoint(true);
      setDocumentProgress(prev => prev + 1);
    } else {
      handleSubmit();
    }
  }, [currentStep, handleSubmit, totalSteps, wantsBonusQuestions]);

  const handleFinishNow = useCallback(() => {
    setIsAtCheckpoint(false);
    handleSubmit();
  }, [handleSubmit]);

  const handleAddMoreDetail = useCallback(() => {
    setWantsBonusQuestions(true);
    setIsAtCheckpoint(false);
    setCurrentStep(CORE_QUESTION_COUNT);
    setDocumentProgress(prev => prev + 1);
  }, []);

  const handleNext = useCallback(() => {
    if (!isAnswerValid(currentStep)) {
      toast({
        title: "Please answer the question",
        description: "This question is required before you can proceed.",
        variant: "destructive",
      });
      return;
    }

    advance();
  }, [advance, currentStep, isAnswerValid, toast]);

  // Moves past a skippable question without an answer, clearing anything
  // partially typed so the prompt doesn't receive a half-finished thought.
  const handleSkip = useCallback(() => {
    if (!questions[currentStep]?.skippable) return;

    setAnswers(prev => {
      const next = { ...prev };
      delete next[currentStep];
      return next;
    });
    advance();
  }, [advance, currentStep, questions]);

  const handlePrevious = useCallback(() => {
    if (isAtCheckpoint) {
      setIsAtCheckpoint(false);
      setDocumentProgress(prev => prev - 1);
      return;
    }

    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setDocumentProgress(prev => prev - 1);
    }
  }, [currentStep, isAtCheckpoint]);

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
        result1: apiResponse.result1 || ''
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
    isSubmitting,
    totalSteps,
    isAtCheckpoint,
    bonusQuestionCount: questions.length - CORE_QUESTION_COUNT,
    questionsRemaining: isAtCheckpoint ? 0 : totalSteps - currentStep,
    handleAnswerChange,
    handleNext,
    handleSkip,
    handlePrevious,
    handleFinishNow,
    handleAddMoreDetail,
    handleSubmit,
    handleAnimationComplete,
    getResults,
    questions,
  };
};

export default useFormState;