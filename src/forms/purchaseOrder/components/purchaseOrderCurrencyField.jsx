import {
  PURCHASE_AMOUNT_MAX,
  PURCHASE_AMOUNT_MIN,
} from "@Forms/purchaseOrder/purchaseOrder.validation.constants";
import PurchaseOrderFormField from "@Forms/purchaseOrder/components/purchaseOrderFormField";
import { Input } from "@shadcnComponent/input";

function PurchaseOrderCurrencyField({
  id,
  label,
  hint,
  max = PURCHASE_AMOUNT_MAX,
  inputProps,
  error,
  disabled = false,
}) {
  return (
    <PurchaseOrderFormField
      id={id}
      label={label}
      required
      hint={hint}
      error={error}
    >
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          ₹
        </span>
        <Input
          id={id}
          type="number"
          min={PURCHASE_AMOUNT_MIN}
          max={max}
          step="0.01"
          inputMode="decimal"
          disabled={disabled}
          {...inputProps}
          className="pl-7"
        />
      </div>
    </PurchaseOrderFormField>
  );
}

export default PurchaseOrderCurrencyField;
