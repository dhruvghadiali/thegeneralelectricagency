import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchQuotationCompanies } from "@Redux/quotation/quotation.action";
import { selectQuotationCompanySearch } from "@Redux/quotation/quotation.selector";

const COMPANY_SEARCH_DELAY = 300;

function useQuotationCompanySearch() {
  const dispatch = useDispatch();
  const companySearch = useSelector(selectQuotationCompanySearch);

  useEffect(() => {
    let companyRequest;
    const delay = companySearch.trim() ? COMPANY_SEARCH_DELAY : 0;
    const timeoutId = window.setTimeout(() => {
      companyRequest = dispatch(fetchQuotationCompanies());
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      companyRequest?.abort();
    };
  }, [companySearch, dispatch]);
}

export default useQuotationCompanySearch;
