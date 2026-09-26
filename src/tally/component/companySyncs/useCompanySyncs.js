import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { TALLY_COMPANY_SYNC_COLUMNS } from "@Tally/component/companySyncs/companySyncs.columns";
import { fetchTallyCompanySyncs } from "@Tally/redux/companySync/companySync.action";
import { tallyCompanySyncTableSelectors } from "@Tally/redux/companySync/companySync.selector";
import { tallyCompanySyncTableActions } from "@Tally/redux/companySync/companySync.slice";

const fetchCompanySyncList = () =>
  fetchTallyCompanySyncs(TALLY_COMPANY_SYNC_COLUMNS);

export function useCompanySyncs() {
  return useDataTable({
    selectors: tallyCompanySyncTableSelectors,
    actions: tallyCompanySyncTableActions,
    fetchAction: fetchCompanySyncList,
  });
}

export default useCompanySyncs;
