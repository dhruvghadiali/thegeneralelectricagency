import { Loader2, Save } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@shadcnComponent/button";
import { SYNC_PRODUCTS_SAVE_STATUS } from "@Tally/enum/syncProductsSaveStatus.enum";
import { saveSyncProducts } from "@Tally/redux/syncProducts/syncProductsSave.action";
import {
  selectNewProductSelection,
  selectShowSaveSyncProductsButton,
  selectSyncProductsSaveState,
} from "@Tally/redux/syncProducts/syncProducts.selector";

function SaveSyncProductsButton() {
  const dispatch = useDispatch();
  const isVisible = useSelector(selectShowSaveSyncProductsButton);
  const selectedRowKeys = useSelector(selectNewProductSelection);
  const { status } = useSelector(selectSyncProductsSaveState);
  const isSaving = status === SYNC_PRODUCTS_SAVE_STATUS.LOADING;

  if (!isVisible) return null;

  return (
    <Button
      type="button"
      className="ml-auto shrink-0"
      disabled={isSaving || selectedRowKeys.length === 0}
      aria-busy={isSaving}
      onClick={() => dispatch(saveSyncProducts())}
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

export default SaveSyncProductsButton;
