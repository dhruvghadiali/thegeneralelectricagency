import { Mail, Phone } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  employeeInitials,
  fullName,
  roleLabel,
} from "@/components/screen/employees/employee.utils";

import EmployeeActions from "@/components/screen/employees/employeeActions";

function EmployeeMobileView({ employees, onEdit, onDelete }) {
  return (
    <div className="divide-y md:hidden">
      {employees.map((employee) => (
        <article key={employee.id} className="p-4">
          <div className="flex items-start gap-3">
            <Avatar className="size-10">
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {employeeInitials(employee)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{fullName(employee)}</p>
                  <p className="text-sm text-muted-foreground">
                    @{employee.username}
                  </p>
                </div>
                <EmployeeActions
                  employee={employee}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </div>
              <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2 truncate">
                  <Mail className="size-3.5 shrink-0" />
                  {employee.email}
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="size-3.5" />
                  {employee.phone}
                </span>
              </div>
              <p className="mt-3 text-xs font-medium text-foreground">
                {roleLabel(employee.role)}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default EmployeeMobileView;
