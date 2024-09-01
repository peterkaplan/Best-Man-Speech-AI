"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { StarIcon, AwardIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import SpeechAssistant from './SpeechAssistant';  
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center bg-indigo-100 px-4 py-2 rounded-full text-indigo-800 font-semibold"
          >
            <AwardIcon className="w-5 h-5 mr-2" />
            #1 AI Best Man Speech Assistant
            <div className="ml-2 flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2 mb-12 lg:mb-0"
          >
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Craft an Unforgettable<br />
              <span className="text-indigo-600">Best Man Speech</span>
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              Transform your memories and emotions into a heartfelt, hilarious, and perfectly tailored speech with our AI-powered assistant.
            </p>
            <Link href="/creator">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 transform hover:scale-105">
                Start Your Legendary Speech
              </Button>
            </Link>
            
            <div className="mt-12 flex items-center justify-center lg:justify-start">
              <div className="flex -space-x-2 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                  <img
                    key={i}
                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                    src={`/api/placeholder/48/48`}
                    alt=""
                  />
                ))}
              </div>
              <div className="ml-4 flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="ml-2 font-medium text-gray-700">50,000+ Speeches Delivered</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:w-1/2 lg:pl-12"
          >
            <SpeechAssistant />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;