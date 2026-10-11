import { useMemo } from "react";
import { useFormik } from "formik";
import { LoaderCircle } from "lucide-react";

import {
  PURCHASE_CREDIT_PAYMENT_STATUSES,
  PURCHASE_CREDIT_PAYMENT_STATUS_OPTIONS,
  PURCHASE_CREDIT_PAYMENT_TYPES,
  PURCHASE_CREDIT_PAYMENT_TYPE_OPTIONS,
} from "@Enums";
import { PURCHASE_CREDIT_REFERENCE_ID_MAX_LENGTH } from "@Forms/purchaseCredit/purchaseCredit.validation.constants";
import { plannedPaymentCompletionValidationSchema } from "@Forms/purchaseCredit/purchaseCredit.validation.schema";
import PurchaseCreditDatePicker from "@Forms/purchaseCredit/components/purchaseCreditDatePicker";
import PurchaseCreditFileUploader from "@Forms/purchaseCredit/components/purchaseCreditFileUploader";
import PurchaseCreditFormField from "@Forms/purchaseCredit/components/purchaseCreditFormField";
import PurchaseCreditSelectField from "@Forms/purchaseCredit/components/purchaseCreditSelectField";
import { Button } from "@shadcnComponent/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcnComponent/dialog";
import { Input } from "@shadcnComponent/input";
import { Textarea } from "@shadcnComponent/textarea";

function PurchaseCreditPaymentPlanningCompletionDialog({
  open,
  plan,
  today,
  isSubmitting = false,
  submissionError,
  onCancel,
  onConfirm,
}) {
  const initialValues = useMemo(
    () => ({
      paymentStatus: PURCHASE_CREDIT_PAYMENT_STATUSES.IN_PROGRESS,
      amount: plan?.amount ?? "",
      paymentType: plan?.paymentType ?? "",
      referenceId: plan?.completionPayment?.referenceId ?? "",
      paymentDate: plan?.remindingDate ?? "",
      receivedPaymentDate: "",
      notes: plan?.completionPayment?.notes ?? "",
      paymentReceipts: plan?.completionPayment?.paymentReceipts ?? [],
    }),
    [plan],
  );
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: plannedPaymentCompletionValidationSchema,
    onSubmit: (values) => onConfirm(plannedPaymentCompletionValidationSchema.cast(values)),
  });
  const referenceIdDisabled =
    formik.values.paymentType === PURCHASE_CREDIT_PAYMENT_TYPES.CASH;
  const fieldError = (field) =>
    formik.touched[field] && formik.errors[field] ? formik.errors[field] : null;

  const closeDialog = () => {
    onCancel();
  };

  return (
    <Dialog
      open={open}
      modal={false}
      onOpenChange={(nextOpen) =>
        !nextOpen && !isSubmitting && closeDialog()
      }
    >
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Complete planned payment</DialogTitle>
          <DialogDescription>
            Review the payment information before marking this payment plan as completed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="grid gap-5" noValidate>
          {submissionError && (
            <div
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
            >
              {submissionError}
            </div>
          )}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <PurchaseCreditFormField
              id="planned-payment-status"
              label="Payment status"
              required
              error={fieldError("paymentStatus")}
            >
              <PurchaseCreditSelectField
                id="planned-payment-status"
                value={formik.values.paymentStatus}
                options={PURCHASE_CREDIT_PAYMENT_STATUS_OPTIONS}
                disabled
                error={fieldError("paymentStatus")}
              />
            </PurchaseCreditFormField>

            <PurchaseCreditFormField
              id="planned-payment-amount"
              label="Amount"
              required
              error={fieldError("amount")}
            >
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                <Input
                  id="planned-payment-amount"
                  type="text"
                  value={formik.values.amount}
                  disabled
                  className="pl-7"
                />
              </div>
            </PurchaseCreditFormField>

            <PurchaseCreditFormField
              id="planned-payment-type"
              label="Payment type"
              required
              error={fieldError("paymentType")}
            >
              <PurchaseCreditSelectField
                id="planned-payment-type"
                value={formik.values.paymentType}
                options={PURCHASE_CREDIT_PAYMENT_TYPE_OPTIONS}
                disabled
                error={fieldError("paymentType")}
              />
            </PurchaseCreditFormField>

            <PurchaseCreditFormField
              id="planned-payment-reference-id"
              label="Reference ID"
              required={!referenceIdDisabled}
              hint={
                referenceIdDisabled
                  ? "Reference ID is not required for cash payments."
                  : undefined
              }
              error={fieldError("referenceId")}
            >
              <Input
                id="planned-payment-reference-id"
                name="referenceId"
                value={formik.values.referenceId}
                maxLength={PURCHASE_CREDIT_REFERENCE_ID_MAX_LENGTH}
                disabled={referenceIdDisabled}
                placeholder="Transaction reference"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-invalid={Boolean(fieldError("referenceId"))}
                aria-describedby={fieldError("referenceId") ? "planned-payment-reference-id-error" : undefined}
              />
            </PurchaseCreditFormField>

            <PurchaseCreditFormField
              id="planned-payment-date"
              label="Payment date"
              required
              error={fieldError("paymentDate")}
            >
              <PurchaseCreditDatePicker
                id="planned-payment-date"
                label="Payment date"
                value={formik.values.paymentDate}
                max={today}
                disabled
                required
                error={fieldError("paymentDate")}
              />
            </PurchaseCreditFormField>

            <PurchaseCreditFormField
              id="planned-payment-settlement-date"
              label="Settlement date"
              error={fieldError("receivedPaymentDate")}
            >
              <PurchaseCreditDatePicker
                id="planned-payment-settlement-date"
                label="Settlement date"
                value={formik.values.receivedPaymentDate}
                max={today}
                disabled
                error={fieldError("receivedPaymentDate")}
              />
            </PurchaseCreditFormField>
          </div>

          <PurchaseCreditFormField
            id="planned-payment-notes"
            label="Notes"
            error={fieldError("notes")}
          >
            <Textarea
              id="planned-payment-notes"
              name="notes"
              value={formik.values.notes}
              placeholder="Optional payment notes"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={Boolean(fieldError("notes"))}
              aria-describedby={fieldError("notes") ? "planned-payment-notes-error" : undefined}
            />
          </PurchaseCreditFormField>

          <PurchaseCreditFormField
            id="planned-payment-receipts"
            label="Payment receipts"
            error={fieldError("paymentReceipts")}
          >
            <PurchaseCreditFileUploader
              id="planned-payment-receipts"
              value={formik.values.paymentReceipts}
              error={fieldError("paymentReceipts")}
              onChange={(value) => formik.setFieldValue("paymentReceipts", value, true)}
              onBlur={() => formik.setFieldTouched("paymentReceipts", true, true)}
            />
          </PurchaseCreditFormField>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={closeDialog}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <LoaderCircle
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              {isSubmitting ? "Confirming…" : "Confirm payment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PurchaseCreditPaymentPlanningCompletionDialog;
