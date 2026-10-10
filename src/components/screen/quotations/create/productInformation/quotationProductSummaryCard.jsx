import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";
import ExpandedProductSummary from "@screenComponent/quotations/create/productInformation/expandedProductSummary";

function QuotationProductSummaryCard({
  products,
  isExpanded,
  onEdit,
  pendingDeleteProductIndex,
  onDeleteRequest,
  onDeleteCancel,
  onDeleteConfirm,
  onNavigateToCompanyInformation,
  onNavigateToProductInformation,
}) {
  return (
    <Card className="w-full shrink-0 gap-0 overflow-hidden py-0">
      <CardHeader className={cn("py-3", isExpanded && "border-b")}>
        <CardTitle>Product summary</CardTitle>
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
        />
      )}
    </Card>
  );
}

export default QuotationProductSummaryCard;
