import { Building2, CheckCircle2, XCircle } from "lucide-react";
import { useSelector } from "react-redux";

import { selectCompanySummary } from "@Redux/company/company.selector";
import SummaryCard from "@screenComponent/employees/summaryCard";

function CompanySummary() {
  const { totalCompanies, activeCompanies, inactiveCompanies } = useSelector(
    selectCompanySummary,
  );

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <SummaryCard
        icon={Building2}
        iconClassName="bg-primary/10 text-primary"
        value={totalCompanies}
        label="Total companies"
      />
      <SummaryCard
        icon={CheckCircle2}
        iconClassName="bg-emerald-500/10 text-emerald-600"
        value={activeCompanies}
        label="Active companies"
      />
      <SummaryCard
        icon={XCircle}
        iconClassName="bg-destructive/10 text-destructive"
        value={inactiveCompanies}
        label="Inactive companies"
      />
    </section>
  );
}

export default CompanySummary;
