import { Plus } from "lucide-react";

export default function AddRecipeCard({ onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex h-full min-h-[19rem] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#3A302B] bg-[linear-gradient(180deg,#201916_0%,#171311_100%)] p-3 text-center text-[#F3ECE7] shadow-[0_14px_30px_-18px_rgba(0,0,0,0.72)] transition-all duration-300 sm:min-h-[22rem] sm:p-4 md:aspect-[5/7] md:hover:-translate-y-0.5 md:hover:border-[#5A433A] md:hover:bg-[linear-gradient(180deg,#241c19_0%,#191412_100%)] md:hover:shadow-[0_20px_38px_-18px_rgba(0,0,0,0.86)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BB5143]/45"
    >
      <span className="pointer-events-none absolute inset-2 rounded-xl border border-[#3A302B]/75" />
      <span className="pointer-events-none absolute right-4 top-4 text-[10px] uppercase tracking-[0.18em] text-[#97877d]">
        Custom
      </span>

      <span className="relative mb-3 flex size-12 items-center justify-center rounded-full border border-[#4A3A33] bg-[#191412] text-[#C8B9AF] transition-colors md:group-hover:border-[#BB5143]/60 md:group-hover:bg-[#BB5143]/10 md:group-hover:text-[#C86255]">
        <Plus className="size-6" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="relative text-[1.25rem] font-semibold tracking-[0.01em] text-[#F3ECE7] sm:text-[1.5rem]">
        Add House Special
      </span>
      <span className="relative mt-2 max-w-[12rem] text-[11px] text-[#97877d]">
        Save a new menu entry on this device
      </span>
    </button>
  );
}
