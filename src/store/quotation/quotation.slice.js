import { createSlice } from "@reduxjs/toolkit";

import {
  addQuotationCompanyExtraReducers,
  quotationCompanyReducers,
} from "@Redux/quotation/company/quotationCompany.reducers";
import { quotationEditorReducers } from "@Redux/quotation/editor/quotationEditor.reducers";
import {
  addQuotationProductExtraReducers,
  quotationProductReducers,
} from "@Redux/quotation/product/quotationProduct.reducers";
import { createQuotationState } from "@Redux/quotation/quotation.state";
import {
  addQuotationSubmissionExtraReducers,
  quotationSubmissionReducers,
} from "@Redux/quotation/submission/quotationSubmission.reducers";
import {
  addQuotationTableExtraReducers,
  quotationTableReducers,
} from "@Redux/quotation/table/quotationTable.reducers";
import { quotationViewReducers } from "@Redux/quotation/view/quotationView.reducers";

const quotationSlice = createSlice({
  name: "quotation",
  initialState: createQuotationState(),
  reducers: {
    ...quotationTableReducers,
    ...quotationCompanyReducers,
    ...quotationEditorReducers,
    ...quotationProductReducers,
    ...quotationSubmissionReducers,
    ...quotationViewReducers,
    quotationReset() {
      return createQuotationState();
    },
  },
  extraReducers: (builder) => {
    addQuotationTableExtraReducers(builder);
    addQuotationSubmissionExtraReducers(builder);
    addQuotationCompanyExtraReducers(builder);
    addQuotationProductExtraReducers(builder);
  },
});

export const {
  quotationCompanyInformationSaved,
  quotationCompanyDirectorySearchChanged,
  quotationCompanySearchChanged,
  quotationCompanySelected,
  quotationUnsavedCompanyConfirmationClosed,
  quotationUnsavedCompanyConfirmationRequested,
  quotationDeliveryNotesChanged,
  quotationExitCancelled,
  quotationExitRequested,
  quotationEditingStarted,
  quotationGstPercentageChanged,
  quotationPaymentNotesChanged,
  quotationTaxTreatmentChanged,
  quotationProductDeleteCancelled,
  quotationProductDeleteRequested,
  quotationProductDuplicateCancelled,
  quotationProductDuplicateRequested,
  quotationProductAddAnotherPromptClosed,
  quotationProductAddAnotherPromptOpened,
  quotationProductFormReset,
  quotationProductEditingStarted,
  quotationProductInformationDeleted,
  quotationProductInformationSaved,
  quotationProductInformationUpdated,
  quotationProductDirectorySearchChanged,
  quotationProductSearchChanged,
  quotationProductSelected,
  quotationProductSummaryClosed,
  quotationProductSummaryOpened,
  quotationRowActionClosed,
  quotationRowActionRequested,
  quotationRoundOffChanged,
  quotationReset,
  quotationSubmissionErrorCleared,
  quotationStepChanged,
  quotationUpdateUnavailableDialogClosed,
  quotationUpdateUnavailableDialogOpened,
  quotationViewPdfDownloadCompleted,
  quotationViewPdfDownloadFailed,
  quotationViewPdfDownloadStarted,
  quotationViewSectionClosed,
  quotationViewSectionToggled,
} = quotationSlice.actions;

export const quotationTableActions = {
  columnFilterChanged: quotationSlice.actions.columnFilterChanged,
  filtersApplied: quotationSlice.actions.filtersApplied,
  filtersCleared: quotationSlice.actions.filtersCleared,
  limitChanged: quotationSlice.actions.limitChanged,
  pageChanged: quotationSlice.actions.pageChanged,
  searchChanged: quotationSlice.actions.searchChanged,
  searchCommitted: quotationSlice.actions.searchCommitted,
  sortChanged: quotationSlice.actions.sortChanged,
};

export default quotationSlice.reducer;
