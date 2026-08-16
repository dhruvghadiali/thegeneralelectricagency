import { fetchCompanies } from "@Redux/company/company.action";
import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { companyTableActions } from "@Redux/company/company.slice";
import { companyTableSelectors } from "@Redux/company/company.selector";
import { COMPANY_COLUMNS } from "@screenComponent/companies/company.columns";

const fetchCompanyList = () => fetchCompanies(COMPANY_COLUMNS);

export function useCompanyList() {
  return useDataTable({
    selectors: companyTableSelectors,
    actions: companyTableActions,
    fetchAction: fetchCompanyList,
  });
}

export default useCompanyList;
