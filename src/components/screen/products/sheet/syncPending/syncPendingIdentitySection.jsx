import { Fingerprint } from "lucide-react";

import SyncPendingDetailItem from "@screenComponent/products/sheet/syncPending/syncPendingDetailItem";
import SyncPendingSheetSection from "@screenComponent/products/sheet/syncPending/syncPendingSheetSection";

function SyncPendingIdentitySection({ product }) {
  return (
    <SyncPendingSheetSection
      icon={Fingerprint}
      title="Product identity"
      description="Identifiers received from the Tally product master."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <SyncPendingDetailItem label="Product name" value={product.name} />
        <SyncPendingDetailItem label="HSN code" value={product.hsnCode} />
        <SyncPendingDetailItem
          label="Product code"
          value={product.productCode}
        />
        <SyncPendingDetailItem
          label="Model number"
          value={product.modelNumber}
        />
        <SyncPendingDetailItem
          label="Product master ID"
          value={product.productMasterId}
        />
        <SyncPendingDetailItem
          label="Product alter ID"
          value={product.productAlterId}
        />
        <SyncPendingDetailItem label="Category" value={product.category} />
        <SyncPendingDetailItem label="Agency" value={product.agency} />
      </div>
    </SyncPendingSheetSection>
  );
}

export default SyncPendingIdentitySection;
