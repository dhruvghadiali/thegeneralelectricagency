import { BriefcaseBusiness, UserRoundCheck, UsersRound } from "lucide-react";
import { useSelector } from "react-redux";

import { selectEmployeeSummary } from "@Redux/employee/employee.selector";

import SummaryCard from "@screenComponent/employees/summaryCard";

/** Directory-wide employee figures supplied by the API summary object. */
function EmployeeSummary() {
  const {
    totalEmployees,
    activeEmployees,
    activeWarehouseManagers,
  } = useSelector(selectEmployeeSummary);

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <SummaryCard
        icon={UsersRound}
        iconClassName="bg-primary/10 text-primary"
        value={totalEmployees}
        label="Total employees"
      />
      <SummaryCard
        icon={UserRoundCheck}
        iconClassName="bg-emerald-500/10 text-emerald-600"
        value={activeEmployees}
        label="Active employees"
      />
      <SummaryCard
        icon={BriefcaseBusiness}
        iconClassName="bg-amber-500/10 text-amber-600"
        value={activeWarehouseManagers}
        label="Active warehouse managers"
      />
    </section>
  );
}

export default EmployeeSummary;
