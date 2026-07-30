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

    // Focus first, synchronously, and before the scroll. Synchronously because
    // iOS only opens the keyboard for a focus() that happens inside the tap
    // that triggered it - deferring to a timeout or rAF gets the caret without
    // the keyboard. preventScroll because the scroll below is what should
    // decide where the page ends up.
    const field = document.querySelector<HTMLElement>('[data-answer-field]');
    field?.focus({ preventScroll: true });

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