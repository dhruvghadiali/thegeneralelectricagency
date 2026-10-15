import { selectQuotationState } from "@Redux/quotation/quotation.selectors.base";

export const selectQuotationViewOpenSection = (state) =>
  selectQuotationState(state).viewOpenSection;
