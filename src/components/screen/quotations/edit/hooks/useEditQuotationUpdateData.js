import { useSelector } from "react-redux";

import {
  selectQuotationCompanyInformation,
  selectQuotationDeliveryNotes,
  selectQuotationEditSource,
  selectQuotationEditingId,
  selectQuotationGstPercentage,
  selectQuotationPaymentNotes,
  selectQuotationProductInformation,
  selectQuotationProducts,
  selectQuotationTaxTreatment,
} from "@Redux/quotation/quotation.selector";

function useEditQuotationUpdateData() {
  return {
    quotationId: useSelector(selectQuotationEditingId),
    companyInformation: useSelector(selectQuotationCompanyInformation),
    productInformation: useSelector(selectQuotationProductInformation),
    productDirectory: useSelector(selectQuotationProducts),
    taxTreatment: useSelector(selectQuotationTaxTreatment),
    gstPercentage: useSelector(selectQuotationGstPercentage),
    deliveryNotes: useSelector(selectQuotationDeliveryNotes),
    paymentNotes: useSelector(selectQuotationPaymentNotes),
    editSource: useSelector(selectQuotationEditSource),
    loggedInUser: useSelector(({ auth }) => auth),
  };
}

export default useEditQuotationUpdateData;
