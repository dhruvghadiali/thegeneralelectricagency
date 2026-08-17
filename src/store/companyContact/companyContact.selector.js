import { createSelector } from "@reduxjs/toolkit";

import { createTableSelectors } from "@Redux/factories/table.factory";

const selectCompanyContactState = (state) => state.companyContacts;

export const companyContactTableSelectors = createTableSelectors(
  selectCompanyContactState,
);

export const selectCompanyContactSummary = createSelector(
  selectCompanyContactState,
  (companyContacts) => companyContacts.summary,
);

export const selectSelectedCompanyContact = createSelector(
  selectCompanyContactState,
  (companyContacts) => companyContacts.selectedContact,
);
