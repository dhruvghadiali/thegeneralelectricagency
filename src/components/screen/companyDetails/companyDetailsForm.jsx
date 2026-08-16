import { useState } from "react";
import { useFormik } from "formik";
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  ContactRound,
  FileText,
  LoaderCircle,
  MapPin,
  Save,
  ShieldCheck,
} from "lucide-react";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { COMPANY_DETAILS_INITIAL_VALUES } from "@/forms/company/company-details.initialValues";
import { companyDetailsValidationSchema } from "@/forms/company/company-details.validation.schema";

const COMPANY_TYPES = [
  "Private Limited",
  "Public Limited",
  "Partnership",
  "Limited Liability Partnership",
  "Proprietorship",
  "Other",
];

function getStorageKey(username) {
  return `employee-company-details:${username ?? "unknown"}`;
}

function readSavedCompany(username) {
  try {
    return JSON.parse(localStorage.getItem(getStorageKey(username)) ?? "null");
  } catch {
    return null;
  }
}

function Field({ id, label, error, optional = false, children }) {
  return (
    <div className="grid gap-2">
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

function SectionHeading({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3 border-b pb-4">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function CompanyDetailsForm() {
  const username = useSelector((state) => state.auth.username);
  const savedCompany = readSavedCompany(username);
  const [savedAt, setSavedAt] = useState(savedCompany?.savedAt ?? null);
  const [showSuccess, setShowSuccess] = useState(false);

  const formik = useFormik({
    initialValues: { ...COMPANY_DETAILS_INITIAL_VALUES, ...savedCompany?.details },
    validationSchema: companyDetailsValidationSchema,
    onSubmit: async (values, helpers) => {
      const details = companyDetailsValidationSchema.cast(values);
      const timestamp = new Date().toISOString();

      localStorage.setItem(
        getStorageKey(username),
        JSON.stringify({ details, savedAt: timestamp }),
      );
      setSavedAt(timestamp);
      setShowSuccess(true);
      helpers.resetForm({ values: details });
    },
  });

  const errorFor = (name) =>
    formik.touched[name] && formik.errors[name] ? formik.errors[name] : null;

  const inputProps = (name) => ({
    name,
    value: formik.values[name],
    onChange: (event) => {
      setShowSuccess(false);
      formik.handleChange(event);
    },
    onBlur: formik.handleBlur,
    "aria-invalid": Boolean(errorFor(name)),
    "aria-describedby": errorFor(name) ? `${name}-error` : undefined,
  });

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 pb-8">
      <section className="overflow-hidden rounded-2xl border bg-gradient-to-br from-primary via-primary to-primary/85 px-5 py-6 text-primary-foreground shadow-sm sm:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/20">
              <ShieldCheck className="size-3.5" />
              Employee workspace
            </div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Add your company details
            </h2>
            <p className="mt-2 text-sm leading-6 text-primary-foreground/75">
              Complete the company profile once so your business information is ready for orders, invoices, and account verification.
            </p>
          </div>
          <div className="hidden rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 sm:block">
            <Building2 className="size-10" aria-hidden="true" />
          </div>
        </div>
      </section>

      {showSuccess && (
        <div role="status" className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
          <div>
            <p className="text-sm font-semibold">Company details saved</p>
            <p className="mt-0.5 text-sm text-emerald-800">Your company profile has been updated successfully.</p>
          </div>
        </div>
      )}

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
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
                  <Field id="companyName" label="Company name" error={errorFor("companyName")}>
                    <Input id="companyName" placeholder="e.g. Apex Industrial Solutions" autoComplete="organization" {...inputProps("companyName")} />
                  </Field>
                  <Field id="companyType" label="Company type" error={errorFor("companyType")}>
                    <Select
                      value={formik.values.companyType}
                      onValueChange={(value) => {
                        setShowSuccess(false);
                        formik.setFieldValue("companyType", value, true);
                      }}
                      onOpenChange={(open) => !open && formik.setFieldTouched("companyType", true, true)}
                    >
                      <SelectTrigger id="companyType" aria-invalid={Boolean(errorFor("companyType"))}>
                        <SelectValue placeholder="Select company type" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMPANY_TYPES.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field id="industry" label="Industry" error={errorFor("industry")}>
                    <Input id="industry" placeholder="e.g. Industrial manufacturing" {...inputProps("industry")} />
                  </Field>
                  <Field id="website" label="Website" optional error={errorFor("website")}>
                    <Input id="website" type="url" placeholder="www.company.com" autoComplete="url" {...inputProps("website")} />
                  </Field>
                </div>
              </section>

              <section className="space-y-5">
                <SectionHeading icon={FileText} title="Tax & registration" description="Legal identifiers used for billing and compliance." />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="gstNumber" label="GSTIN" error={errorFor("gstNumber")}>
                    <Input id="gstNumber" placeholder="22AAAAA0000A1Z5" className="uppercase" maxLength={15} {...inputProps("gstNumber")} />
                  </Field>
                  <Field id="panNumber" label="PAN number" error={errorFor("panNumber")}>
                    <Input id="panNumber" placeholder="AAAAA0000A" className="uppercase" maxLength={10} {...inputProps("panNumber")} />
                  </Field>
                </div>
              </section>

              <section className="space-y-5">
                <SectionHeading icon={ContactRound} title="Primary contact" description="Who should we contact about this company account?" />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="contactName" label="Contact person" error={errorFor("contactName")}>
                    <Input id="contactName" placeholder="Full name" autoComplete="name" {...inputProps("contactName")} />
                  </Field>
                  <Field id="contactDesignation" label="Designation" optional error={errorFor("contactDesignation")}>
                    <Input id="contactDesignation" placeholder="e.g. Purchase manager" autoComplete="organization-title" {...inputProps("contactDesignation")} />
                  </Field>
                  <Field id="email" label="Business email" error={errorFor("email")}>
                    <Input id="email" type="email" placeholder="accounts@company.com" autoComplete="email" {...inputProps("email")} />
                  </Field>
                  <Field id="phone" label="Phone number" error={errorFor("phone")}>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" autoComplete="tel" {...inputProps("phone")} />
                  </Field>
                </div>
              </section>

              <section className="space-y-5">
                <SectionHeading icon={MapPin} title="Registered address" description="The official address associated with the company." />
                <Field id="addressLine" label="Street address" error={errorFor("addressLine")}>
                  <Textarea id="addressLine" placeholder="Building, street, area or landmark" autoComplete="street-address" {...inputProps("addressLine")} />
                </Field>
                <div className="grid gap-5 sm:grid-cols-3">
                  <Field id="city" label="City" error={errorFor("city")}>
                    <Input id="city" placeholder="Ahmedabad" autoComplete="address-level2" {...inputProps("city")} />
                  </Field>
                  <Field id="state" label="State" error={errorFor("state")}>
                    <Input id="state" placeholder="Gujarat" autoComplete="address-level1" {...inputProps("state")} />
                  </Field>
                  <Field id="postalCode" label="PIN code" error={errorFor("postalCode")}>
                    <Input id="postalCode" inputMode="numeric" placeholder="380001" maxLength={6} autoComplete="postal-code" {...inputProps("postalCode")} />
                  </Field>
                </div>
              </section>

              <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  {savedAt ? `Last saved ${new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(savedAt))}` : "Your progress is saved when you submit this form."}
                </p>
                <Button type="submit" disabled={formik.isSubmitting || !formik.dirty} className="sm:min-w-36">
                  {formik.isSubmitting ? <LoaderCircle className="size-4 animate-spin" /> : <Save className="size-4" />}
                  {formik.isSubmitting ? "Saving..." : savedAt ? "Save changes" : "Save company"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <aside className="space-y-4 lg:sticky lg:top-0">
          <Card className="gap-4 border-primary/15 bg-primary/[0.035] shadow-none">
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BadgeCheck className="size-5" />
              </div>
              <CardTitle className="text-base">Why we need this</CardTitle>
              <CardDescription className="leading-6">Accurate details help us verify your business and prepare compliant documents.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {["Faster order processing", "Correct GST invoices", "Reliable account communication"].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="rounded-xl border bg-card p-4 text-xs leading-5 text-muted-foreground">
            <div className="flex items-center gap-2 font-medium text-foreground">
              <ShieldCheck className="size-4 text-primary" />
              Employee-only access
            </div>
            <p className="mt-2">This form is available only to signed-in employees. Other roles are redirected to their dashboard.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default CompanyDetailsForm;
