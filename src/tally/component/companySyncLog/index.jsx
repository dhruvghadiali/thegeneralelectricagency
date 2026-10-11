import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RefreshCw } from "lucide-react";

import DataTable from "@commonComponent/dataTable";
import { Button } from "@shadcnComponent/button";
import { buildPageItems, getRowRange } from "@/utils/pagination.util";
import { TALLY_COMPANY_SYNC_LOGS_STATUS } from "@Tally/enum/tallyCompanySyncLogsStatus.enum";
import { fetchTallyCompanySyncLogs } from "@Tally/redux/companySyncLog/companySyncLog.action";
import {
  limitChanged,
  pageChanged,
} from "@Tally/redux/companySyncLog/companySyncLog.slice";
import { selectTallyCompanySyncLogs } from "@Tally/redux/companySyncLog/companySyncLog.selector";

import { TALLY_COMPANY_SYNC_LOG_COLUMNS } from "@Tally/component/companySyncLog/companySyncLog.columns";

function CompanySyncLogs() {
  const dispatch = useDispatch();
  const { items, page, limit, pagination, status, error } = useSelector(
    selectTallyCompanySyncLogs,
  );
  const isLoading = status === TALLY_COMPANY_SYNC_LOGS_STATUS.IN_PROGRESS;

  useEffect(() => {
    const request = dispatch(fetchTallyCompanySyncLogs());
    return () => request.abort();
  }, [dispatch, page, limit]);

  const refresh = () => dispatch(fetchTallyCompanySyncLogs());

  return (
    <DataTable
      columns={TALLY_COMPANY_SYNC_LOG_COLUMNS}
      rows={items}
      rowKey={(sync) => sync._id}
      search=""
      sort={[]}
      columnFilters={{}}
      pagination={pagination}
      pageItems={buildPageItems(pagination.page, pagination.totalPages)}
      rowRange={getRowRange({ ...pagination, count: items.length })}
      activeFilterCount={0}
      isFiltered={false}
      onPageChange={(nextPage) => dispatch(pageChanged(nextPage))}
      onLimitChange={(nextLimit) => dispatch(limitChanged(nextLimit))}
      onRetry={refresh}
      isLoading={isLoading}
      error={error}
      toolbarActions={
        <Button variant="outline" onClick={refresh} disabled={isLoading}>
          <RefreshCw className={isLoading ? "size-4 animate-spin" : "size-4"} />
          Refresh
        </Button>
      }
      showSearch={false}
      rowNoun="sync logs"
      emptyIcon={RefreshCw}
      emptyTitle="No company sync logs found"
      emptyDescription="Company sync history will appear here after the first sync."
      fillHeight
    />
  );
}

export default CompanySyncLogs;
