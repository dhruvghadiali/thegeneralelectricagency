import { selectQuotationState } from "@Redux/quotation/quotation.selectors.base";

export const selectQuotationViewOpenSection = (state) =>
  selectQuotationState(state).viewOpenSection;

export const selectQuotationViewPdfDownloadStatus = (state, downloadKey) =>
  selectQuotationState(state).viewPdfDownloadStatuses?.[downloadKey] ?? "idle";
