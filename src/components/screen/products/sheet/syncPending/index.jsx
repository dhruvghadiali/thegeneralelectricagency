import { useDispatch, useSelector } from "react-redux";

import { Sheet, SheetContent } from "@shadcnComponent/sheet";
import { selectSelectedSyncPendingProduct } from "@Redux/product/syncPending/syncPending.selector";
import { syncPendingDetailsClosed } from "@Redux/product/syncPending/syncPending.slice";

import SyncPendingAuditSection from "@screenComponent/products/sheet/syncPending/syncPendingAuditSection";
import SyncPendingCommercialSection from "@screenComponent/products/sheet/syncPending/syncPendingCommercialSection";
import SyncPendingIdentitySection from "@screenComponent/products/sheet/syncPending/syncPendingIdentitySection";
import SyncPendingSheetHeader from "@screenComponent/products/sheet/syncPending/syncPendingSheetHeader";
import SyncPendingTallySection from "@screenComponent/products/sheet/syncPending/syncPendingTallySection";

function SyncPendingSheet() {
  const dispatch = useDispatch();
  const product = useSelector(selectSelectedSyncPendingProduct);

  const closeSheet = () => dispatch(syncPendingDetailsClosed());

  return (
    <Sheet
      open={Boolean(product)}
      onOpenChange={(open) => !open && closeSheet()}
    >
      <SheetContent className="w-full gap-0 sm:max-w-xl lg:max-w-3xl">
        {product && (
          <>
            <SyncPendingSheetHeader product={product} />
            <div
              data-lenis-prevent
              className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6"
            >
              <SyncPendingIdentitySection product={product} />
              <SyncPendingCommercialSection product={product} />
              <SyncPendingTallySection product={product} />
              <SyncPendingAuditSection product={product} />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default SyncPendingSheet;
