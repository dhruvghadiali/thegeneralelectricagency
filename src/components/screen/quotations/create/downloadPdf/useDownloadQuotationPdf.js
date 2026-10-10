import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

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
  const [isGenerating, setIsGenerating] = useState(false);
  const companyInformation = useSelector(selectQuotationCompanyInformation);
  const productInformation = useSelector(selectQuotationProductInformation);
  const productDirectory = useSelector(selectQuotationProducts);
  const taxTreatment = useSelector(selectQuotationTaxTreatment);
  const gstPercentage = useSelector(selectQuotationGstPercentage);
  const deliveryNotes = useSelector(selectQuotationDeliveryNotes);
  const paymentNotes = useSelector(selectQuotationPaymentNotes);

  const generatePdf = useCallback(async () => {
    if (isGenerating || !companyInformation || productInformation.length === 0) {
      return;
    }

    setIsGenerating(true);

    try {
      await downloadQuotationPdf({
        companyInformation,
        productInformation,
        productDirectory,
        taxTreatment,
        gstPercentage,
        deliveryNotes,
        paymentNotes,
      });
    } finally {
      setIsGenerating(false);
    }
  }, [
    companyInformation,
    deliveryNotes,
    gstPercentage,
    isGenerating,
    paymentNotes,
    productDirectory,
    productInformation,
    taxTreatment,
  ]);

  return { generatePdf, isGenerating };
}

export default useDownloadQuotationPdf;
