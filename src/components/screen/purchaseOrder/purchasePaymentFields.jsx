import { Trash2, WalletCards } from "lucide-react";

import { PAYMENT_MODE_OPTIONS, PAYMENT_STATUS_OPTIONS } from "@Enums";
import {
  PAYMENT_REFERENCE_NUMBER_MAX_LENGTH,
  PURCHASE_AMOUNT_MAX,
  PURCHASE_AMOUNT_MIN,
} from "@Forms/purchaseOrder/purchaseOrder.validation.constants";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import PurchaseOrderDatePicker from "@screenComponent/purchaseOrder/purchaseOrderDatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";

function PurchasePaymentFields({
  payments,
  formik,
  errorFor,
  inputProps,
  onRemove,
}) {
  if (payments.length === 0) {
    return (
      <div className="rounded-lg border border-dashed px-4 py-8 text-center">
        <WalletCards
          className="mx-auto size-7 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="mt-2 text-sm font-medium">No payment records added</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Payment records are optional and can be added as needed.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {payments.map((payment, paymentIndex) => {
        const prefix = `payments[${paymentIndex}]`;
        const statusError = errorFor(`${prefix}.paymentStatus`);

        return (
          <div
            key={paymentIndex}
            className="rounded-xl border bg-muted/10 p-4 sm:p-5"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="font-medium">Payment {paymentIndex + 1}</p>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove payment ${paymentIndex + 1}`}
                onClick={() => onRemove(paymentIndex)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </Button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="grid content-start gap-2">
                <label
                  htmlFor={`payment-status-${paymentIndex}`}
                  className="text-sm font-medium"
                >
                  Payment status <span className="text-destructive">*</span>
                </label>
                <Select
                  value={payment.paymentStatus}
                  onValueChange={(value) =>
                    formik.setFieldValue(
                      `${prefix}.paymentStatus`,
                      value,
                      true,
                    )
                  }
                  onOpenChange={(open) =>
                    !open &&
                    formik.setFieldTouched(
                      `${prefix}.paymentStatus`,
                      true,
                      true,
                    )
                  }
                >
                  <SelectTrigger
                    id={`payment-status-${paymentIndex}`}
                    aria-invalid={Boolean(statusError)}
                    aria-describedby={
                      statusError
                        ? `payment-status-${paymentIndex}-error`
                        : undefined
                    }
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {statusError && (
                  <p
                    id={`payment-status-${paymentIndex}-error`}
                    role="alert"
                    className="text-xs font-medium text-destructive"
                  >
                    {statusError}
                  </p>
                )}
              </div>

              <div className="grid content-start gap-2">
                <label
                  htmlFor={`payment-amount-${paymentIndex}`}
                  className="text-sm font-medium"
                >
                  Payment amount <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    ₹
                  </span>
                  <Input
                    id={`payment-amount-${paymentIndex}`}
                    type="number"
                    min={PURCHASE_AMOUNT_MIN}
                    max={PURCHASE_AMOUNT_MAX}
                    step="0.01"
                    inputMode="decimal"
                    {...inputProps(
                      `${prefix}.paymentAmount`,
                      `payment-amount-${paymentIndex}`,
                    )}
                    className="pl-7"
                  />
                </div>
                {errorFor(`${prefix}.paymentAmount`) && (
                  <p
                    id={`payment-amount-${paymentIndex}-error`}
                    role="alert"
                    className="text-xs font-medium text-destructive"
                  >
                    {errorFor(`${prefix}.paymentAmount`)}
                  </p>
                )}
              </div>

              {[
                {
                  field: "paymentMode",
                  label: "Payment mode",
                  type: "select",
                },
                {
                  field: "paymentDate",
                  label: "Payment date",
                  type: "date",
                },
                {
                  field: "expectedPaymentDate",
                  label: "Expected payment date",
                  type: "date",
                },
                {
                  field: "paymentReferenceNumber",
                  label: "Reference number",
                  type: "text",
                  placeholder: "Transaction or cheque number",
                },
              ].map(({ field, label, type, placeholder }) => {
                const path = `${prefix}.${field}`;
                const id = `${field}-${paymentIndex}`;
                const error = errorFor(path);
                const isRequired = [
                  "paymentMode",
                  "paymentDate",
                  "expectedPaymentDate",
                ].includes(field);
                const isCreateDisabled = field === "paymentReferenceNumber";

                return (
                  <div key={field} className="grid content-start gap-2">
                    <label htmlFor={id} className="text-sm font-medium">
                      {label}
                      {isRequired && (
                        <span className="text-destructive"> *</span>
                      )}
                    </label>
                    {type === "date" ? (
                      <PurchaseOrderDatePicker
                        id={id}
                        label={label}
                        value={payment[field]}
                        disabled={isCreateDisabled}
                        error={error}
                        onChange={(value) =>
                          formik.setFieldValue(path, value, true)
                        }
                        onBlur={() =>
                          formik.setFieldTouched(path, true, true)
                        }
                      />
                    ) : type === "select" ? (
                      <Select
                        value={payment[field]}
                        onValueChange={(value) =>
                          formik.setFieldValue(path, value, true)
                        }
                        onOpenChange={(open) =>
                          !open && formik.setFieldTouched(path, true, true)
                        }
                      >
                        <SelectTrigger
                          id={id}
                          aria-invalid={Boolean(error)}
                          aria-describedby={error ? `${id}-error` : undefined}
                        >
                          <SelectValue placeholder="Select payment mode" />
                        </SelectTrigger>
                        <SelectContent>
                          {PAYMENT_MODE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        disabled={isCreateDisabled}
                        maxLength={
                          field === "paymentReferenceNumber"
                            ? PAYMENT_REFERENCE_NUMBER_MAX_LENGTH
                            : undefined
                        }
                        {...inputProps(path, id)}
                      />
                    )}
                    {error && (
                      <p
                        id={`${id}-error`}
                        role="alert"
                        className="text-xs font-medium text-destructive"
                      >
                        {error}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PurchasePaymentFields;
