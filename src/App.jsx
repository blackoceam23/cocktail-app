import { useMemo, useState } from "react";
import { ChevronRight, Plus, X } from "lucide-react";
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
    <div className="relative min-h-screen overflow-hidden bg-[#0C0C10] pb-14 text-[#EEEDF2]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#BB5143]/8 blur-[96px]" />
      </div>
      <Header />
      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <main className="relative mx-auto max-w-7xl px-4 py-7 sm:px-8 sm:py-9 md:px-12 lg:px-24 xl:px-32">
        {pruneRemovedCount != null && pruneRemovedCount > 0 ? (
          <div
            className="mb-7 flex gap-3 rounded-2xl border border-[#26262F] bg-[#16161C]/95 p-4 pr-10 sm:p-5"
            role="status"
          >
            <p className="flex-1 text-sm leading-relaxed text-[#A8A8B8]">
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
              className="shrink-0 cursor-pointer self-start rounded-lg p-1.5 text-[#6A6A7A] transition-colors hover:bg-[#22222C] hover:text-[#EEEDF2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BB5143]/45"
              aria-label="Dismiss notice"
            >
              <X className="size-5" strokeWidth={2} aria-hidden />
            </button>
          </div>
        ) : null}

        {filtered.length === 0 ? (
          <div className="mb-7 rounded-xl border border-dashed border-[#38383F] bg-[#16161C]/80 px-6 py-10 text-center shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] sm:py-14">
            <div className="flex flex-col items-center gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#BB5143]">
                Empty Glass
              </p>
              <h2 className="font-display text-[1.4rem] font-bold tracking-[-0.01em] text-[#EEEDF2] sm:text-[1.6rem]">
                Nothing pouring tonight
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-[#6A6A7A]">
                No cocktails on the list for this spirit yet. Try a different
                filter or add a house special.
              </p>
            </div>
            <div className="mx-auto mt-8 w-full max-w-md sm:max-w-lg">
              <button
                type="button"
                onClick={() => setAddModalOpen(true)}
                className="group relative flex w-full cursor-pointer items-center gap-4 overflow-hidden rounded-lg border border-[#26262F] bg-[#101014] px-4 py-4 text-left transition-all before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:rounded-l-lg before:bg-[#BB5143] before:opacity-30 before:transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BB5143]/45 sm:px-5 md:hover:-translate-y-0.5 md:hover:border-[#BB5143]/50 md:hover:shadow-[0_12px_28px_-16px_rgba(187,81,67,0.15)] md:group-hover:before:opacity-100"
              >
              <span className="relative flex size-11 shrink-0 items-center justify-center rounded-lg border border-[#26262F] bg-[#1C1C24] text-[#6A6A7A] transition-colors group-hover:border-[#BB5143]/50 group-hover:bg-[#BB5143]/12 group-hover:text-[#BB5143]">
                <Plus className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="relative flex min-w-0 flex-1 flex-col items-start gap-1">
                <span className="text-left text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6A6A7A] transition-colors group-hover:text-[#A8A8B8]">
                  Add recipe
                </span>
                <span className="font-display text-base font-bold tracking-[-0.01em] text-[#EEEDF2] sm:text-lg">
                  Add House Special
                </span>
              </span>
              <ChevronRight
                className="relative size-5 shrink-0 text-[#6A6A7A] transition-colors group-hover:text-[#BB5143]"
                strokeWidth={2}
                aria-hidden
              />
              </button>
            </div>
          </div>
        ) : (
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
        )}

        {hasUserRecipes ? (
          <div className="mt-9 flex flex-col items-center gap-2 sm:items-end">
            <button
              type="button"
              onClick={exportMergedJson}
              className="cursor-pointer text-sm font-medium text-[#BB5143] underline decoration-[#BB5143]/40 underline-offset-4 transition-colors hover:text-[#C86255] hover:decoration-[#C86255]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BB5143]/45"
            >
              Export House Menu (JSON)
            </button>
            <p className="max-w-md text-center text-xs text-[#6A6A7A] sm:text-right">
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
