import React from 'react';
import { motion } from "framer-motion";

interface QuestionTextProps {
  text: string;
  hint?: string;
}

const QuestionText: React.FC<QuestionTextProps> = ({ text, hint }) => {
  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="mb-4"
      initial="hidden"
      animate="visible"
      variants={textVariants}
    >
      <h3 className="text-xl font-semibold leading-7 text-foreground">
        {text}
      </h3>
      {hint && (
        <p className="mt-2 text-sm text-muted-foreground">{hint}</p>
      )}
    </motion.div>
  );
};

export default QuestionText;