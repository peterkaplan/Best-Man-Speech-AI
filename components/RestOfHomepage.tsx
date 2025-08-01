"use client";
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smile, Zap, Target, MessageCircle, CheckCircle, X  } from 'lucide-react';
import { Button } from "@/components/ui/button";

const RestOfHomepage = () => {
  const howItWorksRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const tipsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scrollToSection = (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === '#how-it-works') {
        scrollToSection('how-it-works');
      } else if (window.location.hash === '#testimonials') {
        scrollToSection('testimonials');
      } else if (window.location.hash === '#tips') {
        scrollToSection('tips');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check hash on initial load

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const benefits = [
    { icon: <Smile className="w-8 h-8 text-indigo-600" />, title: "Personal Touch", description: "Our AI understands wedding dynamics and your unique relationship with the groom, ensuring a speech that feels genuine and heartfelt." },
    { icon: <Zap className="w-8 h-8 text-indigo-600" />, title: "Time-Saving", description: "Generate a full speech draft in minutes, not hours. More time for bachelor party planning!" },
    { icon: <Target className="w-8 h-8 text-indigo-600" />, title: "Perfect Balance", description: "Strike the ideal balance between humor and sentiment, tailored to your preferences and the wedding's tone." },
    { icon: <MessageCircle className="w-8 h-8 text-indigo-600" />, title: "Instant Feedback", description: "Get real-time suggestions and improvements as you refine your speech to perfection." },
  ];

  const howItWorks = [
    { 
      step: 1, 
      title: "Answer a Few Quick Questions", 
      description: "Spend just 5 minutes telling us about you, the groom, and your epic bromance. No essay writing, we promise."
    },
    { 
      step: 2, 
      title: "Our AI Crafts Your Speeches", 
      description: "Sit back while our AI churns out multiple personalized speech drafts. It's like having a team of pro speechwriters, minus the hefty bar tab."
    },
    { 
      step: 3, 
      title: "Deliver and Enjoy the Applause", 
      description: "Pick your favorite, make any final tweaks, and boom - you're ready to nail that speech. Prepare for high-fives and maybe a few happy tears."
    }
  ];

  const testimonials = [
    { name: "Alex Johnson", role: "Best Man", quote: "BestManAI saved my speech! I was struggling to find the right words, but the AI gave me an amazing starting point that I could easily personalize. It understood the wedding context way better than ChatGPT ever could." },
    { name: "Chris Lee", role: "Best Man", quote: "I'm not a natural writer, but this tool made me sound like a pro. The groom and all the guests loved my speech! The specialized wedding knowledge really showed in the final product." },
  ];

  const faqs = [
    {
      question: "How is BestManAI different from using ChatGPT?",
      answer: "Unlike general AI tools, BestManAI is specifically trained on successful wedding speeches. It understands wedding etiquette, appropriate humor, and the right balance of sentimentality. Our AI also offers specialized features like tone adjustment and audience-specific content suggestions that general AI tools simply can't match."
    },
    {
      question: "What if I'm not satisfied with the generated speech?",
      answer: "We offer a 100% satisfaction guarantee. If you're not happy with your speech, we'll provide a full refund. But with our 98% satisfaction rate, we're confident you'll love your best man speech!"
    },
    {
      question: "I'm not a good writer. Can I still use this?",
      answer: "Absolutely! That's exactly why we created BestManAI. Our AI does the heavy lifting, so you don't need to be Shakespeare to deliver a great speech. We'll guide you through a simple questionnaire, and then our AI will craft a personalized speech based on your answers. You can then easily edit and refine it to make it sound just like you."
    },
    {
      question: "Is my information kept confidential?",
      answer: "Your privacy is our top priority. All the information you provide and the speeches generated are kept strictly confidential and it is not stored."
    },
    {
      question: "How long does it take to get my speech?",
      answer: "The entire process is quick and efficient. You'll spend about 5-10 minutes answering our tailored questions. Then, our AI will generate multiple speech options for you in just a few seconds. So, you can have a polished, personalized speech ready in less than 10 minutes!"
    }
  ];
  interface Feature {
    included: boolean;
    text: string;
  }
  
  interface PricingTierProps {
    title: string;
    originalPrice: string;
    features: Feature[];
    buttonText: string;
    highlighted?: boolean;
  }
  
  const PricingTier: React.FC<PricingTierProps> = ({ title, originalPrice, features, buttonText, highlighted = false }) => (
    <div className={`bg-white p-6 rounded-lg shadow-lg flex-1 ${highlighted ? 'border-2 border-green-500' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full">
          <span className="text-sm font-semibold">Now Free!</span>
        </div>
      </div>
      <div className="flex items-center justify-center mb-4">
        <span className="text-gray-400 line-through text-lg mr-2">{originalPrice}</span>
        <span className="text-3xl font-bold text-green-600">$0</span>
      </div>
      <ul className="mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm">
            {feature.included ? (
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
            )}
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
      <a href="/creator">
        <Button size="sm" className={`w-full ${highlighted ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition-all duration-300`}>
          {buttonText}
        </Button>
      </a>
    </div>
  );
  
  
  return (
    <div className="bg-white">
      {/* How It Works Section */}
      <section id="how-it-works" ref={howItWorksRef} className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-indigo-50 p-6 rounded-lg shadow-md"
              >
                <div className="text-3xl font-bold text-indigo-600 mb-4">Step {step.step}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="/creator">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 transform hover:scale-105">
                Try It Free
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef} className="py-20 bg-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">What Best Men Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow"
              >
                <p className="text-lg mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-indigo-600">{testimonial.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="tips" ref={tipsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Why Choose BestManAI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-indigo-50 p-6 rounded-lg shadow"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Output Section */}
      <section className="py-20 bg-indigo-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">See BestManAI in Action</h2>
          <div className="bg-white p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold mb-4">Example Speech Intro:</h3>
            <p className="text-gray-700 italic">
              &ldquo;Good evening everyone! I can’t believe this night is finally here.<br /> <br /> My name is Michael, and while Jake and I have no brothers I like to consider us unofficial ones.<br /> <br />I’m also an amateur fortune teller. Years ago, I predicted that Jake would marry someone way out of his league. Emily, thank you for proving me correct...&rdquo;
            </p>
          </div>
          <div className="text-center mt-8">
            <a href="/creator">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 transform hover:scale-105">
                Generate Your Custom Intro Now For Free
              </Button>
            </a>
          </div>
        </div>
      </section>


      {/* Pricing Section */}
      <section className="py-20 bg-gray-100">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Simple, Transparent Pricing</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
        <PricingTier
          title="Basic Speech"
          originalPrice="$2.99"
          features={[
            { included: true, text: "1 personalized speech" },
            { included: true, text: "PDF download" },
            { included: true, text: "Use high quality AI model" },
            { included: false, text: "Multiple speech options" },
          ]}
          buttonText="Get Started"
        />
        <PricingTier
          title="Premium Speech Pack"
          originalPrice="$4.99"
          features={[
            { included: true, text: "3 personalized speeches" },
            { included: true, text: "PDF download" },
            { included: true, text: "Use highest quality AI model" },
            { included: true, text: "Multiple speech options" },
          ]}
          buttonText="Get Premium"
          highlighted={true}
        />
      </div>
    </div>
  </section>


      {/* FAQ Section */}
      <section className="bg-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Craft Your Legendary Speech?</h2>
          <p className="text-xl text-indigo-100 mb-8">Join other best men who have delivered unforgettable speeches with BestManSpeechAI.</p>
          <a href="/creator">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105">
              Start Your Speech Now
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default RestOfHomepage;