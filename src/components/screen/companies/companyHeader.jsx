import { Eye, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageBreadcrumb from "@/components/common/pageBreadcrumb";

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
        {canAddCompany ? (
          <Button onClick={onAddCompany} className="w-full lg:w-auto">
            <Plus className="size-4" />
            Add company
          </Button>
        ) : (
          <Badge variant="outline" className="w-fit gap-1.5 px-3 py-1.5">
            <Eye className="size-3.5" />
            Read-only access
          </Badge>
        )}
      </section>
    </div>
  );
}

export default CompanyHeader;
