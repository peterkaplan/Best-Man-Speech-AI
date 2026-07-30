import { useEffect, useState } from 'react';

// True while the element is past the bottom of what's actually on screen.
//
// Deliberately not IntersectionObserver: it measures against the layout
// viewport, which mobile browsers leave at full height when the on-screen
// keyboard opens, so a button sitting behind the keyboard still reads as
// visible. visualViewport is the thing that knows about the keyboard.
//
// Roughly half a button: a row poking a few pixels below the fold is still
// perfectly tappable, and calling that "out of view" puts a second Next on
// screen next to the one you can already press.
const EDGE_TOLERANCE = 20;

// `token` re-measures when something other than a scroll or resize moved the
// element — changing question, mostly, which swaps the content above it.
export default function useOutOfView(
  ref: React.RefObject<HTMLElement | null>,
  token?: unknown
): boolean {
  const [outOfView, setOutOfView] = useState(false);

  useEffect(() => {
    const measure = () => {
      const element = ref.current;
      if (!element) return;

      const viewport = window.visualViewport;
      // offsetTop because iOS clears the keyboard by scrolling the visual
      // viewport down inside the layout viewport rather than resizing anything,
      // and getBoundingClientRect is in layout-viewport coordinates.
      const visibleBottom = viewport
        ? viewport.offsetTop + viewport.height
        : window.innerHeight;

      setOutOfView(element.getBoundingClientRect().bottom - EDGE_TOLERANCE > visibleBottom);
    };

    // focusout lands before the next element takes focus, so let the layout
    // settle for a frame rather than measuring a half-finished state.
    let frame = 0;
    const measureNextFrame = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measureNextFrame();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('focusin', measureNextFrame);
    window.addEventListener('focusout', measureNextFrame);
    window.visualViewport?.addEventListener('resize', measure);
    window.visualViewport?.addEventListener('scroll', measure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      window.removeEventListener('focusin', measureNextFrame);
      window.removeEventListener('focusout', measureNextFrame);
      window.visualViewport?.removeEventListener('resize', measure);
      window.visualViewport?.removeEventListener('scroll', measure);
    };
  }, [ref, token]);

  return outOfView;
}
