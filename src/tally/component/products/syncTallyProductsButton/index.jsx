import { Boxes } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@shadcnComponent/button";
import { TALLY_PRODUCTS_STATUS } from "@Tally/enum/tallyProductsStatus.enum";
import { syncTallyProducts } from "@Tally/redux/tallyProducts/tallyProducts.action";
import { selectTallyProducts } from "@Tally/redux/tallyProducts/tallyProducts.selector";

function SyncTallyProductsButton({ errorTab, onSuccess }) {
  const dispatch = useDispatch();
  const { status } = useSelector(selectTallyProducts);
  const isSyncing = status === TALLY_PRODUCTS_STATUS.LOADING;

  const handleSync = async () => {
    try {
      await dispatch(syncTallyProducts({ errorTab })).unwrap();
      onSuccess();
    } catch {
      // The Redux state holds the error for display in the tabs header.
    }
  };

  return (
    <Button
      type="button"
      className="ml-auto shrink-0"
      onClick={handleSync}
      disabled={isSyncing}
      aria-busy={isSyncing}
    >
      <Boxes className="size-4" aria-hidden="true" />
      {isSyncing ? "Syncing Tally Products..." : "Sync Tally Products"}
    </Button>
  );
}

export default SyncTallyProductsButton;
