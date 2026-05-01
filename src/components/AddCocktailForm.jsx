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
          className="rounded-lg border border-[#BB5143]/45 bg-[#BB5143]/12 px-3 py-2 text-sm text-[#F3ECE7]"
          role="alert"
        >
          {formError}
        </p>
      ) : null}

      <div className="border-b border-[#352b27]/80 pb-4">
        <label
          htmlFor="recipe-name"
          className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#97877d]"
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
            "w-full rounded-lg border bg-[#1A1614] px-3 py-2 text-sm text-[#F3ECE7] placeholder:text-[#97877d] focus:outline-none focus:ring-1",
            nameTaken
              ? "border-[#BB5143]/70 focus:border-[#BB5143]/70 focus:ring-[#BB5143]/35"
              : "border-[#3A302B] focus:border-[#BB5143]/55 focus:ring-[#BB5143]/30",
          ].join(" ")}
          placeholder="e.g. Summer Spritz"
          autoComplete="off"
        />
        {nameTaken ? (
          <p className="mt-2 text-sm text-[#C86255]" id="recipe-name-hint">
            A recipe with this name already exists. Choose a different name.
          </p>
        ) : null}
      </div>

      <fieldset className="border-b border-[#352b27]/80 pb-4">
        <legend className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#97877d]">
          Base spirits
        </legend>
        <div className="flex flex-wrap gap-2">
          {BASE_SPIRITS.map((spirit) => {
            const checked = form.bases.has(spirit);
            return (
              <label
                key={spirit}
                className={[
                  "cursor-pointer rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] transition-colors",
                  checked
                    ? "border-[#BB5143]/75 bg-[#BB5143]/16 text-[#F3ECE7]"
                    : "border-[#3A302B] bg-[#1A1614] text-[#C8B9AF] hover:border-[#4A3A33] hover:bg-[#2A2320]",
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
          className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#97877d]"
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
          className="w-full resize-y rounded-lg border border-[#3A302B] bg-[#1A1614] px-3 py-2 font-mono text-sm text-[#F3ECE7] placeholder:text-[#97877d] focus:border-[#BB5143]/55 focus:outline-none focus:ring-1 focus:ring-[#BB5143]/30"
          placeholder={"One ingredient per line\n2 oz Gin\n1 oz Lemon juice"}
        />
      </div>

      <div>
        <label
          htmlFor="recipe-instructions"
          className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#97877d]"
        >
          Instructions
        </label>
        <textarea
          id="recipe-instructions"
          value={form.instructions}
          onChange={(e) => setForm((f) => ({ ...f, instructions: e.target.value }))}
          rows={4}
          className="w-full resize-y rounded-lg border border-[#3A302B] bg-[#1A1614] px-3 py-2 text-sm leading-relaxed text-[#F3ECE7] placeholder:text-[#97877d] focus:border-[#BB5143]/55 focus:outline-none focus:ring-1 focus:ring-[#BB5143]/30"
          placeholder="How to make it"
        />
      </div>

      <div>
        <label
          htmlFor="recipe-notes"
          className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#97877d]"
        >
          Notes <span className="font-normal text-[#97877d]">(optional)</span>
        </label>
        <textarea
          id="recipe-notes"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          rows={2}
          className="w-full resize-y rounded-lg border border-[#3A302B] bg-[#1A1614] px-3 py-2 text-sm text-[#F3ECE7] placeholder:text-[#97877d] focus:border-[#BB5143]/55 focus:outline-none focus:ring-1 focus:ring-[#BB5143]/30"
          placeholder="Personal tips, pairings…"
        />
      </div>

      <div>
        <label
          htmlFor="recipe-note-author"
          className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#97877d]"
        >
          Note attribution
        </label>
        <select
          id="recipe-note-author"
          value={form.noteAuthor}
          onChange={(e) => setForm((f) => ({ ...f, noteAuthor: e.target.value }))}
          className="w-full rounded-lg border border-[#3A302B] bg-[#1A1614] px-3 py-2 text-sm text-[#F3ECE7] focus:border-[#BB5143]/55 focus:outline-none focus:ring-1 focus:ring-[#BB5143]/30"
        >
          {NOTE_AUTHORS.map((a) => (
            <option key={a} value={a}>
              {a === "Both" ? "Pha & Hua" : a}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-3 pt-1.5">
        <button
          type="submit"
          disabled={nameTaken}
          className="cursor-pointer rounded-full border border-[#BB5143]/70 bg-[#BB5143]/18 px-6 py-2.5 text-sm font-medium text-[#F3ECE7] shadow-[0_12px_24px_-16px_rgba(187,81,67,0.65)] transition-colors hover:bg-[#BB5143]/28 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BB5143]/45 disabled:pointer-events-none disabled:opacity-40"
        >
          Save recipe
        </button>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-full border border-[#3A302B] bg-[#1A1614] px-6 py-2.5 text-sm font-medium text-[#C8B9AF] transition-colors hover:border-[#4A3A33] hover:bg-[#2A2320] hover:text-[#F3ECE7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BB5143]/35"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
