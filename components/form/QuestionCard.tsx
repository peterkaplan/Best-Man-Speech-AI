import React, { useEffect, useRef } from 'react';
import QuestionText from './QuestionText';
import QuestionPrompts from './QuestionPrompts';
import AnswerInput from './AnswerInput';
import FormProgress from './FormProgress';
import { motion } from "framer-motion";
import NavigationButtons from './NavigationButtons';
import { Question } from '@/app/form/questions';

interface QuestionCardProps {
  question: Question;
  answer: string | string[];
  onChange: (answer: string | string[]) => void;
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSkip: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
  error?: string | null;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  onChange,
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSkip,
  isFirstStep,
  isLastStep,
  isSubmitting,
  error
}) => {
  const answerRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const isTypedField = question.type === 'text' || question.type === 'textarea';

  // Keep the caret in the answer box as you move between questions, so the
  // mobile keyboard never collapses mid-form. NavigationButtons also blocks
  // the focus steal on mousedown; this handles the case where the field
  // actually remounts (text <-> textarea) and keyboard/Enter navigation.
  useEffect(() => {
    // Don't grab focus on first paint — that would pop the keyboard open (and
    // scroll the page) the moment someone lands on the form. The exception is
    // arriving from a CTA, which appends #start: that click was a request to
    // begin typing, so honour it once and then drop the hash so a refresh or a
    // shared link doesn't inherit the behaviour.
    let cameFromCta = false;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      cameFromCta =
        typeof window !== 'undefined' && window.location.hash === '#start';
      if (!cameFromCta) return;
      window.history.replaceState(null, '', window.location.pathname);
      if (!isTypedField) return;
    }
    const id = requestAnimationFrame(() => {
      // preventScroll for in-form navigation, because scrollToForm() already
      // positions the card and letting focus scroll too makes the view fight
      // itself. On the CTA path nothing has positioned anything yet, so the
      // field does need bringing into view.
      if (isTypedField) {
        const field = answerRef.current;
        if (!field) return;
        field.focus({ preventScroll: true });
        const end = field.value.length;
        field.setSelectionRange(end, end);
        if (cameFromCta) {
          field.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Radio/checkbox questions: deliberately don't focus a control, which
      // would pop the mobile keyboard for no reason. Focus the card instead so
      // focus doesn't fall back to <body> and strand keyboard users at the top
      // of the document.
      cardRef.current?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(id);
  }, [currentStep, isTypedField]);

  // Drops the prompt in as a lead-in and leaves the caret after it. Appends
  // rather than replaces so someone can stack a couple of memories.
  const handlePromptSelect = (prompt: string) => {
    const current = typeof answer === 'string' ? answer.trimEnd() : '';
    onChange(current ? `${current}\n\n${prompt}: ` : `${prompt}: `);

    requestAnimationFrame(() => {
      const field = answerRef.current;
      if (!field) return;
      field.focus();
      field.setSelectionRange(field.value.length, field.value.length);
      field.scrollTop = field.scrollHeight;
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
//     <FormProgress currentStep={currentStep} totalSteps={totalSteps} />

  return (
    <motion.div
      ref={cardRef}
      tabIndex={-1}
      className="md:bg-card md:shadow-lg md:rounded-xl md:px-8 md:py-6 md:mb-4 md:border md:border-accent focus:outline-none"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <QuestionText text={question.text} hint={question.hint} />
      <AnswerInput
          type={question.type}
          options={question.options}
          value={answer}
          onChange={onChange}
          label={question.text}
          required={question.required}
          allowCustom={question.allowCustom}
          placeholder={question.placeholder}
          fieldRef={answerRef}
          autoCapitalize={question.autoCapitalize}
          autoComplete={question.autoComplete}
          isLastStep={isLastStep}
          error={error ?? undefined}
        />
      {question.prompts && (
        <QuestionPrompts prompts={question.prompts} onSelect={handlePromptSelect} />
      )}
      <NavigationButtons
        onPrevious={onPrevious}
        onNext={onNext}
        onSkip={onSkip}
        canSkip={!!question.skippable}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        isSubmitting={isSubmitting}
      />
    </motion.div>
  );
};

export default QuestionCard;