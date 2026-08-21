import { Building2, FileText } from "lucide-react";

import { COMPANY_DETAILS_TYPE_OPTIONS } from "@Forms/company/companyDetails/companyDetails.options";
import { Input } from "@shadcnComponent/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";

import CompanyFormField from "@Forms/company/companyDetails/components/companyFormField";
import CompanySectionHeading from "@Forms/company/companyDetails/components/companySectionHeading";

function CompanyProfileSections({ form }) {
  const { formik, errorFor, inputProps, setSaveError } = form;

  return (
    <>
      <section className="space-y-5">
        <CompanySectionHeading
          icon={Building2}
          title="Business information"
          description="Basic information used to identify your company."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <CompanyFormField
            id="companyName"
            label="Company name"
            error={errorFor("companyName")}
          >
            <Input
              id="companyName"
              placeholder="e.g. Apex Industrial Solutions"
              autoComplete="organization"
              {...inputProps("companyName")}
            />
          </CompanyFormField>
          <CompanyFormField
            id="companyType"
            label="Company type"
            error={errorFor("companyType")}
          >
            <Select
              value={formik.values.companyType}
              onValueChange={(value) => {
                setSaveError(null);
                formik.setFieldValue("companyType", value, true);
              }}
              onOpenChange={(open) =>
                !open && formik.setFieldTouched("companyType", true, true)
              }
            >
              <SelectTrigger
                id="companyType"
                aria-invalid={Boolean(errorFor("companyType"))}
              >
                <SelectValue placeholder="Select company type" />
              </SelectTrigger>
              <SelectContent>
                {COMPANY_DETAILS_TYPE_OPTIONS.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CompanyFormField>
          <CompanyFormField
            id="email"
            label="Business email"
            error={errorFor("email")}
          >
            <Input
              id="email"
              type="email"
              placeholder="accounts@company.com"
              autoComplete="email"
              {...inputProps("email")}
            />
          </CompanyFormField>
          <CompanyFormField
            id="phoneNumber"
            label="Phone number"
            error={errorFor("phoneNumber")}
          >
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+91 98765 43210"
              autoComplete="tel"
              {...inputProps("phoneNumber")}
            />
          </CompanyFormField>
        </div>
      </section>

      <section className="space-y-5">
        <CompanySectionHeading
          icon={FileText}
          title="Tax & registration"
          description="Legal identifiers used for billing and compliance."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <CompanyFormField
            id="gstNumber"
            label="GSTIN"
            error={errorFor("gstNumber")}
          >
            <Input
              id="gstNumber"
              placeholder="22AAAAA0000A1Z5"
              className="uppercase"
              maxLength={15}
              {...inputProps("gstNumber")}
            />
          </CompanyFormField>
          <CompanyFormField
            id="panNumber"
            label="PAN number"
            error={errorFor("panNumber")}
          >
            <Input
              id="panNumber"
              placeholder="AAAAA0000A"
              className="uppercase"
              maxLength={10}
              {...inputProps("panNumber")}
            />
          </CompanyFormField>
          <CompanyFormField
            id="website"
            label="Website"
            optional
            error={errorFor("website")}
          >
            <Input
              id="website"
              type="url"
              placeholder="www.company.com"
              autoComplete="url"
              {...inputProps("website")}
            />
          </CompanyFormField>
        </div>
      </section>
    </>
  );
}

export default CompanyProfileSections;
