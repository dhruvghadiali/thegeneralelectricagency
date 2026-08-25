import { useCallback, useEffect, useState } from "react";

import {
  employeeCompanyApi,
  employeeProductApi,
  extractErrorMessage,
  superAdminCompanyApi,
  superAdminProductApi,
} from "@Api";
import { COMPANY_TYPES, ROLE_PATHS } from "@Enums";
import { fromCompanyListResponse } from "@Tables/company/companyTable.frontend-payload";
import { fromProductListResponse } from "@Tables/product/productTable.frontend-payload";

const SEARCH_DELAY_MS = 350;
const OPTION_LIMIT = 30;

const COMPANY_API_BY_ROLE = {
  [ROLE_PATHS.EMPLOYEE]: employeeCompanyApi,
  [ROLE_PATHS.SUPER_ADMIN]: superAdminCompanyApi,
};

const PRODUCT_API_BY_ROLE = {
  [ROLE_PATHS.EMPLOYEE]: employeeProductApi,
  [ROLE_PATHS.SUPER_ADMIN]: superAdminProductApi,
};

function useRemoteOptions({ query, enabled = true, load }) {
  const [state, setState] = useState({
    items: [],
    isLoading: false,
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

export function usePurchaseCreditOptions({ role, supplierId, supplierQuery, productQuery }) {
  const [productCount, setProductCount] = useState({
    supplierId: "",
    total: 0,
  });

  const loadSuppliers = useCallback(
    async (search, signal) => {
      const api = COMPANY_API_BY_ROLE[role];
      if (!api) return [];

      const response = await api.getCompanies(
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
    },
    [role],
  );

  const loadProducts = useCallback(
    async (search, signal) => {
      const api = PRODUCT_API_BY_ROLE[role];
      if (!api || !supplierId) return [];

      const response = await api.getProducts(
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

      const activeSupplierProducts = items
        .filter(
          (product) =>
            product.isActive && String(product.agency) === String(supplierId),
        )
        .sort((left, right) => left.name.localeCompare(right.name));

      if (!search) {
        setProductCount({
          supplierId: String(supplierId),
          total: pagination.total || activeSupplierProducts.length,
        });
      }

      return activeSupplierProducts;
    },
    [role, supplierId],
  );

  const supplierState = useRemoteOptions({
    query: supplierQuery,
    load: loadSuppliers,
  });
  const productState = useRemoteOptions({
    query: productQuery,
    enabled: Boolean(supplierId),
    load: loadProducts,
  });

  const availableProductCount =
    productCount.supplierId === String(supplierId)
      ? productCount.total
      : 0;

  return { supplierState, productState, availableProductCount };
}
