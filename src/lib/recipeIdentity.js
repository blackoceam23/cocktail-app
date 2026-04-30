/** Normalize for duplicate checks: trim + lowercase. */
export function normalizeRecipeName(name) {
  if (typeof name !== "string") return "";
  return name.trim().toLowerCase();
}

/** Set of normalized names from a list of cocktails (seed and/or user). */
export function buildNormalizedNameSet(cocktails) {
  const set = new Set();
  for (const c of cocktails) {
    const key = normalizeRecipeName(c.name);
    if (key) set.add(key);
  }
  return set;
}

/**
 * Drop user-saved rows whose name matches a seed cocktail (by normalized name).
 * Fixes duplicates after promoting recipes into cocktails.json.
 */
export function pruneUserRecipesAgainstSeed(userRecipes, seedCocktails) {
  const seedNames = buildNormalizedNameSet(seedCocktails);
  const pruned = userRecipes.filter(
    (u) => !seedNames.has(normalizeRecipeName(u.name))
  );
  const removedCount = userRecipes.length - pruned.length;
  return { pruned, removedCount };
}
