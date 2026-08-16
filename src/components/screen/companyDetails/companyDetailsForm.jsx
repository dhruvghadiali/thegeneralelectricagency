import { createElement, useState } from "react";
import { getIn, useFormik } from "formik";
import {
  Building2,
  ContactRound,
  FileText,
  LoaderCircle,
  MapPin,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  COMPANY_DETAILS_INITIAL_VALUES,
  EMPTY_COMPANY_ADDRESS,
  EMPTY_COMPANY_CONTACT,
} from "@Forms/company/company-details.initialValues";
import { companyDetailsValidationSchema } from "@Forms/company/company-details.validation.schema";
import { COMPANY_TYPE_OPTIONS, CONTACT_POSITION_OPTIONS } from "@Enums";
import PageBreadcrumb from "@commonComponent/pageBreadcrumb";
import { createCompany } from "@Redux/company/company.action";

function Field({ id, label, error, optional = false, children }) {
  return (
    <div className="grid content-start gap-2 self-start">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        {optional && <span className="text-xs text-muted-foreground">Optional</span>}
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

function CompanyDetailsForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [saveError, setSaveError] = useState(null);

  const formik = useFormik({
    initialValues: COMPANY_DETAILS_INITIAL_VALUES,
    validationSchema: companyDetailsValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const details = companyDetailsValidationSchema.cast(values);
        await dispatch(createCompany(details)).unwrap();
        helpers.resetForm({ values: COMPANY_DETAILS_INITIAL_VALUES });
        navigate("/companies", { replace: true });
      } catch (error) {
        Object.entries(error?.fieldErrors ?? {}).forEach(([field, message]) => {
          helpers.setFieldError(field, message);
          helpers.setFieldTouched(field, true, false);
        });
        setSaveError(
          error?.message ?? "Unable to save the company. Please try again.",
        );
      }
    },
  });

  const errorFor = (name) => {
    const error = getIn(formik.errors, name);
    return getIn(formik.touched, name) && typeof error === "string" ? error : null;
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

  const addAddress = () => {
    setSaveError(null);
    formik.setFieldValue("addresses", [
      ...formik.values.addresses,
      { ...EMPTY_COMPANY_ADDRESS, company_employees: [{ ...EMPTY_COMPANY_CONTACT }] },
    ]);
  };

  const removeAddress = (addressIndex) => {
    formik.setFieldValue(
      "addresses",
      formik.values.addresses.filter((_, index) => index !== addressIndex),
      true,
    );
  };

  const addContact = (addressIndex) => {
    const contactsPath = `addresses[${addressIndex}].company_employees`;
    const contacts = getIn(formik.values, contactsPath) ?? [];
    formik.setFieldValue(contactsPath, [...contacts, { ...EMPTY_COMPANY_CONTACT }]);
  };

  const removeContact = (addressIndex, contactIndex) => {
    const contactsPath = `addresses[${addressIndex}].company_employees`;
    const contacts = getIn(formik.values, contactsPath) ?? [];
    formik.setFieldValue(
      contactsPath,
      contacts.filter((_, index) => index !== contactIndex),
      true,
    );
  };

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 pb-8">
      <section className="space-y-5">
        <PageBreadcrumb
          items={[
            { label: "Companies", href: "/companies" },
            { label: "Add company" },
          ]}
        />
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-primary">Business directory</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Add company
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the company profile, compliance details, primary contact, and registered address.
          </p>
        </div>
      </section>

      <div>
        <Card className="shadow-none">
          <CardHeader className="border-b">
            <CardTitle>Company profile</CardTitle>
            <CardDescription>Fields marked as required must be completed before saving.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-8" noValidate>
              <section className="space-y-5">
                <SectionHeading icon={Building2} title="Business information" description="Basic information used to identify your company." />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="company_name" label="Company name" error={errorFor("company_name")}>
                    <Input id="company_name" placeholder="e.g. Apex Industrial Solutions" autoComplete="organization" {...inputProps("company_name")} />
                  </Field>
                  <Field id="company_type" label="Company type" error={errorFor("company_type")}>
                    <Select
                      value={formik.values.company_type}
                      onValueChange={(value) => {
                        setSaveError(null);
                        formik.setFieldValue("company_type", value, true);
                      }}
                      onOpenChange={(open) => !open && formik.setFieldTouched("company_type", true, true)}
                    >
                      <SelectTrigger id="company_type" aria-invalid={Boolean(errorFor("company_type"))}>
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
                  <Field id="email" label="Business email" error={errorFor("email")}>
                    <Input id="email" type="email" placeholder="accounts@company.com" autoComplete="email" {...inputProps("email")} />
                  </Field>
                  <Field id="phone_number" label="Phone number" error={errorFor("phone_number")}>
                    <Input id="phone_number" type="tel" placeholder="+91 98765 43210" autoComplete="tel" {...inputProps("phone_number")} />
                  </Field>
                </div>
              </section>

              <section className="space-y-5">
                <SectionHeading icon={FileText} title="Tax & registration" description="Legal identifiers used for billing and compliance." />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="gst_number" label="GSTIN" error={errorFor("gst_number")}>
                    <Input id="gst_number" placeholder="22AAAAA0000A1Z5" className="uppercase" maxLength={15} {...inputProps("gst_number")} />
                  </Field>
                  <Field id="pan_number" label="PAN number" error={errorFor("pan_number")}>
                    <Input id="pan_number" placeholder="AAAAA0000A" className="uppercase" maxLength={10} {...inputProps("pan_number")} />
                  </Field>
                  <Field id="website" label="Website" optional error={errorFor("website")}>
                    <Input id="website" type="url" placeholder="www.company.com" autoComplete="url" {...inputProps("website")} />
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
                      <h3 className="font-semibold">Addresses & contact persons</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Add every company address and the contacts assigned to it.</p>
                    </div>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addAddress}>
                    <Plus className="size-4" />
                    Add address
                  </Button>
                </div>

                {typeof formik.errors.addresses === "string" && formik.touched.addresses && (
                  <p className="text-xs font-medium text-destructive">{formik.errors.addresses}</p>
                )}

                <div className="space-y-5">
                  {formik.values.addresses.map((address, addressIndex) => (
                    <div key={addressIndex} className="overflow-hidden rounded-xl border bg-card shadow-xs">
                      <div className="flex items-center justify-between gap-3 border-b bg-muted/40 px-4 py-3.5 sm:px-5">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background text-primary shadow-xs">
                            <MapPin className="size-4" />
                          </span>
                          <div className="min-w-0">
                            <h4 className="font-semibold">Address {addressIndex + 1}</h4>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {address.company_employees.length} {address.company_employees.length === 1 ? "contact person" : "contact persons"}
                            </p>
                          </div>
                        </div>
                        {formik.values.addresses.length > 1 && (
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeAddress(addressIndex)} aria-label={`Remove address ${addressIndex + 1}`} className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                            <Trash2 className="size-4" />
                          </Button>
                        )}
                      </div>

                      <div className="p-4 sm:p-5">
                        <div className="grid gap-5">
                          <Field id={`addresses[${addressIndex}].address`} label="Full address" error={errorFor(`addresses[${addressIndex}].address`)}>
                            <Textarea className="min-h-20 resize-y" id={`addresses[${addressIndex}].address`} placeholder="Building, street, area, city and state" autoComplete="street-address" {...inputProps(`addresses[${addressIndex}].address`)} />
                          </Field>
                          <Field id={`addresses[${addressIndex}].pincode`} label="PIN code" error={errorFor(`addresses[${addressIndex}].pincode`)}>
                            <Input id={`addresses[${addressIndex}].pincode`} inputMode="numeric" placeholder="380001" maxLength={6} autoComplete="postal-code" {...inputProps(`addresses[${addressIndex}].pincode`)} />
                          </Field>
                        </div>

                        <div className="mt-5 overflow-hidden rounded-lg border">
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/25 px-4 py-3">
                            <div className="flex items-center gap-2">
                              <ContactRound className="size-4 text-primary" />
                              <h5 className="text-sm font-semibold">Contact persons</h5>
                            </div>
                            <Button type="button" variant="outline" size="sm" onClick={() => addContact(addressIndex)} className="h-8 bg-background">
                              <Plus className="size-4" />
                              Add contact
                            </Button>
                          </div>

                          {typeof getIn(formik.errors, `addresses[${addressIndex}].company_employees`) === "string" && getIn(formik.touched, `addresses[${addressIndex}].company_employees`) && (
                            <p className="border-b bg-destructive/5 px-4 py-2 text-xs font-medium text-destructive">
                              {getIn(formik.errors, `addresses[${addressIndex}].company_employees`)}
                            </p>
                          )}

                          <div className="divide-y">
                            {address.company_employees.map((contact, contactIndex) => (
                              <div key={contactIndex} className="p-4">
                                <div className="mb-3 flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-2">
                                    <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                      {contactIndex + 1}
                                    </span>
                                    <p className="text-sm font-medium">Contact person</p>
                                  </div>
                                  <Button type="button" variant="ghost" size="icon" onClick={() => removeContact(addressIndex, contactIndex)} aria-label={`Remove contact ${contactIndex + 1}`} className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                                    <Trash2 className="size-4" />
                                  </Button>
                                </div>
                                <div className="grid gap-4 md:grid-cols-3">
                                  <Field id={`addresses[${addressIndex}].company_employees[${contactIndex}].contact_person_name`} label="Name" error={errorFor(`addresses[${addressIndex}].company_employees[${contactIndex}].contact_person_name`)}>
                                    <Input id={`addresses[${addressIndex}].company_employees[${contactIndex}].contact_person_name`} placeholder="Full name" autoComplete="name" {...inputProps(`addresses[${addressIndex}].company_employees[${contactIndex}].contact_person_name`)} />
                                  </Field>
                                  <Field id={`addresses[${addressIndex}].company_employees[${contactIndex}].contact_person_mobile_number`} label="Mobile number" error={errorFor(`addresses[${addressIndex}].company_employees[${contactIndex}].contact_person_mobile_number`)}>
                                    <Input id={`addresses[${addressIndex}].company_employees[${contactIndex}].contact_person_mobile_number`} type="tel" placeholder="+91 98765 43210" autoComplete="tel" {...inputProps(`addresses[${addressIndex}].company_employees[${contactIndex}].contact_person_mobile_number`)} />
                                  </Field>
                                  <Field id={`addresses[${addressIndex}].company_employees[${contactIndex}].contact_person_position`} label="Position" error={errorFor(`addresses[${addressIndex}].company_employees[${contactIndex}].contact_person_position`)}>
                                    <Select
                                      value={getIn(formik.values, `addresses[${addressIndex}].company_employees[${contactIndex}].contact_person_position`) ?? ""}
                                      onValueChange={(value) => {
                                        setSaveError(null);
                                        formik.setFieldValue(`addresses[${addressIndex}].company_employees[${contactIndex}].contact_person_position`, value, true);
                                      }}
                                      onOpenChange={(open) => !open && formik.setFieldTouched(`addresses[${addressIndex}].company_employees[${contactIndex}].contact_person_position`, true, true)}
                                    >
                                      <SelectTrigger id={`addresses[${addressIndex}].company_employees[${contactIndex}].contact_person_position`} aria-invalid={Boolean(errorFor(`addresses[${addressIndex}].company_employees[${contactIndex}].contact_person_position`))}>
                                        <SelectValue placeholder="Select position" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {CONTACT_POSITION_OPTIONS.map((position) => (
                                          <SelectItem key={position.value} value={position.value}>
                                            {position.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </Field>
                                </div>
                              </div>
                            ))}
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
                  className={saveError ? "text-xs font-medium text-destructive" : "text-xs text-muted-foreground"}
                >
                  {saveError ?? "The company will appear in the company table after saving."}
                </p>
                <Button type="submit" disabled={formik.isSubmitting || !formik.dirty} className="sm:min-w-36">
                  {formik.isSubmitting ? <LoaderCircle className="size-4 animate-spin" /> : <Save className="size-4" />}
                  {formik.isSubmitting ? "Saving..." : "Save company"}
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
