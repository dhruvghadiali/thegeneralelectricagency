import { Eye } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function StockActions({ stock, onView }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onView(stock)}
      aria-label={`View ${stock.productName}`}
      title="View stock details"
    >
      <Eye className="size-4" />
    </Button>
  );
}

export default StockActions;
