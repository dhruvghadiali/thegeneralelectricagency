import _ from "lodash";

import { TABLE_DEFAULTS } from "@Enums";
import { TALLY_COMPANY_SYNCS_DEFAULTS } from "@Tally/component/companySyncs/companySyncs.defaults";

function fromUserResponse(user = {}) {
  const fullName = _.trim(
    [user.first_name, user.last_name].filter(Boolean).join(" "),
  );

  return {
    id: user._id ?? user.id ?? null,
    employeeId: user.emp_id ?? user.employeeId ?? "",
    username: user.username ?? "",
    name: fullName || user.username || user.emp_id || "Unknown user",
  };
}

function fromSyncInfoResponse(info = {}) {
  return {
    status: String(info.status ?? "").toLowerCase(),
    statusCode: Number(info.status_code ?? info.statusCode) || null,
    message: info.message ?? "",
    companyId: info.company_id ?? info.companyId ?? info.company?.company_id ?? "",
    companyName: info.company?.company_name ?? info.companyName ?? "",
    inserted: Number(info.inserted) || 0,
    updated: Number(info.updated) || 0,
    deleted: Number(info.deleted) || 0,
  };
}

function fromTallyCompanySyncResponse(sync = {}) {
  const syncInfo = _.map(sync.sync_info ?? sync.syncInfo ?? [], fromSyncInfoResponse);
  const beforeSyncCount = Number(sync.before_sync_count ?? sync.beforeSyncCount) || 0;
  const afterSyncCount = Number(sync.after_sync_count ?? sync.afterSyncCount) || 0;

  return {
    id: sync._id ?? sync.id ?? null,
    syncAt: sync.sync_at ?? sync.syncAt ?? null,
    syncedBy: fromUserResponse(sync.sync_by ?? sync.syncedBy),
    beforeSyncCount,
    afterSyncCount,
    countChange: afterSyncCount - beforeSyncCount,
    syncInfo,
    successCount: _.filter(syncInfo, { status: "success" }).length,
    failureCount: _.filter(syncInfo, { status: "failure" }).length,
    isActive: sync.is_active ?? sync.isActive ?? true,
  };
}

function fromPaginationResponse(pagination = {}, requested = {}) {
  const page = Number(pagination.page) || requested.page || TABLE_DEFAULTS.PAGE;
  const limit =
    Number(pagination.limit) ||
    requested.limit ||
    TALLY_COMPANY_SYNCS_DEFAULTS.limit;
  const total = Number(pagination.total) || 0;

  return {
    page,
    limit,
    total,
    totalPages:
      Number(pagination.total_pages ?? pagination.totalPages) ||
      Math.ceil(total / limit) ||
      0,
  };
}

export function fromTallyCompanySyncListResponse(response = {}, requested = {}) {
  return {
    items: _.map(
      response.tally_company_syncs ?? response.tallyCompanySyncs ?? [],
      fromTallyCompanySyncResponse,
    ),
    pagination: fromPaginationResponse(response.pagination, requested),
  };
}
