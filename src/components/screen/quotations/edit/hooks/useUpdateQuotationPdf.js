import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { updateQuotationDetails } from "@Redux/quotation/quotation.action";
import { downloadQuotationPdf } from "@screenComponent/quotations/downloadPdf/downloadQuotationPdf";
import { resolveEditQuotationRevision } from "@screenComponent/quotations/edit/editQuotationRevision.utils";
import useEditQuotationUpdateData from "@screenComponent/quotations/edit/hooks/useEditQuotationUpdateData";

function useUpdateQuotationPdf() {
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    companyInformation,
    deliveryNotes,
    editSource,
    gstPercentage,
    loggedInUser,
    paymentNotes,
    productDirectory,
    productInformation,
    quotationId,
    taxTreatment,
  } = useEditQuotationUpdateData();

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
        currentGstPercentage: gstPercentage,
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
