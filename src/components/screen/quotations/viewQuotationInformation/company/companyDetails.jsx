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
      className="gap-4 py-5 outline-none transition-shadow focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring"
    >
      <CardHeader className="px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Building2 className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Company details
            </p>
            <CardTitle
              id="quotation-company-title"
              className="mt-1 text-lg capitalize"
            >
              {displayValue(companyInformation?.companyName)}
            </CardTitle>
            <p className="mt-1 flex items-start gap-1.5 whitespace-pre-line text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              <span>{displayValue(companyInformation?.address)}</span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
