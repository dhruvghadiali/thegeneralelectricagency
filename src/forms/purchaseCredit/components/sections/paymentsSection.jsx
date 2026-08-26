import _ from "lodash";
import { Plus, WalletCards } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import { formatPurchaseCreditAmount } from "@Forms/purchaseCredit/purchaseCreditForm.utils";
import { PURCHASE_CREDIT_SECTION_IDS } from "@Forms/purchaseCredit/purchaseCreditForm.constants";
import { EMPTY_PURCHASE_CREDIT_PAYMENT } from "@Forms/purchaseCredit/purchaseCredit.initialValues";

import FormSection from "@Forms/purchaseCredit/components/sections/formSection";
import PurchaseCreditPaymentFields from "@Forms/purchaseCredit/components/purchaseCreditPaymentFields";

function PaymentsSection({
  activeSection,
  toggleSection,
  errorCount,
  canManagePayments,
  formik,
  isEditing,
  today,
  errorFor,
  inputProps,
  addItem,
  removeItem,
}) {
  const sectionId = PURCHASE_CREDIT_SECTION_IDS.PAYMENTS;
  const paymentsTotal = _.sumBy(formik.values.payments, (payment) => {
    const amount = _.toNumber(payment.amount);
    return _.isFinite(amount) ? amount : 0;
  });

  return (
    <FormSection
      id={sectionId}
      icon={WalletCards}
      title="Payments"
      description={
        canManagePayments
          ? "Record payment dates, amounts, status, type, and receipts."
          : "Enter a valid purchase date and amount in Purchase credit schedule to unlock payments."
      }
      isOpen={activeSection === sectionId}
      errorCount={errorCount}
      amountSummary={`Payments ${formatPurchaseCreditAmount(paymentsTotal)}`}
      disabled={!canManagePayments}
      onOpen={() => toggleSection(sectionId)}
      action={
        <Button
          type="button"
          variant="outline"
          disabled={!canManagePayments}
          onClick={() => addItem("payments", EMPTY_PURCHASE_CREDIT_PAYMENT)}
          className="w-full sm:w-auto"
        >
          <Plus className="size-4" aria-hidden="true" />
          Add payment
        </Button>
      }
    >
      <PurchaseCreditPaymentFields
        payments={formik.values.payments}
        isEditing={isEditing}
        today={today}
        formik={formik}
        errorFor={errorFor}
        inputProps={inputProps}
        onRemove={(index) => removeItem("payments", index)}
      />
    </FormSection>
  );
}

export default PaymentsSection;
