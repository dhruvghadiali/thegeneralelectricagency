export const selectTallyProductSyncLogs = (state) => state.tallyProductSyncLogs;

export const selectTallyProductSyncLogItems = (state) =>
  selectTallyProductSyncLogs(state).items;

export const selectTallyProductSyncLogPagination = (state) =>
  selectTallyProductSyncLogs(state).pagination;

export const selectTallyProductSyncLogStatus = (state) =>
  selectTallyProductSyncLogs(state).status;

export const selectTallyProductSyncLogError = (state) =>
  selectTallyProductSyncLogs(state).error;

export const selectTallyProductSyncLogCreateStatus = (state) =>
  selectTallyProductSyncLogs(state).createStatus;

export const selectTallyProductSyncLogCreateError = (state) =>
  selectTallyProductSyncLogs(state).createError;

export const selectCreatedTallyProductSyncLog = (state) =>
  selectTallyProductSyncLogs(state).createdLog;
