import { useEffect, useState } from "react";
import { BASE_SPIRITS, NOTE_AUTHORS } from "../data/spirits.js";
import { normalizeRecipeName } from "../lib/recipeIdentity.js";

const emptyForm = () => ({
  name: "",
  bases: new Set(),
  ingredientsText: "",
  instructions: "",
  notes: "",
  noteAuthor: "Both",
});

export default function AddCocktailForm({
  open,
  onClose,
  onSave,
  existingNames,
}) {
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!open) return;
    setForm(emptyForm());
    setFormError("");
  }, [open]);

  const normalizedName = normalizeRecipeName(form.name);
  const nameTaken = normalizedName.length > 0 && existingNames?.has(normalizedName);

  const toggleBase = (spirit) => {
    setForm((prev) => {
      const next = new Set(prev.bases);
      if (next.has(spirit)) next.delete(spirit);
      else next.add(spirit);
      return { ...prev, bases: next };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    const name = form.name.trim();
    if (!name) {
      setFormError("Please enter a name.");
      return;
    }
    if (form.bases.size === 0) {
      setFormError("Select at least one base spirit.");
      return;
    }
    const ingredients = form.ingredientsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    if (ingredients.length === 0) {
      setFormError("Add at least one ingredient (one per line).");
      return;
    }
    const instructions = form.instructions.trim();
    if (!instructions) {
      setFormError("Please enter instructions.");
      return;
    }
    if (nameTaken) {
      setFormError("A recipe with this name already exists.");
      return;
    }

    const saved = onSave({
      name,
      bases: Array.from(form.bases),
      ingredients,
      instructions,
      notes: form.notes.trim(),
      noteAuthor: form.noteAuthor,
    });
    if (saved == null) {
      setFormError("Could not save — that name may already exist.");
      return;
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {formError ? (
        <p
          className="rounded-lg border border-[#BB5143]/40 bg-[#BB5143]/10 px-3 py-2 text-sm text-[#f0d0c8]"
          role="alert"
        >
          {formError}
        </p>
      ) : null}

      <div>
        <label
          htmlFor="recipe-name"
          className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#f0e6dc]/65"
        >
          Name
        </label>
        <input
          id="recipe-name"
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          aria-invalid={nameTaken || undefined}
          aria-describedby={nameTaken ? "recipe-name-hint" : undefined}
          className={[
            "w-full rounded-lg border bg-white/5 px-3 py-2 text-sm text-white/90 placeholder:text-white/35 focus:outline-none focus:ring-1",
            nameTaken
              ? "border-[#BB5143]/60 focus:border-[#BB5143]/50 focus:ring-[#BB5143]/30"
              : "border-white/15 focus:border-[#D4AF37]/50 focus:ring-[#D4AF37]/40",
          ].join(" ")}
          placeholder="e.g. Summer Spritz"
          autoComplete="off"
        />
        {nameTaken ? (
          <p className="mt-2 text-sm text-[#f0d0c8]" id="recipe-name-hint">
            A recipe with this name already exists. Choose a different name.
          </p>
        ) : null}
      </div>

      <fieldset>
        <legend className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#f0e6dc]/65">
          Base spirits
        </legend>
        <div className="flex flex-wrap gap-2">
          {BASE_SPIRITS.map((spirit) => {
            const checked = form.bases.has(spirit);
            return (
              <label
                key={spirit}
                className={[
                  "cursor-pointer rounded-full border px-3 py-1.5 text-sm transition-colors",
                  checked
                    ? "border-[#BB5143]/70 bg-[#BB5143]/15 text-[#f0d0c8]"
                    : "border-white/15 bg-white/5 text-white/80 hover:border-white/25",
                ].join(" ")}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleBase(spirit)}
                />
                {spirit}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="recipe-ingredients"
          className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#f0e6dc]/65"
        >
          Ingredients
        </label>
        <textarea
          id="recipe-ingredients"
          value={form.ingredientsText}
          onChange={(e) =>
            setForm((f) => ({ ...f, ingredientsText: e.target.value }))
          }
          rows={5}
          className="w-full resize-y rounded-lg border border-white/15 bg-white/5 px-3 py-2 font-mono text-sm text-white/90 placeholder:text-white/35 focus:border-[#D4AF37]/50 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/40"
          placeholder={"One ingredient per line\n2 oz Gin\n1 oz Lemon juice"}
        />
      </div>

      <div>
        <label
          htmlFor="recipe-instructions"
          className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#f0e6dc]/65"
        >
          Instructions
        </label>
        <textarea
          id="recipe-instructions"
          value={form.instructions}
          onChange={(e) => setForm((f) => ({ ...f, instructions: e.target.value }))}
          rows={4}
          className="w-full resize-y rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm leading-relaxed text-white/90 placeholder:text-white/35 focus:border-[#D4AF37]/50 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/40"
          placeholder="How to make it"
        />
      </div>

      <div>
        <label
          htmlFor="recipe-notes"
          className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#f0e6dc]/65"
        >
          Notes <span className="font-normal text-white/40">(optional)</span>
        </label>
        <textarea
          id="recipe-notes"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          rows={2}
          className="w-full resize-y rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/90 placeholder:text-white/35 focus:border-[#D4AF37]/50 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/40"
          placeholder="Personal tips, pairings…"
        />
      </div>

      <div>
        <label
          htmlFor="recipe-note-author"
          className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#f0e6dc]/65"
        >
          Note attribution
        </label>
        <select
          id="recipe-note-author"
          value={form.noteAuthor}
          onChange={(e) => setForm((f) => ({ ...f, noteAuthor: e.target.value }))}
          className="w-full rounded-lg border border-white/15 bg-[#0f141c] px-3 py-2 text-sm text-white/90 focus:border-[#D4AF37]/50 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/40"
        >
          {NOTE_AUTHORS.map((a) => (
            <option key={a} value={a}>
              {a === "Both" ? "Pha & Hua" : a}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={nameTaken}
          className="cursor-pointer rounded-full border border-[#BB5143]/70 bg-[#BB5143]/20 px-6 py-2.5 text-sm font-medium text-[#f0d0c8] shadow-[0_0_20px_-8px_rgba(187,81,67,0.4)] transition-colors hover:bg-[#BB5143]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BB5143]/60 disabled:pointer-events-none disabled:opacity-40"
        >
          Save recipe
        </button>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
