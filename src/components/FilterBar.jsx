import { FILTER_OPTIONS } from "../data/spirits.js";

export default function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <div className="bg-[#0a0e14]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
        <p className="border-t border-white/30 mb-3 pt-8 text-xs font-medium uppercase tracking-widest text-white/45">
          Base spirits
        </p>
        <div className="flex flex-wrap gap-3">
          {FILTER_OPTIONS.map((label) => {
            const isActive = activeFilter === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => onFilterChange(label)}
                className={[
                  "font-serif-title inline-flex cursor-pointer items-center justify-center rounded-full border px-6 py-1 text-base tracking-wider transition-colors sm:px-8",
                  isActive
                    ? "border-[#BB5143]/70 bg-[#BB5143]/15 text-[#f0d0c8] font-bold shadow-[0_0_20px_-8px_rgba(187,81,67,0.5)]"
                    : "border-white/45 bg-white/5 text-white font-medium hover:border-white/25 hover:bg-white/10",
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
