import { CheckCircle2, ContactRound, XCircle } from "lucide-react";
import { useSelector } from "react-redux";

import { selectCompanyContactSummary } from "@Redux/companyContact/companyContact.selector";
import SummaryCard from "@commonComponent/summaryCard";

function CompanyContactSummary() {
  const { totalContacts, activeContacts, inactiveContacts } = useSelector(
    selectCompanyContactSummary,
  );

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <SummaryCard
        icon={ContactRound}
        iconClassName="bg-primary/10 text-primary"
        value={totalContacts}
        label="Total contacts"
      />
      <SummaryCard
        icon={CheckCircle2}
        iconClassName="bg-emerald-500/10 text-emerald-600"
        value={activeContacts}
        label="Active contacts"
      />
      <SummaryCard
        icon={XCircle}
        iconClassName="bg-destructive/10 text-destructive"
        value={inactiveContacts}
        label="Inactive contacts"
      />
    </section>
  );
}

export default CompanyContactSummary;
