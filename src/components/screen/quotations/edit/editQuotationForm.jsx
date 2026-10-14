import { useSelector } from "react-redux";

import { CREATE_QUOTATION_STEPS } from "@Enums";
import {
  selectQuotationCompanyInformation,
  selectQuotationCurrentStep,
} from "@Redux/quotation/quotation.selector";
import EditQuotationProductInformation from "@screenComponent/quotations/edit/editQuotationProductInformation";
import EditQuotationSummary from "@screenComponent/quotations/edit/editQuotationSummary";

function EditQuotationForm() {
  const currentStep = useSelector(selectQuotationCurrentStep);
  const companyInformation = useSelector(selectQuotationCompanyInformation);

  if (currentStep === CREATE_QUOTATION_STEPS.QUOTATION_SUMMARY) {
    return <EditQuotationSummary />;
  }

  return (
    <EditQuotationProductInformation
      companyInformation={companyInformation}
    />
  );
}

export default EditQuotationForm;
