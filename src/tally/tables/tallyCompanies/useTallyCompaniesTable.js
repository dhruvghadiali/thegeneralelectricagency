import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { fetchTallyCompanies } from "@Tally/redux/tallyCompanies/tallyCompanies.action";
import { tallyCompaniesTableActions } from "@Tally/redux/tallyCompanies/tallyCompanies.slice";
import { tallyCompaniesTableSelectors } from "@Tally/redux/tallyCompanies/tallyCompanies.selector";
import { TALLY_COMPANIES_TABLE_COLUMNS } from "@Tally/tables/tallyCompanies/tallyCompaniesTable.columns";

const fetchTallyCompaniesList = () => fetchTallyCompanies(TALLY_COMPANIES_TABLE_COLUMNS);

export function useTallyCompaniesTable() {
  return useDataTable({
    selectors: tallyCompaniesTableSelectors,
    actions: tallyCompaniesTableActions,
    fetchAction: fetchTallyCompaniesList,
  });
}

export default useTallyCompaniesTable;
