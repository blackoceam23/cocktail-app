import { useEffect, useRef, useState } from "react";

/**
 * Returns true when the header should be visible.
 * Visible near the top of the page; hides on scroll-down past a threshold;
 * reappears on any meaningful scroll-up.
 */
export function useHeaderVisibility({ threshold = 80, hideAfter = 120 } = {}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      if (y < threshold) {
        setVisible(true);
      } else if (delta > 4 && y > hideAfter) {
        setVisible(false);
      } else if (delta < -4) {
        setVisible(true);
      }

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, hideAfter]);

  return visible;
}

/**
 * Combined header state: condense the hero into a slim bar after scrolling,
 * then allow hide-on-scroll-down only while condensed.
 */
export function useHeaderState({
  condenseEnter = 60,
  condenseExit = 40,
  hideAfter = 160,
} = {}) {
  const [condensed, setCondensed] = useState(false);
  const [visible, setVisible] = useState(true);
  const condensedRef = useRef(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      const nextCondensed = condensedRef.current
        ? y > condenseExit
        : y > condenseEnter;
      condensedRef.current = nextCondensed;
      setCondensed(nextCondensed);

      if (y < condenseEnter) {
        setVisible(true);
      } else if (nextCondensed && delta > 4 && y > hideAfter) {
        setVisible(false);
      } else if (delta < -4) {
        setVisible(true);
      } else if (!nextCondensed) {
        setVisible(true);
      }

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    const y0 = window.scrollY;
    condensedRef.current = y0 > condenseEnter;
    setCondensed(condensedRef.current);
    lastY = y0;
    if (condensedRef.current && y0 >= hideAfter) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [condenseEnter, condenseExit, hideAfter]);

  return { condensed, visible };
}
