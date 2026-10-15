import { useSelector } from "react-redux";

import {
  selectQuotationCompanyInformation,
  selectQuotationCurrentStep,
} from "@Redux/quotation/quotation.selector";
import { CREATE_QUOTATION_STEPS } from "@Enums";

import QuotationCompanyForm from "@screenComponent/quotations/form/companyInformation/quotationCompanyForm";
import CreateQuotationSummary from "@screenComponent/quotations/form/quotationSummary/createQuotationSummary";
import QuotationProductInformation from "@screenComponent/quotations/form/productInformation";

function CreateQuotationForm() {
  const currentStep = useSelector(selectQuotationCurrentStep);
  const companyInformation = useSelector(selectQuotationCompanyInformation);

  const quotationStepComponents = {
    [CREATE_QUOTATION_STEPS.COMPANY_INFORMATION]: <QuotationCompanyForm />,
    [CREATE_QUOTATION_STEPS.PRODUCT_INFORMATION]: (
      <QuotationProductInformation companyInformation={companyInformation} />
    ),
    [CREATE_QUOTATION_STEPS.QUOTATION_SUMMARY]: <CreateQuotationSummary />,
  };

  return quotationStepComponents[currentStep];
}

export default CreateQuotationForm;
