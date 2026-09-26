import { createTableSelectors } from "@Redux/factories/table.factory";

export const tallyCompaniesTableSelectors = createTableSelectors(
  (state) => state.tallyCompaniesList,
);
