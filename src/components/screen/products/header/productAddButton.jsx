import { Plus } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function ProductAddButton({ onAddProduct }) {
  return (
    <Button type="button" onClick={onAddProduct} className="w-full sm:w-auto">
      <Plus className="size-4" />
      Add product
    </Button>
  );
}

export default ProductAddButton;
