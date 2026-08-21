import { Boxes, PackageCheck, PackageX } from "lucide-react";
import { useSelector } from "react-redux";

import { selectProductSummary } from "@Redux/product/product.selector";
import SummaryCard from "@commonComponent/summaryCard";

function ProductSummary() {
  const { totalProducts, activeProducts, inactiveProducts } = useSelector(
    selectProductSummary,
  );

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <SummaryCard
        icon={Boxes}
        iconClassName="bg-primary/10 text-primary"
        value={totalProducts}
        label="Total products"
      />
      <SummaryCard
        icon={PackageCheck}
        iconClassName="bg-emerald-500/10 text-emerald-600"
        value={activeProducts}
        label="Active products"
      />
      <SummaryCard
        icon={PackageX}
        iconClassName="bg-destructive/10 text-destructive"
        value={inactiveProducts}
        label="Inactive products"
      />
    </section>
  );
}

export default ProductSummary;
