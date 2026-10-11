import { BadgeIndianRupee } from "lucide-react";

import { formatCurrency, formatPercentage } from "@/utils/numberFormat.util";
import SyncPendingDetailItem from "@screenComponent/products/sheet/syncPending/syncPendingDetailItem";
import SyncPendingSheetSection from "@screenComponent/products/sheet/syncPending/syncPendingSheetSection";

function SyncPendingCommercialSection({ product }) {
  return (
    <SyncPendingSheetSection
      icon={BadgeIndianRupee}
      title="Commercial details"
      description="Pricing, tax, and discount values available in Tally."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <SyncPendingDetailItem
          label="Purchase price"
          value={formatCurrency(product.purchasePrice)}
        />
        <SyncPendingDetailItem
          label="Sale price"
          value={formatCurrency(product.salePrice)}
        />
        <SyncPendingDetailItem
          label="GST percentage"
          value={formatPercentage(product.gstPercentage)}
        />
        <SyncPendingDetailItem
          label="Discount amount"
          value={formatCurrency(product.discountAmount)}
        />
        <SyncPendingDetailItem
          label="Discount percentage"
          value={formatPercentage(product.discountPercentage)}
        />
      </div>
    </SyncPendingSheetSection>
  );
}

export default SyncPendingCommercialSection;
