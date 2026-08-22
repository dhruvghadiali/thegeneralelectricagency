import { useEffect, useState } from "react";

import { employeeCompanyApi } from "@Api";
import { TABLE_DEFAULTS } from "@Enums";
import { toCompanyListParams } from "@Tables/company/companyTable.api-payload";
import { COMPANY_TABLE_DEFAULTS } from "@Tables/company/companyTable.defaults";
import { fromCompanyListResponse } from "@Tables/company/companyTable.frontend-payload";

export function useCompanyOptions(open) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(TABLE_DEFAULTS.PAGE);
  const [pagination, setPagination] = useState({
    page: TABLE_DEFAULTS.PAGE,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setPage(TABLE_DEFAULTS.PAGE);
      setDebouncedSearch(search.trim());
    }, TABLE_DEFAULTS.SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    if (!open) return undefined;

    const controller = new AbortController();
    const isFirstPage = page === TABLE_DEFAULTS.PAGE;
    setIsLoading(true);
    setLoadError(null);

    const loadCompanies = async () => {
      try {
        const response = await employeeCompanyApi.getCompanies(
          {
            ...toCompanyListParams({
              page,
              limit: COMPANY_TABLE_DEFAULTS.limit,
              search: debouncedSearch,
              sort: COMPANY_TABLE_DEFAULTS.sort,
            }),
            is_active: true,
          },
          { signal: controller.signal },
        );
        const result = fromCompanyListResponse(response, {
          page,
          limit: COMPANY_TABLE_DEFAULTS.limit,
        });

        setCompanies((current) => {
          if (isFirstPage) return result.items;
          return [
            ...new Map(
              [...current, ...result.items].map((company) => [
                company.id,
                company,
              ]),
            ).values(),
          ];
        });
        setPagination(result.pagination);
      } catch {
        if (!controller.signal.aborted) {
          if (isFirstPage) setCompanies([]);
          setLoadError("Unable to load companies. Try again.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    loadCompanies();
    return () => controller.abort();
  }, [debouncedSearch, open, page]);

  return {
    companies,
    isLoading,
    loadError,
    page: pagination.page,
    search,
    setPage,
    setSearch,
    totalPages: pagination.totalPages,
  };
}
