import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CheckpointCardProps {
  bonusQuestionCount: number;
  onFinishNow: () => void;
  onAddMoreDetail: () => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

const CheckpointCard: React.FC<CheckpointCardProps> = ({
  bonusQuestionCount,
  onFinishNow,
  onAddMoreDetail,
  onPrevious,
  isSubmitting
}) => {
  return (
    <motion.div
      className="md:bg-card md:shadow-lg md:rounded-xl md:px-8 md:py-6 md:mb-4 md:border md:border-accent"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
        <Sparkles size={16} />
        <span>That&apos;s everything we need</span>
      </div>
      <h3 className="font-display text-2xl font-medium text-card-foreground">
        We can write your speech now
      </h3>
      <p className="mt-3 text-muted-foreground">
        Or answer {bonusQuestionCount} more questions and we&apos;ll write a longer,
        more personal one. Most people say the extra couple of minutes is worth it.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <Button
          onClick={onAddMoreDetail}
          disabled={isSubmitting}
          className="flex w-full items-center justify-center space-x-2 bg-primary text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
        >
          <Sparkles size={16} />
          <span>Answer {bonusQuestionCount} more for a better speech</span>
        </Button>
        <Button
          onClick={onFinishNow}
          disabled={isSubmitting}
          variant="outline"
          className="flex w-full items-center justify-center space-x-2 border-primary bg-background text-primary transition-colors duration-300 hover:bg-muted"
        >
          <span>{isSubmitting ? 'Writing...' : 'Write my speech now'}</span>
          {!isSubmitting && <Send size={16} />}
        </Button>
      </div>

      <button
        onClick={onPrevious}
        disabled={isSubmitting}
        className="mt-5 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
      >
        <ArrowLeft size={14} />
        <span>Back to the last question</span>
      </button>
    </motion.div>
  );
};

export default CheckpointCard;
