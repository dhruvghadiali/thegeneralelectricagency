import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

import { countActiveFilters, isFilterActive, normalizeSort } from "@/utils/dataTable.util";
import { buildPageItems, getRowRange } from "@/utils/pagination.util";
import { SYSTEM_COMPANIES_STATUS } from "@Tally/enum/systemCompaniesStatus.enum";
import { TALLY_COMPANIES_STATUS } from "@Tally/enum/tallyCompaniesStatus.enum";
import { SYNC_COMPANY_TABS } from "@Tally/enum/syncCompaniesTabs.enum";
import { SYNC_COMPANIES_SAVE_STATUS } from "@Tally/enum/syncCompaniesSaveStatus.enum";
import { selectSystemCompanies } from "@Tally/redux/systemCompanies/systemCompanies.selector";
import { selectTallyCompanies } from "@Tally/redux/tallyCompanies/tallyCompanies.selector";
import { findNewCompanies } from "@Tally/redux/syncCompanies/syncCompanies.utils";

export const selectSyncCompaniesTableState = (state) => state.syncCompanies;
export const selectNewCompanySelection = (state) => state.syncCompanies.selectedRowKeys;
export const selectSyncCompaniesActiveTab = (state) => state.syncCompanies.activeTab;

export const selectSyncCompaniesSaveState = createSelector(
  [
    (state) => state.syncCompanies.saveStatus,
    (state) => state.syncCompanies.saveError,
    (state) => state.syncCompanies.saveAlertVisible,
    (state) => state.syncCompanies.savedCount,
  ],
  (status, error, alertVisible, savedCount) => ({ status, error, alertVisible, savedCount }),
);

export const selectShowSaveSyncCompaniesButton = createSelector(
  [selectSyncCompaniesActiveTab, selectNewCompanySelection, (state) => state.syncCompanies.saveStatus],
  (activeTab, selectedRowKeys, saveStatus) =>
    activeTab === SYNC_COMPANY_TABS.NEW_COMPANIES &&
    (selectedRowKeys.length > 0 || saveStatus === SYNC_COMPANIES_SAVE_STATUS.LOADING),
);

export const selectNewCompanies = createSelector(
  [selectTallyCompanies, selectSystemCompanies],
  (tally, system) =>
    tally.status === TALLY_COMPANIES_STATUS.SUCCEEDED &&
    system.status === SYSTEM_COMPANIES_STATUS.SUCCEEDED
      ? findNewCompanies(tally.companies, system.companies)
      : [],
);

function selectTableView(companies, { page, limit, search, sort, columnFilters }) {
  const query = _.toLower(_.trim(search));
  const filtered = _.filter(companies, (company) =>
    (!query || _.some(_.values(company), (value) =>
      _.includes(_.toLower(_.toString(value)), query))) &&
    _.every(columnFilters, (value, key) =>
      !isFilterActive(value) ||
      _.includes(_.toLower(_.toString(_.get(company, key))), _.toLower(_.trim(value)))),
  );
  const sorts = normalizeSort(sort);
  if (sorts.length) {
    filtered.sort((first, second) => {
      for (const { field, order } of sorts) {
        const comparison = _.toString(_.get(first, field)).localeCompare(
          _.toString(_.get(second, field)), undefined, { numeric: true, sensitivity: "base" },
        );
        if (comparison !== 0) return order === "desc" ? -comparison : comparison;
      }
      return 0;
    });
  }
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = _.clamp(page, 1, totalPages);
  const rows = _.slice(filtered, (currentPage - 1) * limit, currentPage * limit);
  const pagination = { page: currentPage, limit, total, totalPages };
  const activeFilterCount = countActiveFilters(columnFilters);
  return {
    rows,
    selectionRows: filtered,
    search,
    sort,
    columnFilters,
    pagination,
    pageItems: buildPageItems(currentPage, totalPages),
    rowRange: getRowRange({ ...pagination, count: rows.length }),
    activeFilterCount,
    isFiltered: Boolean(query) || activeFilterCount > 0,
  };
}

export const selectNewCompaniesTableView = createSelector(
  [selectNewCompanies, selectSyncCompaniesTableState], selectTableView,
);
