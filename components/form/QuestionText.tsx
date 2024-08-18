import React from 'react';
import { motion } from "framer-motion";

interface QuestionTextProps {
  text: string;
}

const QuestionText: React.FC<QuestionTextProps> = ({ text }) => {
  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.h3
      className="text-xl font-semibold leading-7 text-indigo-900 mb-4"
      initial="hidden"
      animate="visible"
      variants={textVariants}
    >
      {text}
    </motion.h3>
  );
};

export default QuestionText;