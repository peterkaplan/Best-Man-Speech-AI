import { Metadata } from 'next';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'Best Man Speech Tips',
  description: 'Tips for crafting the perfect best man speech.',
};

const BestManSpeechTips = () => {
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
    <div className="min-h-screen bg-background py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-foreground mb-10 text-center glow-text">Best Man Speech Tips</h1>

        <div className="bg-card border border-border/60 rounded-2xl overflow-hidden mb-8">
          <div className="px-6 py-8">
            <p className="text-lg mb-6 text-muted-foreground">Crafting the perfect best man speech can be challenging, but with these tips and the help of Best Man Speech AI, you&apos;ll deliver a memorable and heartfelt speech that will have everyone smiling (and maybe shedding a tear or two).</p>

            <Link href="/creator">
              <Button className="w-full mb-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all duration-300 transform hover:scale-105">
                Get Started with Best Man Speech AI
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
            <h2 className="font-display text-2xl font-medium text-foreground mb-4">How Best Man Speech AI Can Help</h2>
            <p className="mb-4 text-muted-foreground">Struggling to put these tips into practice? Best Man Speech AI is here to assist you every step of the way:</p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
              <li>Generate personalized speech outlines based on your relationship with the groom</li>
              <li>Offer suggestions for appropriate anecdotes and jokes</li>
              <li>Help you strike the right balance between heartfelt and humorous</li>
              <li>Ensure your speech hits all the key points without rambling</li>
              <li>Provide instant feedback and improvements as you refine your speech</li>
            </ul>
            <p className="mb-6 text-muted-foreground">With Best Man Speech AI, you&apos;ll have the confidence to deliver a speech that&apos;s memorable for all the right reasons.</p>
            <Link href="/creator">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all duration-300 transform hover:scale-105">
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
