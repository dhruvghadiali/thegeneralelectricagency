import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { fetchCompanyContacts } from "@Redux/companyContact/companyContact.action";
import { companyContactTableActions } from "@Redux/companyContact/companyContact.slice";
import { companyContactTableSelectors } from "@Redux/companyContact/companyContact.selector";
import { COMPANY_CONTACT_COLUMNS } from "@screenComponent/companies/companyContact/companyContact.columns";

const fetchCompanyContactList = () =>
  fetchCompanyContacts(COMPANY_CONTACT_COLUMNS);

export function useCompanyContactList() {
  return useDataTable({
    selectors: companyContactTableSelectors,
    actions: companyContactTableActions,
    fetchAction: fetchCompanyContactList,
  });
}
