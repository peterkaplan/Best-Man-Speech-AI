"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { PenSquare, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-indigo-600'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <PenSquare className={`h-8 w-8 transition-colors duration-300 ${isScrolled ? 'text-indigo-600' : 'text-white'}`} />
            <span className={`ml-2 text-xl font-bold transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>BestManAI</span>
          </div>

          {/* Navigation Links - hidden on mobile */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="#" className={`text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-900 hover:text-indigo-600' : 'text-white hover:text-indigo-200'}`}>
              Home
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger className={`text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-900 hover:text-indigo-600' : 'text-white hover:text-indigo-200'}`}>
                Features <ChevronDown className="inline-block ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>AI-Powered Writing</DropdownMenuItem>
                <DropdownMenuItem>Speech Templates</DropdownMenuItem>
                <DropdownMenuItem>Joke Generator</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="#" className={`text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-900 hover:text-indigo-600' : 'text-white hover:text-indigo-200'}`}>
              Testimonials
            </a>
            <a href="#" className={`text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-900 hover:text-indigo-600' : 'text-white hover:text-indigo-200'}`}>
              Pricing
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex md:items-center">
            <Button className={`transition-all duration-300 transform hover:scale-105 ${isScrolled ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-white hover:bg-indigo-100 text-indigo-600'}`}>
              Get Started
            </Button>
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
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-indigo-50">Home</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-indigo-50">Features</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-indigo-50">Testimonials</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-indigo-50">Pricing</a>
          <div className="mt-4 px-3">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 transform hover:scale-105">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;