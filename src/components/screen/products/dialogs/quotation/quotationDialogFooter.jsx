import { useSelector } from "react-redux";

import { selectCanContinueQuotation } from "@Redux/product/quotation/quotation.selector";
import { Button } from "@shadcnComponent/button";
import { DialogClose, DialogFooter } from "@shadcnComponent/dialog";

function QuotationDialogFooter({ onNext }) {
  const canContinue = useSelector(selectCanContinueQuotation);

  return (
    <DialogFooter className="border-t pt-4">
      <DialogClose asChild>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </DialogClose>
      <Button type="button" disabled={!canContinue} onClick={onNext}>
        Next
      </Button>
    </DialogFooter>
  );
}

export default QuotationDialogFooter;
