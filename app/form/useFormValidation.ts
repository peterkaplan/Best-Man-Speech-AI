import { Question } from './questions';

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

  const areAllQuestionsAnswered = (): boolean => {
    return questions.every((_, index) => isAnswerValid(index));
  };

  return { isAnswerValid, areAllQuestionsAnswered };
};