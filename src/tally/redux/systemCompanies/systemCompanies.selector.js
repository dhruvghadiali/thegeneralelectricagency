import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

import { countActiveFilters } from "@/utils/dataTable.util";
import { buildPageItems, getRowRange } from "@/utils/pagination.util";

const SEARCH_FIELDS = ["company_name", "company_id", "company_code", "gst_number"];

export const selectSystemCompanies = (state) => state.systemCompanies;

export const selectSystemCompanyCount = createSelector(
  [selectSystemCompanies],
  ({ companies }) => companies.length,
);

export const selectSelectedSystemCompany = createSelector(
  [selectSystemCompanies],
  ({ companies, selectedCompanyKey }) =>
    selectedCompanyKey
      ? _.find(companies, (company) => (company._id || company.company_id) === selectedCompanyKey) ?? null
      : null,
);

export const selectSystemCompaniesTableView = createSelector(
  [selectSystemCompanies],
  ({ companies, search, columnFilters, page, limit }) => {
    const query = _.toLower(_.trim(search));
    const filteredCompanies = _.filter(companies, (company) =>
      (!query || _.some(SEARCH_FIELDS, (field) =>
        _.includes(_.toLower(_.toString(_.get(company, field))), query),
      )) &&
      _.every(columnFilters, (value, key) =>
        _.includes(
          _.toLower(_.toString(_.get(company, key))),
          _.toLower(_.trim(value)),
        ),
      ),
    );
    const total = filteredCompanies.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = _.clamp(page, 1, totalPages);
    const rows = _.slice(filteredCompanies, (currentPage - 1) * limit, currentPage * limit);
    const pagination = { page: currentPage, limit, total, totalPages };
    const activeFilterCount = countActiveFilters(columnFilters);

    return {
      rows,
      search,
      columnFilters,
      pagination,
      pageItems: buildPageItems(currentPage, totalPages),
      rowRange: getRowRange({ ...pagination, count: rows.length }),
      activeFilterCount,
      isFiltered: Boolean(query) || activeFilterCount > 0,
    };
  },
);
