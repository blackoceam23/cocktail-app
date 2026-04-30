import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import seedCocktails from "../data/cocktails.json";
import {
  buildNormalizedNameSet,
  normalizeRecipeName,
  pruneUserRecipesAgainstSeed,
} from "../lib/recipeIdentity.js";
import { loadUserRecipes, saveUserRecipes } from "../lib/userCocktailsStorage.js";

export function useCocktails() {
  const [userRecipes, setUserRecipes] = useState(loadUserRecipes);
  const [pruneRemovedCount, setPruneRemovedCount] = useState(null);
  const pruneRanRef = useRef(false);

  useEffect(() => {
    if (pruneRanRef.current) return;
    pruneRanRef.current = true;

    const raw = loadUserRecipes();
    const { pruned, removedCount } = pruneUserRecipesAgainstSeed(
      raw,
      seedCocktails
    );
    if (removedCount > 0) {
      saveUserRecipes(pruned);
      setUserRecipes(pruned);
      setPruneRemovedCount(removedCount);
    }
  }, []);

  const allCocktails = useMemo(
    () => [...seedCocktails, ...userRecipes],
    [userRecipes]
  );

  const existingNameSet = useMemo(
    () => buildNormalizedNameSet(allCocktails),
    [allCocktails]
  );

  const hasUserRecipes = userRecipes.length > 0;

  const addRecipe = useCallback(
    (recipe) => {
      const key = normalizeRecipeName(recipe.name);
      if (!key || existingNameSet.has(key)) return null;

      const id = crypto.randomUUID();
      const next = {
        ...recipe,
        id,
        name: recipe.name.trim(),
        bases: recipe.bases,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions.trim(),
        notes: typeof recipe.notes === "string" ? recipe.notes.trim() : "",
        noteAuthor: recipe.noteAuthor,
      };
      setUserRecipes((prev) => {
        const updated = [...prev, next];
        saveUserRecipes(updated);
        return updated;
      });
      return next;
    },
    [existingNameSet]
  );

  const exportMergedJson = useCallback(() => {
    const json = JSON.stringify(allCocktails, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `cocktails-export-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [allCocktails]);

  const dismissPruneNotice = useCallback(() => {
    setPruneRemovedCount(null);
  }, []);

  return {
    seedCocktails,
    userRecipes,
    allCocktails,
    existingNameSet,
    hasUserRecipes,
    addRecipe,
    exportMergedJson,
    pruneRemovedCount,
    dismissPruneNotice,
  };
}
