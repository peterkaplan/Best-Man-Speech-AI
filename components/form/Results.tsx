import React, { useState, useEffect } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { Lock, Unlock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ResultsProps {
  speech: string;
  onRegenerate: () => void;
}

const Results: React.FC<ResultsProps> = ({ speech, onRegenerate }) => {
  const [reveal, setReveal] = useState(false);

  const coverProps = useSpring({
    from: { height: '100%' },
    to: { height: reveal ? '0%' : '80%' },
    config: { ...config.molasses, duration: 2000 },
  });

  const buttonPulse = useSpring({
    from: { transform: 'scale(1)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'scale(1.05)' });
        await next({ transform: 'scale(1)' });
      }
    },
    config: { duration: 1000 },
  });

  const handleUnlock = () => {
    setReveal(true);
  };

  const previewText = speech.split(' ').slice(0, 30).join(' ') + '...';

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Best Man Speech</h2>
      <Card className="mb-6 overflow-hidden relative">
        <CardContent className="p-0">
          <div className="relative">
            <div className="p-6 max-h-[300px] overflow-y-auto">
              {reveal ? (
                speech.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))
              ) : (
                <p>{previewText}</p>
              )}
            </div>
            <animated.div 
              style={{
                ...coverProps,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 100%)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                padding: '1rem',
              }}
            >
              {!reveal && (
                <animated.div style={buttonPulse}>
                  <Button
                    onClick={handleUnlock}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Lock size={18} />
                    Unlock Full Speech
                  </Button>
                </animated.div>
              )}
            </animated.div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between items-center mt-4">
        <Button variant="outline" className="flex items-center gap-2" onClick={onRegenerate}>
          <Unlock size={18} />
          Regenerate
        </Button>
      </div>
    </div>
  );
};

export default Results;