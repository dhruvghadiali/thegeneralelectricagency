import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createQuotationDetails } from "@Redux/quotation/quotation.action";
import {
  selectQuotationCompanyInformation,
  selectQuotationDeliveryNotes,
  selectQuotationGstPercentage,
  selectQuotationPaymentNotes,
  selectQuotationProductInformation,
  selectQuotationProducts,
  selectQuotationTaxTreatment,
} from "@Redux/quotation/quotation.selector";
import { downloadQuotationPdf } from "@screenComponent/quotations/create/downloadPdf/downloadQuotationPdf";

function useDownloadQuotationPdf() {
  const dispatch = useDispatch();
  const [isGenerating, setIsGenerating] = useState(false);
  const companyInformation = useSelector(selectQuotationCompanyInformation);
  const productInformation = useSelector(selectQuotationProductInformation);
  const productDirectory = useSelector(selectQuotationProducts);
  const taxTreatment = useSelector(selectQuotationTaxTreatment);
  const gstPercentage = useSelector(selectQuotationGstPercentage);
  const deliveryNotes = useSelector(selectQuotationDeliveryNotes);
  const paymentNotes = useSelector(selectQuotationPaymentNotes);
  const loggedInUser = useSelector(({ auth }) => auth);

  const generatePdf = useCallback(async () => {
    if (isGenerating || !companyInformation || productInformation.length === 0) {
      return;
    }

    setIsGenerating(true);

    try {
      await downloadQuotationPdf(
        {
          companyInformation,
          productInformation,
          productDirectory,
          taxTreatment,
          gstPercentage,
          deliveryNotes,
          paymentNotes,
          loggedInUser,
        },
        {
          beforeSave: (quotationRefId) =>
            dispatch(createQuotationDetails({ quotationRefId })).unwrap(),
        },
      );
    } catch {
      // The Redux request state retains the API error for the quotation flow.
    } finally {
      setIsGenerating(false);
    }
  }, [
    companyInformation,
    deliveryNotes,
    dispatch,
    gstPercentage,
    isGenerating,
    loggedInUser,
    paymentNotes,
    productDirectory,
    productInformation,
    taxTreatment,
  ]);

  return { generatePdf, isGenerating };
}

export default useDownloadQuotationPdf;
