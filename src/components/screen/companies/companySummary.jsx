import {
  Building2,
  MapPinned,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useSelector } from "react-redux";

import {
  companyTableSelectors,
  selectCompanySummary,
} from "@Redux/company/company.selector";
import SummaryCard from "@/components/screen/employees/summaryCard";

function CompanySummary() {
  const { total } = useSelector(companyTableSelectors.selectPagination);
  const summary = useSelector(selectCompanySummary);

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        icon={Building2}
        iconClassName="bg-primary/10 text-primary"
        value={total}
        label="Total companies"
      />
      <SummaryCard
        icon={ShoppingCart}
        iconClassName="bg-emerald-500/10 text-emerald-600"
        value={summary.customerCount}
        label="Customer accounts on this page"
      />
      <SummaryCard
        icon={Truck}
        iconClassName="bg-amber-500/10 text-amber-600"
        value={summary.supplierCount}
        label="Supply partners on this page"
      />
      <SummaryCard
        icon={MapPinned}
        iconClassName="bg-sky-500/10 text-sky-600"
        value={summary.locationCount}
        label="Locations on this page"
      />
    </section>
  );
}

export default CompanySummary;
