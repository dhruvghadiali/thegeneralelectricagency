import { Eye } from "lucide-react";

import { Badge } from "@shadcnComponent/badge";

function StockHeader() {
  return (
    <header className="flex justify-end">
      <h1 className="sr-only">Stocks</h1>
      <Badge variant="outline" className="w-fit gap-1.5 px-3 py-1.5">
        <Eye className="size-3.5" />
        Read-only inventory
      </Badge>
    </header>
  );
}

export default StockHeader;
