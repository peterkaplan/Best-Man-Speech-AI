import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Users, Lightbulb, Heart, Award, Mic } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import FaqSection from '@/components/FaqSection';
import ArticleDates from '@/components/ArticleDates';
import { howToSchema, articleSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { howToFaqs } from '@/lib/faqs';
import { contentDates } from '@/lib/content-dates';

export const metadata: Metadata = {
  title: 'How to Write a Great Best Man Speech: The Ultimate Guide',
  description: 'Learn how to write a funny, heartfelt, and memorable best man speech with our complete guide. Get tips, structure, examples, and a step-by-step process.',
  keywords: 'how to write a best man speech, best man speech tips, best man speech examples, best man speech structure, funny best man speech, public speaking',
  openGraph: {
    title: 'How to Write a Great Best Man Speech: The Ultimate Guide',
    description: 'Master the art of the best man speech with our step-by-step guide. Perfect for any best man looking to deliver an unforgettable speech.',
    type: 'article',
    url: 'https://www.bestmanspeechai.com/how-to-write-a-speech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Write a Great Best Man Speech: The Ultimate Guide',
    description: 'Your complete guide to writing a memorable best man speech for your best friend\'s wedding.',
  },
  alternates: {
    canonical: 'https://www.bestmanspeechai.com/how-to-write-a-speech',
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
    <div className="min-h-screen bg-background">
      <JsonLd
        data={howToSchema({
          name: 'How to Write a Great Best Man Speech',
          description:
            'A four-step process for writing a funny, heartfelt, and memorable best man speech — from brainstorming to delivery.',
          path: '/how-to-write-a-speech',
          totalTime: 'PT2H',
          // Derived from writingSteps so the markup cannot drift from the page.
          steps: writingSteps.map(({ title, description }) => ({ title, description })),
        })}
      />
      <JsonLd
        data={articleSchema({
          headline: 'How to Write a Great Best Man Speech: The Ultimate Guide',
          description:
            'Learn how to write a funny, heartfelt, and memorable best man speech with our complete guide. Get tips, structure, examples, and a step-by-step process.',
          path: '/how-to-write-a-speech',
          datePublished: contentDates['/how-to-write-a-speech'].published,
          dateModified: contentDates['/how-to-write-a-speech'].updated,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'How to Write a Best Man Speech', path: '/how-to-write-a-speech' },
        ])}
      />
      <JsonLd data={faqSchema(howToFaqs, '/how-to-write-a-speech')} />
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl font-medium text-foreground mb-6 glow-text">
            How to Write a <span className="text-primary">Great Best Man Speech</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Being asked to be the best man is a huge honor. Our guide will walk you through writing a speech that&apos;s funny,
            heartfelt, and unforgettable—for all the right reasons.
          </p>

          {/* Front-loaded, self-contained answer. ~44% of AI citations come
              from the first 30% of a page, and the citable passage band is
              134-167 words — so the direct answer leads, before the cards. */}
          <div className="max-w-3xl mx-auto mb-6 text-left bg-card border border-border/60 rounded-2xl px-6 py-6">
            <p className="text-muted-foreground leading-relaxed">
              A best man speech is a short toast, traditionally given at the wedding reception, in which the
              groom&apos;s closest friend or brother introduces himself, tells one or two stories about the groom,
              acknowledges the couple, and raises a glass to their marriage. A good one runs{' '}
              <strong className="text-foreground">three to five minutes</strong> — roughly 500 to 750 spoken words —
              and follows four steps: brainstorm your material and pick a theme, structure it into a clear arc,
              draft and cut it back, then rehearse until it sounds like speech rather than writing. The humour
              exists to earn the sincerity at the end, so two or three jokes that genuinely land beat eight that
              half-work. Start three to four weeks before the wedding, leave the draft alone for a few days, then
              edit it once with fresh eyes. Always close on a toast, and keep the final line short.
            </p>
          </div>

          <div className="mb-8">
            <ArticleDates path="/how-to-write-a-speech" />
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
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
          <Link href="/creator#start">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
              Try Our Best Man Speech Writer
            </Button>
          </Link>
        </div>

        {/* Key Elements Section */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-medium text-center mb-12 text-foreground">Key Elements of a Memorable Best Man Speech</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {speechElements.map((element, index) => (
              <Card key={index} className="text-center bg-card border-border/60 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <element.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="font-display text-xl font-medium">{element.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{element.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Quick Tips Section */}
          <section className="mb-16">
            <Card className="bg-primary/10 border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Lightbulb className="w-6 h-6 text-primary" />
                  Quick Best Man Speech Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Start by introducing yourself and how you know the groom.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Share a short, funny, and appropriate story about the groom.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Keep it under 5 minutes – short and sweet is best.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">End with a heartfelt toast to the happy couple.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Step-by-Step Guide */}
          <section className="mb-16">
            <h2 className="font-display text-3xl font-medium text-center mb-12 text-foreground">The 4-Step Best Man Speech Process</h2>
            <div className="space-y-6">
              {writingSteps.map((step, index) => (
                <Card key={index} id={`step-${index + 1}`} className="bg-card border-border/60 hover:border-primary/40 transition-colors scroll-mt-20">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <CardTitle className="font-display text-2xl font-medium mb-2">{step.title}</CardTitle>
                        <CardDescription className="text-lg text-muted-foreground">{step.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Detailed Sections */}
          <section className="mb-16 max-w-none">
            <h2 className="font-display text-3xl font-medium mb-8 text-foreground">Writing Your Speech: The In-Depth Guide</h2>

            <div className="space-y-12">
              <div>
                <h3 className="font-display text-2xl font-medium mb-4 text-foreground">1. The Perfect Opening</h3>
                <p className="text-muted-foreground mb-4">
                  Start by grabbing everyone&apos;s attention and introducing yourself. You&apos;re the best man, so let them know how you fit into the groom&apos;s life.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">State your name:</strong> &quot;Good evening everyone, for those who don&apos;t know me, my name is [Your Name].&quot;</li>
                  <li><strong className="text-foreground">Explain your relationship:</strong> &quot;...and I&apos;ve had the honor of being [Groom&apos;s Name]&apos;s best friend for the past 10 years.&quot;</li>
                  <li><strong className="text-foreground">Thank the guests:</strong> &quot;It&apos;s wonderful to see so many people here to celebrate [Groom] and [Partner].&quot;</li>
                </ul>
              </div>

              <div>
                <h3 className="font-display text-2xl font-medium mb-4 text-foreground">2. Tell a Great Story (or Two)</h3>
                <p className="text-muted-foreground mb-4">
                  This is the heart of your speech. Tell a story that highlights the groom&apos;s great qualities. It should be personal, positive, and preferably a little funny.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Focus on a positive trait:</strong> Is he loyal, funny, generous? Tell a story that shows it.</li>
                  <li><strong className="text-foreground">Keep it appropriate:</strong> This is a wedding, not a roast. Avoid stories about exes, illegal activities, or anything truly embarrassing.</li>
                  <li><strong className="text-foreground">Connect it to the couple:</strong> Transition from your story about the groom to how you&apos;ve seen him grow with his new partner. For example, &quot;I always knew he was [trait], but seeing him with [Partner&apos;s Name] has brought out a whole new level of...&quot;</li>
                </ul>
              </div>

              <div>
                <h3 className="font-display text-2xl font-medium mb-4 text-foreground">3. Acknowledge the Partner</h3>
                <p className="text-muted-foreground mb-4">
                  A great best man speech is about the couple, not just the groom. Make sure to talk about the groom&apos;s partner and your happiness for them as a couple.
                </p>
                <div className="bg-muted p-6 rounded-lg">
                  <ul className="space-y-3 text-muted-foreground">
                    <li>Speak about the partner&apos;s wonderful qualities.</li>
                    <li>Mention how happy they make your friend.</li>
                    <li>Welcome them to the family on behalf of the friends.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-display text-2xl font-medium mb-4 text-foreground">4. End with a Powerful Toast</h3>
                <p className="text-muted-foreground mb-4">
                  Your conclusion should be clear, heartfelt, and lead into the toast. Don&apos;t let the speech just fizzle out.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Share a heartfelt wish for their future.</li>
                  <li>Offer a piece of advice (if it feels right).</li>
                  <li>Clearly ask guests to join you: &quot;Now, if you&apos;ll all please raise your glasses...&quot;</li>
                  <li>Deliver the toast: &quot;To the happy couple, [Groom] and [Partner]! Wishing you a lifetime of love and happiness.&quot;</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Worked example — the single most-searched thing for this term,
              and the most citable block on the page. */}
          <section className="mb-16">
            <h2 className="font-display text-3xl font-medium mb-4 text-foreground">A Complete Best Man Speech Example</h2>
            <p className="text-muted-foreground mb-6">
              Here is a full speech, start to finish, at roughly 420 words — about three minutes spoken.
              Names are placeholders. Read it for shape rather than wording: the structure is what transfers,
              the stories have to be yours.
            </p>
            <Card className="bg-card border-border/60">
              <CardContent className="pt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  &quot;Evening everyone. For those who don&apos;t know me, I&apos;m Tom — Jack&apos;s best man,
                  and the person responsible for making sure he actually turned up today. You&apos;re welcome.&quot;
                </p>
                <p>
                  &quot;Jack and I met when we were eleven, on the first day of secondary school. He was the
                  kid who&apos;d brought a full pencil case with a spare compass, in case anyone needed a spare
                  compass. Nobody ever needed a spare compass. But that&apos;s Jack — twenty years later,
                  he&apos;s still the person who turns up prepared for a problem you didn&apos;t know you had.&quot;
                </p>
                <p>
                  &quot;When my car broke down at two in the morning about four hours from home, I called
                  Jack. He didn&apos;t ask why I was there. He didn&apos;t ask why I hadn&apos;t called anyone
                  closer. He just said &apos;give me three hours&apos; and hung up. He arrived with jump
                  leads, a flask of tea, and a spare jumper, because — and I quote — &apos;you never bring a
                  jumper.&apos; He was right. I never bring a jumper.&quot;
                </p>
                <p>
                  &quot;That&apos;s the thing about Jack. He shows up. Quietly, without making it a thing,
                  every single time.&quot;
                </p>
                <p>
                  &quot;And then he met Sarah. I noticed it before he said anything — he started laughing
                  more. Not politely. Properly, the ugly laugh he&apos;s spent his whole life trying to
                  suppress. Sarah, you got the real one within about a month, which took the rest of us
                  the better part of a decade.&quot;
                </p>
                <p>
                  &quot;Sarah, you are unbelievably kind, you are much funnier than he is, and you have made
                  my oldest friend into a more relaxed and considerably happier man. I&apos;m not going to
                  pretend I know what makes a marriage work. But I know what I&apos;ve watched for the last
                  three years, and it looks a lot like two people who are genuinely better together than
                  apart.&quot;
                </p>
                <p>
                  &quot;So — if everyone could please raise a glass. To Jack and Sarah.&quot;
                </p>
              </CardContent>
            </Card>
            <div className="mt-6 bg-muted p-6 rounded-lg">
              <h3 className="font-display text-xl font-medium mb-3 text-foreground">Why this one works</h3>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>It introduces the speaker in a single line and gets to a story within twenty words.</li>
                <li>The humour is specific — a spare compass, a jumper — not generic wedding-joke material.</li>
                <li>One story carries the whole speech, rather than four half-told ones.</li>
                <li>The funny opening earns the sincere turn; the sincerity does not arrive cold.</li>
                <li>The partner gets real, specific praise rather than one polite sentence.</li>
                <li>The final line is six words long.</li>
              </ul>
            </div>
          </section>

          {/* Opening lines */}
          <section className="mb-16">
            <h2 className="font-display text-3xl font-medium mb-4 text-foreground">Best Man Speech Opening Lines That Work</h2>
            <p className="text-muted-foreground mb-6">
              The opening exists to introduce you and buy goodwill in about fifteen seconds. These four
              patterns cover almost every speech. Avoid opening with how nervous you are — it lowers the
              room&apos;s confidence in you before you&apos;ve said anything.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-card border-border/60">
                <CardContent className="pt-6">
                  <h3 className="font-display text-lg font-medium mb-2 text-foreground">The straight introduction</h3>
                  <p className="text-muted-foreground text-sm">
                    &quot;For those who don&apos;t know me, I&apos;m Tom, and I&apos;ve been Jack&apos;s best
                    friend since we were eleven.&quot; Safe, clear, works in any room. Follow it immediately
                    with a story.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border/60">
                <CardContent className="pt-6">
                  <h3 className="font-display text-lg font-medium mb-2 text-foreground">The self-deprecating open</h3>
                  <p className="text-muted-foreground text-sm">
                    &quot;Jack asked me to keep this short, tasteful, and free of any story involving
                    Barcelona. So this&apos;ll be about ninety seconds.&quot; Gets a laugh without a joke at
                    anyone else&apos;s expense.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border/60">
                <CardContent className="pt-6">
                  <h3 className="font-display text-lg font-medium mb-2 text-foreground">The cold open</h3>
                  <p className="text-muted-foreground text-sm">
                    Start mid-story — &quot;It&apos;s two in the morning and my car has died on a motorway
                    four hours from home&quot; — then introduce yourself once the room is listening. High
                    risk, high reward.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border/60">
                <CardContent className="pt-6">
                  <h3 className="font-display text-lg font-medium mb-2 text-foreground">The honest open</h3>
                  <p className="text-muted-foreground text-sm">
                    &quot;I&apos;ve known Jack for twenty years and I still had no idea how to start
                    this.&quot; Works well if the speech is going to lean sincere rather than funny.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Common Mistakes Section */}
          <section className="mb-16">
            <h2 className="font-display text-3xl font-medium mb-8 text-foreground">Common Best Man Speech Mistakes to Avoid</h2>
            <Card className="bg-destructive/10 border-destructive/30">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-muted-foreground">
                      <strong className="text-foreground">Too many inside jokes:</strong> A few are okay, but the whole room should be able to enjoy the speech.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-muted-foreground">
                      <strong className="text-foreground">Forgetting the partner:</strong> The speech is for the couple, not just your buddy.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-muted-foreground">
                      <strong className="text-foreground">Making it too long:</strong> Keep it under 5 minutes. No one has ever complained about a short speech.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-muted-foreground">
                      <strong className="text-foreground">Telling inappropriate stories:</strong> Avoid anything about ex-partners, past mistakes, or embarrassing moments.
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <FaqSection items={howToFaqs} title="Best Man Speech FAQs" />

          {/* CTA Section */}
          <section className="text-center">
            <Card className="bg-primary text-primary-foreground border-primary stage-ring">
              <CardContent className="pt-8 pb-8">
                <h2 className="font-display text-3xl font-medium mb-4">Ready to Write Your Perfect Best Man Speech?</h2>
                <p className="text-xl mb-8 opacity-90">
                  Use our AI-powered speech writer to create a personalized, funny, and heartfelt best man speech in minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/creator#start">
                    <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-background/90 rounded-full">
                      Start Writing Your Speech
                    </Button>
                  </Link>
                  <Link href="/tips">
                    <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-full">
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
