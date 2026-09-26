import {
  Building2,
  CalendarClock,
  CircleUserRound,
  Database,
} from "lucide-react";

import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";
import {
  SyncDetails,
  SyncResult,
} from "@Tally/component/companySyncs/companySyncs.cells";

export const TALLY_COMPANY_SYNC_COLUMNS = [
  {
    key: "syncAt",
    header: "Synced at",
    type: COLUMN_TYPES.DATE_TIME,
    field: "syncAt",
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
    render: (sync) => (
      <div>
        <p className="font-medium">{sync.syncedBy.name}</p>
        <p className="text-xs text-muted-foreground">
          {[sync.syncedBy.employeeId, sync.syncedBy.username]
            .filter(Boolean)
            .join(" · ") || "—"}
        </p>
      </div>
    ),
  },
  {
    key: "beforeSyncCount",
    header: "Before",
    type: COLUMN_TYPES.NUMBER,
    field: "beforeSyncCount",
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
    field: "afterSyncCount",
    className: "text-center tabular-nums",
    mobile: MOBILE_SLOTS.META,
    mobileIcon: Building2,
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
      <span
        className={
          sync.countChange > 0
            ? "font-medium text-emerald-700 dark:text-emerald-400"
            : sync.countChange < 0
              ? "font-medium text-destructive"
              : "text-muted-foreground"
        }
      >
        {sync.countChange > 0 ? "+" : ""}{sync.countChange}
      </span>
    ),
  },
  {
    key: "result",
    header: "Result",
    type: COLUMN_TYPES.CUSTOM,
    mobile: MOBILE_SLOTS.BADGE,
    width: "190px",
    render: (sync) => <SyncResult sync={sync} />,
  },
  {
    key: "syncInfo",
    header: "Sync information",
    type: COLUMN_TYPES.CUSTOM,
    className: "min-w-80",
    render: (sync) => <SyncDetails entries={sync.syncInfo} />,
  },
];

export default TALLY_COMPANY_SYNC_COLUMNS;
