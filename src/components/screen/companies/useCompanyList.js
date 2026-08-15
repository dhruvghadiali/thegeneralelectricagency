import { fetchCompanies } from "@Redux/company/company.action";
import { companyTableActions } from "@Redux/company/company.slice";
import { companyTableSelectors } from "@Redux/company/company.selector";
import { useDataTable } from "@/components/common/dataTable/useDataTable";

const fetchCompanyList = () => fetchCompanies();

export function useCompanyList() {
  return useDataTable({
    selectors: companyTableSelectors,
    actions: companyTableActions,
    fetchAction: fetchCompanyList,
  });
}

export default useCompanyList;
