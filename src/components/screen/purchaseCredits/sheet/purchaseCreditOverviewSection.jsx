import { formatDate } from "@/utils/date.util";
import { formatCurrency } from "@Tables/product/productTable.utils";

import PurchaseCreditDetailItem from "@screenComponent/purchaseCredits/sheet/purchaseCreditDetailItem";
import PurchaseCreditReceiptLinks from "@screenComponent/purchaseCredits/sheet/purchaseCreditReceiptLinks";


function PurchaseCreditOverviewSection({ purchaseCredit }) {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <PurchaseCreditDetailItem
          label="Purchase amount"
          value={formatCurrency(purchaseCredit.purchaseAmount)}
        />
        <PurchaseCreditDetailItem
          label="Payment amount"
          value={formatCurrency(purchaseCredit.paymentAmount)}
        />
        <PurchaseCreditDetailItem
          label="Planned amount"
          value={formatCurrency(purchaseCredit.plannedAmount)}
        />
        <PurchaseCreditDetailItem
          label="Available amount"
          value={formatCurrency(purchaseCredit.availableAmount)}
        />
        <PurchaseCreditDetailItem
          label="Purchase date"
          value={formatDate(purchaseCredit.purchaseAt)}
        />
        <PurchaseCreditDetailItem
          label="Expected delivery"
          value={formatDate(purchaseCredit.expectedDeliveryDate)}
        />
        <PurchaseCreditDetailItem
          label="Supplier GST"
          value={purchaseCredit.supplierGstNumber}
        />
        <PurchaseCreditDetailItem
          label="Acknowledgement ID"
          value={purchaseCredit.acknowledgementId}
        />
        <PurchaseCreditDetailItem
          label="Created by"
          value={
            purchaseCredit.createdBy.name || purchaseCredit.createdBy.username
          }
        />
      </div>
      <PurchaseCreditReceiptLinks
        receipts={purchaseCredit.acknowledgementReceipts}
        label="Acknowledgement receipt"
      />
    </div>
  );
}

export default PurchaseCreditOverviewSection;
