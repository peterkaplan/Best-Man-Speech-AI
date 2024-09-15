import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { questions } from './questions';
import { ResponseData } from "@/app/api/submit/route";

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState<ResponseData | null>(null);
  const { toast } = useToast();

  const submitForm = async (answers: Record<number, string | string[]>) => {
    setIsSubmitting(true);

    // join answers with questions in order to get the "ShortName" and "Answer"
    const formData = Object.entries(answers).map(([key, value]) => ({
      shortName: questions[Number(key)].shortName,
      answer: value
    }));

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        cache: 'no-store'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();
      setApiResponse({
        message: 'success',
        result1: data.result1,
        result2: data.result2,
        result3: data.result3
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Submission Error",
        description: error instanceof Error ? error.message : "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, apiResponse, submitForm };
};