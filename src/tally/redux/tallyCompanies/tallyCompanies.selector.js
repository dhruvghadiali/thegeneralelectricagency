import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

import {
  countActiveFilters,
  isFilterActive,
  normalizeSort,
} from "@/utils/dataTable.util";
import { buildPageItems, getRowRange } from "@/utils/pagination.util";

export const selectTallyCompanies = (state) => state.tallyCompanies;
export const selectTallyCompanyRows = (state) => state.tallyCompanies.companies;
export const selectTallyCompaniesTableState = (state) => state.tallyCompanies.table;

export const selectSelectedTallyCompany = createSelector(
  [selectTallyCompanyRows, (state) => state.tallyCompanies.selectedCompanyKey],
  (companies, key) =>
    key
      ? _.find(companies, (company) =>
          (company.guid || company.masterId || company.name) === key,
        ) ?? null
      : null,
);

const selectSearch = (state) => selectTallyCompaniesTableState(state).search;
const selectSort = (state) => selectTallyCompaniesTableState(state).sort;
const selectColumnFilters = (state) => selectTallyCompaniesTableState(state).columnFilters;

export const selectMatchingTallyCompanies = createSelector(
  [selectTallyCompanyRows, selectSearch, selectSort, selectColumnFilters],
  (companies, search, sort, columnFilters) => {
    const query = _.toLower(_.trim(search));
    const filtered = _.filter(companies, (company) =>
      (!query ||
        _.some(_.values(company), (value) =>
          _.includes(_.toLower(_.toString(value)), query),
        )) &&
      _.every(columnFilters, (value, key) =>
        !isFilterActive(value) ||
        _.includes(
          _.toLower(_.toString(_.get(company, key))),
          _.toLower(_.trim(value)),
        ),
      ),
    );
    const sorts = normalizeSort(sort);
    if (_.isEmpty(sorts)) return filtered;

    return _.clone(filtered).sort((first, second) => {
      for (const { field, order } of sorts) {
        const comparison = _.toString(_.get(first, field)).localeCompare(
          _.toString(_.get(second, field)),
          undefined,
          { numeric: true, sensitivity: "base" },
        );
        if (comparison !== 0) return order === "desc" ? -comparison : comparison;
      }
      return 0;
    });
  },
);

export const selectTallyCompaniesTableView = createSelector(
  [selectMatchingTallyCompanies, selectTallyCompaniesTableState],
  (companies, { page, limit, search, sort, columnFilters }) => {
    const total = _.size(companies);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = _.clamp(page, 1, totalPages);
    const rows = _.slice(companies, (currentPage - 1) * limit, currentPage * limit);
    const pagination = { page: currentPage, limit, total, totalPages };
    const activeFilterCount = countActiveFilters(columnFilters);

    return {
      rows,
      search,
      sort,
      columnFilters,
      pagination,
      pageItems: buildPageItems(currentPage, totalPages),
      rowRange: getRowRange({ ...pagination, count: _.size(rows) }),
      activeFilterCount,
      isFiltered: Boolean(_.trim(search)) || activeFilterCount > 0,
    };
  },
);

export const selectTallyCompanyCount = createSelector(
  [selectTallyCompanies, selectTallyCompanyRows],
  ({ response }, companies) => (response ? companies.length : null),
);
