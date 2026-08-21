import { UsersRound } from "lucide-react";

import { EMPLOYEE_TABLE_COLUMNS } from "@Tables/employee/employeeTable.columns";

export const EMPLOYEE_TABLE_CONFIG = Object.freeze({
  columns: EMPLOYEE_TABLE_COLUMNS,
  rowKey: (employee) => employee.id,
  searchPlaceholder: "Search by name, username, or email...",
  rowNoun: "employees",
  emptyIcon: UsersRound,
  emptyTitle: "No employees found",
  emptyDescription: "Add your first employee to start building the directory.",
  filteredEmptyDescription: "Try changing your search or filters.",
  fillHeight: true,
});
