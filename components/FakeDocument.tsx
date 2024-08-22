import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FakeDocumentProps {
  text: string[];
  isLoading?: boolean;
}

const FakeDocument: React.FC<FakeDocumentProps> = memo(({ text, isLoading = false }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <FileText className="w-6 h-6 mr-2 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-700">Best Man Speech</h2>
        </div>
        <div
          className="space-y-4 font-serif text-lg leading-relaxed"
          style={{ filter: 'blur(4px)' }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-t-2 border-blue-500 rounded-full"
              />
            </div>
          ) : (
            <AnimatePresence>
              {text.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={index === 0 ? "font-bold text-2xl mb-4" : ""}
                >
                  {paragraph}
                </motion.p>
              ))}
            </AnimatePresence>
          )}
        </div>
      </CardContent>
    </Card>
  );
}, (prevProps, nextProps) => {
  return prevProps.text.length === nextProps.text.length && prevProps.isLoading === nextProps.isLoading;
});

FakeDocument.displayName = 'FakeDocument';

export default FakeDocument;