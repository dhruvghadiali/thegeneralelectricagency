import { useCallback, useEffect, useState } from "react";

import {
  employeeCompanyApi,
  employeeProductApi,
  extractErrorMessage,
} from "@Api";
import { COMPANY_TYPES } from "@Enums";
import { fromProductListResponse } from "@Tables/product/productTable.frontend-payload";
import { fromCompanyListResponse } from "@Tables/company/companyTable.frontend-payload";

const SEARCH_DELAY_MS = 350;
const OPTION_LIMIT = 30;

function useRemoteOptions({ query, enabled = true, load }) {
  const [state, setState] = useState({
    items: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!enabled) {
      setState({ items: [], isLoading: false, error: null });
      return undefined;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setState((current) => ({ ...current, isLoading: true, error: null }));

      try {
        const items = await load(query.trim(), controller.signal);
        setState({ items, isLoading: false, error: null });
      } catch (error) {
        if (error?.name === "CanceledError" || error?.name === "AbortError") {
          return;
        }

        setState({
          items: [],
          isLoading: false,
          error: extractErrorMessage(error),
        });
      }
    }, SEARCH_DELAY_MS);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [enabled, load, query]);

  return state;
}

const companyLoader = async (search, signal) => {
  const response = await employeeCompanyApi.getCompanies(
    {
      page: 1,
      limit: OPTION_LIMIT,
      search: search || undefined,
      sort: "company_name:asc",
      is_active: true,
      company_type: COMPANY_TYPES.SUPPLIER,
    },
    { signal },
  );
  const { items } = fromCompanyListResponse(response, {
    page: 1,
    limit: OPTION_LIMIT,
  });

  return items
    .filter(
      (company) =>
        company.isActive && company.type === COMPANY_TYPES.SUPPLIER,
    )
    .sort((left, right) => left.name.localeCompare(right.name));
};

export function usePurchaseOrderOptions({
  productQuery,
  supplierId,
  supplierQuery,
}) {
  const [productCount, setProductCount] = useState({
    supplierId: "",
    total: 0,
  });
  const productLoader = useCallback(
    async (search, signal) => {
      if (!supplierId) return [];

      const response = await employeeProductApi.getProducts(
        {
          page: 1,
          limit: OPTION_LIMIT,
          search: search || undefined,
          sort: "name:asc",
          is_active: true,
          agency: supplierId,
        },
        { signal },
      );
      const { items, pagination } = fromProductListResponse(response, {
        page: 1,
        limit: OPTION_LIMIT,
      });
      const products = items
        .filter(
          (product) =>
            product.isActive &&
            String(product.agency) === String(supplierId),
        )
        .sort((left, right) => left.name.localeCompare(right.name));

      if (!search) {
        setProductCount({
          supplierId: String(supplierId),
          total: pagination.total || products.length,
        });
      }

      return products;
    },
    [supplierId],
  );
  const productState = useRemoteOptions({
    query: productQuery,
    enabled: Boolean(supplierId),
    load: productLoader,
  });
  const supplierState = useRemoteOptions({
    query: supplierQuery,
    load: companyLoader,
  });

  const availableProductCount =
    productCount.supplierId === String(supplierId)
      ? productCount.total
      : 0;

  return { availableProductCount, productState, supplierState };
}
