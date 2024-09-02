import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const BestManSpeechTips: NextPage = () => {
  const dos = [
    "Introduce yourself and how you know the groom.",
    "Mention the groom's good qualities (kindness, adventurous spirit, etc.).",
    "Discuss how the new spouse has positively affected the groom.",
    "Include short anecdotes that exemplify the groom's qualities.",
    "If you know the new spouse well, include positive points about them too.",
    "Acknowledge the effort put into the wedding and how beautiful it turned out.",
    "For a toast, include a call to action at the end."
  ];

  const donts = [
    "Comment on anyone's appearance unless you know them extremely well.",
    "Tell embarrassing or humiliating anecdotes about anyone, even the groom.",
    "Share 'need-to-know' anecdotes about anyone (e.g., pregnancy scares, drug use).",
    "Be mean, even if you think it's funny.",
    "Include 'ball and chain', 'whipped', 'trapped', or 'simp' jokes.",
    "Ramble - keep it under 5 minutes, preferably closer to 3."
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Best Man Speech Tips - Best Man Speech AI</title>
        <meta name="description" content="Tips for crafting the perfect best man speech" />
      </Head>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Best Man Speech Tips</h1>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-8">
            <p className="text-lg mb-6">Crafting the perfect best man speech can be challenging, but with these tips and the help of Best Man Speech AI, you'll deliver a memorable and heartfelt speech that will have everyone smiling (and maybe shedding a tear or two).</p>
            
            <Link href="/creator">
              <Button className="w-full mb-8 bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 transform hover:scale-105">
                Get Started with Best Man Speech AI
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How Best Man Speech AI Can Help</h2>
            <p className="mb-4">Struggling to put these tips into practice? Best Man Speech AI is here to assist you every step of the way:</p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Generate personalized speech outlines based on your relationship with the groom</li>
              <li>Offer suggestions for appropriate anecdotes and jokes</li>
              <li>Help you strike the right balance between heartfelt and humorous</li>
              <li>Ensure your speech hits all the key points without rambling</li>
              <li>Provide instant feedback and improvements as you refine your speech</li>
            </ul>
            <p className="mb-6">With Best Man Speech AI, you'll have the confidence to deliver a speech that's memorable for all the right reasons.</p>
            <Link href="/creator">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 transform hover:scale-105">
                Create Your Perfect Speech Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestManSpeechTips;