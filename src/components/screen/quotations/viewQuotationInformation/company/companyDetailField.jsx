import { createElement } from "react";

import { displayValue } from "@screenComponent/quotations/viewQuotationInformation/viewQuotationInformation.utils";

function CompanyDetailField({ icon, label, value }) {
  return (
    <div className="flex gap-3 rounded-lg bg-muted/35 p-3">
      {createElement(icon, {
        className: "mt-0.5 size-4 shrink-0 text-muted-foreground",
        "aria-hidden": true,
      })}
      <div className="min-w-0">
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className="mt-1 break-words text-sm font-medium whitespace-pre-line">
          {displayValue(value)}
        </dd>
      </div>
    </div>
  );
}

export default CompanyDetailField;
