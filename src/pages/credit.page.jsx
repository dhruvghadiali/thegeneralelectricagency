import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@shadcnComponent/button";

function CreditPage() {
  const navigate = useNavigate();

  return (
    <main className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Supiler Credit
        </h1>
        <Button
          type="button"
          className="w-full sm:w-auto"
          onClick={() => navigate("/credit/new")}
        >
          <Plus className="size-4" />
          Add credit
        </Button>
      </div>
    </main>
  );
}

export default CreditPage;
