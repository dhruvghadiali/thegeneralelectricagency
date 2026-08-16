import { CalendarDays, Mail, Phone } from "lucide-react";

import { Badge } from "@shadcnComponent/badge";
import { Avatar, AvatarFallback } from "@shadcnComponent/avatar";
import {
  COLUMN_TYPES,
  EMPLOYEE_STATUS_OPTIONS,
  EMPLOYEE_USER_TYPE_OPTIONS,
  MOBILE_SLOTS,
} from "@Enums";
import {
  EMPTY_FIELD_LABEL,
  roleLabel,
  statusLabel,
  statusVariant,
} from "@screenComponent/employees/employee.utils";

/**
 * The whole employee table in one place. Each entry says what to show, how to
 * sort it (`sortKey` -> the shared `sort` parameter) and how to filter it (`filterKey` +
 * `type` -> the query parameters), so the screen itself holds no table logic.
 *
 * Every filterable column is a visible one, because its filter control lives
 * in that column's header cell - surname and last-updated earn a column of
 * their own for exactly that reason. The table is wide enough to scroll
 * horizontally, which is the trade for having each filter sit directly under
 * the heading it belongs to.
 */
export const EMPLOYEE_COLUMNS = [
  {
    key: "firstName",
    header: "First name",
    filterLabel: "First name",
    type: COLUMN_TYPES.TEXT,
    field: "firstName",
    sortKey: "first_name",
    filterKey: "first_name",
    className: "whitespace-nowrap",
    mobile: MOBILE_SLOTS.PRIMARY,
    width: "200px",
  },
  {
    key: "lastName",
    header: "Last name",
    filterLabel: "Last name",
    type: COLUMN_TYPES.TEXT,
    field: "lastName",
    sortKey: "last_name",
    filterKey: "last_name",
    className: "whitespace-nowrap",
    width: "200px",
  },
  {
    key: "empId",
    header: "Employee ID",
    filterLabel: "Employee ID",
    type: COLUMN_TYPES.TEXT,
    field: "empId",
    sortKey: "emp_id",
    filterKey: "emp_id",
    className: "whitespace-nowrap font-medium",
    width: "200px",
  },
  {
    key: "username",
    header: "Username",
    filterLabel: "Username",
    type: COLUMN_TYPES.TEXT,
    field: "username",
    sortKey: "username",
    filterKey: "username",
    mobile: MOBILE_SLOTS.SECONDARY,
    width: "200px",
    render: (employee) =>
      employee.username ? `@${employee.username}` : EMPTY_FIELD_LABEL,
  },
  {
    key: "email",
    header: "Email",
    filterLabel: "Email",
    type: COLUMN_TYPES.TEXT,
    field: "email",
    sortKey: "email",
    filterKey: "email",
    mobile: MOBILE_SLOTS.META,
    mobileIcon: Mail,
    width: "300px",
  },
  {
    key: "phone",
    header: "Phone",
    filterLabel: "Phone",
    type: COLUMN_TYPES.TEXT,
    field: "phone",
    sortKey: "phone_number",
    filterKey: "phone_number",
    className: "whitespace-nowrap",
    mobile: MOBILE_SLOTS.META,
    mobileIcon: Phone,
    width: "200px",
  },
  {
    key: "role",
    header: "Role",
    filterLabel: "Role",
    type: COLUMN_TYPES.SELECT,
    field: "role",
    sortKey: "user_type",
    filterKey: "user_type",
    options: EMPLOYEE_USER_TYPE_OPTIONS,
    allOptionLabel: "All roles",
    className: "whitespace-nowrap",
    width: "300px",
    render: (employee) => roleLabel(employee.role),
  },
  {
    key: "status",
    header: "Status",
    filterLabel: "Status",
    type: COLUMN_TYPES.SELECT,
    field: "isActive",
    sortKey: "is_active",
    filterKey: "is_active",
    options: EMPLOYEE_STATUS_OPTIONS,
    allOptionLabel: "All statuses",
    width: "150px",
    mobile: MOBILE_SLOTS.BADGE,
    render: (employee) => (
      <Badge variant={statusVariant(employee)}>{statusLabel(employee)}</Badge>
    ),
  },
  {
    key: "joined",
    header: "Joined",
    filterLabel: "Joined",
    type: COLUMN_TYPES.DATE,
    field: "joined",
    sortKey: "created_at",
    filterKey: "created",
    className: "whitespace-nowrap text-muted-foreground",
    mobile: MOBILE_SLOTS.META,
    mobileIcon: CalendarDays,
    mobileLabel: "Joined",
    width: "200px",
  },
  {
    key: "updatedAt",
    header: "Last updated",
    filterLabel: "Last updated",
    type: COLUMN_TYPES.DATE_TIME,
    field: "updatedAt",
    sortKey: "updated_at",
    filterKey: "updated",
    width: "200px",
    className: "whitespace-nowrap text-muted-foreground",
  },
];

export default EMPLOYEE_COLUMNS;
