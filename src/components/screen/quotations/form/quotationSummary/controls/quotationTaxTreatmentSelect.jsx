import { useDispatch, useSelector } from "react-redux";

import { QUOTATION_TAX_TREATMENT_OPTIONS } from "@Enums";
import { selectQuotationTaxTreatment } from "@Redux/quotation/quotation.selector";
import { quotationTaxTreatmentChanged } from "@Redux/quotation/quotation.slice";
import { Label } from "@shadcnComponent/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";

function QuotationTaxTreatmentSelect({ triggerRef, onKeyDown }) {
  const dispatch = useDispatch();
  const taxTreatment = useSelector(selectQuotationTaxTreatment);

  return (
    <section
      aria-labelledby="quotation-tax-treatment"
      className="grid min-w-0 gap-2"
    >
      <Label
        id="quotation-tax-treatment"
        htmlFor="quotation-tax-treatment-select"
      >
        Tax treatment
      </Label>
      <Select
        value={taxTreatment ?? ""}
        onValueChange={(value) =>
          dispatch(quotationTaxTreatmentChanged(value))
        }
      >
        <SelectTrigger
          ref={triggerRef}
          id="quotation-tax-treatment-select"
          onKeyDown={onKeyDown}
          className="w-full bg-background text-xs"
        >
          <SelectValue placeholder="Select tax treatment" />
        </SelectTrigger>
        <SelectContent>
          {QUOTATION_TAX_TREATMENT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  );
}

export default QuotationTaxTreatmentSelect;
