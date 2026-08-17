import { Plus } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import PageBreadcrumb from "@commonComponent/pageBreadcrumb";

function CompanyHeader({ canAddCompany, onAddCompany }) {
  return (
    <div className="space-y-5">
      <PageBreadcrumb items={[{ label: "Companies" }]} />
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Business directory</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Companies
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Review company profiles, locations, compliance details, and contacts.
          </p>
        </div>
        {canAddCompany && (
          <Button onClick={onAddCompany} className="w-full lg:w-auto">
            <Plus className="size-4" />
            Add company
          </Button>
        )}
      </section>
    </div>
  );
}

export default CompanyHeader;
