import { CalendarClock, CircleUserRound, Database } from "lucide-react";

import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";
import {
  CountChange,
  SyncedBy,
  SyncDetails,
  SyncResult,
} from "@Tally/component/productSyncLog/productSyncLog.cells";

export const TALLY_PRODUCT_SYNC_LOG_COLUMNS = [
  {
    key: "syncAt",
    header: "Synced at",
    type: COLUMN_TYPES.DATE_TIME,
    field: "sync_at",
    className: "whitespace-nowrap font-medium",
    mobile: MOBILE_SLOTS.PRIMARY,
    mobileIcon: CalendarClock,
    width: "210px",
  },
  {
    key: "syncedBy",
    header: "Synced by",
    type: COLUMN_TYPES.CUSTOM,
    className: "min-w-52",
    mobile: MOBILE_SLOTS.SECONDARY,
    mobileIcon: CircleUserRound,
    render: (sync) => <SyncedBy user={sync.sync_by ?? {}} />,
  },
  {
    key: "beforeSyncCount",
    header: "Before",
    type: COLUMN_TYPES.NUMBER,
    field: "before_sync_count",
    className: "text-center tabular-nums",
    mobile: MOBILE_SLOTS.META,
    mobileIcon: Database,
    mobileLabel: "Before",
    width: "120px",
  },
  {
    key: "afterSyncCount",
    header: "After",
    type: COLUMN_TYPES.NUMBER,
    field: "after_sync_count",
    className: "text-center tabular-nums",
    mobile: MOBILE_SLOTS.META,
    mobileIcon: Database,
    mobileLabel: "After",
    width: "120px",
  },
  {
    key: "countChange",
    header: "Change",
    type: COLUMN_TYPES.CUSTOM,
    className: "text-center tabular-nums",
    width: "120px",
    render: (sync) => (
      <CountChange
        beforeCount={sync.before_sync_count}
        afterCount={sync.after_sync_count}
      />
    ),
  },
  {
    key: "result",
    header: "Result",
    type: COLUMN_TYPES.CUSTOM,
    mobile: MOBILE_SLOTS.BADGE,
    width: "190px",
    render: (sync) => <SyncResult entries={sync.sync_info} />,
  },
  {
    key: "syncInfo",
    header: "Sync information",
    type: COLUMN_TYPES.CUSTOM,
    className: "min-w-80",
    render: (sync) => <SyncDetails entries={sync.sync_info} />,
  },
];
