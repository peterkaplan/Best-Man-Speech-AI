import { CORE_QUESTION_COUNT, questions } from './questions';

/**
 * Shared shapes for the form's product analytics. The drop-off report is only
 * as good as these properties: every question-level event carries the question
 * itself (not just a step number) so a reorder of `questions` doesn't silently
 * re-label historical data.
 */

export const questionProperties = (index: number) => {
  const question = questions[index];
  return {
    question_index: index,
    // 1-based, for charts humans have to read.
    question_number: index + 1,
    question_short_name: question?.shortName ?? 'unknown',
    question_type: question?.type ?? 'unknown',
    is_bonus_question: index >= CORE_QUESTION_COUNT,
    is_skippable: Boolean(question?.skippable),
  };
};

/** How much the user actually wrote - thin answers predict a thin speech. */
export const answerProperties = (answer: string | string[] | undefined) => {
  if (Array.isArray(answer)) {
    return { answer_length: answer.join(', ').length, options_selected: answer.length };
  }
  return { answer_length: (answer ?? '').length };
};

const hasContent = (answer: string | string[] | undefined) =>
  Array.isArray(answer) ? answer.length > 0 : Boolean(answer?.trim());

export const answeredCount = (answers: Record<number, string | string[]>) =>
  Object.values(answers).filter(hasContent).length;
