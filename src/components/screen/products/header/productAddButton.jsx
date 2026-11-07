import { Plus } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function ProductAddButton({ buttonRef, onAddProduct }) {
  return (
    <Button
      ref={buttonRef}
      type="button"
      onClick={onAddProduct}
      aria-keyshortcuts="Alt+N"
      title="Add product (Alt+N)"
      className="w-full sm:w-auto"
    >
      <Plus className="size-4" aria-hidden="true" />
      Add product
      <kbd className="hidden rounded border border-primary-foreground/25 bg-primary-foreground/10 px-1.5 py-0.5 font-mono text-[10px] leading-none sm:inline">
        Alt+N
      </kbd>
    </Button>
  );
}

export default ProductAddButton;
