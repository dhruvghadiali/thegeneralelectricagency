import { createSelector } from "@reduxjs/toolkit";

import { createTableSelectors } from "@Redux/factories/table.factory";
import { selectQuotationState } from "@Redux/quotation/quotation.selectors.base";

export const quotationTableSelectors =
  createTableSelectors(selectQuotationState);

export const selectQuotationRowActionQuotation = createSelector(
  selectQuotationState,
  ({ items, rowActionQuotationKey }) => {
    if (rowActionQuotationKey === null) return null;

    const quotation = items.find(
      (item) =>
        String(item.id ?? item.quotationNumber) ===
        String(rowActionQuotationKey),
    );

    return quotation ?? null;
  },
);

export const selectQuotationUpdateUnavailableDialogOpen = (state) =>
  selectQuotationState(state).isUpdateUnavailableDialogOpen;
