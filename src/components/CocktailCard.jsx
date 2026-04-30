export default function CocktailCard({ cocktail, onOpen }) {
  const { name } = cocktail;

  return (
    <button
      type="button"
      onClick={() => onOpen(cocktail)}
      className="group relative flex h-full min-h-[19rem] w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#2e1f13] p-3 text-left text-[#e8d5b7] shadow-[0_12px_30px_-18px_rgba(0,0,0,0.65)] transition-all duration-300 sm:min-h-[22rem] sm:p-4 md:aspect-[5/7] md:hover:-translate-y-0.5 md:hover:shadow-[0_16px_36px_-18px_rgba(0,0,0,0.8)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]/70"
    >
      <span className="pointer-events-none absolute inset-2 rounded-xl border border-[#c49a6c]/40" />
      <span className="pointer-events-none absolute left-4 top-4 h-2 w-2 rounded-full bg-[#c49a6c]/45" />
      <span className="pointer-events-none absolute bottom-4 right-4 h-2 w-2 rounded-full bg-[#c49a6c]/45" />

      <span className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-10">
        <span className="font-serif-title block text-balance text-center text-xl font-semibold leading-snug tracking-wide text-[#e8d5b7] sm:text-2xl md:text-3xl">
          {name}
        </span>
      </span>

      <span className="relative mt-auto border-t border-[#c49a6c]/30 pt-2 text-center font-serif-title text-xs uppercase tracking-[0.22em] text-[#c49a6c]/80 opacity-75 transition-opacity duration-300 group-hover:opacity-100">
        View recipe
      </span>
    </button>
  );
}
