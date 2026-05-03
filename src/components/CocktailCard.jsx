export default function CocktailCard({ cocktail, onOpen }) {
  const { name } = cocktail;

  return (
    <button
      type="button"
      onClick={() => onOpen(cocktail)}
      className="group relative flex h-full min-h-[19rem] w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#26262F] bg-[linear-gradient(135deg,#1C1C24_0%,#131318_100%)] p-5 text-left text-[#EEEDF2] shadow-[0_12px_28px_-16px_rgba(0,0,0,0.8)] transition-all duration-300 sm:min-h-[22rem] sm:p-6 md:aspect-[5/7] md:hover:-translate-y-2 md:hover:border-[#BB5143]/70 md:hover:shadow-[0_20px_44px_-12px_rgba(187,81,67,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BB5143]/50"
    >
      <span className="pointer-events-none absolute inset-y-0 left-0 w-[3px] rounded-l-xl bg-[#BB5143] opacity-60 transition-all duration-300 group-hover:w-[5px] group-hover:opacity-100" />

      <span className="relative flex min-h-0 flex-1 items-end px-2 pb-6 pt-8 sm:px-3 sm:pb-8 sm:pt-10">
        <span className="font-display block text-balance text-[1.3rem] font-bold leading-[1.1] tracking-[-0.01em] text-[#EEEDF2] sm:text-[1.5rem] md:text-[1.65rem]">
          {name}
        </span>
      </span>

      <span className="pointer-events-none relative mx-2 block h-px w-[calc(100%-1rem)] bg-[#26262F]" />
      <span className="relative mt-3 px-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#BB5143]/70 transition-colors duration-300 group-hover:text-[#EEEDF2]">
        View Build →
      </span>
    </button>
  );
}
