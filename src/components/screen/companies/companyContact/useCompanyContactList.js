import { useCallback } from "react";

import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { fetchCompanyContacts } from "@Redux/companyContact/companyContact.action";
import { companyContactTableActions } from "@Redux/companyContact/companyContact.slice";
import { companyContactTableSelectors } from "@Redux/companyContact/companyContact.selector";

export function useCompanyContactList(columns) {
  const fetchCompanyContactList = useCallback(
    () => fetchCompanyContacts(columns),
    [columns],
  );

  return useDataTable({
    selectors: companyContactTableSelectors,
    actions: companyContactTableActions,
    fetchAction: fetchCompanyContactList,
  });
}
