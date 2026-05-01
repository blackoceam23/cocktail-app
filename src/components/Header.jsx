export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#372d29]/80 bg-[#171311]/94 supports-[backdrop-filter]:bg-[#171311]/88">
      <div className="relative px-4 py-9 sm:px-8 md:px-12 lg:px-24 xl:px-32">
        <span className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(187,81,67,0.08),transparent_64%)]" />
        <p className="relative mb-2 text-center text-[10px] font-medium uppercase tracking-[0.28em] text-[#97877d] sm:text-xs">
          House Menu
        </p>
        <h1 className="relative font-serif-title text-center text-[1.85rem] font-medium leading-[1.08] tracking-[0.02em] text-[#F3ECE7] sm:text-5xl lg:text-[3.25rem]">
          Our Little <span className="text-[#BB5143]">Red</span> Mix Room
        </h1>
      </div>
    </header>
  );
}
