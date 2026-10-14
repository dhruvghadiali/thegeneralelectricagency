import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateQuotationDetails } from "@Redux/quotation/quotation.action";
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
import { downloadQuotationPdf } from "@screenComponent/quotations/downloadPdf/downloadQuotationPdf";
import { resolveEditQuotationRevision } from "@screenComponent/quotations/edit/editQuotationRevision";

function useUpdateQuotationPdf() {
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);
  const quotationId = useSelector(selectQuotationEditingId);
  const companyInformation = useSelector(selectQuotationCompanyInformation);
  const productInformation = useSelector(selectQuotationProductInformation);
  const productDirectory = useSelector(selectQuotationProducts);
  const taxTreatment = useSelector(selectQuotationTaxTreatment);
  const gstPercentage = useSelector(selectQuotationGstPercentage);
  const deliveryNotes = useSelector(selectQuotationDeliveryNotes);
  const paymentNotes = useSelector(selectQuotationPaymentNotes);
  const editSource = useSelector(selectQuotationEditSource);
  const loggedInUser = useSelector(({ auth }) => auth);

  const updateAndDownloadPdf = useCallback(async () => {
    if (
      isUpdating ||
      !quotationId ||
      !companyInformation ||
      productInformation.length === 0
    ) {
      return;
    }

    setIsUpdating(true);

    try {
      const revision = resolveEditQuotationRevision({
        ...editSource,
        currentProducts: productInformation,
      });

      await downloadQuotationPdf(
        {
          quotationRefId: revision.quotationReference,
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
          beforeSave: () =>
            dispatch(
              updateQuotationDetails({
                id: quotationId,
                quotationRefId: revision.quotationReference,
                quotationVersion: revision.quotationVersion,
              }),
            ).unwrap(),
        },
      );
    } catch {
      // Redux retains the API error for the edit quotation summary.
    } finally {
      setIsUpdating(false);
    }
  }, [
    companyInformation,
    deliveryNotes,
    dispatch,
    editSource,
    gstPercentage,
    isUpdating,
    loggedInUser,
    paymentNotes,
    productDirectory,
    productInformation,
    quotationId,
    taxTreatment,
  ]);

  return { isUpdating, updateAndDownloadPdf };
}

export default useUpdateQuotationPdf;
