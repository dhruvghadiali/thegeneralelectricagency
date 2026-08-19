import { createElement, useMemo, useState } from "react";
import { getIn, useFormik } from "formik";
import {
  Building2,
  ContactRound,
  FileText,
  LoaderCircle,
  MapPin,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Button } from "@shadcnComponent/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";
import { Input } from "@shadcnComponent/input";
import { Label } from "@shadcnComponent/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";
import { Textarea } from "@shadcnComponent/textarea";
import {
  COMPANY_INITIAL_VALUES,
  EMPTY_COMPANY_ADDRESS,
  EMPTY_COMPANY_CONTACT,
} from "@Forms/company/company.initialValues";
import { companyValidationSchema } from "@Forms/company/company.validation.schema";
import { COMPANY_TYPE_OPTIONS, CONTACT_POSITION_OPTIONS } from "@Enums";
import {
  createCompanyAddress,
  createCompanyContact,
  createCompany,
  deleteCompanyAddress,
  deleteCompanyContact,
  updateCompany,
  updateCompanyAddress,
  updateCompanyContact,
} from "@Redux/company/company.action";
import { toCompanyFormValues } from "@Forms/company/company-frontend.payload";

function Field({ id, label, error, optional = false, children }) {
  return (
    <div className="grid content-start gap-2 self-start">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        {optional && (
          <span className="text-xs text-muted-foreground">Optional</span>
        )}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function SectionHeading({ icon, title, description }) {
  return (
    <div className="flex items-start gap-3 border-b pb-4">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        {createElement(icon, { className: "size-4", "aria-hidden": true })}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

const SAVED_ADDRESS_REQUIRED_MESSAGE =
  "At least one saved company address must remain.";
const SAVED_CONTACT_REQUIRED_MESSAGE =
  "At least one saved company contact must remain for this address.";
const COMPANY_CONTACT_REQUIRED_MESSAGE =
  "At least one company contact person must remain for this address.";

function isSavedAddress(address) {
  return Boolean(address?.id);
}

function isSavedContact(contact) {
  return Boolean(contact?.id && contact.contactPersonMobileNumber?.trim());
}

function createdRecordId(response, type) {
  const nestedRecord =
    type === "address"
      ? (response?.company_address ?? response?.address)
      : (response?.company_contact ?? response?.contact);

  return (
    response?._id ??
    response?.id ??
    response?.[`${type}_id`] ??
    response?.[`company_${type}_id`] ??
    nestedRecord?._id ??
    nestedRecord?.id ??
    null
  );
}

function CompanyDetailsForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { companyId } = useParams();
  const [saveError, setSaveError] = useState(null);
  const [addressEdit, setAddressEdit] = useState(null);
  const [contactEdit, setContactEdit] = useState(null);
  const [deletingAddressId, setDeletingAddressId] = useState(null);
  const [deletingContactId, setDeletingContactId] = useState(null);
  const [updatingAddressId, setUpdatingAddressId] = useState(null);
  const [updatingContactId, setUpdatingContactId] = useState(null);
  const [creatingAddressIndex, setCreatingAddressIndex] = useState(null);
  const [creatingContactKey, setCreatingContactKey] = useState(null);
  const companies = useSelector((state) => state.companies.items);
  const isEditing = Boolean(companyId);
  const company =
    location.state?.company ??
    companies.find((item) => String(item.id) === String(companyId));
  const resolvedCompanyId = company?.id ?? companyId;
  const initialValues = useMemo(
    () => toCompanyFormValues(isEditing ? company : null),
    [company, isEditing],
  );

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: companyValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const details = companyValidationSchema.cast(values);
        if (isEditing) {
          await dispatch(
            updateCompany({ id: resolvedCompanyId, values: details }),
          ).unwrap();
        } else {
          await dispatch(createCompany(details)).unwrap();
          helpers.resetForm({ values: COMPANY_INITIAL_VALUES });
        }
        navigate("/companies", { replace: true });
      } catch (error) {
        Object.entries(error?.fieldErrors ?? {}).forEach(([field, message]) => {
          helpers.setFieldError(field, message);
          helpers.setFieldTouched(field, true, false);
        });
        setSaveError(
          typeof error === "string"
            ? error
            : (error?.message ??
                "Unable to save the company. Please try again."),
        );
      }
    },
  });

  if (isEditing && !company) {
    return (
      <main className="mx-auto w-full max-w-3xl space-y-5 pb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Company details unavailable
        </h1>
        <p className="text-sm text-muted-foreground">
          Return to the company directory and select Edit on the company again.
        </p>
        <Button onClick={() => navigate("/companies", { replace: true })}>
          Back to companies
        </Button>
      </main>
    );
  }

  const errorFor = (name) => {
    const error = getIn(formik.errors, name);
    return getIn(formik.touched, name) && typeof error === "string"
      ? error
      : null;
  };

  const savedAddressCount =
    formik.values.addresses.filter(isSavedAddress).length;
  const savedContactCount = formik.values.addresses.reduce(
    (count, address) =>
      count + (address.companyEmployees ?? []).filter(isSavedContact).length,
    0,
  );
  const hasUnsavedAddress = formik.values.addresses.some(
    (address) => !address.id,
  );
  const hasUnsavedContact = formik.values.addresses.some((address) =>
    (address.companyEmployees ?? []).some((contact) => !contact.id),
  );

  const addressDeleteBlockReason = (address) => {
    if (!isEditing || !isSavedAddress(address)) return null;

    if (savedAddressCount <= 1) {
      return SAVED_ADDRESS_REQUIRED_MESSAGE;
    }

    const savedContactsOnAddress = (address.companyEmployees ?? []).filter(
      isSavedContact,
    ).length;

    if (savedContactCount - savedContactsOnAddress < 1) {
      return SAVED_CONTACT_REQUIRED_MESSAGE;
    }

    return null;
  };

  const contactDeleteBlockReason = (addressIndex, contact) => {
    if (!isEditing) return null;

    const addressContacts =
      formik.values.addresses[addressIndex]?.companyEmployees ?? [];

    if (addressContacts.length <= 1) {
      return COMPANY_CONTACT_REQUIRED_MESSAGE;
    }

    if (!contact?.id) return null;

    const remainingSavedContacts =
      addressContacts.filter(isSavedContact).length -
      (isSavedContact(contact) ? 1 : 0);

    return remainingSavedContacts < 1 ? SAVED_CONTACT_REQUIRED_MESSAGE : null;
  };

  const inputProps = (name) => ({
    name,
    value: getIn(formik.values, name) ?? "",
    onChange: (event) => {
      setSaveError(null);
      formik.handleChange(event);
    },
    onBlur: formik.handleBlur,
    "aria-invalid": Boolean(errorFor(name)),
    "aria-describedby": errorFor(name) ? `${name}-error` : undefined,
  });

  const startAddressEdit = (address, addressIndex) => {
    setSaveError(null);
    setAddressEdit({
      id: address.id,
      addressIndex,
      snapshot: {
        address: address.address,
        pincode: address.pincode,
      },
    });
  };

  const cancelAddressEdit = () => {
    if (!addressEdit) return;

    const addressPath = `addresses[${addressEdit.addressIndex}]`;
    formik.setFieldValue(
      `${addressPath}.address`,
      addressEdit.snapshot.address,
      false,
    );
    formik.setFieldValue(
      `${addressPath}.pincode`,
      addressEdit.snapshot.pincode,
      false,
    );
    setAddressEdit(null);
  };

  const saveAddress = async (address, addressIndex) => {
    const addressPath = `addresses[${addressIndex}]`;
    const addressField = `${addressPath}.address`;
    const pincodeField = `${addressPath}.pincode`;
    const errors = await formik.validateForm();

    formik.setFieldTouched(addressField, true, false);
    formik.setFieldTouched(pincodeField, true, false);

    if (getIn(errors, addressField) || getIn(errors, pincodeField)) return;

    setSaveError(null);
    setUpdatingAddressId(address.id);

    try {
      await dispatch(
        updateCompanyAddress({ id: address.id, values: address }),
      ).unwrap();
      setAddressEdit(null);
    } catch (error) {
      setSaveError(
        typeof error === "string"
          ? error
          : (error?.message ?? "Unable to update the company address."),
      );
    } finally {
      setUpdatingAddressId(null);
    }
  };

  const saveNewAddress = async (address, addressIndex) => {
    const addressPath = `addresses[${addressIndex}]`;
    const addressField = `${addressPath}.address`;
    const pincodeField = `${addressPath}.pincode`;
    const errors = await formik.validateForm();

    formik.setFieldTouched(addressField, true, false);
    formik.setFieldTouched(pincodeField, true, false);

    if (getIn(errors, addressField) || getIn(errors, pincodeField)) return;

    setSaveError(null);
    setCreatingAddressIndex(addressIndex);

    try {
      const createdAddress = await dispatch(
        createCompanyAddress({ companyId: resolvedCompanyId, values: address }),
      ).unwrap();
      const addressId = createdRecordId(createdAddress, "address");

      if (!addressId) {
        throw new Error(
          "The address was saved, but its identifier was not returned. Reload the company before adding contacts.",
        );
      }

      await formik.setFieldValue(`${addressPath}.id`, addressId, false);
    } catch (error) {
      setSaveError(
        typeof error === "string"
          ? error
          : (error?.message ?? "Unable to add the company address."),
      );
    } finally {
      setCreatingAddressIndex(null);
    }
  };

  const startContactEdit = (contact, addressIndex, contactIndex) => {
    setSaveError(null);
    setContactEdit({
      id: contact.id,
      addressIndex,
      contactIndex,
      snapshot: {
        contactPersonName: contact.contactPersonName,
        contactPersonMobileNumber: contact.contactPersonMobileNumber,
        contactPersonPosition: contact.contactPersonPosition,
      },
    });
  };

  const cancelContactEdit = () => {
    if (!contactEdit) return;

    const contactPath = `addresses[${contactEdit.addressIndex}].companyEmployees[${contactEdit.contactIndex}]`;
    Object.entries(contactEdit.snapshot).forEach(([field, value]) => {
      formik.setFieldValue(`${contactPath}.${field}`, value, false);
    });
    setContactEdit(null);
  };

  const saveContact = async (contact, addressIndex, contactIndex) => {
    const contactPath = `addresses[${addressIndex}].companyEmployees[${contactIndex}]`;
    const fields = [
      `${contactPath}.contactPersonName`,
      `${contactPath}.contactPersonMobileNumber`,
      `${contactPath}.contactPersonPosition`,
    ];
    const errors = await formik.validateForm();

    fields.forEach((field) => formik.setFieldTouched(field, true, false));
    if (fields.some((field) => getIn(errors, field))) return;

    setSaveError(null);
    setUpdatingContactId(contact.id);

    try {
      await dispatch(
        updateCompanyContact({ id: contact.id, values: contact }),
      ).unwrap();
      setContactEdit(null);
    } catch (error) {
      setSaveError(
        typeof error === "string"
          ? error
          : (error?.message ?? "Unable to update the contact person."),
      );
    } finally {
      setUpdatingContactId(null);
    }
  };

  const saveNewContact = async (contact, addressIndex, contactIndex) => {
    const address = formik.values.addresses[addressIndex];

    if (!address?.id) {
      setSaveError("Save the company address before adding a contact person.");
      return;
    }

    if (!resolvedCompanyId) {
      setSaveError("Company information is unavailable. Reopen the edit form.");
      return;
    }

    const contactPath = `addresses[${addressIndex}].companyEmployees[${contactIndex}]`;
    const fields = [
      `${contactPath}.contactPersonName`,
      `${contactPath}.contactPersonMobileNumber`,
      `${contactPath}.contactPersonPosition`,
    ];
    const errors = await formik.validateForm();

    fields.forEach((field) => formik.setFieldTouched(field, true, false));
    if (fields.some((field) => getIn(errors, field))) return;

    const contactKey = `${addressIndex}-${contactIndex}`;
    setSaveError(null);
    setCreatingContactKey(contactKey);

    try {
      const createdContact = await dispatch(
        createCompanyContact({
          companyId: resolvedCompanyId,
          addressId: address.id,
          values: contact,
        }),
      ).unwrap();
      const contactId = createdRecordId(createdContact, "contact");

      if (!contactId) {
        throw new Error(
          "The contact was saved, but its identifier was not returned. Reload the company before editing it.",
        );
      }

      await formik.setFieldValue(`${contactPath}.id`, contactId, false);
    } catch (error) {
      setSaveError(
        typeof error === "string"
          ? error
          : (error?.message ?? "Unable to add the contact person."),
      );
    } finally {
      setCreatingContactKey(null);
    }
  };

  const addAddress = () => {
    setSaveError(null);
    formik.setFieldValue("addresses", [
      ...formik.values.addresses,
      {
        ...EMPTY_COMPANY_ADDRESS,
        companyEmployees: isEditing ? [] : [{ ...EMPTY_COMPANY_CONTACT }],
      },
    ]);
  };

  const removeAddress = async (addressIndex) => {
    const address = formik.values.addresses[addressIndex];
    const blockedReason = addressDeleteBlockReason(address);

    if (blockedReason) {
      setSaveError(blockedReason);
      return;
    }

    const addressId = address?.id;

    if (addressId) {
      setSaveError(null);
      setDeletingAddressId(addressId);

      try {
        await dispatch(deleteCompanyAddress(addressId)).unwrap();
      } catch (error) {
        setSaveError(
          typeof error === "string"
            ? error
            : (error?.message ?? "Unable to delete the company address."),
        );
        setDeletingAddressId(null);
        return;
      }

      setDeletingAddressId(null);
    }

    formik.setFieldValue(
      "addresses",
      formik.values.addresses.filter((_, index) => index !== addressIndex),
      true,
    );
  };

  const addContact = (addressIndex) => {
    if (isEditing && !formik.values.addresses[addressIndex]?.id) {
      setSaveError("Save the company address before adding a contact person.");
      return;
    }

    const contactsPath = `addresses[${addressIndex}].companyEmployees`;
    const contacts = getIn(formik.values, contactsPath) ?? [];
    formik.setFieldValue(contactsPath, [
      ...contacts,
      { ...EMPTY_COMPANY_CONTACT },
    ]);
  };

  const removeContact = async (addressIndex, contactIndex) => {
    const contactsPath = `addresses[${addressIndex}].companyEmployees`;
    const contacts = getIn(formik.values, contactsPath) ?? [];
    const contact = contacts[contactIndex];
    const blockedReason = contactDeleteBlockReason(addressIndex, contact);

    if (blockedReason) {
      setSaveError(blockedReason);
      return;
    }

    const contactId = contact?.id;

    if (contactId) {
      setSaveError(null);
      setDeletingContactId(contactId);

      try {
        await dispatch(deleteCompanyContact(contactId)).unwrap();
      } catch (error) {
        setSaveError(
          typeof error === "string"
            ? error
            : (error?.message ?? "Unable to delete the contact person."),
        );
        setDeletingContactId(null);
        return;
      }

      setDeletingContactId(null);
    }

    formik.setFieldValue(
      contactsPath,
      contacts.filter((_, index) => index !== contactIndex),
      true,
    );
  };

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 pb-8">
      <section className="space-y-5">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-primary">Business directory</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            {isEditing ? "Edit company" : "Add company"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isEditing
              ? "Update the company profile, compliance details, contacts, and registered addresses."
              : "Enter the company profile, compliance details, primary contact, and registered address."}
          </p>
        </div>
      </section>

      <div>
        <Card className="shadow-none">
          <CardHeader className="border-b">
            <CardTitle>Company profile</CardTitle>
            <CardDescription>
              Fields marked as required must be completed before saving.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-8"
              noValidate
            >
              <section className="space-y-5">
                <SectionHeading
                  icon={Building2}
                  title="Business information"
                  description="Basic information used to identify your company."
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
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
                  </Field>
                  <Field
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
                        !open &&
                        formik.setFieldTouched("companyType", true, true)
                      }
                    >
                      <SelectTrigger
                        id="companyType"
                        aria-invalid={Boolean(errorFor("companyType"))}
                      >
                        <SelectValue placeholder="Select company type" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMPANY_TYPE_OPTIONS.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field
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
                  </Field>
                  <Field
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
                  </Field>
                </div>
              </section>

              <section className="space-y-5">
                <SectionHeading
                  icon={FileText}
                  title="Tax & registration"
                  description="Legal identifiers used for billing and compliance."
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
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
                  </Field>
                  <Field
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
                  </Field>
                  <Field
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
                  </Field>
                </div>
              </section>

              <section className="space-y-5">
                <div className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <MapPin className="size-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        Addresses & contact persons
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Add every company address and the contacts assigned to
                        it.
                      </p>
                      {isEditing && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Save each new address first, then add and save its
                          contact persons. Save changes updates the company
                          information only.
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addAddress}
                    disabled={
                      Boolean(addressEdit) ||
                      Boolean(contactEdit) ||
                      Boolean(updatingAddressId) ||
                      Boolean(updatingContactId) ||
                      creatingAddressIndex !== null ||
                      Boolean(creatingContactKey) ||
                      (isEditing && (hasUnsavedAddress || hasUnsavedContact))
                    }
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
                    <div
                      key={addressIndex}
                      className="overflow-hidden rounded-xl border bg-card shadow-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/40 px-4 py-3.5 sm:px-5">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background text-primary shadow-xs">
                            <MapPin className="size-4" />
                          </span>
                          <div className="min-w-0">
                            <h4 className="font-semibold">
                              Address {addressIndex + 1}
                            </h4>
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
                              onClick={() =>
                                saveNewAddress(address, addressIndex)
                              }
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
                          {address.id && addressEdit?.id !== address.id && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                startAddressEdit(address, addressIndex)
                              }
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
                          {address.id && addressEdit?.id === address.id && (
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
                                onClick={() =>
                                  saveAddress(address, addressIndex)
                                }
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
                                Boolean(addressDeleteBlockReason(address)) ||
                                Boolean(addressEdit) ||
                                Boolean(deletingAddressId) ||
                                Boolean(deletingContactId) ||
                                Boolean(updatingAddressId) ||
                                Boolean(updatingContactId)
                              }
                              title={
                                addressDeleteBlockReason(address) ??
                                `Remove address ${addressIndex + 1}`
                              }
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
                          <Field
                            id={`addresses[${addressIndex}].address`}
                            label="Full address"
                            error={errorFor(
                              `addresses[${addressIndex}].address`,
                            )}
                          >
                            <Textarea
                              disabled={
                                Boolean(address.id) &&
                                addressEdit?.id !== address.id
                              }
                              className="min-h-20 resize-y"
                              id={`addresses[${addressIndex}].address`}
                              placeholder="Building, street, area, city and state"
                              autoComplete="street-address"
                              {...inputProps(
                                `addresses[${addressIndex}].address`,
                              )}
                            />
                          </Field>
                          <Field
                            id={`addresses[${addressIndex}].pincode`}
                            label="PIN code"
                            error={errorFor(
                              `addresses[${addressIndex}].pincode`,
                            )}
                          >
                            <Input
                              disabled={
                                Boolean(address.id) &&
                                addressEdit?.id !== address.id
                              }
                              id={`addresses[${addressIndex}].pincode`}
                              inputMode="numeric"
                              placeholder="380001"
                              maxLength={6}
                              autoComplete="postal-code"
                              {...inputProps(
                                `addresses[${addressIndex}].pincode`,
                              )}
                            />
                          </Field>
                        </div>

                        <div className="mt-5 overflow-hidden rounded-lg border">
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/25 px-4 py-3">
                            <div className="flex items-center gap-2">
                              <ContactRound className="size-4 text-primary" />
                              <h5 className="text-sm font-semibold">
                                Contact persons
                              </h5>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addContact(addressIndex)}
                              disabled={
                                Boolean(addressEdit) ||
                                Boolean(contactEdit) ||
                                Boolean(updatingAddressId) ||
                                Boolean(updatingContactId) ||
                                creatingAddressIndex !== null ||
                                Boolean(creatingContactKey) ||
                                (isEditing &&
                                  (!address.id || hasUnsavedContact))
                              }
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
                              Save this company address before adding contact
                              person information.
                            </p>
                          )}

                          {typeof getIn(
                            formik.errors,
                            `addresses[${addressIndex}].companyEmployees`,
                          ) === "string" &&
                            getIn(
                              formik.touched,
                              `addresses[${addressIndex}].companyEmployees`,
                            ) && (
                              <p className="border-b bg-destructive/5 px-4 py-2 text-xs font-medium text-destructive">
                                {getIn(
                                  formik.errors,
                                  `addresses[${addressIndex}].companyEmployees`,
                                )}
                              </p>
                            )}

                          <div className="divide-y">
                            {address.companyEmployees.map(
                              (contact, contactIndex) => (
                                <div key={contactIndex} className="p-4">
                                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                      <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                        {contactIndex + 1}
                                      </span>
                                      <p className="text-sm font-medium">
                                        Contact person
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      {isEditing && !contact.id && (
                                        <Button
                                          type="button"
                                          size="sm"
                                          onClick={() =>
                                            saveNewContact(
                                              contact,
                                              addressIndex,
                                              contactIndex,
                                            )
                                          }
                                          disabled={
                                            creatingContactKey ===
                                            `${addressIndex}-${contactIndex}`
                                          }
                                        >
                                          {creatingContactKey ===
                                          `${addressIndex}-${contactIndex}` ? (
                                            <LoaderCircle className="size-4 animate-spin" />
                                          ) : (
                                            <Save className="size-4" />
                                          )}
                                          Save contact
                                        </Button>
                                      )}
                                      {contact.id &&
                                        contactEdit?.id !== contact.id && (
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                              startContactEdit(
                                                contact,
                                                addressIndex,
                                                contactIndex,
                                              )
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
                                      {contact.id &&
                                        contactEdit?.id === contact.id && (
                                          <>
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              onClick={cancelContactEdit}
                                              disabled={
                                                updatingContactId === contact.id
                                              }
                                            >
                                              <X className="size-4" />
                                              Cancel
                                            </Button>
                                            <Button
                                              type="button"
                                              size="sm"
                                              onClick={() =>
                                                saveContact(
                                                  contact,
                                                  addressIndex,
                                                  contactIndex,
                                                )
                                              }
                                              disabled={
                                                updatingContactId === contact.id
                                              }
                                            >
                                              {updatingContactId ===
                                              contact.id ? (
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
                                        onClick={() =>
                                          removeContact(
                                            addressIndex,
                                            contactIndex,
                                          )
                                        }
                                        disabled={
                                          Boolean(
                                            contactDeleteBlockReason(
                                              addressIndex,
                                              contact,
                                            ),
                                          ) ||
                                          Boolean(contactEdit) ||
                                          Boolean(deletingAddressId) ||
                                          Boolean(deletingContactId) ||
                                          Boolean(updatingAddressId) ||
                                          Boolean(updatingContactId)
                                        }
                                        title={
                                          contactDeleteBlockReason(
                                            addressIndex,
                                            contact,
                                          ) ??
                                          `Remove contact ${contactIndex + 1}`
                                        }
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
                                    <Field
                                      id={`addresses[${addressIndex}].companyEmployees[${contactIndex}].contactPersonName`}
                                      label="Name"
                                      error={errorFor(
                                        `addresses[${addressIndex}].companyEmployees[${contactIndex}].contactPersonName`,
                                      )}
                                    >
                                      <Input
                                        disabled={
                                          Boolean(contact.id) &&
                                          contactEdit?.id !== contact.id
                                        }
                                        id={`addresses[${addressIndex}].companyEmployees[${contactIndex}].contactPersonName`}
                                        placeholder="Full name"
                                        autoComplete="name"
                                        {...inputProps(
                                          `addresses[${addressIndex}].companyEmployees[${contactIndex}].contactPersonName`,
                                        )}
                                      />
                                    </Field>
                                    <Field
                                      id={`addresses[${addressIndex}].companyEmployees[${contactIndex}].contactPersonMobileNumber`}
                                      label="Mobile number"
                                      error={errorFor(
                                        `addresses[${addressIndex}].companyEmployees[${contactIndex}].contactPersonMobileNumber`,
                                      )}
                                    >
                                      <Input
                                        disabled={
                                          Boolean(contact.id) &&
                                          contactEdit?.id !== contact.id
                                        }
                                        id={`addresses[${addressIndex}].companyEmployees[${contactIndex}].contactPersonMobileNumber`}
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        autoComplete="tel"
                                        {...inputProps(
                                          `addresses[${addressIndex}].companyEmployees[${contactIndex}].contactPersonMobileNumber`,
                                        )}
                                      />
                                    </Field>
                                    <Field
                                      id={`addresses[${addressIndex}].companyEmployees[${contactIndex}].contactPersonPosition`}
                                      label="Position"
                                      error={errorFor(
                                        `addresses[${addressIndex}].companyEmployees[${contactIndex}].contactPersonPosition`,
                                      )}
                                    >
                                      <Select
                                        disabled={
                                          Boolean(contact.id) &&
                                          contactEdit?.id !== contact.id
                                        }
                                        value={
                                          getIn(
                                            formik.values,
                                            `addresses[${addressIndex}].companyEmployees[${contactIndex}].contactPersonPosition`,
                                          ) ?? ""
                                        }
                                        onValueChange={(value) => {
                                          setSaveError(null);
                                          formik.setFieldValue(
                                            `addresses[${addressIndex}].companyEmployees[${contactIndex}].contactPersonPosition`,
                                            value,
                                            true,
                                          );
                                        }}
                                        onOpenChange={(open) =>
                                          !open &&
                                          formik.setFieldTouched(
                                            `addresses[${addressIndex}].companyEmployees[${contactIndex}].contactPersonPosition`,
                                            true,
                                            true,
                                          )
                                        }
                                      >
                                        <SelectTrigger
                                          id={`addresses[${addressIndex}].companyEmployees[${contactIndex}].contactPersonPosition`}
                                          aria-invalid={Boolean(
                                            errorFor(
                                              `addresses[${addressIndex}].companyEmployees[${contactIndex}].contactPersonPosition`,
                                            ),
                                          )}
                                        >
                                          <SelectValue placeholder="Select position" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {CONTACT_POSITION_OPTIONS.map(
                                            (position) => (
                                              <SelectItem
                                                key={position.value}
                                                value={position.value}
                                              >
                                                {position.label}
                                              </SelectItem>
                                            ),
                                          )}
                                        </SelectContent>
                                      </Select>
                                    </Field>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p
                  role={saveError ? "alert" : undefined}
                  className={
                    saveError
                      ? "text-xs font-medium text-destructive"
                      : "text-xs text-muted-foreground"
                  }
                >
                  {saveError ??
                    (isEditing
                      ? "Your changes will be reflected in the company directory after saving."
                      : "The company will appear in the company table after saving.")}
                </p>
                <Button
                  type="submit"
                  disabled={
                    formik.isSubmitting ||
                    Boolean(addressEdit) ||
                    Boolean(contactEdit) ||
                    Boolean(deletingAddressId) ||
                    Boolean(deletingContactId) ||
                    Boolean(updatingAddressId) ||
                    Boolean(updatingContactId) ||
                    creatingAddressIndex !== null ||
                    Boolean(creatingContactKey) ||
                    (isEditing && (hasUnsavedAddress || hasUnsavedContact)) ||
                    !formik.dirty
                  }
                  className="sm:min-w-36"
                >
                  {formik.isSubmitting ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    <Save className="size-4" />
                  )}
                  {formik.isSubmitting
                    ? "Saving..."
                    : isEditing
                      ? "Save changes"
                      : "Save company"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default CompanyDetailsForm;
