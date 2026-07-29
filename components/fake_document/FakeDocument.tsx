import React, { memo, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { DocumentHeader } from './FakeDocumentHeader';
import { DocumentContent } from './FakeDocumentContent';
import { ResultContent } from './ResultContent';
import { TypingIndicator, useTypingEffect } from './TypingIndicator';
import { TextCursor, Lock } from "lucide-react";
import { FormStage } from '@/app/form/useFormState';
import CheckmarkAnimation from '../form/CheckmarkAnimation';

interface FakeDocumentProps {
  progress: number;
  formStage: FormStage;
  questionsRemaining: number;
  results: {
    message: string;
    result1: string;
  } | null;
  onAnimationComplete: () => void;
}

const FakeDocument: React.FC<FakeDocumentProps> = ({ progress, formStage, questionsRemaining, results, onAnimationComplete }) => {
  const { displayedText, isTyping } = useTypingEffect(progress);

  // While the form is running, the document is a fixed-height preview pane
  // sitting next to the questions. Once the speech is real it becomes the thing
  // the user is actually reading, so it grows with its content and the page
  // scrolls - no nested scroll containers to fight with on a phone.
  const isResults = formStage === 'results';

  const totalWords = useMemo(() => {
    return (displayedText.title + ' ' + displayedText.content).split(/\s+/).filter(Boolean).length;
  }, [displayedText]);

  const renderContent = () => {
    switch (formStage) {
      case 'animation':
        return <CheckmarkAnimation
          onComplete={onAnimationComplete}
        />    
      case 'results':
        return <ResultContent results={results} />;
      default:
        return (
          <>
            <div className="max-w-[650px] mx-auto">
              <div className="select-none blur" style={{ userSelect: 'none' }}>
                <DocumentContent displayedText={displayedText} isTyping={isTyping} />
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <TypingIndicator isTyping={isTyping} />
            </div>
            <div className="absolute bottom-4 left-4 text-sm text-muted-foreground">
              Words: {totalWords}
            </div>
          </>
        );
    }
  };

  return (
    <Card
      data-speech-document
      className="w-full max-w-4xl mx-auto bg-card shadow-xl border border-border/60 stage-ring overflow-hidden"
    >
      <div className={`flex flex-col relative ${isResults ? '' : 'lg:h-[800px]'}`}>
        <DocumentHeader />
        <div className={`flex-grow ${isResults ? '' : 'md:overflow-hidden overflow-y-scroll'}`}>
          <div className={`flex ${isResults ? '' : 'h-full'}`}>
            <div className={`w-full p-4 sm:p-6 relative ${isResults ? '' : 'overflow-y-auto'}`}>
              {renderContent()}
            </div>
          </div>
        </div>
        {formStage === 'form' && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
            <div className="max-w-xs rounded-xl border border-border/60 bg-card/95 px-6 py-5 text-center shadow-lg backdrop-blur-sm">
              <Lock size={20} className="mx-auto mb-3 text-primary" />
              <p className="font-display text-lg font-medium text-foreground">
                {questionsRemaining > 0
                  ? `Answer ${questionsRemaining} more ${questionsRemaining === 1 ? 'question' : 'questions'} to reveal your speech`
                  : 'Your speech is ready to write'}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                It&apos;s being written as you go.
              </p>
            </div>
          </div>
        )}
        <div className="h-6 bg-muted border-t border-border flex items-center justify-between px-4 text-xs text-muted-foreground">
          <span>Page 1 of 1</span>
          <span>English (US)</span>
          <span><TextCursor size={12} className="inline mr-1" /> Editing</span>
        </div>
      </div>
    </Card>
  );
};

export default memo(FakeDocument, (prevProps, nextProps) => {
  return prevProps.progress === nextProps.progress &&
    prevProps.formStage === nextProps.formStage &&
    prevProps.questionsRemaining === nextProps.questionsRemaining &&
    prevProps.results === nextProps.results;
});