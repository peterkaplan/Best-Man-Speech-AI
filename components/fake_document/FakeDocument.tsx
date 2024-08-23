import React, { memo, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { DocumentHeader } from './FakeDocumentHeader';
import { DocumentContent } from './FakeDocumentContent';
import { TypingIndicator, useTypingEffect } from './FakeDocumentComponents';
import { TextCursor } from "lucide-react";

interface FakeDocumentProps {
  progress: number;
  isLoading?: boolean;
}

const FakeDocument: React.FC<FakeDocumentProps> = ({ progress, isLoading = false }) => {
  const { displayedText, isTyping } = useTypingEffect(progress);

  const totalWords = useMemo(() => {
    return (displayedText.title + ' ' + displayedText.content).split(/\s+/).filter(Boolean).length;
  }, [displayedText]);

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg border border-gray-200">
      <div className="flex flex-col h-[800px]">
        <DocumentHeader />
        <div className="flex-grow overflow-hidden">
          <div className="h-full flex">
            <div className="w-full p-6 relative overflow-y-auto">
              <div className="max-w-[650px] mx-auto">
                <DocumentContent isLoading={isLoading} displayedText={displayedText} isTyping={isTyping} />
              </div>
              {!isLoading && (
                <div className="absolute bottom-4 right-4">
                  <TypingIndicator isTyping={isTyping} />
                </div>
              )}
              <div className="absolute bottom-4 left-4 text-sm text-gray-400">
                Words: {totalWords}
              </div>
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
  return prevProps.progress === nextProps.progress && prevProps.isLoading === nextProps.isLoading;
});