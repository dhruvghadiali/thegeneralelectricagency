import { Download, LoaderCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { selectQuotationViewPdfDownloadStatus } from "@Redux/quotation/quotation.selector";
import {
  quotationViewPdfDownloadCompleted,
  quotationViewPdfDownloadFailed,
  quotationViewPdfDownloadStarted,
} from "@Redux/quotation/quotation.slice";
import { Button } from "@shadcnComponent/button";
import { downloadQuotationPdf } from "@screenComponent/quotations/downloadPdf/downloadQuotationPdf";
import { createViewQuotationPdfInput } from "@screenComponent/quotations/viewQuotationInformation/quotationDetails/viewQuotationPdf.utils";

function QuotationPdfDownloadButton({ quotation, baseQuotation }) {
  const dispatch = useDispatch();
  const version = quotation?.quotationVersion || "quotation";
  const downloadKey = [
    quotation?.id,
    quotation?.quotationNumber,
    quotation?.quotationVersion,
  ]
    .filter(Boolean)
    .join(":");
  const status = useSelector((state) =>
    selectQuotationViewPdfDownloadStatus(state, downloadKey),
  );
  const isDownloading = status === "downloading";

  const handleDownload = async () => {
    if (isDownloading) return;

    dispatch(quotationViewPdfDownloadStarted(downloadKey));

    try {
      await downloadQuotationPdf(
        createViewQuotationPdfInput(quotation, baseQuotation ?? quotation),
      );
      dispatch(quotationViewPdfDownloadCompleted(downloadKey));
    } catch {
      dispatch(quotationViewPdfDownloadFailed(downloadKey));
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      tabIndex={-1}
      disabled={isDownloading}
      aria-label={`Download ${version} quotation PDF`}
      aria-busy={isDownloading}
      title={status === "error" ? "Retry PDF download" : "Download PDF"}
      onClick={handleDownload}
      style={{ cursor: "pointer" }}
      className="size-8 shrink-0 cursor-pointer bg-transparent shadow-none hover:bg-transparent"
    >
      {isDownloading ? (
        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        <Download className="size-4" aria-hidden="true" />
      )}
    </Button>
  );
}

export default QuotationPdfDownloadButton;
