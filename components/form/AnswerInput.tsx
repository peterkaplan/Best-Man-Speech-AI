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
}

const AnswerInput: React.FC<AnswerInputProps> = ({ 
  type, 
  options, 
  value, 
  onChange, 
  label, 
  required = false, 
  error,
  allowCustom = false
}) => {
  const [customOption, setCustomOption] = useState('');
  const [customOptions, setCustomOptions] = useState<string[]>([]);

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
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border-2 border-indigo-300 focus:border-indigo-500 rounded-lg px-4 py-2 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-indigo-200"
          />
        );
      case 'textarea':
        return (
          <Textarea
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border-2 border-indigo-300 focus:border-indigo-500 rounded-lg px-4 py-2 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-indigo-200 resize-none"
            rows={4}
          />
        );
      case 'radio':
        return (
          <RadioGroup value={value as string} onValueChange={onChange} className="space-y-2">
            {options?.map((option, index) => (
              <div key={index} className="relative">
                <motion.label
                  htmlFor={`option-${index}`}
                  className="flex items-center space-x-2 w-full cursor-pointer p-3 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                >
                  <RadioGroupItem
                    value={option}
                    id={`option-${index}`}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </motion.label>
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  whileHover={{ boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.2)" }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            ))}
          </RadioGroup>
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            {options?.concat(customOptions).map((option, index) => (
              <div key={index} className="relative">
                <motion.label
                  htmlFor={`option-${index}`}
                  className="flex items-center space-x-2 w-full cursor-pointer p-3 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
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
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </motion.label>
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  whileHover={{ boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.2)" }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            ))}
            {allowCustom && (
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <Input
                    value={customOption}
                    onChange={(e) => setCustomOption(e.target.value)}
                    placeholder="Add another"
                    className="flex-grow border-2 border-indigo-300 focus:border-indigo-500 rounded-lg px-4 py-2 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-indigo-200"
                  />
                  <motion.button
                    onClick={handleCustomOptionAdd}
                    className="p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-red-500 text-sm mt-1 flex items-center"
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