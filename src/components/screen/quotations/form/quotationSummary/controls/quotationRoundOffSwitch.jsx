import { useDispatch, useSelector } from "react-redux";

import { selectQuotationRoundOff } from "@Redux/quotation/quotation.selector";
import { quotationRoundOffChanged } from "@Redux/quotation/quotation.slice";
import { Label } from "@shadcnComponent/label";
import { Switch } from "@shadcnComponent/switch";

function QuotationRoundOffSwitch({ switchRef, onKeyDown }) {
  const dispatch = useDispatch();
  const roundOff = useSelector(selectQuotationRoundOff);

  return (
    <section className="grid min-w-0 gap-2">
      <Label htmlFor="quotation-round-off">Round off total</Label>
      <div className="flex h-9 items-center justify-between gap-3 rounded-md border bg-background px-3">
        <span className="text-xs text-muted-foreground">
          {roundOff ? "Yes" : "No"}
        </span>
        <div className="flex items-center gap-2">
          <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] leading-none text-muted-foreground">
            Space
          </kbd>
          <Switch
            ref={switchRef}
            id="quotation-round-off"
            checked={roundOff}
            onCheckedChange={(checked) =>
              dispatch(quotationRoundOffChanged(checked))
            }
            onKeyDown={onKeyDown}
            aria-keyshortcuts="Space Alt+ArrowUp Alt+ArrowDown"
          />
        </div>
      </div>
    </section>
  );
}

export default QuotationRoundOffSwitch;
