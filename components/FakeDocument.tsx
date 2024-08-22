"use client"

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FakeDocumentProps {
  text: string[];
  isLoading?: boolean;
}

const FakeDocument: React.FC<FakeDocumentProps> = ({ text, isLoading = false }) => {
  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <FileText className="w-6 h-6 mr-2 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-700">Best Man Speech</h2>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
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
            text.map((paragraph, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="h-4 bg-gray-200 rounded"
                style={{
                  width: `${Math.random() * 30 + 70}%`,
                }}
              />
            ))
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default FakeDocument;