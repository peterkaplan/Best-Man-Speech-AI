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
    <div className="w-full max-w-md p-4 rounded-lg shadow-lg border relative bg-card/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Lock className="text-primary mr-2" size={20} />
          <h2 className="text-xl font-bold text-card-foreground">Unlock Full Speech</h2>
        </div>
        <div className="flex items-center bg-accent text-accent-foreground px-3 py-1 rounded-full">
          <Tag className="mr-1" size={16} />
          <span className="text-sm font-semibold">Now Free!</span>
        </div>
      </div>

      <ul className="mb-4 space-y-2">
        {['Access the complete speech', 'Download as PDF', 'All premium features included'].map((benefit, index) => (
          <li key={index} className="flex items-center text-sm">
            <Check className="text-primary mr-2" size={18} />
            <span className="text-muted-foreground">{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-3 mb-4">
        {options.map((option) => (
          <div 
            key={option.id}
            className="border-2 border-border rounded-lg p-3"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-card-foreground">{option.name}</span>
              <div className="flex items-center">
                <span className="text-muted-foreground line-through text-sm mr-2">{option.oldPrice}</span>
                <span className="font-bold text-primary">FREE</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {option.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="text-primary mr-1" size={14} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={handleUnlock}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 rounded-lg transition-colors text-md shadow-md"
      >
        Access Now
      </Button>
    </div>
  );
};

export default UnlockCard;