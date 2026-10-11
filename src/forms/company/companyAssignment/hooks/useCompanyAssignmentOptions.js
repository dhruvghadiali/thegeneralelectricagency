import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { employeeCompanyApi, extractErrorMessage } from "@Api";
import { TABLE_DEFAULTS } from "@Enums";
import {
  activeCompanyListParams,
  companyListRequestOptions,
  FIRST_COMPANY_PAGE,
} from "@Forms/company/companyAssignment/companyAssignment.helpers";
import { contactCompanyOptionsLoaded } from "@Redux/companyContact/companyContact.slice";
import { fromCompanyListResponse } from "@Tables/company/companyTable.frontend-payload";

export function useCompanyAssignmentOptions({
  assignment,
  contact,
  reassignmentBlockReason,
  changeAssignment,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      changeAssignment({
        companyPage: FIRST_COMPANY_PAGE,
        debouncedSearch: assignment.companySearch.trim(),
      });
    }, TABLE_DEFAULTS.SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timeoutId);
  }, [assignment.companySearch, changeAssignment]);

  useEffect(() => {
    if (!contact || !assignment.pickerOpen || reassignmentBlockReason) {
      return undefined;
    }

    const controller = new AbortController();
    const replace = assignment.companyPage === FIRST_COMPANY_PAGE;
    changeAssignment({ isLoadingCompanies: true });

    async function loadCompanies() {
      try {
        const requestOptions = companyListRequestOptions({
          page: assignment.companyPage,
          search: assignment.debouncedSearch,
        });
        const response = await employeeCompanyApi.getCompanies(
          activeCompanyListParams(requestOptions),
          { signal: controller.signal },
        );
        const result = fromCompanyListResponse(response, requestOptions);
        dispatch(
          contactCompanyOptionsLoaded({
            items: result.items,
            pagination: result.pagination,
            replace,
          }),
        );
      } catch (error) {
        if (!controller.signal.aborted && replace) {
          changeAssignment({
            companies: [],
            saveError: extractErrorMessage(error),
          });
        }
      } finally {
        if (!controller.signal.aborted) {
          changeAssignment({ isLoadingCompanies: false });
        }
      }
    }

    loadCompanies();
    return () => controller.abort();
  }, [
    assignment.companyPage,
    assignment.debouncedSearch,
    assignment.pickerOpen,
    changeAssignment,
    contact,
    dispatch,
    reassignmentBlockReason,
  ]);
}
