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
  const notesText = trimmedNoteBody(cocktail.notes);
  const showNotes = notesText.length > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cocktail-modal-title"
      className={[
        "relative overflow-clip w-full max-w-lg rounded-xl border border-[#26262F] bg-[linear-gradient(135deg,#1C1C24_0%,#131318_100%)] shadow-[0_32px_56px_-24px_rgba(0,0,0,0.95)] will-change-transform transform-gpu transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isPanelVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      ].join(" ")}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Accent bar lives on the outer non-scrolling wrapper so it always spans the full visible panel height */}
      <span className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-[#BB5143]" />

      <div className="max-h-[85vh] overflow-y-auto p-5 sm:p-7">
        <div className="relative mb-5 border-b border-[#26262F] pb-4 pr-12">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#BB5143]">
            Signature Build
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            title="Close"
            className="absolute right-0 top-0 cursor-pointer rounded-lg p-2 text-[#6A6A7A] transition-colors hover:bg-[#22222C] hover:text-[#EEEDF2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BB5143]/50"
          >
            <X className="size-5" strokeWidth={2} aria-hidden />
          </button>
          <h2
            id="cocktail-modal-title"
            className="font-display pr-2 text-[1.4rem] font-bold tracking-[-0.01em] text-[#EEEDF2] sm:text-[1.6rem]"
          >
            {name}
          </h2>
        </div>

        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6A6A7A]">
          Ingredients
        </h3>
        <ul className="mb-5 list-inside list-disc space-y-1 text-sm leading-relaxed text-[#A8A8B8]">
          {ingredients.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6A6A7A]">
          Instructions
        </h3>
        <p className="mb-5 text-sm leading-relaxed text-[#A8A8B8]">{instructions}</p>

        {showNotes ? (
          <>
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#BB5143]">
              {noteHeading(
                typeof cocktail.noteAuthor === "string"
                  ? cocktail.noteAuthor
                  : undefined
              )}
            </h3>
            <p className="text-sm leading-relaxed text-[#A8A8B8]">{notesText}</p>
          </>
        ) : null}
      </div>
    </div>
  );
}
