import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

import {
  countActiveFilters,
  isFilterActive,
  normalizeSort,
} from "@/utils/dataTable.util";
import { buildPageItems, getRowRange } from "@/utils/pagination.util";

const SEARCH_FIELDS = ["hsn_code", "name", "stock_group", "agency", "category"];

export const selectUnmappedProducts = (state) => state.unmappedProducts;

export const selectUnmappedProductCount = createSelector(
  [selectUnmappedProducts],
  ({ products }) => products.length,
);

export const selectUnmappedProductsTableView = createSelector(
  [selectUnmappedProducts],
  ({ products, table: { page, limit, search, sort, columnFilters } }) => {
    const query = _.toLower(_.trim(search));
    const filtered = _.filter(
      products,
      (product) =>
        (!query ||
          _.some(SEARCH_FIELDS, (field) =>
            _.includes(_.toLower(_.toString(_.get(product, field))), query),
          )) &&
        _.every(
          columnFilters,
          (value, key) =>
            !isFilterActive(value) ||
            (key === "stock_group"
              ? _.toLower(_.trim(_.toString(_.get(product, key)))) ===
                _.toLower(_.trim(value))
              : _.includes(
                  _.toLower(_.toString(_.get(product, key))),
                  _.toLower(_.trim(value)),
                )),
        ),
    );
    const sorts = normalizeSort(sort);
    const sorted = sorts.length
      ? _.clone(filtered).sort((first, second) => {
          for (const { field, order } of sorts) {
            const comparison = _.toString(_.get(first, field)).localeCompare(
              _.toString(_.get(second, field)),
              undefined,
              { numeric: true, sensitivity: "base" },
            );
            if (comparison !== 0) {
              return order === "desc" ? -comparison : comparison;
            }
          }
          return 0;
        })
      : filtered;
    const total = sorted.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = _.clamp(page, 1, totalPages);
    const rows = _.slice(
      sorted,
      (currentPage - 1) * limit,
      currentPage * limit,
    );
    const pagination = { page: currentPage, limit, total, totalPages };
    const activeFilterCount = countActiveFilters(columnFilters);

    return {
      rows,
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
