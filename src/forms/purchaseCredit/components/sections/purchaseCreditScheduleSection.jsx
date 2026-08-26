import { CalendarDays } from "lucide-react";

import { Input } from "@shadcnComponent/input";
import { formatPurchaseCreditAmount } from "@Forms/purchaseCredit/purchaseCreditForm.utils";
import { PURCHASE_CREDIT_SECTION_IDS } from "@Forms/purchaseCredit/purchaseCreditForm.constants";

import FormSection from "@Forms/purchaseCredit/components/sections/formSection";
import PurchaseCreditFormField from "@Forms/purchaseCredit/components/purchaseCreditFormField";
import PurchaseCreditDatePicker from "@Forms/purchaseCredit/components/purchaseCreditDatePicker";

function PurchaseCreditScheduleSection({
  activeSection,
  toggleSection,
  errorCount,
  formik,
  today,
  errorFor,
  inputProps,
}) {
  const sectionId = PURCHASE_CREDIT_SECTION_IDS.PURCHASE_CREDIT_SCHEDULE;

  return (
    <FormSection
      id={sectionId}
      icon={CalendarDays}
      title="Purchase credit schedule"
      description="Enter the purchase date, amount, and expected delivery date."
      isOpen={activeSection === sectionId}
      errorCount={errorCount}
      amountSummary={`Purchase ${formatPurchaseCreditAmount(formik.values.purchaseCreditAmount)}`}
      onOpen={() => toggleSection(sectionId)}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <PurchaseCreditFormField
          id="purchase-credit-at"
          label="Purchase at"
          required
          error={errorFor("purchaseCreditAt")}
        >
          <PurchaseCreditDatePicker
            id="purchase-credit-at"
            label="Purchase at"
            value={formik.values.purchaseCreditAt}
            max={today}
            required
            error={errorFor("purchaseCreditAt")}
            onChange={(value) =>
              formik.setFieldValue("purchaseCreditAt", value, true)
            }
            onBlur={() =>
              formik.setFieldTouched("purchaseCreditAt", true, true)
            }
          />
        </PurchaseCreditFormField>
        <PurchaseCreditFormField
          id="purchase-credit-amount"
          label="Purchase amount"
          required
          error={errorFor("purchaseCreditAmount")}
        >
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              ₹
            </span>
            <Input
              id="purchase-credit-amount"
              type="text"
              inputMode="decimal"
              className="pl-7"
              {...inputProps(
                "purchaseCreditAmount",
                "purchase-credit-amount",
              )}
            />
          </div>
        </PurchaseCreditFormField>
        <PurchaseCreditFormField
          id="purchase-credit-expected-delivery"
          label="Expected delivery date"
          required
          error={errorFor("expectedDeliveryDate")}
        >
          <PurchaseCreditDatePicker
            id="purchase-credit-expected-delivery"
            label="Expected delivery date"
            value={formik.values.expectedDeliveryDate}
            min={today}
            required
            error={errorFor("expectedDeliveryDate")}
            onChange={(value) =>
              formik.setFieldValue("expectedDeliveryDate", value, true)
            }
            onBlur={() =>
              formik.setFieldTouched("expectedDeliveryDate", true, true)
            }
          />
        </PurchaseCreditFormField>
      </div>
    </FormSection>
  );
}

export default PurchaseCreditScheduleSection;
