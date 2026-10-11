import { useSelector } from "react-redux";
import { Boxes, ChevronDown, PackageCheck, PackageX } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import { Separator } from "@shadcnComponent/separator";
import { selectProductSummary } from "@Redux/product/product.selector";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcnComponent/popover";

import ProductSummaryItem from "@screenComponent/products/header/productSummaryItem";

function ProductSummary() {
  const { totalProducts, activeProducts, inactiveProducts } =
    useSelector(selectProductSummary);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between sm:w-auto">
          <span className="flex items-center gap-2">
            <Boxes className="size-4 text-primary" />
            Product summary
          </span>
          <span className="flex items-center gap-1.5">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold tabular-nums text-primary">
              {totalProducts}
            </span>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[min(22rem,calc(100vw-2rem))] p-0"
      >
        <div className="space-y-1 p-4">
          <h2 className="text-sm font-semibold">Product summary</h2>
          <p className="text-xs text-muted-foreground">
            Catalogue totals from the latest product list.
          </p>
        </div>
        <Separator />
        <div className="grid gap-2 p-4">
          <ProductSummaryItem
            icon={Boxes}
            iconClassName="bg-primary/10 text-primary"
            label="Total products"
            value={totalProducts}
          />
          <ProductSummaryItem
            icon={PackageCheck}
            iconClassName="bg-emerald-500/10 text-emerald-600"
            label="Active products"
            value={activeProducts}
          />
          <ProductSummaryItem
            icon={PackageX}
            iconClassName="bg-destructive/10 text-destructive"
            label="Inactive products"
            value={inactiveProducts}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ProductSummary;
