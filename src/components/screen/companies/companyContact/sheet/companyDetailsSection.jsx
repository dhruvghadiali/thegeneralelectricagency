import { FileText, Mail, Phone } from "lucide-react";

import CompanyDetailItem from "@screenComponent/companies/companyContact/sheet/companyDetailItem";

function CompanyDetailsSection({ details = [] }) {
  return (
    <section>
      <h3 className="text-sm font-semibold">Company details</h3>
      {details.length > 0 ? (
        <div className="mt-3 grid gap-4">
          {details.map((companyDetails, index) => (
            <div
              key={`${companyDetails.email}-${index}`}
              className="grid gap-3"
            >
              <CompanyDetailItem
                icon={Mail}
                label="Email address"
                value={companyDetails.email}
                href={companyDetails.email ? `mailto:${companyDetails.email}` : undefined}
              />
              <CompanyDetailItem
                icon={Phone}
                label="Phone number"
                value={companyDetails.phone}
                href={companyDetails.phone ? `tel:${companyDetails.phone}` : undefined}
              />
              <CompanyDetailItem
                icon={FileText}
                label="GST number"
                value={companyDetails.gstNumber}
              />
              <CompanyDetailItem
                icon={FileText}
                label="PAN number"
                value={companyDetails.panNumber}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
          No company details are available.
        </p>
      )}
    </section>
  );
}

export default CompanyDetailsSection;
