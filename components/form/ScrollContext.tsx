"use client";
import React, { createContext, useContext, useRef } from 'react';


const ScrollContext = createContext<{
  formRef: React.RefObject<HTMLDivElement>;
  scrollToForm: () => void;
}>({
  formRef: { current: null },
  scrollToForm: () => {},
});

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    const offset = 70; // Offset in pixels
    const formElement = formRef.current;
  
    if (formElement) {
      const y = formElement.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <ScrollContext.Provider value={{ formRef, scrollToForm }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);