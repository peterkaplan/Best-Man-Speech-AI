import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Mic, Star, PartyPopper, Users, Clock, Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bachelor Party Speech Guide: Funny Tips & Examples | SpeechWriter',
  description: 'Learn how to write a hilarious and memorable bachelor party speech or toast. Get tips for best men, funny one-liners, and examples that honor the groom.',
  keywords: 'bachelor party speech, bachelor party toast, write a bachelor party speech, funny bachelor party speech, best man bachelor party speech, speech for bachelor party',
  openGraph: {
    title: 'How to Write a Killer Bachelor Party Speech | SpeechWriter',
    description: 'Your go-to guide for writing a funny, memorable bachelor party speech that perfectly roasts and toasts the groom-to-be.',
    type: 'article',
    url: 'https://bestmanspeechai.com/bachelor-party-speech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bachelor Party Speech Guide: Funny Tips & Examples',
    description: 'Nailing the bachelor party speech is easy with our tips, examples, and AI-powered speech writing tool.',
  },
  alternates: {
    canonical: 'https://bestmanspeechai.com/bachelor-party-speech',
  },
};

const speechTips = {
  dos: [
    { text: "Keep it short and sweet (1-3 minutes max).", icon: CheckCircle },
    { text: "Tell one great, funny story (that won't get him in trouble).", icon: CheckCircle },
    { text: "Roast him gently, but with love.", icon: CheckCircle },
    { text: "End with a sincere, quick toast to the groom.", icon: CheckCircle },
    { text: "Mention how excited you are for the wedding.", icon: CheckCircle },
  ],
  donts: [
    { text: "Don't tell stories that could genuinely upset his partner.", icon: XCircle },
    { text: "Don't bring up exes. Ever.", icon: XCircle },
    { text: "Don't make it a long list of inside jokes nobody understands.", icon: XCircle },
    { text: "Don't get too drunk before you have to speak.", icon: XCircle },
    { text: "Don't forget to prepare at least a little bit.", icon: XCircle },
  ]
};

const writingSteps = [
  {
    step: '1',
    title: 'Find Your Angle',
    description: 'Decide on the main theme. Is it his terrible dancing? His loyalty? His weird obsession with collecting bottle caps? Pick one core idea.',
    icon: Star,
  },
  {
    step: '2',
    title: 'Pick One Killer Story',
    description: 'You don\'t need a full biography. Choose one funny, revealing, and appropriate story that illustrates your main angle.',
    icon: Users,
  },
  {
    step: '3',
    title: 'Structure the Toast',
    description: 'Follow this simple structure: Quick intro -> The funny story -> A moment of sincerity -> The toast. That\'s it.',
    icon: Mic,
  },
  {
    step: '4',
    title: 'End with a Bang',
    description: 'Your last line is the toast. Make it simple and from the heart. "To [Groom\'s Name]! May his married life be as fun as this weekend."',
    icon: Trophy,
  },
];

export default function BachelorPartySpeechPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-24">
        {/* Header Section */}
        <div className="text-center mb-20">
          <PartyPopper className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            How to Write a <span className="text-indigo-600">Killer Bachelor Party Speech</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            The perfect bachelor party speech is a mix of a loving roast and a heartfelt toast. 
            This guide will help you find that sweet spot between hilarious and heartfelt.
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500 mb-10">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>5 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Mic className="w-5 h-5" />
              <span>Perfect for best men</span>
            </div>
            <div className="flex items-center gap-2">
              <PartyPopper className="w-5 h-5" />
              <span>Roast & Toast</span>
            </div>
          </div>

          <Link href="/creator">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Use Our Speech Writer Tool
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">

          {/* Do's and Don'ts Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              The Golden Rules of the Bachelor Party Toast
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-green-200 shadow-lg">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-2xl text-green-700 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6" />
                    The Do's
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {speechTips.dos.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <tip.icon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{tip.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-red-200 shadow-lg">
                <CardHeader className="bg-red-50">
                  <CardTitle className="text-2xl text-red-700 flex items-center gap-3">
                    <XCircle className="w-6 h-6" />
                    The Don'ts
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {speechTips.donts.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <tip.icon className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{tip.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Step-by-Step Guide */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Your 4-Step Plan to a Legendary Toast
            </h2>
            <div className="space-y-8">
              {writingSteps.map((step, index) => (
                <Card key={step.step} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {step.step}
                        </div>
                        <step.icon className="w-6 h-6 text-indigo-600 mt-2" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2 text-gray-900">{step.title}</CardTitle>
                        <CardDescription className="text-lg text-gray-600">{step.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          {/* Connection to Best Man Speech */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              From Bachelor Party Toast to Best Man Speech
            </h2>
            <Card className="bg-indigo-50 border-indigo-200 shadow-lg">
              <CardContent className="pt-8 pb-8">
                <div className="text-center mb-6">
                  <div className="flex justify-center items-center gap-4 mb-4">
                    <PartyPopper className="w-10 h-10 text-indigo-600" />
                    <span className="text-2xl text-gray-400">→</span>
                    <Users className="w-10 h-10 text-indigo-600" />
                  </div>
                </div>
                <p className="text-lg text-gray-700 mb-6 text-center">
                  Think of the bachelor party speech as the <strong>warm-up act</strong> for your official best man speech at the wedding.
                </p>
                <p className="text-gray-600 mb-8 text-center">
                  It's your chance to share the funnier, more casual stories that might not fit into the formal setting of the wedding reception.
                </p>
                <div className="bg-white rounded-lg p-6 mb-8 border border-indigo-200">
                  <p className="text-lg text-gray-700 text-center">
                    Our tool can help you with <strong>both</strong>! Generate a hilarious roast for the bachelor party, then create a more heartfelt, polished speech for the big day.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/creator">
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      Create Your Bachelor Party Speech
                    </Button>
                  </Link>
                  <Link href="/how-to-write-a-speech">
                    <Button size="lg" variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white">
                      Plan Your Wedding Speech
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Card className="bg-indigo-600 text-white shadow-xl">
              <CardContent className="pt-8 pb-8">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-indigo-200" />
                <h2 className="text-3xl font-bold mb-4">Ready to Give an Unforgettable Toast?</h2>
                <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
                  Let our AI do the heavy lifting. Get a personalized, funny, and perfectly crafted bachelor party speech in minutes.
                </p>
                <Link href="/creator">
                  <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100">
                    Get Started for Free
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
} 