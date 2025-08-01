import React, { useEffect } from 'react';
import { usePDF } from 'react-to-pdf';

interface PdfDocumentProps {
  speeches: string[];
}

const PdfDocument: React.FC<PdfDocumentProps> = ({ speeches }) => {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', color: '#333', marginBottom: '20px', textAlign: 'center' }}>Best Man Speeches</h1>
      {speeches.map((speech, speechIndex) => {
        // Split the content into paragraphs
        const paragraphs = speech.split('\n').filter(paragraph => paragraph.trim() !== '');
        
        return (
          <React.Fragment key={speechIndex}>
            <h2 style={{ fontSize: '20px', color: '#444', marginTop: '30px', marginBottom: '15px' }}>
              Speech Option {speechIndex + 1}
            </h2>
            {paragraphs.map((paragraph, index) => (
              <p key={index} style={{ fontSize: '14px', lineHeight: '1.6', color: '#444', textAlign: 'justify', marginBottom: '1em' }}>
                {paragraph}
              </p>
            ))}
            {speechIndex < speeches.length - 1 && (
              <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #ccc' }} />
            )}
          </React.Fragment>
        );
      })}
      <div style={{ marginTop: '40px', borderTop: '1px solid #ccc', paddingTop: '20px', fontSize: '12px', color: '#888', textAlign: 'center' }}>
        Generated by Best Man Speech Generator
      </div>
    </div>
  );
};

export const usePdfGenerator = (speeches: string[]) => {
  const { toPDF, targetRef } = usePDF({
    filename: 'best-man-speeches.pdf',
    page: { margin: 20 },
    method: 'save',
  });

  const generatePdf = () => {
    toPDF();
  };

  const PdfContent = () => {
    return (
      <div style={{ position: 'absolute', left: '-9999px' }}>
        <div ref={targetRef}>
          <PdfDocument speeches={speeches} />
        </div>
      </div>
    );
  };

  return { generatePdf, PdfContent };
};