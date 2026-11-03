import { createTableSelectors } from "@Redux/factories/table.factory";

const selectCompanyListState = (state) => state.companyList;
const selectCompanyTableState = (state) =>
  selectCompanyListState(state).companyTable;

export const companyTableSelectors = createTableSelectors(
  selectCompanyTableState,
);

export const selectCompanySummary = (state) =>
  selectCompanyListState(state).summary;
