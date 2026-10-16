import { Building2, MapPin } from "lucide-react";

import { COMPANY_FIELDS } from "@Enums";
import { displayValue } from "@screenComponent/quotations/viewQuotationInformation/viewQuotationInformation.utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";

import CompanyDetailField from "@screenComponent/quotations/viewQuotationInformation/company/companyDetailField";

function CompanyDetails({ companyInformation, sectionRef }) {
  return (
    <Card
      ref={sectionRef}
      tabIndex={0}
      data-section-index="0"
      aria-labelledby="quotation-company-title"
      className="gap-3 py-4 outline-none transition-shadow focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring sm:gap-4 sm:py-5"
    >
      <CardHeader className="px-3 sm:px-6">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:size-10">
            <Building2 className="size-4 sm:size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Company details
            </p>
            <CardTitle
              id="quotation-company-title"
              className="mt-1 break-words text-base capitalize sm:text-lg"
            >
              {displayValue(companyInformation?.companyName)}
            </CardTitle>
            <p className="mt-1 flex items-start gap-1.5 whitespace-pre-line text-xs leading-relaxed text-muted-foreground sm:text-sm">
              <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              <span>{displayValue(companyInformation?.address)}</span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <dl className="grid gap-2.5 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
          {COMPANY_FIELDS.map(({ key, label, icon }) => (
            <CompanyDetailField
              key={key}
              icon={icon}
              label={label}
              value={companyInformation?.[key]}
            />
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

export default CompanyDetails;
