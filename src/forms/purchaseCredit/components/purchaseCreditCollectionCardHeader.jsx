import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatPurchaseCreditAmount } from "@Forms/purchaseCredit/purchaseCreditForm.utils";
import { Badge } from "@shadcnComponent/badge";

function PurchaseCreditCollectionCardHeader({
  title,
  isCollapsed,
  statusLabel,
  statusVariant = "outline",
  amount,
  expandedBadge,
  onToggle,
  children,
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        !isCollapsed && "mb-4",
      )}
    >
      <button
        type="button"
        aria-expanded={!isCollapsed}
        onClick={onToggle}
        className="flex min-w-0 flex-1 items-center gap-2 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            isCollapsed && "-rotate-90",
          )}
          aria-hidden="true"
        />
        <span className="font-medium">{title}</span>
        {isCollapsed ? (
          <span className="flex flex-wrap items-center gap-2">
            <Badge variant={statusVariant}>{statusLabel}</Badge>
            <Badge variant="success">
              {formatPurchaseCreditAmount(amount)}
            </Badge>
          </span>
        ) : (
          expandedBadge
        )}
      </button>
      <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
        {children}
      </div>
    </div>
  );
}

export default PurchaseCreditCollectionCardHeader;
