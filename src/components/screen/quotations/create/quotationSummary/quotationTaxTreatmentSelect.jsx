import { useDispatch, useSelector } from "react-redux";

import { QUOTATION_TAX_TREATMENTS } from "@Enums";
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

const TAX_TREATMENT_OPTIONS = Object.freeze([
  Object.freeze({
    value: QUOTATION_TAX_TREATMENTS.GUJARAT,
    label: "Gujarat",
  }),
  Object.freeze({
    value: QUOTATION_TAX_TREATMENTS.OUT_OF_GUJARAT,
    label: "Out of Gujarat",
  }),
  Object.freeze({
    value: QUOTATION_TAX_TREATMENTS.SEZ_LUT,
    label: "SEZ LUT",
  }),
]);

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
          {TAX_TREATMENT_OPTIONS.map((option) => (
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
