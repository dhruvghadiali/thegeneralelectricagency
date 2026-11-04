import { PackageCheck } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function ReservedStocksButton({ onReservedStocks }) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onReservedStocks}
      className="w-full sm:w-auto"
    >
      <PackageCheck className="size-4" aria-hidden="true" />
      Reserved stocks
    </Button>
  );
}

export default ReservedStocksButton;
