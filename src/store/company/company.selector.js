import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

import { COMPANY_TYPES } from "@Enums";
import { createTableSelectors } from "@Redux/factories/table.factory";

const selectCompanyState = (state) => state.companies;

export const companyTableSelectors = createTableSelectors(selectCompanyState);

export const selectSelectedCompany = createSelector(
  selectCompanyState,
  (state) => state.selectedCompany,
);

export const selectCompanySummary = createSelector(
  companyTableSelectors.selectItems,
  (companies) => ({
    customerCount: _.filter(companies, (company) =>
      [COMPANY_TYPES.CUSTOMER, COMPANY_TYPES.BOTH].includes(company.type),
    ).length,
    supplierCount: _.filter(companies, (company) =>
      [
        COMPANY_TYPES.SUPPLIER,
        COMPANY_TYPES.MANUFACTURER,
        COMPANY_TYPES.DEALER,
        COMPANY_TYPES.BOTH,
      ].includes(company.type),
    ).length,
    locationCount: _.sumBy(companies, "addressCount"),
  }),
);

export default companyTableSelectors;
