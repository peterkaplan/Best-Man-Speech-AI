import React from 'react';
import Link from 'next/link';
import { PenSquare, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and tagline */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center">
              <PenSquare className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold">BestManAI</span>
            </Link>
            <p className="mt-2 text-sm">Crafting unforgettable best man speeches with AI.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#how-it-works" className="text-sm hover:text-indigo-200 transition-colors duration-300">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/how-to-write-a-speech" className="text-sm hover:text-indigo-200 transition-colors duration-300">
                  How to Write a Speech
                </Link>
              </li>
              <li>
                <Link href="/bachelor-party-speech" className="text-sm hover:text-indigo-200 transition-colors duration-300">
                  Bachelor Party Speech
                </Link>
              </li>
              <li>
                <Link href="/tips" className="text-sm hover:text-indigo-200 transition-colors duration-300">
                  Tips
                </Link>
              </li>
              <li>
                <Link href="/twogrooms" className="text-sm hover:text-indigo-200 transition-colors duration-300">
                  Tips for Two Grooms
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-sm hover:text-indigo-200 transition-colors duration-300">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/creator" className="text-sm hover:text-indigo-200 transition-colors duration-300">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal & Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm hover:text-indigo-200 transition-colors duration-300">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-indigo-200 transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:help@bestmanspeechai.com" className="text-sm hover:text-indigo-200 transition-colors duration-300">
                  help@bestmanspeechai.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-indigo-500">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              © {new Date().getFullYear()} BestManAI. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;