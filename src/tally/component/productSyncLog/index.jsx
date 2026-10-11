import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RefreshCw } from "lucide-react";

import DataTable from "@commonComponent/dataTable";
import { Button } from "@shadcnComponent/button";
import { buildPageItems, getRowRange } from "@/utils/pagination.util";
import { TALLY_PRODUCT_SYNC_LOGS_STATUS } from "@Tally/enum/tallyProductSyncLogsStatus.enum";
import { fetchTallyProductSyncLogs } from "@Tally/redux/productSyncLog/productSyncLog.action";
import {
  limitChanged,
  pageChanged,
} from "@Tally/redux/productSyncLog/productSyncLog.slice";
import { selectTallyProductSyncLogs } from "@Tally/redux/productSyncLog/productSyncLog.selector";

import { TALLY_PRODUCT_SYNC_LOG_COLUMNS } from "@Tally/component/productSyncLog/productSyncLog.columns";

function ProductSyncLogs() {
  const dispatch = useDispatch();
  const { items, page, limit, pagination, status, error } = useSelector(
    selectTallyProductSyncLogs,
  );
  const isLoading = status === TALLY_PRODUCT_SYNC_LOGS_STATUS.IN_PROGRESS;

  useEffect(() => {
    const request = dispatch(fetchTallyProductSyncLogs());
    return () => request.abort();
  }, [dispatch, page, limit]);

  const refresh = () => dispatch(fetchTallyProductSyncLogs());

  return (
    <DataTable
      columns={TALLY_PRODUCT_SYNC_LOG_COLUMNS}
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
      emptyTitle="No product sync logs found"
      emptyDescription="Product sync history will appear here after the first sync."
      fillHeight
    />
  );
}

export default ProductSyncLogs;
