import { Building2, CalendarDays } from "lucide-react";

import { DATE_FORMATS, formatDate } from "@/utils/date.util";
import PurchaseCreditRecordItem from "@screenComponent/purchaseCredits/sheet/purchaseCreditRecordItem";

function PurchaseCreditRecordSection({ purchaseCredit }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <PurchaseCreditRecordItem
        icon={Building2}
        label="Supplier"
        value={purchaseCredit.supplierName}
      />
      <PurchaseCreditRecordItem
        icon={CalendarDays}
        label="Created at"
        value={formatDate(purchaseCredit.createdAt, DATE_FORMATS.DATE_TIME)}
      />
    </div>
  );
}

export default PurchaseCreditRecordSection;
