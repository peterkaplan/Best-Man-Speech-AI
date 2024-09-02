import React, { useState } from 'react';
import { Check, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

export const UnlockCard: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('single');

  const options = [
    { id: 'single', name: 'Just this speech', price: '$2.99' },
    { id: 'multiple', name: '3 unique versions', price: '$4.99' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-4 rounded-lg shadow-lg border border-gray-200 relative bg-white/80 backdrop-blur-sm"
    >
      <div className="flex items-center mb-4">
        <Lock className="text-indigo-600 mr-2" size={20} />
        <h2 className="text-xl font-bold text-gray-800">Unlock Full Speech</h2>
      </div>
      <ul className="mb-4 space-y-2">
        {['Access the complete speech', 'Download as PDF'].map((benefit, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center text-sm"
          >
            <Check className="text-green-500 mr-2" size={18} />
            <span className="text-gray-600">{benefit}</span>
          </motion.li>
        ))}
      </ul>
      <div className="space-y-2 mb-4">
        {options.map((option) => (
          <motion.div 
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`border-2 rounded-lg p-2 flex items-center justify-between cursor-pointer transition-all ${
              selectedOption === option.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-200'
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                selectedOption === option.id ? 'bg-indigo-500' : 'border-2 border-gray-400'
              }`}>
                {selectedOption === option.id && <Check size={10} className="text-white" />}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{option.name}</p>
              </div>
            </div>
            <span className="font-bold text-md text-indigo-600">{option.price}</span>
          </motion.div>
        ))}
      </div>
      <Button
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition-colors text-md shadow-md"
      >
        Unlock Now
      </Button>
    </motion.div>
  );
};