import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const BestManSpeechTipsTwoGrooms: NextPage = () => {
  const dos = [
    "Introduce yourself and explain your relationship to both grooms.",
    "Share stories that highlight the individuality of each groom.",
    "Discuss how the grooms complement and support each other.",
    "Include anecdotes about their relationship and journey together.",
    "Acknowledge the significance of their union, especially if they faced challenges.",
    "Highlight the love and support from family and friends.",
    "End with a heartfelt toast to the couple's future together."
  ];

  const donts = [
    "Make assumptions about gender roles or stereotypes.",
    "Use heteronormative language or jokes.",
    "Compare their relationship to straight marriages.",
    "Mention past relationships unless explicitly approved by both grooms.",
    "Share overly personal or embarrassing stories without permission.",
    "Make jokes about 'who proposed' or 'who wears the pants'.",
    "Ramble - keep it concise and meaningful."
  ];

  return (
    <div className="min-h-screen bg-gray-100  py-[100px] px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Best Man Speech Tips for Two Grooms - Best Man Speech AI</title>
        <meta name="description" content="Tips for crafting the perfect best man speech for a wedding with two grooms" />
      </Head>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Best Man Speech Tips for Two Grooms</h1>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-8">
            <p className="text-lg mb-6">Giving a best man speech at a wedding with two grooms is a special honor. These tips will help you craft a speech that celebrates both individuals and their unique love story. Best Man Speech AI can assist you in creating a personalized, heartfelt speech that honors this special occasion.</p>
            
            <Link href="/creator">
              <Button className="w-full mb-8 bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 transform hover:scale-105">
                Start Your Speech with Best Man Speech AI
              </Button>
            </Link>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-green-600 mb-4">Do:</h2>
                <ul className="space-y-4">
                  {dos.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-red-600 mb-4">Don't:</h2>
                <ul className="space-y-4">
                  {donts.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <X className="h-6 w-6 text-red-500 mr-2 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How Best Man Speech AI Helps with Two-Groom Weddings</h2>
            <p className="mb-4">Best Man Speech AI is designed to help you create a speech that's perfectly tailored for a wedding with two grooms:</p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Provides templates and suggestions specifically for two-groom weddings</li>
              <li>Offers inclusive language options to celebrate the couple's unique journey</li>
              <li>Helps balance stories and anecdotes about both grooms</li>
              <li>Suggests ways to acknowledge the significance of their union</li>
              <li>Assists in crafting a tone that's respectful, celebratory, and personalized</li>
            </ul>
            <p className="mb-6">With Best Man Speech AI, you'll have the tools to create a speech that truly honors and celebrates both grooms on their special day.</p>
            <Link href="/creator">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 transform hover:scale-105">
                Craft Your Inclusive Speech Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestManSpeechTipsTwoGrooms;