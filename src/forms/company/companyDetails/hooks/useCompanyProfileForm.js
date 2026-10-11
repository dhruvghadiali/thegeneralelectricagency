import { useMemo } from "react";
import { getIn, useFormik } from "formik";

import { toCompanyFormValues } from "@Forms/company/companyDetails/companyDetails-frontend.payload";
import { mutationErrorMessage } from "@Forms/company/companyDetails/companyDetails.helpers";
import { COMPANY_DETAILS_INITIAL_VALUES } from "@Forms/company/companyDetails/companyDetails.initialValues";
import { companyDetailsValidationSchema } from "@Forms/company/companyDetails/companyDetails.validation.schema";

const COMPANY_SAVE_FALLBACK = "Unable to save the company. Please try again.";

/** Owns only the Formik model, validation, and profile submission. */
export function useCompanyProfileForm({ company, isEditing, onSubmit, setSaveError }) {
  const initialValues = useMemo(
    () => toCompanyFormValues(isEditing ? company : null),
    [company, isEditing],
  );

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: companyDetailsValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const details = companyDetailsValidationSchema.cast(values);
        await onSubmit(details);
        if (!isEditing) {
          helpers.resetForm({ values: COMPANY_DETAILS_INITIAL_VALUES });
        }
      } catch (error) {
        Object.entries(error?.fieldErrors ?? {}).forEach(([field, message]) => {
          helpers.setFieldError(field, message);
          helpers.setFieldTouched(field, true, false);
        });
        setSaveError(mutationErrorMessage(error, COMPANY_SAVE_FALLBACK));
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

  return { formik, errorFor, inputProps };
}

export default useCompanyProfileForm;
