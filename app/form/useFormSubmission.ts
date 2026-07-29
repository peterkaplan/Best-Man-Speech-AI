import { useRef, useState } from 'react';
import { questions } from './questions';
import { ResponseData } from "@/app/api/submit/route";
import posthog from 'posthog-js';

/**
 * Analytics context the form hook knows and this hook doesn't - how far the
 * user went, how long it took, what they skipped on the way.
 */
export interface SubmissionMeta {
  included_bonus_questions?: boolean;
  questions_answered?: number;
  questions_skipped?: number;
  skipped_questions?: string[];
  time_in_form_ms?: number;
}

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Tracked in a ref as well as state: two clicks in the same tick both read
  // the pre-render value of `isSubmitting`, so only a ref can stop a
  // double-click from firing two generations.
  const submitInFlight = useRef(false);
  const [apiResponse, setApiResponse] = useState<ResponseData | null>(null);
  const [safetyError, setSafetyError] = useState<string | null>(null);
  const [modelOverloadError, setModelOverloadError] = useState<string | null>(null);
  // Survives long enough for the user to act on it. A toast alone left people
  // back on their last question with no idea what happened and no way to retry
  // except guessing their way forward through the form again.
  const [submissionError, setSubmissionError] = useState<string | null>(null);

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

  const submitForm = async (
    answers: Record<number, string | string[]>,
    meta: SubmissionMeta = {}
  ) => {
    if (submitInFlight.current) return;
    submitInFlight.current = true;

    const submitStartedAt = Date.now();

    setIsSubmitting(true);
    setSafetyError(null);
    setModelOverloadError(null);
    setSubmissionError(null);
    setApiResponse(null);

    try {
      // Built from `questions` rather than from the answers that happen to
      // exist: the prompt reads this payload positionally, so a skipped or
      // unanswered question must still occupy its slot or every later answer
      // shifts onto the wrong field.
      const formData = questions.map((question, index) => ({
        shortName: question.shortName,
        answer: answers[index] ?? ''
      }));

      // `meta` comes from the form hook, which is the only thing that knows
      // whether the user actually opted into the bonus round - inferring it
      // from the answer count here got it wrong whenever anything was skipped.
      posthog.capture('form_submitted', meta);
      const distinctId = posthog.get_distinct_id();

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(distinctId ? { 'X-POSTHOG-DISTINCT-ID': distinctId } : {}),
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

      let hasSafetyError = false;
      let hasModelOverloadError = false;

      if (data.errors && data.errors.length > 0) {
        data.errors.forEach((error: string) => {
          if (error.includes("Candidate was blocked due to SAFETY")) {
            hasSafetyError = true;
            setSafetyError("Your response was blocked due to safety concerns. Please review your input and try again.");
          } else if (error.includes("overloaded")) {
            hasModelOverloadError = true;
            setModelOverloadError("The AI model is currently overloaded. Please try again in a few minutes.");
          }
        });
      }

      if (!response.ok) {
        if (hasSafetyError) {
          throw new Error("Your response was blocked due to safety concerns. Please review your input and try again.");
        }
        if (hasModelOverloadError) {
          throw new Error("The AI model is currently overloaded. Please try again in a few minutes.");
        }
        throw new Error(data.message || 'Network response was not ok');
      }

      setApiResponse({
        message: data.message,
        result1: data.result1,
        errors: data.errors,
        successCount: data.successCount
      });

      posthog.capture('speech_generation_succeeded', {
        ...meta,
        duration_ms: Date.now() - submitStartedAt,
        speech_char_count: data.result1?.length ?? 0,
      });

      // No success toast: the speech itself appearing is the confirmation, and
      // a banner over it at that exact moment is pure interruption.
    } catch (error) {
      console.error('Error:', error);
      const message = error instanceof Error ? error.message : String(error);
      // The server-side speech_generation_failed only sees generation errors.
      // This one also catches the rate limits, network drops and bad responses
      // the user experiences as "it didn't work".
      posthog.capture('speech_generation_client_failed', {
        ...meta,
        duration_ms: Date.now() - submitStartedAt,
        failure_reason: message.includes('safety')
          ? 'safety_block'
          : message.includes('overloaded')
            ? 'model_overloaded'
            : 'other',
        error_message: message,
      });
      // Answers are all still in state, so the only thing standing between the
      // user and their speech is one more attempt. Say that, rather than
      // surfacing the raw failure.
      setSubmissionError(
        message.includes('safety')
          ? "Something in your answers tripped our content filter. Try rewording the last couple of answers."
          : message.includes('overloaded')
            ? "Our writer is busy right now. Give it a few seconds and try again."
            : "We couldn't finish writing your speech. Your answers are safe - try again."
      );
    } finally {
      submitInFlight.current = false;
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, apiResponse, safetyError, modelOverloadError, submissionError, submitForm };
};