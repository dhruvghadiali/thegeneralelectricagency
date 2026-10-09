import { useRef } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@routes/navigate";
import { Button } from "@shadcnComponent/button";
import useQuotationKeyboardShortcut from "@screenComponent/quotations/hooks/useQuotationKeyboardShortcut";

function QuotationHeader() {
  const navigate = useNavigate();
  const newQuotationButtonRef = useRef(null);

  useQuotationKeyboardShortcut(newQuotationButtonRef);

  return (
    <header className="flex justify-end">
      <Button
        ref={newQuotationButtonRef}
        type="button"
        onClick={() => navigate(ROUTES.QUOTATION_NEW)}
        aria-keyshortcuts="Alt+N"
        title="New quotation (Alt+N)"
        className="w-full sm:w-auto"
      >
        <Plus className="size-4" aria-hidden="true" />
        New quotation
        <kbd className="hidden rounded border border-primary-foreground/25 bg-primary-foreground/10 px-1.5 py-0.5 font-mono text-[10px] leading-none sm:inline">
          Alt+N
        </kbd>
      </Button>
    </header>
  );
}

export default QuotationHeader;
