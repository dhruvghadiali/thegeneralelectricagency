import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { getCompanyList } from "@Redux/company/getCompanyList/getCompanyList.action";
import { companyTableSelectors } from "@Redux/company/getCompanyList/getCompanyList.selector";
import { companyTableActions } from "@Redux/company/getCompanyList/getCompanyList.slice";

export function useCompanyTable() {
  return useDataTable({
    selectors: companyTableSelectors,
    actions: companyTableActions,
    fetchAction: getCompanyList,
  });
}

export default useCompanyTable;
