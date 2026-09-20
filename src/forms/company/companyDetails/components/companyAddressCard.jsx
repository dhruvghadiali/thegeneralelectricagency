import { LoaderCircle, MapPin, Pencil, Save, Trash2, X } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import { Textarea } from "@shadcnComponent/textarea";

import CompanyContactsSection from "@Forms/company/companyDetails/components/companyContactsSection";
import CompanyFormField from "@Forms/company/companyDetails/components/companyFormField";
import CompanyStateSelect from "@Forms/company/companyDetails/components/companyStateSelect";

function CompanyAddressCard({ address, addressIndex, isEditing, form }) {
  const {
    formik,
    errorFor,
    inputProps,
    setSaveError,
    changeFormState,
    addressEdit,
    statePickerAddressIndex,
    stateSearch,
    deletingAddressId,
    deletingContactId,
    updatingAddressId,
    updatingContactId,
    creatingAddressIndex,
    addressDeleteBlockReason,
    startAddressEdit,
    cancelAddressEdit,
    saveAddress,
    saveNewAddress,
    removeAddress,
  } = form;
  const addressPath = `addresses[${addressIndex}]`;
  const isEditingThisAddress = addressEdit?.id === address.id;
  const isReadOnly = Boolean(address.id) && !isEditingThisAddress;
  const deleteBlockReason = addressDeleteBlockReason(address);
  const stateError = errorFor(`${addressPath}.state`);
  const statePickerOpen = statePickerAddressIndex === addressIndex;

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/40 px-4 py-3.5 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background text-primary shadow-xs">
            <MapPin className="size-4" />
          </span>
          <div className="min-w-0">
            <h4 className="font-semibold">Address {addressIndex + 1}</h4>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {address.companyEmployees.length}{" "}
              {address.companyEmployees.length === 1
                ? "contact person"
                : "contact persons"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isEditing && !address.id && (
            <Button
              type="button"
              size="sm"
              onClick={() => saveNewAddress(address, addressIndex)}
              disabled={creatingAddressIndex === addressIndex}
            >
              {creatingAddressIndex === addressIndex ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              Save address
            </Button>
          )}
          {address.id && !isEditingThisAddress && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => startAddressEdit(address, addressIndex)}
              disabled={
                Boolean(addressEdit) ||
                Boolean(updatingAddressId) ||
                Boolean(deletingAddressId)
              }
            >
              <Pencil className="size-4" />
              Edit address
            </Button>
          )}
          {address.id && isEditingThisAddress && (
            <>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={cancelAddressEdit}
                disabled={updatingAddressId === address.id}
              >
                <X className="size-4" />
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => saveAddress(address, addressIndex)}
                disabled={updatingAddressId === address.id}
              >
                {updatingAddressId === address.id ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                Save address
              </Button>
            </>
          )}
          {formik.values.addresses.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeAddress(addressIndex)}
              disabled={
                Boolean(deleteBlockReason) ||
                Boolean(addressEdit) ||
                Boolean(deletingAddressId) ||
                Boolean(deletingContactId) ||
                Boolean(updatingAddressId) ||
                Boolean(updatingContactId)
              }
              title={deleteBlockReason ?? `Remove address ${addressIndex + 1}`}
              aria-label={`Remove address ${addressIndex + 1}`}
              className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              {deletingAddressId === address.id ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Trash2 className="size-4" />
              )}
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid gap-5">
          <CompanyFormField
            id={`${addressPath}.address`}
            label="Full address"
            error={errorFor(`${addressPath}.address`)}
          >
            <Textarea
              disabled={isReadOnly}
              className="min-h-20 resize-y"
              id={`${addressPath}.address`}
              placeholder="Building, street, area and city"
              autoComplete="street-address"
              {...inputProps(`${addressPath}.address`)}
            />
          </CompanyFormField>
          <div className="grid gap-5 sm:grid-cols-[minmax(0,2fr)_minmax(10rem,1fr)]">
            <CompanyFormField
              id={`${addressPath}.state`}
              label="State / Union territory"
              error={stateError}
            >
              <CompanyStateSelect
                id={`${addressPath}.state`}
                value={address.state}
                error={stateError}
                disabled={isReadOnly}
                open={statePickerOpen}
                search={statePickerOpen ? stateSearch : ""}
                onOpenChange={(open) => {
                  changeFormState({
                    statePickerAddressIndex: open ? addressIndex : null,
                    stateSearch: "",
                  });
                  if (!open) {
                    formik.setFieldTouched(
                      `${addressPath}.state`,
                      true,
                      true,
                    );
                  }
                }}
                onSearchChange={(stateSearchValue) =>
                  changeFormState({ stateSearch: stateSearchValue })
                }
                onValueChange={(value) => {
                  setSaveError(null);
                  formik.setFieldValue(`${addressPath}.state`, value, true);
                  formik.setFieldTouched(`${addressPath}.state`, true, false);
                  changeFormState({
                    statePickerAddressIndex: null,
                    stateSearch: "",
                  });
                }}
              />
            </CompanyFormField>
            <CompanyFormField
              id={`${addressPath}.pincode`}
              label="PIN code"
              error={errorFor(`${addressPath}.pincode`)}
            >
              <Input
                disabled={isReadOnly}
                id={`${addressPath}.pincode`}
                inputMode="numeric"
                placeholder="380001"
                maxLength={6}
                autoComplete="postal-code"
                {...inputProps(`${addressPath}.pincode`)}
              />
            </CompanyFormField>
          </div>
        </div>

        <CompanyContactsSection
          address={address}
          addressIndex={addressIndex}
          isEditing={isEditing}
          form={form}
        />
      </div>
    </div>
  );
}

export default CompanyAddressCard;
