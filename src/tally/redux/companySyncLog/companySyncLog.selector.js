export const selectTallyCompanySyncLogs = (state) => state.tallyCompanySyncLogs;

export const selectTallyCompanySyncLogItems = (state) =>
  selectTallyCompanySyncLogs(state).items;

export const selectTallyCompanySyncLogPagination = (state) =>
  selectTallyCompanySyncLogs(state).pagination;

export const selectTallyCompanySyncLogStatus = (state) =>
  selectTallyCompanySyncLogs(state).status;

export const selectTallyCompanySyncLogError = (state) =>
  selectTallyCompanySyncLogs(state).error;

export const selectTallyCompanySyncLogCreateStatus = (state) =>
  selectTallyCompanySyncLogs(state).createStatus;

export const selectTallyCompanySyncLogCreateError = (state) =>
  selectTallyCompanySyncLogs(state).createError;

export const selectCreatedTallyCompanySyncLog = (state) =>
  selectTallyCompanySyncLogs(state).createdLog;
