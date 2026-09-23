import { useMemo, useState } from "react";
import { Eye, Package } from "lucide-react";

import DataTable from "@commonComponent/dataTable";
import { Button } from "@shadcnComponent/button";
import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";
import { normalizeSort } from "@/utils/dataTable.util";
import { buildPageItems, getRowRange } from "@/utils/pagination.util";
import ProductDetails from "@Tally/component/products/details";

const COLUMNS = [
  {
    key: "name",
    header: "Product name",
    type: COLUMN_TYPES.TEXT,
    field: "name",
    sortKey: "name",
    className: "min-w-56 font-medium",
    mobile: MOBILE_SLOTS.PRIMARY,
  },
  {
    key: "guid",
    header: "Tally GUID",
    type: COLUMN_TYPES.TEXT,
    field: "guid",
    sortKey: "guid",
    className: "min-w-72 break-all font-mono",
    mobile: MOBILE_SLOTS.META,
    mobileLabel: "GUID:",
  },
  {
    key: "masterId",
    header: "Master ID",
    type: COLUMN_TYPES.TEXT,
    field: "masterId",
    sortKey: "masterId",
    className: "font-mono",
    mobile: MOBILE_SLOTS.META,
    mobileLabel: "Master ID:",
  },
];

function ProductsTable({ products, status, error, onRetry }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const matchingProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    const filtered = query
      ? products.filter((product) =>
          [product.name, product.guid, product.masterId].some((value) =>
            value.toLocaleLowerCase().includes(query),
          ),
        )
      : products;
    const sorts = normalizeSort(sort);
    if (sorts.length === 0) return filtered;

    return [...filtered].sort((first, second) => {
      for (const { field, order } of sorts) {
        const comparison = first[field].localeCompare(second[field], undefined, {
          numeric: true,
          sensitivity: "base",
        });
        if (comparison !== 0) return order === "desc" ? -comparison : comparison;
      }
      return 0;
    });
  }, [products, search, sort]);

  const total = matchingProducts.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(page, totalPages);
  const rows = matchingProducts.slice((currentPage - 1) * limit, currentPage * limit);
  const pagination = { page: currentPage, limit, total, totalPages };

  return (
    <>
      <div className="min-w-0 w-full max-w-full overflow-hidden">
        <DataTable
          columns={COLUMNS}
          rows={rows}
          rowKey={(product) => product.guid || product.masterId || product.name}
          rowActions={(product) => (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setSelectedProduct(product)}
              aria-label={`View ${product.name}`}
              title="View product"
            >
              <Eye className="size-4" aria-hidden="true" />
            </Button>
          )}
          search={search}
          sort={sort}
          columnFilters={{}}
          pagination={pagination}
          pageItems={buildPageItems(currentPage, totalPages)}
          rowRange={getRowRange({ ...pagination, count: rows.length })}
          activeFilterCount={0}
          isFiltered={Boolean(search.trim())}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          onSearchSubmit={() => {}}
          onSortChange={(value) => {
            setSort(value);
            setPage(1);
          }}
          onClearFilters={() => {
            setSearch("");
            setPage(1);
          }}
          onPageChange={setPage}
          onLimitChange={(value) => {
            setLimit(value);
            setPage(1);
          }}
          onRetry={onRetry}
          isLoading={status === "loading"}
          error={status === "failed" ? error : null}
          searchPlaceholder="Search products by name or Tally ID..."
          rowNoun="products"
          emptyIcon={Package}
          emptyTitle={status === "succeeded" ? "No products found" : "No products loaded"}
          emptyDescription={
            status === "succeeded"
              ? "Tally returned no products."
              : "Click Sync to fetch products from Tally."
          }
          filteredEmptyDescription="No products match your search."
          maxBodyHeight="none"
        />
      </div>
      <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}

export default ProductsTable;
