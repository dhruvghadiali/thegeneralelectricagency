import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@shadcnComponent/button";

function SalesPage() {
  const navigate = useNavigate();

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <h1 className="sr-only">Sales</h1>

      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <Button
          type="button"
          className="w-full sm:w-auto"
          onClick={() => navigate("/sales/new")}
        >
          <Plus className="size-4" />
          Add sales order
        </Button>
      </header>
    </main>
  );
}

export default SalesPage;
