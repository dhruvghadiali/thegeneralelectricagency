import _ from "lodash";
import { IndianRupee, Plus } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import { formatPurchaseCreditAmount } from "@Forms/purchaseCredit/purchaseCreditForm.utils";
import { PURCHASE_CREDIT_SECTION_IDS } from "@Forms/purchaseCredit/purchaseCreditForm.constants";
import { EMPTY_PURCHASE_CREDIT_PAYMENT_PLAN } from "@Forms/purchaseCredit/purchaseCredit.initialValues";
import PurchaseCreditPaymentPlanningFields from "@Forms/purchaseCredit/components/purchaseCreditPaymentPlanningFields";

import FormSection from "@Forms/purchaseCredit/components/sections/formSection";

function PaymentPlanningSection({
  activeSection,
  toggleSection,
  errorCount,
  canManagePayments,
  formik,
  isEditing,
  today,
  creatingPaymentPlanningIndex = null,
  paymentPlanningCreateError,
  updatingPaymentPlanningId,
  paymentPlanningUpdateError,
  completingPaymentPlanningId,
  paymentPlanningCompletionError,
  onSaveNewPaymentPlanning,
  onSavePaymentPlanning,
  onCompletePaymentPlanning,
  errorFor,
  inputProps,
  addItem,
  removeItem,
}) {
  const sectionId = PURCHASE_CREDIT_SECTION_IDS.PAYMENT_PLANNING;
  const paymentPlanningTotal = _.sumBy(
    _.filter(
      formik.values.paymentPlanning,
      (plan) => !plan.isPaymentCompleted,
    ),
    (plan) => {
      const amount = _.toNumber(plan.amount);
      return _.isFinite(amount) ? amount : 0;
    },
  );

  return (
    <FormSection
      id={sectionId}
      icon={IndianRupee}
      title="Payment planning"
      description={
        canManagePayments
          ? "Schedule upcoming payment reminders and track completion."
          : "Enter a valid purchase date and amount in Purchase credit schedule to unlock payment planning."
      }
      isOpen={activeSection === sectionId}
      errorCount={errorCount}
      amountSummary={`Pending ${formatPurchaseCreditAmount(paymentPlanningTotal)}`}
      disabled={!canManagePayments}
      onOpen={() => toggleSection(sectionId)}
      action={
        <Button
          type="button"
          variant="outline"
          disabled={
            !canManagePayments ||
            creatingPaymentPlanningIndex !== null ||
            Boolean(updatingPaymentPlanningId) ||
            Boolean(completingPaymentPlanningId)
          }
          onClick={() =>
            addItem("paymentPlanning", EMPTY_PURCHASE_CREDIT_PAYMENT_PLAN)
          }
          className="w-full sm:w-auto"
        >
          <Plus className="size-4" aria-hidden="true" />
          Add payment plan
        </Button>
      }
    >
      {(paymentPlanningCreateError ||
        paymentPlanningUpdateError ||
        paymentPlanningCompletionError) && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {paymentPlanningCreateError ||
            paymentPlanningUpdateError ||
            paymentPlanningCompletionError}
        </div>
      )}
      <PurchaseCreditPaymentPlanningFields
        plans={formik.values.paymentPlanning}
        isEditing={isEditing}
        today={today}
        formik={formik}
        errorFor={errorFor}
        inputProps={inputProps}
        creatingPaymentPlanningIndex={creatingPaymentPlanningIndex}
        updatingPaymentPlanningId={updatingPaymentPlanningId}
        completingPaymentPlanningId={completingPaymentPlanningId}
        paymentPlanningCompletionError={paymentPlanningCompletionError}
        onSaveNewPaymentPlanning={onSaveNewPaymentPlanning}
        onSavePaymentPlanning={onSavePaymentPlanning}
        onCompletePaymentPlanning={onCompletePaymentPlanning}
        onRemove={(index) => removeItem("paymentPlanning", index)}
      />
    </FormSection>
  );
}

export default PaymentPlanningSection;
