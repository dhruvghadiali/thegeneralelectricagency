import { useDataTable } from "@commonComponent/dataTable/useDataTable";
import { fetchQuotationDetails } from "@Redux/quotation/quotation.action";
import { quotationTableSelectors } from "@Redux/quotation/quotation.selector";
import { quotationTableActions } from "@Redux/quotation/quotation.slice";
import { QUOTATION_TABLE_COLUMNS } from "@screenComponent/quotations/table/quotationTable.columns";

const fetchQuotationList = () =>
  fetchQuotationDetails(QUOTATION_TABLE_COLUMNS);

export function useQuotationTable() {
  return useDataTable({
    selectors: quotationTableSelectors,
    actions: quotationTableActions,
    fetchAction: fetchQuotationList,
  });
}

export default useQuotationTable;
