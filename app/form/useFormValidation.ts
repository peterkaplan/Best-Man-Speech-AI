import { CORE_QUESTION_COUNT, Question } from './questions';

export const useFormValidation = (questions: Question[], answers: Record<number, string | string[]>) => {
  const isAnswerValid = (step: number): boolean => {
    const answer = answers[step];
    const question = questions[step];

    if (question.required) {
      if (Array.isArray(answer)) {
        return answer.length > 0;
      } else {
        return !!answer && answer.trim() !== '';
      }
    }
    return true;
  };

  // Only the core, non-skippable questions block submission: the bonus round is
  // opt-in, and skippable questions are allowed through empty.
  const areAllQuestionsAnswered = (): boolean => {
    return questions.every(
      (question, index) =>
        index >= CORE_QUESTION_COUNT || question.skippable || isAnswerValid(index)
    );
  };

  return { isAnswerValid, areAllQuestionsAnswered };
};