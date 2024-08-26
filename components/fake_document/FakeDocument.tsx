import React, { memo, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { DocumentHeader } from './FakeDocumentHeader';
import { DocumentContent } from './FakeDocumentContent';
import { ResultContent } from './ResultContent';
import { TypingIndicator, useTypingEffect } from './TypingIndicator';
import { TextCursor } from "lucide-react";
import { FormStage } from '@/app/form/useFormState';
import { TypedText } from '@/app/form/useTypingEffect';
import CheckmarkAnimation from '../form/CheckmarkAnimation';

interface FakeDocumentProps {
  progress: number;
  formStage: FormStage;
  realSpeech: TypedText | null;
  onAnimationComplete: () => void;
}

const FakeDocument: React.FC<FakeDocumentProps> = ({ progress, formStage, realSpeech , onAnimationComplete }) => {
  const { displayedText, isTyping } = useTypingEffect(progress);

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
        return <ResultContent displayedText={realSpeech } />;
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
            <div className="absolute bottom-4 left-4 text-sm text-gray-400">
              Words: {totalWords}
            </div>
          </>
        );
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg border border-gray-200">
      <div className="flex flex-col lg:h-[800px]">
        <DocumentHeader />
        <div className="flex-grow overflow-hidden">
          <div className="h-full flex">
            <div className="w-full p-6 relative overflow-y-auto">
              {renderContent()}
            </div>
          </div>
        </div>
        <div className="h-6 bg-gray-100 border-t border-gray-200 flex items-center justify-between px-4 text-xs text-gray-500">
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
    prevProps.formStage === nextProps.formStage;
});