import { fetchQuotationDetails } from "@Redux/quotation/quotation.action";
import {
  tableFetchCases,
  TABLE_REDUCERS,
} from "@Redux/factories/table.factory";

export const quotationTableReducers = {
  ...TABLE_REDUCERS,
  quotationRowActionRequested(state, action) {
    state.rowActionQuotationKey = action.payload;
  },
  quotationRowActionClosed(state) {
    state.rowActionQuotationKey = null;
  },
  quotationUpdateUnavailableDialogOpened(state) {
    state.isUpdateUnavailableDialogOpen = true;
  },
  quotationUpdateUnavailableDialogClosed(state) {
    state.isUpdateUnavailableDialogOpen = false;
  },
};

export function addQuotationTableExtraReducers(builder) {
  builder
    .addCase(fetchQuotationDetails.pending, tableFetchCases.pending)
    .addCase(fetchQuotationDetails.fulfilled, tableFetchCases.fulfilled)
    .addCase(fetchQuotationDetails.rejected, (state, action) =>
      tableFetchCases.rejected(
        state,
        action,
        "Unable to load quotation details.",
      ),
    );
}
