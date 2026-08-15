import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

function EmployeeHeader({ onAddEmployee }) {
  return (
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
  );
}

export default EmployeeHeader;
