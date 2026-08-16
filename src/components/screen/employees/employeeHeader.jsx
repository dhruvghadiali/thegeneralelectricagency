import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageBreadcrumb from "@/components/common/pageBreadcrumb";

function EmployeeHeader({ onAddEmployee }) {
  return (
    <div className="space-y-5">
      <PageBreadcrumb items={[{ label: "Employees" }]} />
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-primary">People & access</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Employee directory
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your team members and their access roles from one place.
          </p>
        </div>
        <Button onClick={onAddEmployee} className="w-full lg:w-auto">
          <Plus className="size-4" />
          Add employee
        </Button>
      </section>
    </div>
  );
}

export default EmployeeHeader;
