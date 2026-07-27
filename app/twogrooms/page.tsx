import { Metadata } from 'next';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import JsonLd from '@/components/JsonLd';
import FaqSection from '@/components/FaqSection';
import ArticleDates from '@/components/ArticleDates';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { twoGroomsFaqs } from '@/lib/faqs';

// Title and description deliberately lead on "two grooms" and "same-sex
// wedding" rather than "best man speech tips", which /tips already targets.
export const metadata: Metadata = {
  title: 'Best Man Speech for Two Grooms: A Same-Sex Wedding Guide',
  description: 'How to write and deliver a best man speech at a two-groom wedding — who speaks, how to honour both grooms, and which traditional jokes to drop.',
};

const BestManSpeechTipsTwoGrooms = () => {
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
    <div className="min-h-screen bg-background py-24 px-4 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Best Man Speech for Two Grooms', path: '/twogrooms' },
        ])}
      />
      <JsonLd data={faqSchema(twoGroomsFaqs, '/twogrooms')} />
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-foreground mb-4 text-center glow-text">Best Man Speech for Two Grooms</h1>
        <div className="text-center mb-6">
          <ArticleDates path="/twogrooms" />
        </div>

        {/* Front-loaded, self-contained answer — see the note on the
            how-to-write-a-speech page for why this leads. */}
        <div className="bg-card border border-border/60 rounded-2xl px-6 py-6 mb-8">
          <p className="text-muted-foreground leading-relaxed">
            A best man speech at a two-groom wedding follows the same shape as any other: introduce
            yourself, tell a story about the groom you know, turn toward the couple, and raise a toast.
            What changes is the assumptions baked into the stock material. Bride jokes, &quot;ball and
            chain&quot; lines, and anything about who wears the trousers all have to go — and so does
            making the couple&apos;s sexuality the theme of the speech. They are getting married, not
            being congratulated for who they are. Ask the couple early who is actually speaking, since
            some two-groom weddings have a best man for each groom, some have one shared best person,
            and some skip the role entirely. If you only know one groom well, say so honestly, then spend
            real time on what you have seen in the relationship. The failure mode to avoid is a speech
            that treats one groom as a guest at his own wedding.
          </p>
        </div>

        <div className="bg-card border border-border/60 rounded-2xl overflow-hidden mb-8">
          <div className="px-6 py-8">
            <p className="text-lg mb-6 text-muted-foreground">Giving a best man speech at a wedding with two grooms is a special honor. These tips will help you craft a speech that celebrates both individuals and their unique love story. Best Man Speech AI can assist you in creating a personalized, heartfelt speech that honors this special occasion.</p>

            <Link href="/creator">
              <Button className="w-full mb-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all duration-300 transform hover:scale-105">
                Start Your Speech with Best Man Speech AI
              </Button>
            </Link>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="font-display text-2xl font-medium text-primary mb-4">Do:</h2>
                <ul className="space-y-4">
                  {dos.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-1" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-2xl font-medium text-destructive mb-4">Don&apos;t:</h2>
                <ul className="space-y-4">
                  {donts.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <X className="h-6 w-6 text-destructive mr-2 flex-shrink-0 mt-1" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border/60 rounded-2xl overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="font-display text-2xl font-medium text-foreground mb-4">How Best Man Speech AI Helps with Two-Groom Weddings</h2>
            <p className="mb-4 text-muted-foreground">Best Man Speech AI is designed to help you create a speech that&apos;s perfectly tailored for a wedding with two grooms:</p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
              <li>Provides templates and suggestions specifically for two-groom weddings</li>
              <li>Offers inclusive language options to celebrate the couple&apos;s unique journey</li>
              <li>Helps balance stories and anecdotes about both grooms</li>
              <li>Suggests ways to acknowledge the significance of their union</li>
              <li>Assists in crafting a tone that&apos;s respectful, celebratory, and personalized</li>
            </ul>
            <p className="mb-6 text-muted-foreground">With Best Man Speech AI, you&apos;ll have the tools to create a speech that truly honors and celebrates both grooms on their special day.</p>
            <Link href="/creator">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all duration-300 transform hover:scale-105">
                Craft Your Speech Now
              </Button>
            </Link>
          </div>
        </div>

        <FaqSection items={twoGroomsFaqs} title="Two-Groom Wedding Speech Questions" />

        <div className="bg-card border border-border/60 rounded-2xl px-6 py-8">
          <h2 className="font-display text-2xl font-medium text-foreground mb-4">Keep reading</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              The fundamentals apply to any wedding — our{' '}
              <Link href="/how-to-write-a-speech" className="text-primary hover:underline">
                complete guide to writing a best man speech
              </Link>{' '}
              covers structure, openings, and delivery.
            </li>
            <li>
              For the general do&apos;s and don&apos;ts, see our{' '}
              <Link href="/tips" className="text-primary hover:underline">
                best man speech tips
              </Link>
              .
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BestManSpeechTipsTwoGrooms;
