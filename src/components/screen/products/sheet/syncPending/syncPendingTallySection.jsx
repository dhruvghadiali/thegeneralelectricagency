import { Boxes } from "lucide-react";

import SyncPendingDetailItem from "@screenComponent/products/sheet/syncPending/syncPendingDetailItem";
import SyncPendingSheetSection from "@screenComponent/products/sheet/syncPending/syncPendingSheetSection";

function SyncPendingTallySection({ product }) {
  return (
    <SyncPendingSheetSection
      icon={Boxes}
      title="Tally details"
      description="Inventory grouping and supply information from Tally."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <SyncPendingDetailItem
          label="Stock group"
          value={product.stockGroup}
        />
        <SyncPendingDetailItem label="Base unit" value={product.baseUnit} />
        <SyncPendingDetailItem
          label="GST applicable"
          value={product.gstApplicable}
        />
        <SyncPendingDetailItem
          label="Type of supply"
          value={product.typeOfSupply}
        />
        <SyncPendingDetailItem
          label="Description"
          value={product.description}
          className="sm:col-span-2"
        />
      </div>
    </SyncPendingSheetSection>
  );
}

export default SyncPendingTallySection;
