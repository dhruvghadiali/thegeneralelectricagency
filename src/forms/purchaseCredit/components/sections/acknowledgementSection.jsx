import { FileText } from "lucide-react";

import { Input } from "@shadcnComponent/input";
import FormSection from "@Forms/purchaseCredit/components/sections/formSection";
import PurchaseCreditFormField from "@Forms/purchaseCredit/components/purchaseCreditFormField";
import { PURCHASE_CREDIT_SECTION_IDS } from "@Forms/purchaseCredit/purchaseCreditForm.constants";
import PurchaseCreditFileUploader from "@Forms/purchaseCredit/components/purchaseCreditFileUploader";
import { PURCHASE_CREDIT_ACKNOWLEDGEMENT_ID_MAX_LENGTH } from "@Forms/purchaseCredit/purchaseCredit.validation.constants";

function AcknowledgementSection({
  activeSection,
  toggleSection,
  errorCount,
  formik,
  errorFor,
  inputProps,
}) {
  const sectionId = PURCHASE_CREDIT_SECTION_IDS.ACKNOWLEDGEMENT;

  return (
    <FormSection
      id={sectionId}
      icon={FileText}
      title="Acknowledgement"
      description="Add the optional supplier acknowledgement and receipt files."
      isOpen={activeSection === sectionId}
      errorCount={errorCount}
      onOpen={() => toggleSection(sectionId)}
    >
      <div className="grid gap-5">
        <PurchaseCreditFormField
          id="purchase-credit-acknowledgement-id"
          label="Acknowledgement ID"
          error={errorFor("acknowledgementId")}
        >
          <Input
            id="purchase-credit-acknowledgement-id"
            minLength={1}
            maxLength={PURCHASE_CREDIT_ACKNOWLEDGEMENT_ID_MAX_LENGTH}
            placeholder="e.g. CG/PO/2026/8891"
            {...inputProps(
              "acknowledgementId",
              "purchase-credit-acknowledgement-id",
            )}
          />
        </PurchaseCreditFormField>
        <PurchaseCreditFormField
          id="purchase-credit-acknowledgement-receipts"
          label="Acknowledgement receipts"
          error={errorFor("acknowledgementReceipts")}
        >
          <PurchaseCreditFileUploader
            id="purchase-credit-acknowledgement-receipts"
            value={formik.values.acknowledgementReceipts}
            error={errorFor("acknowledgementReceipts")}
            onChange={(value) =>
              formik.setFieldValue("acknowledgementReceipts", value, true)
            }
            onBlur={() =>
              formik.setFieldTouched("acknowledgementReceipts", true, true)
            }
          />
        </PurchaseCreditFormField>
      </div>
    </FormSection>
  );
}

export default AcknowledgementSection;
