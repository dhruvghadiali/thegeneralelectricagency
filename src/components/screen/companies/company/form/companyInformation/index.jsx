import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { COMPANY_INFORMATION_INITIAL_VALUES } from "@Forms/company/companyInformation/companyInformation.initialValues";
import FormErrorAlert from "@commonComponent/alert/formErrorAlert";
import { ROUTES } from "@routes/navigate";
import { createCompany } from "@Redux/company/createCompany/createCompany.action";
import { selectCompanyCreateSubmitState } from "@Redux/company/createCompany/createCompany.selector";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import { Textarea } from "@shadcnComponent/textarea";

import CompanyInformationField from "@screenComponent/companies/company/form/companyInformation/companyInformationField";
import CompanyStateSelect from "@screenComponent/companies/company/form/companyInformation/companyStateSelect";
import CompanyTypeSelect from "@screenComponent/companies/company/form/companyInformation/companyTypeSelect";
import { companyInformationValidationSchema } from "@screenComponent/companies/company/form/companyInformation/companyInformation.validation.schema";

function CompanyInformation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCreateCompanySubmitting, createCompanyError } = useSelector(
    selectCompanyCreateSubmitState,
  );

  const formik = useFormik({
    initialValues: COMPANY_INFORMATION_INITIAL_VALUES,
    validationSchema: companyInformationValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(createCompany(values)).unwrap();
        navigate(ROUTES.COMPANIES, { replace: true });
      } catch {
        // The create-company slice exposes the display-ready request error.
      } finally {
        setSubmitting(false);
      }
    },
  });
  const isSubmitting = formik.isSubmitting || isCreateCompanySubmitting;
  const fieldError = (field) =>
    formik.touched[field] && formik.errors[field] ? formik.errors[field] : null;
  const inputProps = (field, id) => ({
    name: field,
    value: formik.values[field],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    "aria-invalid": Boolean(fieldError(field)),
    "aria-describedby": fieldError(field) ? `${id}-error` : undefined,
  });

  return (
    <form
      className="flex h-full min-h-0 flex-col pl-1"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <FormErrorAlert message={createCompanyError} />

      <section className="min-h-0 flex-1 space-y-5 overflow-y-auto pb-4 pl-1 pr-1">
        <div className="grid gap-5 sm:grid-cols-2">
          <CompanyInformationField
            id="company-name"
            label="Company name"
            required
            error={fieldError("companyName")}
          >
            <Input
              id="company-name"
              {...inputProps("companyName", "company-name")}
              placeholder="e.g. Apex Industrial Solutions"
              autoComplete="organization"
            />
          </CompanyInformationField>

          <CompanyInformationField
            id="company-type"
            label="Company type"
            required
            error={fieldError("companyType")}
          >
            <CompanyTypeSelect
              formik={formik}
              error={fieldError("companyType")}
            />
          </CompanyInformationField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <CompanyInformationField
            id="company-email"
            label="Email"
            error={fieldError("email")}
          >
            <Input
              id="company-email"
              {...inputProps("email", "company-email")}
              type="email"
              placeholder="accounts@company.com"
              autoComplete="email"
            />
          </CompanyInformationField>

          <CompanyInformationField
            id="company-phone-number"
            label="Phone number"
            error={fieldError("phoneNumber")}
          >
            <Input
              id="company-phone-number"
              {...inputProps("phoneNumber", "company-phone-number")}
              type="tel"
              placeholder="+91 98765 43210"
              autoComplete="tel"
            />
          </CompanyInformationField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <CompanyInformationField
            id="company-gst-number"
            label="GST number"
            error={fieldError("gstNumber")}
          >
            <Input
              id="company-gst-number"
              {...inputProps("gstNumber", "company-gst-number")}
              placeholder="22AAAAA0000A1Z5"
              className="uppercase"
              maxLength={15}
            />
          </CompanyInformationField>

          <CompanyInformationField
            id="company-pan-number"
            label="PAN number"
            error={fieldError("panNumber")}
          >
            <Input
              id="company-pan-number"
              {...inputProps("panNumber", "company-pan-number")}
              placeholder="AAAAA0000A"
              className="uppercase"
              maxLength={10}
            />
          </CompanyInformationField>
        </div>

        <CompanyInformationField
          id="company-website"
          label="Website"
          error={fieldError("website")}
        >
          <Input
            id="company-website"
            {...inputProps("website", "company-website")}
            type="url"
            placeholder="https://www.company.com"
            autoComplete="url"
          />
        </CompanyInformationField>

        <CompanyInformationField
          id="company-address"
          label="Address"
          required
          error={fieldError("address")}
        >
          <Textarea
            id="company-address"
            {...inputProps("address", "company-address")}
            placeholder="Building, street, area and city"
            autoComplete="street-address"
            rows={4}
          />
        </CompanyInformationField>

        <div className="grid gap-5 sm:grid-cols-2">
          <CompanyInformationField
            id="company-state"
            label="State"
            required
            error={fieldError("state")}
          >
            <CompanyStateSelect
              formik={formik}
              error={fieldError("state")}
            />
          </CompanyInformationField>

          <CompanyInformationField
            id="company-pincode"
            label="Pincode"
            required
            error={fieldError("pincode")}
          >
            <Input
              id="company-pincode"
              {...inputProps("pincode", "company-pincode")}
              inputMode="numeric"
              placeholder="380001"
              maxLength={6}
              autoComplete="postal-code"
            />
          </CompanyInformationField>
        </div>
      </section>

      <div className="flex shrink-0 flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          disabled={isSubmitting}
          onClick={() => navigate(ROUTES.COMPANIES)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add company"}
        </Button>
      </div>
    </form>
  );
}

export default CompanyInformation;
