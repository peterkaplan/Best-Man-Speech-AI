import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { TypedText } from './useTypingEffect';

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState<TypedText | null>(null);
  const { toast } = useToast();

  const submitForm = async (answers: Record<number, string | string[]>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();
      setApiResponse(speech);
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

const speech = {
  title: "Eulogy Speech",
  content: `Dear friends and family,

We gather here today to celebrate the life of a remarkable individual who touched our hearts in countless ways. [Name] was not just a friend, a sibling, or a parent; [he/she/they] was a beacon of light in our lives, illuminating our paths with love, kindness, and unwavering support.

As we reflect on the memories we shared, let us remember the laughter that filled the room, the stories that brought us together, and the moments that defined our time with [Name]. [He/She/They] had a unique ability to make everyone feel special, to listen without judgment, and to offer comfort in times of need.

Though we may feel a profound sense of loss today, let us also celebrate the legacy that [Name] leaves behind. [He/She/They] taught us the importance of compassion, the value of friendship, and the beauty of living life to the fullest. Let us honor [his/her/their] memory by carrying forward these lessons in our own lives.

In closing, let us hold onto the love we shared with [Name] and cherish the moments we had together. May [he/she/they] rest in peace, knowing that [his/her/their] spirit will forever live on in our hearts.

Thank you.`
};
