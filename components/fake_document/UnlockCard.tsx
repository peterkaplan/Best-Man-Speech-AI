import React from 'react';
import { Check, Lock, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface UnlockCardProps {
  onUnlock: (option: string) => void;
}

const UnlockCard: React.FC<UnlockCardProps> = ({ onUnlock }) => {
  const options = [
    { 
      id: 'single', 
      name: 'Just this speech', 
      oldPrice: '$2.99',
      features: ['Basic version']
    },
    { 
      id: 'multiple', 
      name: '3 unique versions', 
      oldPrice: '$4.99',
      features: ['Multiple variations']
    },
  ];

  const handleUnlock = () => {
    onUnlock('all'); // Now gives access to everything
  };

  return (
    <div className="w-full max-w-md p-4 rounded-lg shadow-lg border border-gray-200 relative bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Lock className="text-green-600 mr-2" size={20} />
          <h2 className="text-xl font-bold text-gray-800">Unlock Full Speech</h2>
        </div>
        <div className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full">
          <Tag className="mr-1" size={16} />
          <span className="text-sm font-semibold">Now Free!</span>
        </div>
      </div>

      <ul className="mb-4 space-y-2">
        {['Access the complete speech', 'Download as PDF', 'All premium features included'].map((benefit, index) => (
          <li key={index} className="flex items-center text-sm">
            <Check className="text-green-500 mr-2" size={18} />
            <span className="text-gray-600">{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-3 mb-4">
        {options.map((option) => (
          <div 
            key={option.id}
            className="border-2 border-gray-200 rounded-lg p-3"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-800">{option.name}</span>
              <div className="flex items-center">
                <span className="text-gray-400 line-through text-sm mr-2">{option.oldPrice}</span>
                <span className="font-bold text-green-600">FREE</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {option.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="text-green-500 mr-1" size={14} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={handleUnlock}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-colors text-md shadow-md"
      >
        Access Now
      </Button>
    </div>
  );
};

export default UnlockCard;