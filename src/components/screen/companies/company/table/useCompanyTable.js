import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { fetchCompanies } from "@Redux/company/company.action";
import { companyTableSelectors } from "@Redux/company/company.selector";
import { companyTableActions } from "@Redux/company/company.slice";
import { COMPANY_TABLE_COLUMNS } from "@screenComponent/companies/company/table/companyTable.columns";

const fetchCompanyList = () => fetchCompanies(COMPANY_TABLE_COLUMNS);

export function useCompanyTable() {
  return useDataTable({
    selectors: companyTableSelectors,
    actions: companyTableActions,
    fetchAction: fetchCompanyList,
  });
}

export default useCompanyTable;
