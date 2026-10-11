import { MapPin, Plus } from "lucide-react";

import { Button } from "@shadcnComponent/button";

import CompanyAddressCard from "@Forms/company/companyDetails/components/companyAddressCard";

function CompanyAddressesSection({ form, isEditing }) {
  const {
    formik,
    addAddress,
    hasPendingRecordMutation,
    hasUnsavedAddress,
    hasUnsavedContact,
  } = form;
  const addAddressDisabled =
    hasPendingRecordMutation ||
    (isEditing && (hasUnsavedAddress || hasUnsavedContact));

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <MapPin className="size-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-semibold">Addresses & contact persons</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Add every company address and the contacts assigned to it.
            </p>
            {isEditing && (
              <p className="mt-1 text-xs text-muted-foreground">
                Save each new address first, then add and save its contact
                persons. Save changes updates the company information only.
              </p>
            )}
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addAddress}
          disabled={addAddressDisabled}
        >
          <Plus className="size-4" />
          Add address
        </Button>
      </div>

      {typeof formik.errors.addresses === "string" &&
        formik.touched.addresses && (
          <p className="text-xs font-medium text-destructive">
            {formik.errors.addresses}
          </p>
        )}

      <div className="space-y-5">
        {formik.values.addresses.map((address, addressIndex) => (
          <CompanyAddressCard
            key={address.id ?? addressIndex}
            address={address}
            addressIndex={addressIndex}
            isEditing={isEditing}
            form={form}
          />
        ))}
      </div>
    </section>
  );
}

export default CompanyAddressesSection;
