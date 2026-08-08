import { BriefcaseBusiness, UserRoundCheck, UsersRound } from "lucide-react";
import _ from "lodash";

import { ROLE_PATHS } from "@Enums";

import SummaryCard from "@/components/screen/employees/summaryCard";

function EmployeeSummary({ employees }) {
  const roleCounts = _.countBy(employees, "role");
  const employeeCount = roleCounts[ROLE_PATHS.EMPLOYEE] ?? 0;
  const warehouseManagerCount =
    roleCounts[ROLE_PATHS.WAREHOUSE_MANAGER] ?? 0;

  return (
    <section className="grid gap-4 sm:grid-cols-3">
      <SummaryCard
        icon={UsersRound}
        iconClassName="bg-primary/10 text-primary"
        value={employees.length}
        label="Total employees"
      />
      <SummaryCard
        icon={UserRoundCheck}
        iconClassName="bg-emerald-500/10 text-emerald-600"
        value={employeeCount}
        label="Employees"
      />
      <SummaryCard
        icon={BriefcaseBusiness}
        iconClassName="bg-amber-500/10 text-amber-600"
        value={warehouseManagerCount}
        label="Warehouse managers"
      />
    </section>
  );
}

export default EmployeeSummary;
