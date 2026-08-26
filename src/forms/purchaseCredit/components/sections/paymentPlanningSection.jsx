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
  errorFor,
  inputProps,
  addItem,
  removeItem,
}) {
  const sectionId = PURCHASE_CREDIT_SECTION_IDS.PAYMENT_PLANNING;
  const paymentPlanningTotal = _.sumBy(
    formik.values.paymentPlanning,
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
      amountSummary={`Planned ${formatPurchaseCreditAmount(paymentPlanningTotal)}`}
      disabled={!canManagePayments}
      onOpen={() => toggleSection(sectionId)}
      action={
        <Button
          type="button"
          variant="outline"
          disabled={!canManagePayments}
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
      <PurchaseCreditPaymentPlanningFields
        plans={formik.values.paymentPlanning}
        isEditing={isEditing}
        today={today}
        formik={formik}
        errorFor={errorFor}
        inputProps={inputProps}
        onRemove={(index) => removeItem("paymentPlanning", index)}
      />
    </FormSection>
  );
}

export default PaymentPlanningSection;
