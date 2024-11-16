import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { questions } from './questions';
import { ResponseData } from "@/app/api/submit/route";

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState<ResponseData | null>(null);
  const [safetyError, setSafetyError] = useState<string | null>(null);
  const [modelOverloadError, setModelOverloadError] = useState<string | null>(null);
  const { toast } = useToast();

  const parseResponse = async (response: Response) => {
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      // If it's not JSON, try to get the text content for error details
      const textContent = await response.text();
      throw new Error(
        `Expected JSON response but received ${contentType}. ` +
        `Status: ${response.status} ${response.statusText}`
      );
    }
    return response.json();
  };

  const submitForm = async (answers: Record<number, string | string[]>) => {
    setIsSubmitting(true);
    setSafetyError(null);
    setModelOverloadError(null);
    setApiResponse(null);

    try {
      const formData = Object.entries(answers).map(([key, value]) => ({
        shortName: questions[Number(key)].shortName,
        answer: value
      }));

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        cache: 'no-store'
      });

      let data: ResponseData;
      try {
        data = await parseResponse(response);
      } catch (parseError) {
        console.error('Response parsing error:', parseError);
        throw new Error(
          "Unable to process server response. Please try again later. " +
          "If the problem persists, contact support."
        );
      }

      if (!response.ok) {
        throw new Error(data.message || 'Network response was not ok');
      }
      
      let hasSafetyError = false;
      let hasModelOverloadError = false;

      if (data.errors && data.errors.length > 0) {
        data.errors.forEach((error: string) => {
          if (error.includes("Candidate was blocked due to SAFETY")) {
            hasSafetyError = true;
            setSafetyError("One or more responses were blocked due to safety concerns. Please review your input and try again.");
          } else if (error.includes("The model is overloaded. Please try again later.")) {
            hasModelOverloadError = true;
            setModelOverloadError("The AI model is currently overloaded. Please try again in a few minutes.");
          }
        });
      }

      if (!hasSafetyError && !hasModelOverloadError) {
        setApiResponse({
          message: data.message,
          result1: data.result1,
          result2: data.result2,
          result3: data.result3,
          errors: data.errors,
          successCount: data.successCount
        });
      }

      // Handle different scenarios with appropriate toast messages
      if (hasSafetyError) {
        toast({
          title: "Safety Concern",
          description: "One or more responses were blocked due to safety concerns. Please review your input and try again.",
          duration: 10000,
          variant: "destructive",
        });
      } else if (hasModelOverloadError) {
        toast({
          title: "Model Overloaded",
          description: "The AI model is currently overloaded. Please try again in a few minutes.",
          duration: 10000,
          variant: "destructive",
        });
      } else if (data.errors && data.errors.length > 0) {
        toast({
          title: "Partial Success",
          description: `Generated ${data.successCount} out of 3 responses successfully. Please check the results.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Submission Successful",
          description: "Your form has been submitted successfully.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Submission Error",
        description: error instanceof Error ? error.message : "There was an error submitting your form. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, apiResponse, safetyError, modelOverloadError, submitForm };
};