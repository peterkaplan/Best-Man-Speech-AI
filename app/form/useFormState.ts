import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [fakeDocumentText, setFakeDocumentText] = useState<string[]>([]);
  
  const fakeDocumentTextRef = useRef(fakeDocumentText);

  useEffect(() => {
    fakeDocumentTextRef.current = fakeDocumentText;
  }, [fakeDocumentText]);

  const getRandomSentence = useCallback(() => {
    const lengths = [5, 8, 12, 15, 20];
    const length = lengths[Math.floor(Math.random() * lengths.length)];
    return "•".repeat(length);
  }, []);

  const addFakeDocumentText = useCallback(() => {
    setFakeDocumentText(prev => {
      if (prev.length === 0) {
        return ["Best Man Speech", getRandomSentence()];
      } else if (prev.length % 5 === 0) {
        return [...prev, "", getRandomSentence()];
      } else {
        return [...prev, getRandomSentence()];
      }
    });
  }, [getRandomSentence]);

  const removeFakeDocumentText = useCallback(() => {
    setFakeDocumentText(prev => {
      if (prev.length <= 2) return []; // Don't remove the title
      if (prev[prev.length - 2] === "") {
        return prev.slice(0, -2); // Remove empty line and last sentence
      }
      return prev.slice(0, -1); // Remove last sentence
    });
  }, []);

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
      addFakeDocumentText();
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  }, [currentStep, isAnswerValid, addFakeDocumentText, questions.length, toast]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      removeFakeDocumentText();
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep, removeFakeDocumentText]);

  const handleSubmit = useCallback(() => {
    if (areAllQuestionsAnswered()) {
      submitForm(answers);
    } else {
      toast({
        title: "Form Incomplete",
        description: "Please answer all required questions before submitting.",
        variant: "destructive",
      });
    }
  }, [areAllQuestionsAnswered, answers, submitForm, toast]);

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
    setCurrentStep,
    answers,
    setAnswers,
    formStage,
    setFormStage,
    isAnimationComplete,
    setIsAnimationComplete,
    fakeDocumentText,
    setFakeDocumentText,
    apiResponse,
    handleAnswerChange,
    handleNext,
    handlePrevious,
    handleSubmit,
    handleRegenerate,
    handleAnimationComplete,
    addFakeDocumentText,
    questions,
  };
};

export default useFormState;