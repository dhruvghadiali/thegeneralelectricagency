import { Building2, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@shadcnComponent/button";
import { syncTallyCompanies } from "@Tally/redux/tallyCompanies/tallyCompanies.action";
import { selectTallyCompanies } from "@Tally/redux/tallyCompanies/tallyCompanies.selector";

function SyncTallyCompaniesButton({ errorTab, onSuccess }) {
  const dispatch = useDispatch();
  const { status } = useSelector(selectTallyCompanies);
  const isSaving = useSelector((state) => state.syncCompanies.saveStatus === "loading");
  const isSyncing = status === "loading";

  async function handleSync() {
    const result = await dispatch(syncTallyCompanies({ errorTab }));
    if (syncTallyCompanies.fulfilled.match(result)) onSuccess();
  }

  return (
    <Button
      type="button"
      className="ml-auto shrink-0"
      onClick={handleSync}
      disabled={isSyncing || isSaving}
      aria-busy={isSyncing}
    >
      {isSyncing ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        <Building2 className="size-4" aria-hidden="true" />
      )}
      {isSyncing ? "Syncing Tally Companies..." : "Sync Tally Companies"}
    </Button>
  );
}

export default SyncTallyCompaniesButton;

