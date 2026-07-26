import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface QuestionPromptsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

/**
 * Memory-joggers for questions that are hard to answer cold. Tapping one drops
 * it into the answer as a lead-in and puts the cursor after it, so the user is
 * finishing a sentence rather than facing an empty box.
 */
const QuestionPrompts: React.FC<QuestionPromptsProps> = ({ prompts, onSelect }) => (
  <motion.div
    className="mt-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4, delay: 0.15 }}
  >
    <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
      <Lightbulb size={13} />
      <span>Stuck? Tap one to start</span>
    </div>
    <ul className="flex flex-wrap gap-1.5">
      {prompts.map((prompt) => (
        <li key={prompt}>
          <motion.button
            type="button"
            onClick={() => onSelect(prompt)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground transition-colors duration-200 hover:border-primary hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {prompt}
          </motion.button>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default QuestionPrompts;
