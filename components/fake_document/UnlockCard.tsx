import React, { useState } from 'react';
import { Check, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

export const UnlockCard: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('single');

  const options = [
    { id: 'single', name: 'Just this speech', price: '€2.99' },
    { id: 'multiple', name: '3 unique versions', price: '€4.99' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200"
    >
      <div className="flex items-center mb-6">
        <Lock className="text-indigo-600 mr-3" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Unlock full eulogy</h2>
      </div>
      <ul className="mb-6 space-y-3">
        {['Access the complete tribute', 'Unlimited views and shares', 'Download as PDF'].map((benefit, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center"
          >
            <Check className="text-green-500 mr-3" size={20} />
            <span className="text-gray-600">{benefit}</span>
          </motion.li>
        ))}
      </ul>
      <div className="space-y-4 mb-6">
        {options.map((option) => (
          <motion.div 
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`border-2 rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all ${
              selectedOption === option.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-200'
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                selectedOption === option.id ? 'bg-indigo-500' : 'border-2 border-gray-400'
              }`}>
                {selectedOption === option.id && <Check size={12} className="text-white" />}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{option.name}</p>
              </div>
            </div>
            <span className="font-bold text-lg text-indigo-600">{option.price}</span>
          </motion.div>
        ))}
      </div>
      <Button
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors text-lg shadow-md"
      >
        Unlock Now
      </Button>
      <div className="mt-4 text-center text-sm text-gray-500">
        <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
        <span className="mx-2">•</span>
        <a href="#" className="hover:text-indigo-600 transition-colors">Terms & Conditions</a>
      </div>
    </motion.div>
  );
};