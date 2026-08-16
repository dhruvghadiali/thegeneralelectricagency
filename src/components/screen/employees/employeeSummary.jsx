import { BriefcaseBusiness, UserRoundCheck, UsersRound } from "lucide-react";
import { useSelector } from "react-redux";

import { ROLE_PATHS } from "@Enums";
import {
  employeeTableSelectors,
  selectEmployeeRoleCounts,
} from "@Redux/employee/employee.selector";

import SummaryCard from "@screenComponent/employees/summaryCard";

/**
 * Only the total is a real directory-wide figure - it comes from the
 * endpoint's `pagination.total`. The per-role numbers can only describe the
 * page that is loaded, so they say so rather than implying a full count.
 */
function EmployeeSummary() {
  const { total } = useSelector(employeeTableSelectors.selectPagination);
  const roleCounts = useSelector(selectEmployeeRoleCounts);

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <SummaryCard
        icon={UsersRound}
        iconClassName="bg-primary/10 text-primary"
        value={total}
        label="Total employees"
      />
      <SummaryCard
        icon={UserRoundCheck}
        iconClassName="bg-emerald-500/10 text-emerald-600"
        value={roleCounts[ROLE_PATHS.EMPLOYEE] ?? 0}
        label="Employees on this page"
      />
      <SummaryCard
        icon={BriefcaseBusiness}
        iconClassName="bg-amber-500/10 text-amber-600"
        value={roleCounts[ROLE_PATHS.WAREHOUSE_MANAGER] ?? 0}
        label="Warehouse managers on this page"
      />
    </section>
  );
}

export default EmployeeSummary;
