import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { updateQuotationDetails } from "@Redux/quotation/quotation.action";
import { downloadQuotationPdf } from "@screenComponent/quotations/downloadPdf/downloadQuotationPdf";
import useQuotationPdfDiscountDialog from "@screenComponent/quotations/downloadPdf/useQuotationPdfDiscountDialog";
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

  const performUpdateAndDownload = useCallback(async (showDiscountPercentage) => {
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
          showDiscountPercentage,
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
  const discountDialog = useQuotationPdfDiscountDialog(
    performUpdateAndDownload,
  );
  const updateAndDownloadPdf = useCallback(() => {
    if (
      isUpdating ||
      !quotationId ||
      !companyInformation ||
      productInformation.length === 0
    ) {
      return;
    }

    discountDialog.requestDownload();
  }, [
    companyInformation,
    discountDialog,
    isUpdating,
    productInformation,
    quotationId,
  ]);

  return {
    discountDialog: {
      open: discountDialog.isOpen,
      onCancel: discountDialog.cancelDownload,
      onNo: discountDialog.downloadWithoutDiscount,
      onYes: discountDialog.downloadWithDiscount,
    },
    isUpdating,
    updateAndDownloadPdf,
  };
}

export default useUpdateQuotationPdf;
