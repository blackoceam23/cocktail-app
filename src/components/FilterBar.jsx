import { FILTER_OPTIONS } from "../data/spirits.js";

export default function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <div className="border-b border-[#372d29]/70 bg-[#181412]/94">
      <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
        <p className="mb-4 border-t border-[#372d29]/75 pt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#97877d]">
          Pick Your Base Spirit
        </p>
        <div className="flex flex-wrap gap-2.5">
          {FILTER_OPTIONS.map((label) => {
            const isActive = activeFilter === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => onFilterChange(label)}
                className={[
                  "inline-flex cursor-pointer items-center justify-center rounded-full border px-5 py-2 text-[12px] font-medium uppercase tracking-[0.14em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BB5143]/45 sm:px-7",
                  isActive
                    ? "border-[#BB5143]/70 bg-[#BB5143]/14 text-[#F3ECE7] shadow-[0_8px_18px_-14px_rgba(187,81,67,0.62)]"
                    : "border-[#3A302B] bg-[#1F1917] text-[#BFAFA4] hover:border-[#4A3A33] hover:bg-[#27211E] hover:text-[#F3ECE7]",
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
