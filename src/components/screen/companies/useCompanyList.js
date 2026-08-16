import { fetchCompanies } from "@Redux/company/company.action";
import { useDataTable } from "@Components/dataTable/useDataTable";
import { companyTableActions } from "@Redux/company/company.slice";
import { companyTableSelectors } from "@Redux/company/company.selector";

const fetchCompanyList = () => fetchCompanies();

export function useCompanyList() {
  return useDataTable({
    selectors: companyTableSelectors,
    actions: companyTableActions,
    fetchAction: fetchCompanyList,
  });
}

export default useCompanyList;
