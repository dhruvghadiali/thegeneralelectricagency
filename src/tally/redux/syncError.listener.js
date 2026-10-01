import { createListenerMiddleware } from "@reduxjs/toolkit";

import { syncTallyCompanies } from "@Tally/redux/company/company.action";
import { syncErrorAlertDismissed as dismissCompanyAlert } from "@Tally/redux/company/company.slice";
import { syncTallyProducts } from "@Tally/redux/tallyProducts/tallyProducts.action";
import { syncErrorAlertDismissed as dismissProductAlert } from "@Tally/redux/tallyProducts/tallyProducts.slice";
import { saveSyncProducts } from "@Tally/redux/syncProducts/syncProductsSave.action";
import { saveErrorAlertDismissed as dismissSaveProductAlert } from "@Tally/redux/syncProducts/syncProducts.slice";

export const syncErrorListener = createListenerMiddleware();

syncErrorListener.startListening({
  actionCreator: syncTallyCompanies.rejected,
  effect: async (action, listenerApi) => {
    if (!action.meta.arg?.errorTab) return;

    await listenerApi.delay(5000);
    listenerApi.dispatch(dismissCompanyAlert(action.meta.requestId));
  },
});

syncErrorListener.startListening({
  actionCreator: syncTallyProducts.rejected,
  effect: async (action, listenerApi) => {
    if (!action.meta.arg?.errorTab) return;

    await listenerApi.delay(5000);
    listenerApi.dispatch(dismissProductAlert(action.meta.requestId));
  },
});

syncErrorListener.startListening({
  matcher: (action) =>
    saveSyncProducts.fulfilled.match(action) || saveSyncProducts.rejected.match(action),
  effect: async (action, listenerApi) => {
    if (saveSyncProducts.fulfilled.match(action) && !action.payload.errors.length) return;

    await listenerApi.delay(5000);
    listenerApi.dispatch(dismissSaveProductAlert(action.meta.requestId));
  },
});
