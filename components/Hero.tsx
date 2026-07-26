"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';
import { NumberTicker } from '@/components/ui/number-ticker';
import { motion } from 'framer-motion';
import { useScroll } from './form/ScrollContext';

const Hero = () => {
  const { scrollToForm } = useScroll();

  return (
    <div className="relative overflow-hidden stage-spotlight stage-grain">
      {/* Spotlight cone */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 opacity-60"
        style={{
          background: 'conic-gradient(from 180deg at 50% 0%, transparent 0deg, rgb(var(--primary) / 0.16) 12deg, transparent 24deg)',
          filter: 'blur(2px)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight text-foreground glow-text">
            Craft an Unforgettable
            <span className="block text-primary">Best Man Speech</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Deliver the speech everyone&apos;s still talking about. Join thousands of best men who had the room laughing, crying, and cheering with our easy-to-use speech writing tool.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Button
            size="lg"
            onClick={scrollToForm}
            className="bg-primary hover:bg-primary/90 text-primary-foreground stage-ring transition-all duration-300 hover:scale-[1.03] font-semibold px-8 py-6 text-base rounded-full"
          >
            Write my speech
          </Button>

          <div className="flex items-center gap-3 rounded-full border border-border/60 bg-card/60 backdrop-blur-sm px-5 py-3">
            <Users className="w-4 h-4 text-primary" />
            <div className="flex items-baseline gap-1.5">
              <NumberTicker value={12632} startValue={12101} className="text-lg font-semibold text-foreground" />
              <span className="text-xs text-muted-foreground font-medium">speeches written</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stage-floor fade into the form section below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
};

export default Hero;
