import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { TypedText } from './useTypingEffect';
import { questions } from './questions';

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState<TypedText | null>(null);
  const { toast } = useToast();

  const submitForm = async (answers: Record<number, string | string[]>) => {
    setIsSubmitting(true);

    // join answers with questions in order to get the "ShortName" and "Answer"
    const formData = Object.entries(answers).map(([key, value]) => ({
      shortName: questions[Number(key)].shortName,
      answer: value
    }));

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log("mioo");
      
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
  title: "Best Man Speech",
  content: `Ladies and gentlemen,

If I could have your attention for just a moment, I promise to keep this short and sweet—just like the groom's attention span! For those who don’t know me, I’m [Your Name], the best man and [Groom's Name]'s partner in crime for many years.

Today, we gather to celebrate the love between [Groom's Name] and [Bride's Name]. I’ve had the privilege of knowing [Groom's Name] for quite some time, and let me tell you, he’s always been a bit of a character. From our wild adventures to our late-night talks, I’ve seen him at his best and, well, let’s just say, at his “learning experiences.”

But in all seriousness, [Groom's Name] has always had a heart of gold. He’s the kind of guy who would give you the shirt off his back—though I wouldn’t recommend it, as he has questionable fashion sense! 

And then came [Bride's Name]. The moment he met her, I knew something had changed. He started showing up on time, dressing better, and even learned how to cook! [Bride's Name], you’ve truly brought out the best in him, and for that, we are all grateful.

As we raise our glasses, let’s toast to love, laughter, and a happily ever after. May your life together be filled with joy, adventure, and endless love. Here’s to [Groom's Name] and [Bride's Name]—may your love be modern enough to survive the times and old-fashioned enough to last forever.

Cheers!`
};
