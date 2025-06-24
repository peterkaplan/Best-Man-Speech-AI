import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Users, Lightbulb, Heart, Award, Mic } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Write a Great Best Man Speech: The Ultimate Guide | SpeechWriter',
  description: 'Learn how to write a funny, heartfelt, and memorable best man speech with our complete guide. Get tips, structure, examples, and a step-by-step process.',
  keywords: 'how to write a best man speech, best man speech tips, best man speech examples, best man speech structure, funny best man speech, public speaking',
  openGraph: {
    title: 'How to Write a Great Best Man Speech: The Ultimate Guide | SpeechWriter',
    description: 'Master the art of the best man speech with our step-by-step guide. Perfect for any best man looking to deliver an unforgettable speech.',
    type: 'article',
    url: 'https://speechwriter.com/how-to-write-a-best-man-speech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Write a Great Best Man Speech: The Ultimate Guide',
    description: 'Your complete guide to writing a memorable best man speech for your best friend\'s wedding.',
  },
  alternates: {
    canonical: 'https://speechwriter.com/how-to-write-a-best-man-speech',
  },
};

const speechElements = [
  {
    title: 'The Perfect Balance',
    description: 'Master the mix of humor and sincere emotion',
    icon: Heart,
  },
  {
    title: 'Personal Stories',
    description: 'Share anecdotes that highlight the groom\'s character',
    icon: Users,
  },
  {
    title: 'A Memorable Toast',
    description: 'End with a powerful and meaningful toast to the couple',
    icon: Award,
  },
];

const writingSteps = [
  {
    step: '1',
    title: 'Brainstorm & Outline',
    description: 'Gather your stories and ideas, and decide on a theme for your speech.',
    tips: ['Recall key memories', 'Note the groom\'s best qualities', 'Choose a tone (funny, heartfelt, or both)'],
  },
  {
    step: '2',
    title: 'Structure Your Speech',
    description: 'Organize your points into a clear and engaging flow.',
    tips: ['Craft a strong opening', 'Develop 2-3 core stories', 'Plan a meaningful conclusion & toast'],
  },
  {
    step: '3',
    title: 'Write and Refine',
    description: 'Draft your speech, then edit for clarity, flow, and impact.',
    tips: ['Write like you talk', 'Avoid inside jokes', 'Read it aloud to catch awkward phrasing'],
  },
  {
    step: '4',
    title: 'Practice and Deliver',
    description: 'Rehearse your speech until you feel confident and can deliver it naturally.',
    tips: ['Time your speech (aim for 3-5 mins)', 'Practice making eye contact', "Bring notes, but don't just read from them"],
  },
];

export default function HowToWriteABestManSpeechPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            How to Write a <span className="text-blue-600">Great Best Man Speech</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Being asked to be the best man is a huge honor. Our guide will walk you through writing a speech that's funny,
            heartfelt, and unforgettable—for all the right reasons.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>10 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4" />
              <span>For any best man</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Step-by-Step Guide</span>
            </div>
          </div>
          <Link href="/creator">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Try Our Best Man Speech Writer
            </Button>
          </Link>
        </div>

        {/* Key Elements Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Elements of a Memorable Best Man Speech</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {speechElements.map((element, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <element.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{element.title}</CardTitle>
                  <CardDescription>{element.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Quick Tips Section */}
          <section className="mb-16">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                  Quick Best Man Speech Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Start by introducing yourself and how you know the groom.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Share a short, funny, and appropriate story about the groom.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Keep it under 5 minutes – short and sweet is best.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>End with a heartfelt toast to the happy couple.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Step-by-Step Guide */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">The 4-Step Best Man Speech Process</h2>
            <div className="space-y-8">
              {writingSteps.map((step, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.step}
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-2">{step.title}</CardTitle>
                        <CardDescription className="text-lg">{step.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Detailed Sections */}
          <section className="mb-16 prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-8">Writing Your Speech: The In-Depth Guide</h2>
            
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">1. The Perfect Opening</h3>
                <p className="text-gray-700 mb-4">
                  Start by grabbing everyone's attention and introducing yourself. You're the best man, so let them know how you fit into the groom's life.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>State your name:</strong> "Good evening everyone, for those who don't know me, my name is [Your Name]."</li>
                  <li><strong>Explain your relationship:</strong> "...and I've had the honor of being [Groom's Name]'s best friend for the past 10 years."</li>
                  <li><strong>Thank the guests:</strong> "It's wonderful to see so many people here to celebrate [Groom] and [Partner]."</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">2. Tell a Great Story (or Two)</h3>
                <p className="text-gray-700 mb-4">
                  This is the heart of your speech. Tell a story that highlights the groom's great qualities. It should be personal, positive, and preferably a little funny.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Focus on a positive trait:</strong> Is he loyal, funny, generous? Tell a story that shows it.</li>
                  <li><strong>Keep it appropriate:</strong> This is a wedding, not a roast. Avoid stories about exes, illegal activities, or anything truly embarrassing.</li>
                  <li><strong>Connect it to the couple:</strong> Transition from your story about the groom to how you've seen him grow with his new partner. For example, "I always knew he was [trait], but seeing him with [Partner's Name] has brought out a whole new level of..."</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">3. Acknowledge the Partner</h3>
                <p className="text-gray-700 mb-4">
                  A great best man speech is about the couple, not just the groom. Make sure to talk about the groom's partner and your happiness for them as a couple.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <ul className="space-y-3">
                    <li>Speak about the partner's wonderful qualities.</li>
                    <li>Mention how happy they make your friend.</li>
                    <li>Welcome them to the family on behalf of the friends.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">4. End with a Powerful Toast</h3>
                <p className="text-gray-700 mb-4">
                  Your conclusion should be clear, heartfelt, and lead into the toast. Don't let the speech just fizzle out.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Share a heartfelt wish for their future.</li>
                  <li>Offer a piece of advice (if it feels right).</li>
                  <li>Clearly ask guests to join you: "Now, if you'll all please raise your glasses..."</li>
                  <li>Deliver the toast: "To the happy couple, [Groom] and [Partner]! Wishing you a lifetime of love and happiness."</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Common Mistakes Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Common Best Man Speech Mistakes to Avoid</h2>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Too many inside jokes:</strong> A few are okay, but the whole room should be able to enjoy the speech.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Forgetting the partner:</strong> The speech is for the couple, not just your buddy.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Making it too long:</strong> Keep it under 5 minutes. No one has ever complained about a short speech.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Telling inappropriate stories:</strong> Avoid anything about ex-partners, past mistakes, or embarrassing moments.
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="pt-8 pb-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Write Your Perfect Best Man Speech?</h2>
                <p className="text-xl mb-8 opacity-90">
                  Use our AI-powered speech writer to create a personalized, funny, and heartfelt best man speech in minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/creator">
                    <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                      Start Writing Your Speech
                    </Button>
                  </Link>
                  <Link href="/tips">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                      More Best Man Speech Tips
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
} 