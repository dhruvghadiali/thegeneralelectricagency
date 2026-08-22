import { useEffect, useState } from "react";

import {
  employeeCompanyApi,
  employeeProductApi,
  extractErrorMessage,
} from "@Api";
import { fromProductListResponse } from "@Tables/product/productTable.frontend-payload";
import { fromCompanyListResponse } from "@Tables/company/companyTable.frontend-payload";

const SEARCH_DELAY_MS = 350;
const OPTION_LIMIT = 20;

function useRemoteOptions({ query, load }) {
  const [state, setState] = useState({
    items: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
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
  }, [load, query]);

  return state;
}

const productLoader = async (search, signal) => {
  const response = await employeeProductApi.getProducts(
    {
      page: 1,
      limit: OPTION_LIMIT,
      search: search || undefined,
      sort: "name:asc",
      is_active: true,
    },
    { signal },
  );
  const { items } = fromProductListResponse(response, {
    page: 1,
    limit: OPTION_LIMIT,
  });

  return items
    .filter((product) => product.isActive)
    .sort((left, right) => left.name.localeCompare(right.name));
};

const companyLoader = async (search, signal) => {
  const response = await employeeCompanyApi.getCompanies(
    {
      page: 1,
      limit: OPTION_LIMIT,
      search: search || undefined,
      sort: "company_name:asc",
      is_active: true,
    },
    { signal },
  );
  const { items } = fromCompanyListResponse(response, {
    page: 1,
    limit: OPTION_LIMIT,
  });

  return items
    .filter((company) => company.isActive)
    .sort((left, right) => left.name.localeCompare(right.name));
};

export function usePurchaseOrderOptions(productQuery, supplierQuery) {
  const productState = useRemoteOptions({
    query: productQuery,
    load: productLoader,
  });
  const supplierState = useRemoteOptions({
    query: supplierQuery,
    load: companyLoader,
  });

  return { productState, supplierState };
}
