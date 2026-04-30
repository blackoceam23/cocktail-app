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
    <div className="min-h-screen pb-16">
      <Header />
      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-10 md:px-12 lg:px-24 xl:px-32">
        {pruneRemovedCount != null && pruneRemovedCount > 0 ? (
          <div
            className="mb-8 flex gap-3 rounded-2xl border border-[#D4AF37]/25 bg-white/[0.06] p-4 pr-10 backdrop-blur-md sm:p-5"
            role="status"
          >
            <p className="flex-1 text-sm leading-relaxed text-white/85">
              We removed{" "}
              <span className="font-medium text-[#f0e6dc]">
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
              className="shrink-0 cursor-pointer self-start rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]/60"
              aria-label="Dismiss notice"
            >
              <X className="size-5" strokeWidth={2} aria-hidden />
            </button>
          </div>
        ) : null}

        {filtered.length === 0 ? (
          <p className="mb-6 text-center text-white/50">
            No cocktails for this spirit yet.
          </p>
        ) : null}

        <ul className="grid auto-rows-fr list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
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
          <div className="mt-10 flex flex-col items-center gap-2 sm:items-end">
            <button
              type="button"
              onClick={exportMergedJson}
              className="font-serif-title cursor-pointer text-sm font-medium text-[#BB5143]/90 underline decoration-[#BB5143]/40 underline-offset-4 transition-colors hover:text-[#f0d0c8] hover:decoration-[#f0d0c8]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BB5143]/50"
            >
              Download recipes (JSON)
            </button>
            <p className="max-w-md text-center text-xs text-white/40 sm:text-right">
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
