"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PenTool, GlassesIcon, SmileIcon, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SpeechAssistant = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);

  const placeholders = [
    "Share a funny anecdote...",
    "Describe a memorable moment...",
    "Add a heartfelt message...",
    "Include a joke or pun...",
    "Mention a shared adventure..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [placeholders.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      setShowTypingIndicator(true);
      setTimeout(() => {
        setShowTypingIndicator(false);
        setInputValue('');
        setIsTyping(false);
      }, 2000);
    }
  };

  return (
    <Card className="bg-white shadow-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Your Speech Assistant</h3>
          <div className="flex space-x-2">
            <PenTool className="w-6 h-6 text-indigo-600" />
            <GlassesIcon className="w-6 h-6 text-indigo-600" />
            <SmileIcon className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
        <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-100 p-4 rounded-lg"
          >
            <p className="text-sm text-gray-600">Tell me about the groom...</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-indigo-100 p-4 rounded-lg"
          >
            <p className="text-sm text-indigo-800">John and I have been best friends since college. He&apos;s always been the life of the party and has a heart of gold.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-100 p-4 rounded-lg"
          >
            <p className="text-sm text-gray-600">Great! Now, let&apos;s add some humor. What&apos;s a funny story you could share?</p>
          </motion.div>
          <AnimatePresence>
            {showTypingIndicator && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-100 p-4 rounded-lg"
              >
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mt-6">
          <div className="relative">
            <input
              type="text"
              className="w-full border-2 border-indigo-300 rounded-full py-3 px-4 pr-12 text-gray-700 focus:outline-none focus:border-indigo-500 transition-all duration-300"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(inputValue.length > 0)}
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={placeholderIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute left-4 top-0 transform -translate-y-1/2 text-gray-400 pointer-events-none flex items-center h-full"
                >
                {inputValue === '' && placeholders[placeholderIndex]}
              </motion.span>
            </AnimatePresence>
            <Button 
              size="sm" 
              className={`absolute right-1 top-1/2 transform -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all duration-300 ${isTyping ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              onClick={handleSend}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpeechAssistant;