import { PackagePlus } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function ManageStockButton() {
  return (
    <Button type="button" className="w-full sm:w-auto">
      <PackagePlus className="size-4" aria-hidden="true" />
      Manage stock
    </Button>
  );
}

export default ManageStockButton;
