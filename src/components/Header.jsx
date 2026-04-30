export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-[#0a0e14]/85 backdrop-blur-md supports-[backdrop-filter]:bg-[#0a0e14]/70">
      <div className="px-4 py-10 sm:px-8 md:px-12 lg:px-24 xl:px-32">
        <h1 className="font-serif-title text-center text-2xl font-medium text-[#f0e6dc] sm:text-4xl lg:text-6xl">
          Our Little <span className="text-[#BB5143]">Red</span> Mix Room
        </h1>
      </div>
    </header>
  );
}
