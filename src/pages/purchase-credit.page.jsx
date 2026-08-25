import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@shadcnComponent/button";

function PurchaseCreditPage() {
  const navigate = useNavigate();

  return (
    <main className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Supplier Purchase Credit
        </h1>
        <Button
          type="button"
          className="w-full sm:w-auto"
          onClick={() => navigate("/purchase-credit/new")}
        >
          <Plus className="size-4" />
          Add purchase credit
        </Button>
      </div>
    </main>
  );
}

export default PurchaseCreditPage;
