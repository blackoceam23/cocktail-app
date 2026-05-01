export default function CocktailCard({ cocktail, onOpen }) {
  const { name } = cocktail;

  return (
    <button
      type="button"
      onClick={() => onOpen(cocktail)}
      className="group relative flex h-full min-h-[19rem] w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#3A302B] bg-[linear-gradient(180deg,#211a18_0%,#171311_100%)] p-3 text-left text-[#F3ECE7] shadow-[0_14px_30px_-18px_rgba(0,0,0,0.72)] transition-all duration-300 sm:min-h-[22rem] sm:p-4 md:aspect-[5/7] md:hover:-translate-y-0.5 md:hover:border-[#5A433A] md:hover:bg-[linear-gradient(180deg,#251d1a_0%,#191412_100%)] md:hover:shadow-[0_20px_38px_-18px_rgba(0,0,0,0.86)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BB5143]/45"
    >
      <span className="pointer-events-none absolute inset-2 rounded-xl border border-[#3A302B]/75" />
      <span className="pointer-events-none absolute right-4 top-4 text-[10px] uppercase tracking-[0.18em] text-[#97877d]">
        House
      </span>

      <span className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-10">
        <span className="font-serif-title block text-balance text-center text-[1.35rem] font-semibold leading-[1.15] tracking-[0.01em] text-[#F3ECE7] sm:text-[1.55rem] md:text-[1.75rem]">
          {name}
        </span>
      </span>

      <span className="pointer-events-none relative mt-auto block h-px w-full bg-[#3A302B]" />
      <span className="relative mt-2 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-[#BB5143]/80 transition-colors duration-300 group-hover:text-[#C86255]">
        View Build
      </span>
    </button>
  );
}
