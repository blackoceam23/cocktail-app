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
        "max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#D4AF37]/20 bg-[#0f141c]/95 p-6 shadow-[0_0_40px_-6px_rgba(212,175,55,0.32)] backdrop-blur-xl will-change-transform transform-gpu transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-8",
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
          id="add-cocktail-modal-title"
          className="font-serif-title pr-2 text-2xl font-semibold text-[#f0e6dc] sm:text-3xl"
        >
          New recipe
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
