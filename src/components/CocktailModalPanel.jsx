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
        "max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#46352f] bg-[linear-gradient(180deg,#221b18_0%,#181311_100%)] p-5 shadow-[0_30px_45px_-24px_rgba(0,0,0,0.9)] will-change-transform transform-gpu transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-7",
        isPanelVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      ].join(" ")}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative mb-5 border-b border-[#352b27] pb-4 pr-12">
        <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#97877d]">
          Signature Build
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          title="Close"
          className="absolute right-0 top-0 cursor-pointer rounded-lg p-2 text-[#C8B9AF] transition-colors hover:bg-[#27201d] hover:text-[#C86255] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BB5143]/45"
        >
          <X className="size-5" strokeWidth={2} aria-hidden />
        </button>
        <h2
          id="cocktail-modal-title"
          className="pr-2 text-[1.45rem] font-semibold tracking-[0.01em] text-[#F3ECE7] sm:text-[1.65rem]"
        >
          {name}
        </h2>
      </div>

      <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#97877d]">
        Ingredients
      </h3>
      <ul className="mb-5 list-inside list-disc space-y-1 text-sm leading-relaxed text-[#C8B9AF]">
        {ingredients.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#97877d]">
        Instructions
      </h3>
      <p className="mb-5 text-sm leading-relaxed text-[#C8B9AF]">{instructions}</p>

      {showNotes ? (
        <>
          <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#BB5143]">
            {noteHeading(
              typeof cocktail.noteAuthor === "string"
                ? cocktail.noteAuthor
                : undefined
            )}
          </h3>
          <p className="text-sm leading-relaxed text-[#C8B9AF]">{notesText}</p>
        </>
      ) : null}
    </div>
  );
}
