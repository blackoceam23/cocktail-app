import { X } from "lucide-react";

function noteHeading(noteAuthor) {
  switch (noteAuthor) {
    case "Hua":
      return "Hua's Note";
    case "Pha":
      return "Pha's Note";
    case "Both":
      return "Pha & Hua's Notes";
    default:
      return "Notes";
  }
}

function trimmedNoteBody(notes) {
  if (typeof notes !== "string") return "";
  return notes.trim();
}

export default function CocktailModalPanel({
  cocktail,
  isPanelVisible,
  closeRef,
  onClose,
}) {
  const { name, ingredients, instructions } = cocktail;
  const bases = Array.isArray(cocktail.bases) ? cocktail.bases : [];
  const notesText = trimmedNoteBody(cocktail.notes);
  const showNotes = notesText.length > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cocktail-modal-title"
      className={[
        "max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#D4AF37]/20 bg-[#0f141c]/95 p-6 shadow-[0_0_40px_-6px_rgba(212,175,55,0.32)] backdrop-blur-xl will-change-transform transform-gpu transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-8",
        isPanelVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      ].join(" ")}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative mb-6 pr-12">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          title="Close"
          className="absolute right-0 top-0 cursor-pointer rounded-lg p-2 text-[#D4AF37] transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]/70"
        >
          <X className="size-5" strokeWidth={2} aria-hidden />
        </button>
        <h2
          id="cocktail-modal-title"
          className="font-serif-title pr-2 text-2xl font-semibold text-[#f0e6dc] sm:text-3xl"
        >
          {name}
        </h2>
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#f0e6dc]/65">
        Base spirits
      </p>
      <div className="mb-8 flex flex-wrap gap-2">
        {bases.map((b) => (
          <span
            key={b}
            className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/75"
          >
            {b}
          </span>
        ))}
      </div>

      <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#f0e6dc]/65">
        Ingredients
      </h3>
      <ul className="mb-6 list-inside list-disc space-y-1 text-sm text-white/85">
        {ingredients.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#f0e6dc]/65">
        Instructions
      </h3>
      <p className="mb-6 text-sm leading-relaxed text-white/80">{instructions}</p>

      {showNotes ? (
        <>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]/80">
            {noteHeading(
              typeof cocktail.noteAuthor === "string"
                ? cocktail.noteAuthor
                : undefined
            )}
          </h3>
          <p className="text-sm leading-relaxed text-white/75">{notesText}</p>
        </>
      ) : null}
    </div>
  );
}
