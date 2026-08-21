import { fetchCompanies } from "@Redux/company/company.action";
import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { companyTableActions } from "@Redux/company/company.slice";
import { companyTableSelectors } from "@Redux/company/company.selector";
import { COMPANY_TABLE_COLUMNS } from "@Tables/company/companyTable.columns";

const fetchCompanyList = () => fetchCompanies(COMPANY_TABLE_COLUMNS);

export function useCompanyTable() {
  return useDataTable({
    selectors: companyTableSelectors,
    actions: companyTableActions,
    fetchAction: fetchCompanyList,
  });
}

export default useCompanyTable;
