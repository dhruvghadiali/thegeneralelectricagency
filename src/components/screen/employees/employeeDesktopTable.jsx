import EmployeeActions from "@/components/screen/employees/employeeActions";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  employeeInitials,
  fullName,
  roleLabel,
} from "@/components/screen/employees/employee.utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function EmployeeDesktopTable({ employees, onEdit, onDelete }) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Employee</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-14">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                      {employeeInitials(employee)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{fullName(employee)}</p>
                    <p className="text-xs text-muted-foreground">
                      ID #{String(employee.id).padStart(4, "0")}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                @{employee.username}
              </TableCell>
              <TableCell>
                <p>{employee.email}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {employee.phone}
                </p>
              </TableCell>
              <TableCell>{roleLabel(employee.role)}</TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">
                {employee.joined}
              </TableCell>
              <TableCell>
                <EmployeeActions
                  employee={employee}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default EmployeeDesktopTable;
