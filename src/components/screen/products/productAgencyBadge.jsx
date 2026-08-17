import { AGENCIES } from "@Enums";
import { Badge } from "@shadcnComponent/badge";
import { agencyLabel } from "@screenComponent/products/product.utils";

const PRODUCT_AGENCY_BADGE_CLASSES = Object.freeze({
  [AGENCIES.CG]:
    "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300",
  [AGENCIES.RPG_KEC]:
    "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300",
  [AGENCIES.PREMIUM]:
    "border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-800 dark:bg-teal-950/50 dark:text-teal-300",
});

function ProductAgencyBadge({ agency }) {
  return (
    <Badge variant="outline" className={PRODUCT_AGENCY_BADGE_CLASSES[agency]}>
      {agencyLabel(agency)}
    </Badge>
  );
}

export default ProductAgencyBadge;
