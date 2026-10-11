import { useDispatch, useSelector } from "react-redux";

import { TAX_TREATMENTS } from "@Enums";
import {
  selectQuotationCompany,
  selectQuotationTaxTreatment,
} from "@Redux/product/quotation/quotation.selector";
import { quotationTaxTreatmentSelected } from "@Redux/product/quotation/quotation.slice";
import { Label } from "@shadcnComponent/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@shadcnComponent/radio-group";
import { cn } from "@/lib/utils";

function QuotationTaxTreatment() {
  const dispatch = useDispatch();
  const company = useSelector(selectQuotationCompany);
  const selectedTreatment = useSelector(selectQuotationTaxTreatment);

  if (!company) return null;

  return (
    <section
      aria-labelledby="quotation-tax-treatment-title"
      className="rounded-lg border bg-muted/20 p-4"
    >
      <h3 id="quotation-tax-treatment-title" className="text-sm font-semibold">
        GST treatment
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Select the tax treatment applicable to this quotation.
      </p>

      <RadioGroup
        value={selectedTreatment}
        onValueChange={(value) =>
          dispatch(quotationTaxTreatmentSelected(value))
        }
        className="mt-4 grid-cols-3 gap-2"
        aria-labelledby="quotation-tax-treatment-title"
      >
        {TAX_TREATMENTS.map((treatment) => {
          const id = `quotation-tax-${treatment.value}`;

          return (
            <Label
              key={treatment.value}
              htmlFor={id}
              className={cn(
                "flex min-w-0 cursor-pointer items-start gap-2 rounded-lg border bg-background px-2.5 py-3 transition-colors hover:bg-accent",
                selectedTreatment === treatment.value &&
                  "border-primary bg-primary/5 ring-1 ring-primary/20",
              )}
            >
              <RadioGroupItem
                id={id}
                value={treatment.value}
                className="mt-0.5 size-5 border-2 border-neutral-700 bg-background data-[state=checked]:border-primary data-[state=checked]:bg-primary/10 dark:border-neutral-300"
              />
              <span className="min-w-0">
                <span className="block text-sm font-medium">
                  {treatment.label}
                </span>
                <span className="block text-xs font-normal text-muted-foreground">
                  {treatment.description}
                </span>
              </span>
            </Label>
          );
        })}
      </RadioGroup>
    </section>
  );
}

export default QuotationTaxTreatment;
