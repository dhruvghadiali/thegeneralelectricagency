import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

import { countActiveFilters } from "@/utils/dataTable.util";
import { buildPageItems, getRowRange } from "@/utils/pagination.util";

const SEARCH_FIELDS = ["name", "hsn_code"];

export const selectSystemProducts = (state) => state.systemProducts;

export const selectSystemProductCount = createSelector(
  [selectSystemProducts],
  ({ products }) => _.size(products),
);

export const selectSelectedSystemProduct = createSelector(
  [selectSystemProducts, (state) => state.systemProducts.selectedProductKey],
  ({ products }, key) =>
    key
      ? _.find(products, (product) => (product._id || product.product_id) === key) ?? null
      : null,
);

export const selectSystemProductsTableView = createSelector(
  [selectSystemProducts],
  ({ products, search, columnFilters, page, limit }) => {
    const query = _.toLower(_.trim(search));
    const filteredProducts = _.filter(products, (product) =>
      (!query ||
        _.some(SEARCH_FIELDS, (field) =>
          _.includes(_.toLower(_.toString(_.get(product, field))), query),
        )) &&
      _.every(columnFilters, (value, key) =>
        _.includes(
          _.toLower(_.toString(_.get(product, key))),
          _.toLower(_.trim(value)),
        ),
      ),
    );
    const total = _.size(filteredProducts);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = _.clamp(page, 1, totalPages);
    const rows = _.slice(filteredProducts, (currentPage - 1) * limit, currentPage * limit);
    const pagination = { page: currentPage, limit, total, totalPages };
    const activeFilterCount = countActiveFilters(columnFilters);

    return {
      rows,
      search,
      columnFilters,
      pagination,
      pageItems: buildPageItems(currentPage, totalPages),
      rowRange: getRowRange({ ...pagination, count: _.size(rows) }),
      activeFilterCount,
      isFiltered: Boolean(query) || activeFilterCount > 0,
    };
  },
);
