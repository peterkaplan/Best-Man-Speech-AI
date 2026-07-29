"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { PenSquare, GlassWater, Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// Hamburger icon component
const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    const checkWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setIsMobile(width < 768); // 768px is md breakpoint
      }
    };
    checkWidth();
    const resizeObserver = new ResizeObserver(checkWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, []);


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
        <div className="transition-all duration-300 text-foreground">
          <BestManSpeechAnimation />
        </div>
      );
    } else {
      return (
        <Link href="/creator">
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:scale-105"
          >
            Write Your Speech
          </Button>
        </Link>
      );
    }
  };

  // Destinations must match their labels. The homepage-only sections are
  // absolute-anchored so they still resolve from /creator, and /tips is a real
  // page that works from anywhere — previously all three collapsed to "/",
  // which left links named "Tips" and "Testimonials" pointing at the homepage.
  const navigationLinks = [
    { href: "/#how-it-works", label: "How it works" },
    { href: "/tips", label: "Tips" },
    { href: "/#testimonials", label: "Testimonials" },
  ];

  return (
    <header
      ref={containerRef}
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 bg-background/95 shadow-md border-b'
      )}
    >
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          {isMobile && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group hover:bg-accent hover:text-accent-foreground"
                  variant="ghost"
                  size="icon"
                >
                  <HamburgerIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-48 p-2">
                <NavigationMenu className="max-w-none">
                  <NavigationMenuList className="flex-col items-start gap-1">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <Link
                          href={link.href}
                          className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground no-underline text-foreground/80"
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuItem>
                    ))}
                    <NavigationMenuItem className="w-full mt-2">
                      <div className="px-3">
                        {renderCTAButton()}
                      </div>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          )}
          
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link 
              href="/"
              className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
            >
              <PenSquare className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">BestManSpeechAI</span>
            </Link>
            
            {/* Navigation menu */}
            {!isMobile && (
              <NavigationMenu className="flex">
                <NavigationMenuList className="gap-1">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <Link
                        href={link.href}
                        className={cn(
                          "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 no-underline",
                          "text-foreground/80 hover:text-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>
        </div>
        
        {/* Right side */}
        {!isMobile && (
          <div className="flex items-center gap-3">
            {renderCTAButton()}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;