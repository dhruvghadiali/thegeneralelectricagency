import { History } from "lucide-react";
import _ from "lodash";

import { DATE_FORMATS, formatDate } from "@/utils/date.util";
import SyncPendingDetailItem from "@screenComponent/products/sheet/syncPending/syncPendingDetailItem";
import SyncPendingSheetSection from "@screenComponent/products/sheet/syncPending/syncPendingSheetSection";

const employeeLabel = (employee) =>
  _.find(
    [
      _.get(employee, "name"),
      _.get(employee, "username"),
      _.get(employee, "employeeId") ?? _.get(employee, "employee_id"),
    ],
    (value) => !_.isNil(value) && value !== "",
  ) ?? "—";

function SyncPendingAuditSection({ product }) {
  return (
    <SyncPendingSheetSection
      icon={History}
      title="Audit information"
      description="Creation source and most recent update details."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <SyncPendingDetailItem
          label="Created by"
          value={employeeLabel(product.createdBy)}
        />
        <SyncPendingDetailItem
          label="Updated by"
          value={employeeLabel(product.updatedBy)}
        />
        <SyncPendingDetailItem
          label="Created at"
          value={formatDate(product.createdAt, DATE_FORMATS.DATE_TIME)}
        />
        <SyncPendingDetailItem
          label="Updated at"
          value={formatDate(product.updatedAt, DATE_FORMATS.DATE_TIME)}
        />
        <SyncPendingDetailItem
          label="Record source"
          value={product.isSystemGenerated ? "System generated" : "Manual"}
        />
        <SyncPendingDetailItem
          label="System mapping"
          value={product.systemId || "Not mapped"}
        />
      </div>
    </SyncPendingSheetSection>
  );
}

export default SyncPendingAuditSection;
