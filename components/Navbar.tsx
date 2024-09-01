"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { PenSquare, GlassWater, Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isOnCreatorPage = pathname === '/creator';

  const BestManSpeechAnimation = () => (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Crafting your speech</span>
      <div className="flex items-center space-x-1">
        <PenSquare className="w-4 h-4 animate-bounce" style={{ animationDelay: '0s' }} />
        <GlassWater className="w-4 h-4 animate-bounce" style={{ animationDelay: '0.2s' }} />
        <Heart className="w-4 h-4 animate-bounce" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );

  const renderCTAButton = () => {
    if (isOnCreatorPage) {
      return (
        <div className={`transition-all duration-300 ${
          isScrolled ? 'text-indigo-600' : 'text-white'
        }`}>
          <BestManSpeechAnimation />
        </div>
      );
    } else {
      return (
        <Link href="/creator">
          <Button 
            className={`transition-all duration-300 transform hover:scale-105 ${
              isScrolled ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-white hover:bg-indigo-100 text-indigo-600'
            }`}
          >
            Get Started
          </Button>
        </Link>
      );
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-indigo-600'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <PenSquare className={`h-8 w-8 transition-colors duration-300 ${isScrolled ? 'text-indigo-600' : 'text-white'}`} />
            <span className={`ml-2 text-xl font-bold transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>BestManAI</span>
          </Link>

          {/* Navigation Links - hidden on mobile */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href={isOnCreatorPage ? "/" : "/#how-it-works"} className={`text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-900 hover:text-indigo-600' : 'text-white hover:text-indigo-200'}`}>
              How it works
            </Link>
            <Link href={isOnCreatorPage ? "/" : "/#tips"} className={`text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-900 hover:text-indigo-600' : 'text-white hover:text-indigo-200'}`}>
              Tips
            </Link>
            <Link href={isOnCreatorPage ? "/" : "/#testimonials"} className={`text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-900 hover:text-indigo-600' : 'text-white hover:text-indigo-200'}`}>
              Testimonials
            </Link>
          </div>

          {/* CTA Button or Best Man Speech Animation */}
          <div className="hidden md:flex md:items-center">
            {renderCTAButton()}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={`text-white hover:text-indigo-200 ${isScrolled ? 'text-gray-900 hover:text-indigo-600' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          <Link href={isOnCreatorPage ? "/" : "/#how-it-works"} onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-indigo-50">How it works</Link>
          <Link href={isOnCreatorPage ? "/" : "/#tips"} onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-indigo-50">Tips</Link>
          <Link href={isOnCreatorPage ? "/" : "/#testimonials"} onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-indigo-50">Testimonials</Link>
          <div className="mt-4 px-3">
            {renderCTAButton()}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;