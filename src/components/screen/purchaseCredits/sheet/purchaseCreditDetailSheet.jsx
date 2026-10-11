import { useDispatch, useSelector } from "react-redux";

import { Sheet, SheetContent } from "@shadcnComponent/sheet";
import { purchaseCreditDetailsClosed } from "@Redux/purchaseCredit/purchaseCredit.slice";
import { selectSelectedPurchaseCredit } from "@Redux/purchaseCredit/purchaseCredit.selector";

import PurchaseCreditAccordion from "@screenComponent/purchaseCredits/sheet/purchaseCreditAccordion";
import PurchaseCreditSheetHeader from "@screenComponent/purchaseCredits/sheet/purchaseCreditSheetHeader";

function PurchaseCreditDetailSheet() {
  const dispatch = useDispatch();
  const purchaseCredit = useSelector(selectSelectedPurchaseCredit);
  const closeSheet = () => dispatch(purchaseCreditDetailsClosed());

  return (
    <Sheet
      open={Boolean(purchaseCredit)}
      onOpenChange={(open) => !open && closeSheet()}
    >
      <SheetContent className="w-full gap-0 sm:max-w-xl lg:max-w-3xl">
        {purchaseCredit && (
          <>
            <PurchaseCreditSheetHeader purchaseCredit={purchaseCredit} />
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto px-5 py-5 sm:px-6"
            >
              <PurchaseCreditAccordion purchaseCredit={purchaseCredit} />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default PurchaseCreditDetailSheet;
