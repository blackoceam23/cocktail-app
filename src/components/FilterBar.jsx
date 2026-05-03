import { FILTER_OPTIONS } from "../data/spirits.js";

export default function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <div className="border-b border-[#26262F] bg-[#0E0E13]/96">
      <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
        <p className="mb-4 border-t border-[#26262F]/80 pt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6A6A7A]">
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
                  "inline-flex cursor-pointer items-center justify-center rounded-full border px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BB5143]/50 sm:px-7",
                  isActive
                    ? "border-[#BB5143] bg-[#BB5143] text-white"
                    : "border-[#26262F] bg-[#16161C] text-[#6A6A7A] hover:border-[#38383F] hover:bg-[#1C1C24] hover:text-[#EEEDF2]",
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
