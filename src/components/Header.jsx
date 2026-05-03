import { useLayoutEffect, useRef, useState } from "react";
import { useHeaderState } from "../hooks/useScrollDirection.js";

export default function Header() {
  const { condensed, visible } = useHeaderState();
  const headerRef = useRef(null);
  const [height, setHeight] = useState(0);

  const isVisible = visible || !condensed;

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return undefined;

    const measure = () => setHeight(el.offsetHeight);

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      style={{
        marginBottom: !isVisible && height > 0 ? `-${height}px` : 0,
      }}
      className={[
        "sticky top-0 z-20 border-b border-[#26262F] bg-[#0C0C10]/95 supports-[backdrop-filter]:bg-[#0C0C10]/85 supports-[backdrop-filter]:backdrop-blur-md",
        "transition-[padding,transform,margin-bottom] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        condensed ? "py-3 sm:py-3.5" : "py-8 sm:py-9",
        isVisible ? "translate-y-0" : "-translate-y-full pointer-events-none",
      ].join(" ")}
    >
      <div className="relative min-w-0 px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
        <p
          className={[
            "overflow-hidden text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-[#BB5143] sm:text-[11px]",
            "transition-[max-height,opacity,margin-bottom] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            condensed ? "mb-0 max-h-0 opacity-0" : "mb-2 max-h-6 opacity-100",
          ].join(" ")}
        >
          House Menu
        </p>

        <h1
          className={[
            "font-display text-center font-bold leading-[1.05] tracking-[-0.02em] text-[#EEEDF2]",
            "transition-[font-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            condensed
              ? "text-[1rem] sm:text-[1.1rem]"
              : "text-[1.75rem] sm:text-[2.75rem] lg:text-[3rem]",
          ].join(" ")}
        >
          <span className="block sm:inline">
            Our Little <span className="text-[#BB5143]">Red</span>
          </span>
          {" "}
          <span className="block sm:inline">Mix Room</span>
        </h1>
      </div>
    </header>
  );
}
