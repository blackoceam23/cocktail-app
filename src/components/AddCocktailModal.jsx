import { useEffect, useRef, useState } from "react";
import AddCocktailModalPanel from "./AddCocktailModalPanel.jsx";

const OPEN_PANEL_DELAY_MS = 100;
const PANEL_TRANSITION_MS = 300;
const BACKDROP_FADE_MS = 180;
const CLOSE_BACKDROP_DELAY_MS = PANEL_TRANSITION_MS;
const CLOSE_UNMOUNT_DELAY_MS =
  CLOSE_BACKDROP_DELAY_MS + BACKDROP_FADE_MS + 40;

export default function AddCocktailModal({ open, onClose, onSave, existingNames }) {
  const closeRef = useRef(null);
  const [renderedShell, setRenderedShell] = useState(false);
  const [isBackdropVisible, setIsBackdropVisible] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    let rafId;
    let panelTimerId;
    let closeAnimRafId;
    let closeBackdropTimerId;
    let unmountTimerId;

    if (open) {
      if (isClosing) setIsClosing(false);

      setRenderedShell(true);
      setIsBackdropVisible(false);
      setIsPanelVisible(false);

      rafId = requestAnimationFrame(() => {
        setIsBackdropVisible(true);
        panelTimerId = window.setTimeout(() => {
          setIsPanelVisible(true);
        }, OPEN_PANEL_DELAY_MS);
      });
    } else if (renderedShell && !isClosing) {
      closeAnimRafId = requestAnimationFrame(() => {
        setIsClosing(true);
        setIsPanelVisible(false);

        closeBackdropTimerId = window.setTimeout(() => {
          setIsBackdropVisible(false);
        }, CLOSE_BACKDROP_DELAY_MS);

        unmountTimerId = window.setTimeout(() => {
          setRenderedShell(false);
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
  }, [open]);

  useEffect(() => {
    if (!renderedShell) return undefined;

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
  }, [renderedShell, onClose]);

  useEffect(() => {
    if (!isPanelVisible) return;
    closeRef.current?.focus();
  }, [isPanelVisible]);

  if (!renderedShell) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm transition-opacity",
        isBackdropVisible
          ? "opacity-100 duration-[180ms] ease-out"
          : "opacity-0 duration-[180ms] ease-in",
      ].join(" ")}
      onClick={onClose}
      role="presentation"
    >
      <AddCocktailModalPanel
        open={open}
        isPanelVisible={isPanelVisible}
        closeRef={closeRef}
        onClose={onClose}
        onSave={onSave}
        existingNames={existingNames}
      />
    </div>
  );
}
