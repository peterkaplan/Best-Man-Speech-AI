import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Plus } from 'lucide-react';

interface AnswerInputProps {
  type: 'text' | 'textarea' | 'radio' | 'checkbox';
  options?: string[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  label?: string;
  required?: boolean;
  error?: string;
  allowCustom?: boolean;
  placeholder?: string;
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  type,
  options,
  value,
  onChange,
  label,
  required = false,
  error,
  allowCustom = false,
  placeholder,
  textareaRef
}) => {
  const [customOption, setCustomOption] = useState('');
  const [customOptions, setCustomOptions] = useState<string[]>([]);

  // The question text is the only accessible name these controls have — the
  // visible question is a sibling heading, not a <label>. Without this the
  // inputs are anonymous to screen readers and browsing agents.
  const errorId = 'answer-error';
  const a11y = {
    'aria-label': label,
    'aria-required': required,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  const handleCustomOptionAdd = () => {
    if (customOption && !customOptions.includes(customOption)) {
      setCustomOptions([...customOptions, customOption]);
      onChange([...(value as string[]), customOption]);
      setCustomOption('');
    }
  };

  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <Input
            {...a11y}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full border-2 border-border focus:border-primary rounded-lg px-4 py-2 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primary/20"
          />
        );
      case 'textarea':
        return (
          <Textarea
            {...a11y}
            ref={textareaRef}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full border-2 border-border focus:border-primary rounded-lg px-4 py-2 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primary/20 resize-none"
            rows={4}
          />
        );
      case 'radio':
        return (
          <RadioGroup aria-label={label} value={value as string} onValueChange={onChange} className="space-y-2">
            {options?.map((option, index) => (
              <div key={index} className="relative">
                <motion.label
                  htmlFor={`option-${index}`}
                  className="flex items-center space-x-2 w-full cursor-pointer p-3 rounded-lg hover:bg-muted transition-colors duration-200"
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                >
                  <RadioGroupItem
                    value={option}
                    id={`option-${index}`}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-foreground">{option}</span>
                </motion.label>
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  whileHover={{ boxShadow: "0 0 0 2px hsl(var(--primary) / 0.2)" }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            ))}
          </RadioGroup>
        );
      case 'checkbox':
        return (
          <div className="space-y-2" role="group" aria-label={label}>
            {options?.concat(customOptions).map((option, index) => (
              <div key={index} className="relative">
                <motion.label
                  htmlFor={`option-${index}`}
                  className="flex items-center space-x-2 w-full cursor-pointer p-3 rounded-lg hover:bg-muted transition-colors duration-200"
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                >
                  <Checkbox
                    id={`option-${index}`}
                    checked={(value as string[]).includes(option)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onChange([...(value as string[]), option]);
                      } else {
                        onChange((value as string[]).filter(item => item !== option));
                      }
                    }}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-foreground">{option}</span>
                </motion.label>
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  whileHover={{ boxShadow: "0 0 0 2px hsl(var(--primary) / 0.2)" }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            ))}
            {allowCustom && (
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <Input
                    aria-label="Add another option"
                    value={customOption}
                    onChange={(e) => setCustomOption(e.target.value)}
                    placeholder="Add another"
                    className="flex-grow border-2 border-border focus:border-primary rounded-lg px-4 py-2 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primary/20"
                  />
                  <motion.button
                    type="button"
                    aria-label="Add option"
                    onClick={handleCustomOptionAdd}
                    className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={inputVariants}
      className="space-y-2"
    >

      {renderInput()}
      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-destructive text-sm mt-1 flex items-center"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AnswerInput;