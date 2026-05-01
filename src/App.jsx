import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { useCocktails } from "./hooks/useCocktails.js";
import Header from "./components/Header.jsx";
import FilterBar from "./components/FilterBar.jsx";
import CocktailCard from "./components/CocktailCard.jsx";
import CocktailModal from "./components/CocktailModal.jsx";
import AddRecipeCard from "./components/AddRecipeCard.jsx";
import AddCocktailModal from "./components/AddCocktailModal.jsx";

export default function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const {
    allCocktails,
    existingNameSet,
    hasUserRecipes,
    addRecipe,
    exportMergedJson,
    pruneRemovedCount,
    dismissPruneNotice,
  } = useCocktails();

  const handleOpenCocktail = (cocktail) => {
    setSelectedCocktail(cocktail);
  };

  const filtered = useMemo(() => {
    if (activeFilter === "All") return allCocktails;
    return allCocktails.filter((c) => c.bases.includes(activeFilter));
  }, [activeFilter, allCocktails]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#120f0e] pb-14 text-[#F3ECE7]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#BB5143]/10 blur-3xl" />
        <div className="absolute top-52 -left-16 h-56 w-56 rounded-full bg-[#9f5b4d]/8 blur-3xl" />
      </div>
      <Header />
      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <main className="relative mx-auto max-w-7xl px-4 py-7 sm:px-8 sm:py-9 md:px-12 lg:px-24 xl:px-32">
        <div className="mb-7 flex items-center gap-4">
          <span className="h-px flex-1 bg-[#3A302B]" />
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#97877d]">
            Tonight&apos;s Pour List
          </p>
          <span className="h-px flex-1 bg-[#3A302B]" />
        </div>
        {pruneRemovedCount != null && pruneRemovedCount > 0 ? (
          <div
            className="mb-7 flex gap-3 rounded-2xl border border-[#3A302B] bg-[#1A1614]/95 p-4 pr-10 sm:p-5"
            role="status"
          >
            <p className="flex-1 text-sm leading-relaxed text-[#C8B9AF]">
              We removed{" "}
              <span className="font-medium text-[#BB5143]">
                {pruneRemovedCount}
              </span>{" "}
              saved recipe
              {pruneRemovedCount === 1 ? "" : "s"} that already appear in the
              built-in list (for example after a menu update). Your built-in
              recipes are unchanged.
            </p>
            <button
              type="button"
              onClick={dismissPruneNotice}
              className="shrink-0 cursor-pointer self-start rounded-lg p-1.5 text-[#9C8D83] transition-colors hover:bg-[#2A2320] hover:text-[#F3ECE7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BB5143]/45"
              aria-label="Dismiss notice"
            >
              <X className="size-5" strokeWidth={2} aria-hidden />
            </button>
          </div>
        ) : null}

        {filtered.length === 0 ? (
          <p className="mb-6 text-center text-[#9C8D83]">
            Nothing on tonight&apos;s list for this spirit yet.
          </p>
        ) : null}

        <ul className="grid auto-rows-fr list-none grid-cols-1 gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cocktail) => (
            <li key={cocktail.id ?? cocktail.name} className="h-full min-h-0">
              <CocktailCard
                cocktail={cocktail}
                onOpen={handleOpenCocktail}
              />
            </li>
          ))}
          <li className="h-full min-h-0">
            <AddRecipeCard onOpen={() => setAddModalOpen(true)} />
          </li>
        </ul>

        {hasUserRecipes ? (
          <div className="mt-9 flex flex-col items-center gap-2 sm:items-end">
            <button
              type="button"
              onClick={exportMergedJson}
              className="cursor-pointer text-sm font-medium text-[#BB5143] underline decoration-[#BB5143]/40 underline-offset-4 transition-colors hover:text-[#C86255] hover:decoration-[#C86255]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BB5143]/45"
            >
              Export House Menu (JSON)
            </button>
            <p className="max-w-md text-center text-xs text-[#9C8D83] sm:text-right">
              Includes built-in recipes and ones you added in this browser.
            </p>
          </div>
        ) : null}
      </main>

      <CocktailModal
        cocktail={selectedCocktail}
        onClose={() => setSelectedCocktail(null)}
      />

      <AddCocktailModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={addRecipe}
        existingNames={existingNameSet}
      />
    </div>
  );
}
