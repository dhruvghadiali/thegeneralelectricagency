import { Loader2, Save } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@shadcnComponent/button";
import { SYNC_COMPANIES_SAVE_STATUS } from "@Tally/enum/syncCompaniesSaveStatus.enum";
import { saveSyncCompanies } from "@Tally/redux/syncCompanies/syncCompaniesSave.action";
import {
  selectNewCompanySelection,
  selectShowSaveSyncCompaniesButton,
  selectSyncCompaniesSaveState,
} from "@Tally/redux/syncCompanies/syncCompanies.selector";

function SaveSyncCompaniesButton() {
  const dispatch = useDispatch();
  const isVisible = useSelector(selectShowSaveSyncCompaniesButton);
  const selectedRowKeys = useSelector(selectNewCompanySelection);
  const { status } = useSelector(selectSyncCompaniesSaveState);
  const isSaving = status === SYNC_COMPANIES_SAVE_STATUS.LOADING;

  if (!isVisible) return null;

  return (
    <Button
      type="button"
      className="ml-auto shrink-0"
      disabled={isSaving || selectedRowKeys.length === 0}
      aria-busy={isSaving}
      onClick={() => dispatch(saveSyncCompanies())}
    >
      {isSaving ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        <Save className="size-4" aria-hidden="true" />
      )}
      {isSaving ? "Saving..." : "Save"}
    </Button>
  );
}

export default SaveSyncCompaniesButton;
