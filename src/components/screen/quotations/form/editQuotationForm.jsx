import { useSelector } from "react-redux";

import { CREATE_QUOTATION_STEPS } from "@Enums";
import {
  selectQuotationCompanyInformation,
  selectQuotationCurrentStep,
} from "@Redux/quotation/quotation.selector";

import QuotationProductInformation from "@screenComponent/quotations/form/productInformation";
import EditQuotationSummary from "@screenComponent/quotations/form/quotationSummary/editQuotationSummary";

function EditQuotationForm() {
  const currentStep = useSelector(selectQuotationCurrentStep);
  const companyInformation = useSelector(selectQuotationCompanyInformation);

  const quotationStepComponents = {
    [CREATE_QUOTATION_STEPS.PRODUCT_INFORMATION]: (
      <QuotationProductInformation
        companyInformation={companyInformation}
        canNavigateToCompanyInformation={false}
      />
    ),
    [CREATE_QUOTATION_STEPS.QUOTATION_SUMMARY]: <EditQuotationSummary />,
  };

  return (
    quotationStepComponents[currentStep] ??
    quotationStepComponents[CREATE_QUOTATION_STEPS.PRODUCT_INFORMATION]
  );
}

export default EditQuotationForm;
