import { Plus } from "lucide-react";

export default function AddRecipeCard({ onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex h-full min-h-[19rem] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#291c10] p-3 text-center text-[#e8d5b7] shadow-[0_12px_30px_-18px_rgba(0,0,0,0.65)] transition-all duration-300 sm:min-h-[22rem] sm:p-4 md:aspect-[5/7] md:hover:-translate-y-0.5 md:hover:shadow-[0_16px_36px_-18px_rgba(0,0,0,0.8)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]/70"
    >
      <span className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-[#c49a6c]/40" />
      <span className="pointer-events-none absolute left-4 top-4 h-2 w-2 rounded-full bg-[#c49a6c]/40" />
      <span className="pointer-events-none absolute bottom-4 right-4 h-2 w-2 rounded-full bg-[#c49a6c]/40" />

      <span className="relative mb-3 flex size-12 items-center justify-center rounded-full border border-[#c49a6c]/40 bg-[#3a2418] text-[#c49a6c] transition-colors md:group-hover:border-[#BB5143]/55 md:group-hover:text-[#f0d0c8]">
        <Plus className="size-6" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="relative font-serif-title text-xl font-semibold tracking-wide text-[#e8d5b7] sm:text-2xl">
        Add a recipe
      </span>
      <span className="relative mt-2 max-w-[12rem] text-xs text-[#c49a6c]/70">
        Save a drink to this device
      </span>
    </button>
  );
}
