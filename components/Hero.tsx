"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, CheckCircle } from 'lucide-react';
import { NumberTicker } from '@/components/ui/number-ticker';
import { motion } from 'framer-motion';
import { useScroll } from './form/ScrollContext';
const Hero = () => {
  const { scrollToForm } = useScroll();

  return (
    <div className="py-32 pb-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Craft an Unforgettable
              <span className="text-primary block">Best Man Speech</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Deliver the speech everyone talks about for years. Join thousands of best men who had the room laughing, crying, and cheering with our easy-to-use speech writing tool.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Create Your Speech Now for Free
            </Button>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center bg-card/90 backdrop-blur-sm px-6 py-4 rounded-lg border border-border/50 shadow-lg h-12"
            >
              <Users className="w-5 h-5 text-primary mr-2" />
              <div className="text-center">
                <div className="flex items-center space-x-2">
                  <NumberTicker value={12632} startValue={12101} className="text-xl font-bold text-foreground" />
                  <span className="text-xs text-muted-foreground font-medium">Speeches Created</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};


export default Hero;