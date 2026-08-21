import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { fetchCompanyContacts } from "@Redux/companyContact/companyContact.action";
import { companyContactTableActions } from "@Redux/companyContact/companyContact.slice";
import { companyContactTableSelectors } from "@Redux/companyContact/companyContact.selector";
import { COMPANY_CONTACT_TABLE_COLUMNS } from "@Tables/companyContact/companyContactTable.columns";

const fetchCompanyContactList = () =>
  fetchCompanyContacts(COMPANY_CONTACT_TABLE_COLUMNS);

export function useCompanyContactTable() {
  return useDataTable({
    selectors: companyContactTableSelectors,
    actions: companyContactTableActions,
    fetchAction: fetchCompanyContactList,
  });
}

export default useCompanyContactTable;
