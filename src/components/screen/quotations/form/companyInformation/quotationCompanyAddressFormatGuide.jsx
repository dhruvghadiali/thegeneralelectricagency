import { Info } from "lucide-react";

export const QUOTATION_COMPANY_ADDRESS_GUIDE_ID =
  "quotation-address-format-guide";

function QuotationCompanyAddressFormatGuide() {
  return (
    <div
      id={QUOTATION_COMPANY_ADDRESS_GUIDE_ID}
      role="note"
      className="rounded-md border border-destructive bg-destructive/5 p-3 text-xs text-destructive"
    >
      <div className="flex items-start gap-2">
        <Info
          className="mt-0.5 size-4 shrink-0"
          aria-hidden="true"
        />
        <div className="grid gap-1">
          <p className="font-medium">Address format for a new company</p>
          <p>
            Enter a comma-separated address ending with the state and a
            6-digit PIN code. Use a space or hyphen before the PIN code, or use
            commas when adding India at the end.
          </p>
          <p className="font-medium">
            Example: Shop 10, Ashram Road, Ahmedabad, Gujarat - 380009
          </p>
        </div>
      </div>
    </div>
  );
}

export default QuotationCompanyAddressFormatGuide;
