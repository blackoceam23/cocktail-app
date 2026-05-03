import { X } from "lucide-react";
import AddCocktailForm from "./AddCocktailForm.jsx";

export default function AddCocktailModalPanel({
  open,
  isPanelVisible,
  closeRef,
  onClose,
  onSave,
  existingNames,
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-cocktail-modal-title"
      className={[
        "max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-[#26262F] bg-[linear-gradient(180deg,#1C1C24_0%,#131318_100%)] p-5 shadow-[0_32px_56px_-24px_rgba(0,0,0,0.95)] will-change-transform transform-gpu transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-7",
        isPanelVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      ].join(" ")}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative mb-5 border-b border-[#26262F] pb-4 pr-12">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#BB5143]">
          New House Entry
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
          id="add-cocktail-modal-title"
          className="font-display pr-2 text-[1.4rem] font-bold tracking-[-0.01em] text-[#EEEDF2] sm:text-[1.6rem]"
        >
          Add Recipe
        </h2>
      </div>

      <AddCocktailForm
        open={open}
        onClose={onClose}
        onSave={onSave}
        existingNames={existingNames}
      />
    </div>
  );
}
