import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchQuotationCompanies } from "@Redux/quotation/quotation.action";
import {
  selectQuotationCompanies,
  selectQuotationCompanyPagination,
  selectQuotationCompanyRequest,
  selectQuotationCompanySearch,
  selectQuotationSelectedCompany,
} from "@Redux/quotation/quotation.selector";
import { QUOTATION_COMPANY_PAGE } from "@Redux/quotation/quotation.state";

function useQuotationCompanyDirectory() {
  const dispatch = useDispatch();
  const companies = useSelector(selectQuotationCompanies);
  const pagination = useSelector(selectQuotationCompanyPagination);
  const companySearch = useSelector(selectQuotationCompanySearch);
  const selectedCompany = useSelector(selectQuotationSelectedCompany);
  const request = useSelector(selectQuotationCompanyRequest);
  const hasMoreCompanies = pagination.page < pagination.totalPages;
  const companyCountLabel = pagination.total
    ? `${companies.length} of ${pagination.total} companies`
    : `${companies.length} companies`;

  const loadCompanies = useCallback(
    (page = QUOTATION_COMPANY_PAGE) =>
      dispatch(fetchQuotationCompanies({ page })),
    [dispatch],
  );

  return {
    companies,
    pagination,
    companySearch,
    selectedCompany,
    companyCountLabel,
    hasMoreCompanies,
    loadCompanies,
    ...request,
  };
}

export default useQuotationCompanyDirectory;
