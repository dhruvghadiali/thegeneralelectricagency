import { Plus } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function CompanyAddButton({ onAddCompany }) {
  return (
    <Button type="button" onClick={onAddCompany} className="w-full sm:w-auto">
      <Plus className="size-4" aria-hidden="true" />
      Add company
    </Button>
  );
}

export default CompanyAddButton;
