import { COMPANY_TYPES } from "@Enums";
import { Badge } from "@shadcnComponent/badge";
import { companyTypeLabel } from "@Tables/company/companyTable.utils";

const COMPANY_TYPE_BADGE_CLASSES = Object.freeze({
  [COMPANY_TYPES.SUPPLIER]:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300",
  [COMPANY_TYPES.CUSTOMER]:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
  [COMPANY_TYPES.MANUFACTURER]:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
  [COMPANY_TYPES.DEALER]:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  [COMPANY_TYPES.BOTH]:
    "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300",
});

function CompanyTypeBadge({ type }) {
  return (
    <Badge variant="outline" className={COMPANY_TYPE_BADGE_CLASSES[type]}>
      {companyTypeLabel(type)}
    </Badge>
  );
}

export default CompanyTypeBadge;
