"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { StarIcon, AwardIcon } from 'lucide-react';
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
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-indigo-800 text-sm font-semibold shadow-sm"
          >
            <AwardIcon className="w-4 h-4 mr-2" />
            #1 Free AI Best Man Speech Assistant
            <div className="ml-2 flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-3 h-3 text-yellow-400 fill-current" />
              ))}
            </div>
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Craft an Unforgettable
              <span className="text-indigo-600 block">Best Man Speech</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            "Deliver the speech everyone talks about for years. Join hundreds of best men who had the room laughing, crying, and cheering with our free AI speech assistant.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center items-center space-x-6"
          >
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Create Your Speech Now for Free
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};


export default Hero;