import { Download } from "lucide-react";
import { useSelector } from "react-redux";

import {
  selectQuotationCompanyInformation,
  selectQuotationProductInformation,
} from "@Redux/quotation/quotation.selector";
import { Button } from "@shadcnComponent/button";

function CreateQuotationDownloadButton({ buttonRef, onKeyDown }) {
  const companyInformation = useSelector(selectQuotationCompanyInformation);
  const productInformation = useSelector(selectQuotationProductInformation);
  const shouldShow = Boolean(
    companyInformation && productInformation.length > 0,
  );

  if (!shouldShow) return null;

  return (
    <Button
      ref={buttonRef}
      type="button"
      size="sm"
      onKeyDown={onKeyDown}
      aria-keyshortcuts="Alt+D"
      title="Download PDF (Alt+D)"
      className="h-8"
    >
      <Download className="size-4" aria-hidden="true" />
      <span className="hidden sm:inline">Download PDF</span>
      <kbd className="hidden rounded border border-primary-foreground/25 bg-primary-foreground/10 px-1.5 py-0.5 font-mono text-[10px] leading-none lg:inline">
        Alt+D
      </kbd>
    </Button>
  );
}

export default CreateQuotationDownloadButton;
