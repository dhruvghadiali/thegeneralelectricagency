import { Button } from "@shadcnComponent/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";

import CompanyAddressesSection from "@Forms/company/companyDetails/components/companyAddressesSection";
import CompanyFormActions from "@Forms/company/companyDetails/components/companyFormActions";
import CompanyProfileSections from "@Forms/company/companyDetails/components/companyProfileSections";
import { useCompanyDetailsForm } from "@Forms/company/companyDetails/hooks/useCompanyDetailsForm";

function CompanyUnavailable({ onCancel }) {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-5 pb-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        Company details unavailable
      </h1>
      <p className="text-sm text-muted-foreground">
        Return to the company directory and select Edit on the company again.
      </p>
      <Button onClick={onCancel}>Back to companies</Button>
    </main>
  );
}

function CompanyDetailsForm(props) {
  const { company, isEditing, onCancel } = props;
  const form = useCompanyDetailsForm(props);

  if (isEditing && !company) {
    return <CompanyUnavailable onCancel={onCancel} />;
  }

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

      <Card className="shadow-none">
        <CardHeader className="border-b">
          <CardTitle>Company profile</CardTitle>
          <CardDescription>
            Fields marked as required must be completed before saving.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.formik.handleSubmit}
            className="space-y-8"
            noValidate
          >
            <CompanyProfileSections form={form} />
            <CompanyAddressesSection form={form} isEditing={isEditing} />
            <CompanyFormActions form={form} isEditing={isEditing} />
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default CompanyDetailsForm;
