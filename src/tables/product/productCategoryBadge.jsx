import { PRODUCT_CATEGORIES } from "@Enums";
import { Badge } from "@shadcnComponent/badge";
import { productCategoryLabel } from "@Tables/product/productTable.utils";

const PRODUCT_CATEGORY_BADGE_CLASSES = Object.freeze({
  [PRODUCT_CATEGORIES.MOTOR]:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300",
  [PRODUCT_CATEGORIES.DRIVE]:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
  [PRODUCT_CATEGORIES.PUMP]:
    "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300",
  [PRODUCT_CATEGORIES.GEAR_BOX]:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  [PRODUCT_CATEGORIES.CABLE]:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
  [PRODUCT_CATEGORIES.SPARE]:
    "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300",
});

function ProductCategoryBadge({ category }) {
  return (
    <Badge
      variant="outline"
      className={PRODUCT_CATEGORY_BADGE_CLASSES[category]}
    >
      {productCategoryLabel(category)}
    </Badge>
  );
}

export default ProductCategoryBadge;
