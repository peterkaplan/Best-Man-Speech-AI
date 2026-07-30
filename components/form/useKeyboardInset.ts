import { useEffect, useState } from 'react';

// Mobile browsers shrink the *visual* viewport when the on-screen keyboard opens
// but leave the layout viewport alone, so `window.innerHeight` and anything
// `position: fixed` still stretch behind the keyboard. This returns how far a
// fixed element has to be lifted off the bottom to sit just above it, in CSS
// pixels, or 0 when no keyboard is up.
//
// Pinch-zoom shrinks the visual viewport too, so the inset only counts while a
// typed field holds focus, and anything shorter than a keyboard (browser chrome
// settling, address bar) is ignored.
const MIN_KEYBOARD_HEIGHT = 120;

const isTyping = () => {
  const active = document.activeElement;
  if (!active) return false;
  if (active.tagName === 'TEXTAREA') return true;
  return (
    active instanceof HTMLInputElement &&
    active.type !== 'checkbox' &&
    active.type !== 'radio'
  );
};

export default function useKeyboardInset(): number {
  const [inset, setInset] = useState(0);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    // offsetTop matters on iOS: rather than resizing anything, it scrolls the
    // visual viewport up inside the layout viewport to clear the keyboard, and
    // that shift eats into the same gap.
    const measure = () => {
      const overlap = window.innerHeight - viewport.height - viewport.offsetTop;
      setInset(isTyping() && overlap > MIN_KEYBOARD_HEIGHT ? Math.round(overlap) : 0);
    };

    // focusout lands before the next element takes focus, so measuring on the
    // spot would read document.body and flap the bar closed between questions.
    let frame = 0;
    const measureNextFrame = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    viewport.addEventListener('resize', measure);
    viewport.addEventListener('scroll', measure);
    window.addEventListener('focusin', measureNextFrame);
    window.addEventListener('focusout', measureNextFrame);

    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener('resize', measure);
      viewport.removeEventListener('scroll', measure);
      window.removeEventListener('focusin', measureNextFrame);
      window.removeEventListener('focusout', measureNextFrame);
    };
  }, []);

  return inset;
}
