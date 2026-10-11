import { useState } from "react";
import { useSelector } from "react-redux";
import { Building2, Mail, MapPin, Pencil, Phone, Plus } from "lucide-react";
import _ from "lodash";

import { selectQuotationCompany } from "@Redux/product/quotation/quotation.selector";
import { Button } from "@shadcnComponent/button";
import CompanyInformationItem from "@screenComponent/products/dialogs/quotation/companyInformationItem";
import QuotationCompanyInformationEditor from "@screenComponent/products/dialogs/quotation/quotationCompanyInformationEditor";
import {
  companyAddress,
  formattedValue,
} from "@screenComponent/products/dialogs/quotation/quotationCompanyInformation.utils";

function QuotationCompanyInformation() {
  const company = useSelector(selectQuotationCompany);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section
      aria-labelledby="quotation-company-information-title"
      aria-live="polite"
      className="rounded-lg border bg-muted/20 p-4"
    >
      <div className="flex items-center justify-between gap-3">
        <h3
          id="quotation-company-information-title"
          className="text-sm font-semibold"
        >
          Company information
        </h3>
        {!isEditing && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            {company ? (
              <Pencil className="size-3.5" />
            ) : (
              <Plus className="size-3.5" />
            )}
            {company ? "Edit" : "Add custom details"}
          </Button>
        )}
      </div>

      {isEditing ? (
        <QuotationCompanyInformationEditor
          key={company?.id ?? "custom-company"}
          company={company}
          onCancel={() => setIsEditing(false)}
          onSave={() => setIsEditing(false)}
        />
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <CompanyInformationItem
            icon={<Building2 className="size-4" aria-hidden="true" />}
            label="Company name"
            value={formattedValue(company?.name, _.toUpper)}
            className="sm:col-span-2"
          />
          <CompanyInformationItem
            icon={<MapPin className="size-4" aria-hidden="true" />}
            label="Address"
            value={companyAddress(company)}
            className="sm:col-span-2"
          />
          <CompanyInformationItem
            icon={<Mail className="size-4" aria-hidden="true" />}
            label="Email"
            value={formattedValue(company?.email, _.toLower)}
          />
          <CompanyInformationItem
            icon={<Phone className="size-4" aria-hidden="true" />}
            label="Phone number"
            value={formattedValue(company?.phone, _.toLower)}
          />
        </div>
      )}
    </section>
  );
}

export default QuotationCompanyInformation;
