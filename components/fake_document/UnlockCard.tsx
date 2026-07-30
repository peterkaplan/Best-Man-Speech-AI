import React from 'react';
import { Check, Lock, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface UnlockCardProps {
  onUnlock: (option: string) => void;
}

const UnlockCard: React.FC<UnlockCardProps> = ({ onUnlock }) => {
  const handleUnlock = () => {
    onUnlock('all');
  };

  return (
    <div className="w-full max-w-md p-4 rounded-lg shadow-lg border relative bg-card/80 backdrop-blur-sm">
      {/* Vertical rhythm tightens below sm so the whole card, button included,
          fits on one phone screen under the fixed header. */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center">
          <Lock className="text-primary mr-2" size={20} />
          <h2 className="text-xl font-bold text-card-foreground">Unlock Full Speech</h2>
        </div>
        <div className="flex items-center bg-accent text-accent-foreground px-3 py-1 rounded-full">
          <Tag className="mr-1" size={16} />
          <span className="text-sm font-semibold">Now Free!</span>
        </div>
      </div>

      <ul className="mb-3 sm:mb-4 space-y-1.5 sm:space-y-2">
        {['Access the complete speech', 'Download as PDF', 'All premium features included'].map((benefit, index) => (
          <li key={index} className="flex items-center text-sm">
            <Check className="text-primary mr-2" size={18} />
            <span className="text-muted-foreground">{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between mb-3 sm:mb-4 border-2 border-border rounded-lg p-2.5 sm:p-3">
        <span className="font-semibold text-card-foreground">Full speech</span>
        <div className="flex items-center">
          <span className="text-muted-foreground line-through text-sm mr-2">$2.99</span>
          <span className="font-bold text-primary">FREE</span>
        </div>
      </div>

      <Button
        onClick={handleUnlock}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-colors text-base shadow-md"
      >
        Access Now
      </Button>
    </div>
  );
};

export default UnlockCard;
