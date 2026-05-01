import { useEffect, useRef, useState } from "react";
import CocktailModalPanel from "./CocktailModalPanel.jsx";

const OPEN_PANEL_DELAY_MS = 100;
const PANEL_TRANSITION_MS = 300;
const BACKDROP_FADE_MS = 180;
const CLOSE_BACKDROP_DELAY_MS = PANEL_TRANSITION_MS;
const CLOSE_UNMOUNT_DELAY_MS = CLOSE_BACKDROP_DELAY_MS + BACKDROP_FADE_MS + 40;

export default function CocktailModal({ cocktail, onClose }) {
  const closeRef = useRef(null);
  const [renderedCocktail, setRenderedCocktail] = useState(null);
  const [isBackdropVisible, setIsBackdropVisible] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    let rafId;
    let panelTimerId;
    let closeAnimRafId;
    let closeBackdropTimerId;
    let unmountTimerId;

    if (cocktail) {
      if (isClosing) setIsClosing(false);

      const isSameCocktail = renderedCocktail === cocktail;
      if (!isSameCocktail) setRenderedCocktail(cocktail);

      // Skip re-triggering the open sequence if it's already fully visible.
      if (!isSameCocktail) {
        setIsBackdropVisible(false);
        setIsPanelVisible(false);

        rafId = requestAnimationFrame(() => {
          setIsBackdropVisible(true);
          panelTimerId = window.setTimeout(() => {
            setIsPanelVisible(true);
          }, OPEN_PANEL_DELAY_MS);
        });
      }
    } else if (renderedCocktail && !isClosing) {
      // Defer close so the browser paints the fully open panel first (avoids exit "pop").
      closeAnimRafId = requestAnimationFrame(() => {
        setIsClosing(true);
        setIsPanelVisible(false);

        closeBackdropTimerId = window.setTimeout(() => {
          setIsBackdropVisible(false);
        }, CLOSE_BACKDROP_DELAY_MS);

        unmountTimerId = window.setTimeout(() => {
          setRenderedCocktail(null);
          setIsClosing(false);
        }, CLOSE_UNMOUNT_DELAY_MS);
      });
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (closeAnimRafId) cancelAnimationFrame(closeAnimRafId);
      if (panelTimerId) window.clearTimeout(panelTimerId);
      if (closeBackdropTimerId) window.clearTimeout(closeBackdropTimerId);
      if (unmountTimerId) window.clearTimeout(unmountTimerId);
    };
  }, [cocktail]);

  useEffect(() => {
    if (!renderedCocktail) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [renderedCocktail, onClose]);

  useEffect(() => {
    if (!isPanelVisible) return;
    closeRef.current?.focus();
  }, [isPanelVisible]);

  if (!renderedCocktail) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(187,81,67,0.16),rgba(0,0,0,0.82)_48%)] p-4 transition-opacity",
        isBackdropVisible
          ? "opacity-100 duration-[180ms] ease-out"
          : "opacity-0 duration-[180ms] ease-in",
      ].join(" ")}
      onClick={onClose}
      role="presentation"
    >
      <CocktailModalPanel
        cocktail={renderedCocktail}
        isPanelVisible={isPanelVisible}
        closeRef={closeRef}
        onClose={onClose}
      />
    </div>
  );
}
