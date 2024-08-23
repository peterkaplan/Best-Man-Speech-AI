import React from 'react';
import { motion } from 'framer-motion';
import useTypingEffect from "@/app/form/useTypingEffect"

export const TypingIndicator: React.FC<{ isTyping: boolean }> = ({ isTyping }) => (
  <motion.div
    animate={{ opacity: isTyping ? 1 : 0 }}
    transition={{ duration: 0.3 }}
    className="flex items-center space-x-1 h-4"
  >
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        animate={{ y: isTyping ? [0, -4, 0] : 0 }}
        transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity, repeatType: "loop" }}
        className="w-1.5 h-1.5 bg-blue-500 rounded-full"
      />
    ))}
  </motion.div>
);

export { useTypingEffect };