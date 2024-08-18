import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Formy from "@/components/form/Formy";
import { Trophy } from 'lucide-react';

const FormPage = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            Craft an Unforgettable
          </h1>
          <h2 className="text-5xl font-extrabold text-indigo-600">
            Best Man Speech
          </h2>
          <p className="mt-4 text-lg text-indigo-800">
            Transform your memories and emotions into a heartfelt, hilarious, and
            perfectly tailored speech with our AI-powered assistant.
          </p>
        </div>

        <Card className="bg-white shadow-xl rounded-xl overflow-hidden">
          <CardHeader className="bg-indigo-600 text-white p-6">
            <CardTitle className="text-2xl font-semibold flex items-center justify-center">
              <Trophy className="mr-2" />
              #1 AI Best Man Speech Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Formy />
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <div className="flex justify-center items-center">
            <div className="flex -space-x-2">
              <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
            </div>
            <span className="ml-2 text-indigo-800">
              ⭐⭐⭐⭐⭐ 50,000+ Speeches Delivered
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;