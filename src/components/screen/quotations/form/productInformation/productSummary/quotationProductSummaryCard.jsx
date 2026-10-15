import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@shadcnComponent/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";

import ExpandedProductSummary from "@screenComponent/quotations/form/productInformation/productSummary/expandedProductSummary";

function QuotationProductSummaryCard({
  products,
  isExpanded,
  onEdit,
  pendingDeleteProductIndex,
  onDeleteRequest,
  onDeleteCancel,
  onDeleteConfirm,
  onOpenProductSummary,
  onNavigateToCompanyInformation,
  onNavigateToProductInformation,
  onOpenQuotationSummary,
}) {
  return (
    <Card className="w-full shrink-0 gap-0 overflow-hidden py-0">
      <CardHeader
        onClick={onOpenProductSummary}
        className={cn(
          "cursor-pointer grid-cols-[minmax(0,1fr)_auto] py-3",
          isExpanded && "border-b",
        )}
      >
        <CardTitle>Product summary</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          aria-label="Add product"
          aria-keyshortcuts="Alt+N"
          title="Add product (Alt+N)"
          onClick={(event) => {
            event.stopPropagation();
            onNavigateToProductInformation();
          }}
          className="col-start-2 row-span-2 row-start-1 h-8 self-center px-2"
        >
          <Plus className="size-4" aria-hidden="true" />
          <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] leading-none text-muted-foreground">
            Alt+N
          </kbd>
        </Button>
        <CardDescription>
          {products.length} {products.length === 1 ? "product" : "products"} added
        </CardDescription>
      </CardHeader>
      {isExpanded && (
        <ExpandedProductSummary
          products={products}
          onEdit={onEdit}
          pendingDeleteProductIndex={pendingDeleteProductIndex}
          onDeleteRequest={onDeleteRequest}
          onDeleteCancel={onDeleteCancel}
          onDeleteConfirm={onDeleteConfirm}
          onNavigateToCompanyInformation={onNavigateToCompanyInformation}
          onNavigateToProductInformation={onNavigateToProductInformation}
          onOpenQuotationSummary={onOpenQuotationSummary}
        />
      )}
    </Card>
  );
}

export default QuotationProductSummaryCard;
