import { getIn } from "formik";
import { ContactRound, Plus } from "lucide-react";

import { Button } from "@shadcnComponent/button";

import CompanyContactCard from "@Forms/company/companyDetails/components/companyContactCard";

function CompanyContactsSection({ address, addressIndex, isEditing, form }) {
  const {
    formik,
    addressEdit,
    contactEdit,
    updatingAddressId,
    updatingContactId,
    creatingAddressIndex,
    creatingContactKey,
    hasUnsavedContact,
    addContact,
  } = form;
  const contactsPath = `addresses[${addressIndex}].companyEmployees`;
  const contactsError = getIn(formik.errors, contactsPath);
  const contactsTouched = getIn(formik.touched, contactsPath);
  const addDisabled =
    Boolean(addressEdit) ||
    Boolean(contactEdit) ||
    Boolean(updatingAddressId) ||
    Boolean(updatingContactId) ||
    creatingAddressIndex !== null ||
    Boolean(creatingContactKey) ||
    (isEditing && (!address.id || hasUnsavedContact));

  return (
    <div className="mt-5 overflow-hidden rounded-lg border">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/25 px-4 py-3">
        <div className="flex items-center gap-2">
          <ContactRound className="size-4 text-primary" />
          <h5 className="text-sm font-semibold">Contact persons</h5>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addContact(addressIndex)}
          disabled={addDisabled}
          title={
            isEditing && !address.id
              ? "Save this address before adding a contact person"
              : "Add contact person"
          }
          className="h-8 bg-background"
        >
          <Plus className="size-4" />
          Add contact
        </Button>
      </div>

      {isEditing && !address.id && (
        <p className="border-b bg-muted/20 px-4 py-3 text-xs text-muted-foreground">
          Save this company address before adding contact person information.
        </p>
      )}

      {typeof contactsError === "string" && contactsTouched && (
        <p className="border-b bg-destructive/5 px-4 py-2 text-xs font-medium text-destructive">
          {contactsError}
        </p>
      )}

      <div className="divide-y">
        {address.companyEmployees.map((contact, contactIndex) => (
          <CompanyContactCard
            key={contact.id ?? contactIndex}
            contact={contact}
            contactIndex={contactIndex}
            addressIndex={addressIndex}
            isEditing={isEditing}
            form={form}
          />
        ))}
      </div>
    </div>
  );
}

export default CompanyContactsSection;
