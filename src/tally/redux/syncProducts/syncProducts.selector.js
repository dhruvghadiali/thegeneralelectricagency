import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

import { countActiveFilters, isFilterActive, normalizeSort } from "@/utils/dataTable.util";
import { buildPageItems, getRowRange } from "@/utils/pagination.util";
import { SYSTEM_PRODUCTS_STATUS } from "@Tally/enum/systemProductsStatus.enum";
import { TALLY_PRODUCTS_STATUS } from "@Tally/enum/tallyProductsStatus.enum";
import { selectSystemProducts } from "@Tally/redux/systemProducts/systemProducts.selector";
import { selectTallyProducts } from "@Tally/redux/tallyProducts/tallyProducts.selector";
import { findNewProducts } from "@Tally/redux/syncProducts/syncProducts.utils";

export const selectSyncProductsTableState = (state) => state.syncProducts;
export const selectNewProductSelection = (state) => state.syncProducts.selectedRowKeys;

export const selectNewProducts = createSelector(
  [selectTallyProducts, selectSystemProducts],
  (tally, system) =>
    tally.status === TALLY_PRODUCTS_STATUS.SUCCEEDED &&
    system.status === SYSTEM_PRODUCTS_STATUS.SUCCEEDED
      ? findNewProducts(tally.products, system.products)
      : [],
);

export const selectNewProductsTableView = createSelector(
  [selectNewProducts, selectSyncProductsTableState],
  (products, { page, limit, search, sort, columnFilters }) => {
    const query = _.toLower(_.trim(search));
    const filtered = _.filter(products, (product) =>
      (!query ||
        _.some(_.values(product), (value) =>
          _.includes(_.toLower(_.toString(value)), query),
        )) &&
      _.every(columnFilters, (value, key) =>
        !isFilterActive(value) ||
        _.includes(
          _.toLower(_.toString(_.get(product, key))),
          _.toLower(_.trim(value)),
        ),
      ),
    );
    const sorts = normalizeSort(sort);
    if (sorts.length) {
      filtered.sort((first, second) => {
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
  },
);
