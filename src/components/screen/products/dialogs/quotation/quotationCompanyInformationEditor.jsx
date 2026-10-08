import { useState } from "react";
import { useDispatch } from "react-redux";

import { quotationCompanyDetailsUpdated } from "@Redux/product/quotation/quotation.slice";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import { Label } from "@shadcnComponent/label";
import { Textarea } from "@shadcnComponent/textarea";
import { companyStreetAddress } from "@screenComponent/products/dialogs/quotation/quotationCompanyInformation.utils";

function createDraft(company) {
  return {
    name: company?.name ?? "",
    address: companyStreetAddress(company),
    email: company?.email ?? "",
    phone: company?.phone ?? "",
  };
}

function QuotationCompanyInformationEditor({ company, onCancel, onSave }) {
  const dispatch = useDispatch();
  const [draft, setDraft] = useState(() => createDraft(company));

  const updateField = (field, value) =>
    setDraft((current) => ({ ...current, [field]: value }));

  const saveDetails = (event) => {
    event.preventDefault();
    dispatch(quotationCompanyDetailsUpdated(draft));
    onSave();
  };

  return (
    <form onSubmit={saveDetails} className="mt-4 grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="quotation-custom-company-name">Company name</Label>
        <Input
          id="quotation-custom-company-name"
          value={draft.name}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Enter company name"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="quotation-custom-company-address">Address</Label>
        <Textarea
          id="quotation-custom-company-address"
          value={draft.address}
          onChange={(event) => updateField("address", event.target.value)}
          placeholder="Enter company address"
          rows={3}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="quotation-custom-company-email">Email</Label>
          <Input
            id="quotation-custom-company-email"
            type="email"
            value={draft.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="Enter email address"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="quotation-custom-company-phone">Phone number</Label>
          <Input
            id="quotation-custom-company-phone"
            type="tel"
            value={draft.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save information</Button>
      </div>
    </form>
  );
}

export default QuotationCompanyInformationEditor;
