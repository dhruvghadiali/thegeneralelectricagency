import { useDispatch, useSelector } from "react-redux";

import { INDIAN_GST_OPTIONS } from "@Enums";
import {
  selectQuotationGstPercentage,
  selectQuotationTaxTreatment,
} from "@Redux/product/quotation/quotation.selector";
import { quotationGstPercentageSelected } from "@Redux/product/quotation/quotation.slice";
import { Label } from "@shadcnComponent/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";

const GST_APPLICABLE_TREATMENTS = new Set(["gujarat", "out-of-gujarat"]);

function QuotationGstPercentage() {
  const dispatch = useDispatch();
  const taxTreatment = useSelector(selectQuotationTaxTreatment);
  const gstPercentage = useSelector(selectQuotationGstPercentage);

  if (!GST_APPLICABLE_TREATMENTS.has(taxTreatment)) return null;

  return (
    <section className="grid gap-2 rounded-lg border bg-muted/20 p-4">
      <Label htmlFor="quotation-gst-percentage">GST percentage</Label>
      <Select
        value={gstPercentage}
        onValueChange={(value) =>
          dispatch(quotationGstPercentageSelected(value))
        }
      >
        <SelectTrigger id="quotation-gst-percentage" className="bg-background">
          <SelectValue placeholder="Select GST percentage" />
        </SelectTrigger>
        <SelectContent>
          {INDIAN_GST_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  );
}

export default QuotationGstPercentage;
