import { BriefcaseBusiness, UserRoundCheck, UsersRound } from "lucide-react";

import { ROLE_PATHS } from "@Enums";

import SummaryCard from "@/components/screen/employees/employeeSummary";

function EmployeeSummary({ employees }) {
  const employeeCount = employees.filter(
    (employee) => employee.role === ROLE_PATHS.EMPLOYEE,
  ).length;
  const warehouseManagerCount = employees.filter(
    (employee) => employee.role === ROLE_PATHS.WAREHOUSE_MANAGER,
  ).length;

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
