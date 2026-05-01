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
        "max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#46352f] bg-[linear-gradient(180deg,#221b18_0%,#181311_100%)] p-5 shadow-[0_30px_45px_-24px_rgba(0,0,0,0.9)] will-change-transform transform-gpu transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-7",
        isPanelVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      ].join(" ")}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative mb-5 border-b border-[#352b27] pb-4 pr-12">
        <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#97877d]">
          New House Entry
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
          id="add-cocktail-modal-title"
          className="pr-2 text-[1.45rem] font-semibold tracking-[0.01em] text-[#F3ECE7] sm:text-[1.65rem]"
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
