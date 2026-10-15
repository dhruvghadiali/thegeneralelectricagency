import {
  createQuotationCompanyState,
  QUOTATION_COMPANY_LIMIT,
  QUOTATION_COMPANY_PAGE,
} from "@Redux/quotation/company/quotationCompany.state";
import { createQuotationEditorState } from "@Redux/quotation/editor/quotationEditor.state";
import {
  createQuotationProductState,
  QUOTATION_PRODUCT_LIMIT,
  QUOTATION_PRODUCT_PAGE,
} from "@Redux/quotation/product/quotationProduct.state";
import { createQuotationSubmissionState } from "@Redux/quotation/submission/quotationSubmission.state";
import { createQuotationTableState } from "@Redux/quotation/table/quotationTable.state";
import { createQuotationViewState } from "@Redux/quotation/view/quotationView.state";

export {
  QUOTATION_COMPANY_LIMIT,
  QUOTATION_COMPANY_PAGE,
  QUOTATION_PRODUCT_LIMIT,
  QUOTATION_PRODUCT_PAGE,
};

export const createQuotationFormState = () => ({
  ...createQuotationEditorState(),
  ...createQuotationSubmissionState(),
  ...createQuotationCompanyState(),
  ...createQuotationProductState(),
});

export const createQuotationState = () => ({
  ...createQuotationTableState(),
  ...createQuotationViewState(),
  ...createQuotationFormState(),
});

export default createQuotationState;
