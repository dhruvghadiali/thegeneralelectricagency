import { useDispatch, useSelector } from "react-redux";

import { INDIAN_GST_OPTIONS } from "@Enums";
import { selectQuotationGstPercentage } from "@Redux/quotation/quotation.selector";
import { quotationGstPercentageChanged } from "@Redux/quotation/quotation.slice";
import { Label } from "@shadcnComponent/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";

function QuotationGstPercentageSelect({ triggerRef, onKeyDown }) {
  const dispatch = useDispatch();
  const gstPercentage = useSelector(selectQuotationGstPercentage);

  return (
    <section
      aria-labelledby="quotation-gst-percentage"
      className="grid min-w-0 gap-2"
    >
      <Label
        id="quotation-gst-percentage"
        htmlFor="quotation-gst-percentage-select"
      >
        GST percentage
      </Label>
      <Select
        value={gstPercentage}
        onValueChange={(value) =>
          dispatch(quotationGstPercentageChanged(value))
        }
      >
        <SelectTrigger
          ref={triggerRef}
          id="quotation-gst-percentage-select"
          onKeyDown={onKeyDown}
          className="w-full bg-background text-xs"
        >
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

export default QuotationGstPercentageSelect;
