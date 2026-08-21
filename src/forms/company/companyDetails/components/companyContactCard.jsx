import { LoaderCircle, Pencil, Save, Trash2, X } from "lucide-react";

import { COMPANY_DETAILS_CONTACT_POSITION_OPTIONS } from "@Forms/company/companyDetails/companyDetails.options";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";

import CompanyFormField from "@Forms/company/companyDetails/components/companyFormField";

function CompanyContactCard({
  contact,
  contactIndex,
  addressIndex,
  isEditing,
  form,
}) {
  const {
    formik,
    errorFor,
    inputProps,
    setSaveError,
    contactEdit,
    deletingAddressId,
    deletingContactId,
    updatingAddressId,
    updatingContactId,
    creatingContactKey,
    contactDeleteBlockReason,
    startContactEdit,
    cancelContactEdit,
    saveContact,
    saveNewContact,
    removeContact,
  } = form;
  const contactPath = `addresses[${addressIndex}].companyEmployees[${contactIndex}]`;
  const isEditingThisContact = contactEdit?.id === contact.id;
  const isReadOnly = Boolean(contact.id) && !isEditingThisContact;
  const isCreating = creatingContactKey === `${addressIndex}-${contactIndex}`;
  const deleteBlockReason = contactDeleteBlockReason(addressIndex, contact);

  return (
    <div className="p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {contactIndex + 1}
          </span>
          <p className="text-sm font-medium">Contact person</p>
        </div>
        <div className="flex items-center gap-1">
          {isEditing && !contact.id && (
            <Button
              type="button"
              size="sm"
              onClick={() =>
                saveNewContact(contact, addressIndex, contactIndex)
              }
              disabled={isCreating}
            >
              {isCreating ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              Save contact
            </Button>
          )}
          {contact.id && !isEditingThisContact && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                startContactEdit(contact, addressIndex, contactIndex)
              }
              disabled={
                Boolean(contactEdit) ||
                Boolean(updatingContactId) ||
                Boolean(deletingContactId)
              }
            >
              <Pencil className="size-4" />
              Edit contact
            </Button>
          )}
          {contact.id && isEditingThisContact && (
            <>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={cancelContactEdit}
                disabled={updatingContactId === contact.id}
              >
                <X className="size-4" />
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => saveContact(contact, addressIndex, contactIndex)}
                disabled={updatingContactId === contact.id}
              >
                {updatingContactId === contact.id ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                Save contact
              </Button>
            </>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeContact(addressIndex, contactIndex)}
            disabled={
              Boolean(deleteBlockReason) ||
              Boolean(contactEdit) ||
              Boolean(deletingAddressId) ||
              Boolean(deletingContactId) ||
              Boolean(updatingAddressId) ||
              Boolean(updatingContactId)
            }
            title={deleteBlockReason ?? `Remove contact ${contactIndex + 1}`}
            aria-label={`Remove contact ${contactIndex + 1}`}
            className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            {deletingContactId === contact.id ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <CompanyFormField
          id={`${contactPath}.contactPersonName`}
          label="Name"
          error={errorFor(`${contactPath}.contactPersonName`)}
        >
          <Input
            disabled={isReadOnly}
            id={`${contactPath}.contactPersonName`}
            placeholder="Full name"
            autoComplete="name"
            {...inputProps(`${contactPath}.contactPersonName`)}
          />
        </CompanyFormField>
        <CompanyFormField
          id={`${contactPath}.contactPersonMobileNumber`}
          label="Mobile number"
          error={errorFor(`${contactPath}.contactPersonMobileNumber`)}
        >
          <Input
            disabled={isReadOnly}
            id={`${contactPath}.contactPersonMobileNumber`}
            type="tel"
            placeholder="+91 98765 43210"
            autoComplete="tel"
            {...inputProps(`${contactPath}.contactPersonMobileNumber`)}
          />
        </CompanyFormField>
        <CompanyFormField
          id={`${contactPath}.contactPersonPosition`}
          label="Position"
          error={errorFor(`${contactPath}.contactPersonPosition`)}
        >
          <Select
            disabled={isReadOnly}
            value={formik.values.addresses[addressIndex].companyEmployees[contactIndex].contactPersonPosition ?? ""}
            onValueChange={(value) => {
              setSaveError(null);
              formik.setFieldValue(
                `${contactPath}.contactPersonPosition`,
                value,
                true,
              );
            }}
            onOpenChange={(open) =>
              !open &&
              formik.setFieldTouched(
                `${contactPath}.contactPersonPosition`,
                true,
                true,
              )
            }
          >
            <SelectTrigger
              id={`${contactPath}.contactPersonPosition`}
              aria-invalid={Boolean(
                errorFor(`${contactPath}.contactPersonPosition`),
              )}
            >
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              {COMPANY_DETAILS_CONTACT_POSITION_OPTIONS.map((position) => (
                <SelectItem key={position.value} value={position.value}>
                  {position.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CompanyFormField>
      </div>
    </div>
  );
}

export default CompanyContactCard;
