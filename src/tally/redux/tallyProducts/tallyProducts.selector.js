import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

import {
  countActiveFilters,
  isFilterActive,
  normalizeSort,
} from "@/utils/dataTable.util";
import { buildPageItems, getRowRange } from "@/utils/pagination.util";

export const selectTallyProducts = (state) => state.tallyProducts;

export const selectTallyProductsList = (state) => state.tallyProducts.products;

export const selectTallyProductsTableState = (state) => state.tallyProducts.table;

const selectSearch = (state) => selectTallyProductsTableState(state).search;
const selectSort = (state) => selectTallyProductsTableState(state).sort;
const selectColumnFilters = (state) => selectTallyProductsTableState(state).columnFilters;

export const selectMatchingTallyProducts = createSelector(
  [selectTallyProductsList, selectSearch, selectSort, selectColumnFilters],
  (products, search, sort, columnFilters) => {
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

export const selectTallyProductsTableView = createSelector(
  [selectMatchingTallyProducts, selectTallyProductsTableState],
  (products, { page, limit, search, sort, columnFilters }) => {
    const total = _.size(products);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = _.clamp(page, 1, totalPages);
    const rows = _.slice(products, (currentPage - 1) * limit, currentPage * limit);
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

export const selectTallyProductCount = createSelector(
  [selectTallyProducts, selectTallyProductsList],
  ({ response }, products) => (response ? products.length : null),
);
