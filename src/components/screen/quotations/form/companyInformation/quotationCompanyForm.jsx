import { useRef } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { CREATE_QUOTATION_STEPS } from "@Enums";
import { toQuotationCompanyFormValues } from "@Redux/quotation/quotation-company-directory.api-response";
import { CREATE_QUOTATION_INITIAL_VALUES } from "@screenComponent/quotations/form/quotationForm.initialValues";
import { createQuotationValidationSchema } from "@screenComponent/quotations/form/quotationForm.validation.schema";
import {
  selectQuotationCompanySearch,
  selectQuotationSelectedCompany,
} from "@Redux/quotation/quotation.selector";
import {
  quotationCompanyInformationSaved,
  quotationCompanySearchChanged,
  quotationCompanySelected,
  quotationStepChanged,
} from "@Redux/quotation/quotation.slice";

import QuotationCompanyInformation from "@screenComponent/quotations/form/companyInformation";
import useCompanyKeyboardShortcuts from "@screenComponent/quotations/keyboardShortcuts/companyForm";

function QuotationCompanyForm() {
  const dispatch = useDispatch();
  const companySearch = useSelector(selectQuotationCompanySearch);
  const selectedCompany = useSelector(selectQuotationSelectedCompany);
  const companyInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const gstInputRef = useRef(null);
  const saveButtonRef = useRef(null);
  const companyDirectoryRef = useRef(null);
  const companyFieldRefs = {
    companyInputRef,
    addressInputRef,
    emailInputRef,
    phoneInputRef,
    gstInputRef,
    saveButtonRef,
    companyDirectoryRef,
  };
  const keyboard = useCompanyKeyboardShortcuts(companyFieldRefs);
  const formik = useFormik({
    initialValues: selectedCompany
      ? toQuotationCompanyFormValues(selectedCompany)
      : {
          ...CREATE_QUOTATION_INITIAL_VALUES,
          companyName: companySearch,
        },
    validationSchema: createQuotationValidationSchema,
    onSubmit: (values) => {
      dispatch(
        quotationCompanyInformationSaved(
          createQuotationValidationSchema.cast(values),
        ),
      );
      dispatch(quotationStepChanged(CREATE_QUOTATION_STEPS.PRODUCT_INFORMATION));
    },
  });

  const fieldError = (field) =>
    formik.touched[field] && formik.errors[field]
      ? formik.errors[field]
      : null;

  const changeCompanyName = (event) => {
    formik.handleChange(event);
    dispatch(quotationCompanySearchChanged(event.target.value));
  };

  const selectCompany = (company) => {
    const companyValues = toQuotationCompanyFormValues(company);

    dispatch(quotationCompanySelected(company));
    formik.setValues(
      {
        ...formik.values,
        ...companyValues,
      },
      true,
    );
    formik.setFieldTouched("companyName", true, false);

    window.requestAnimationFrame(() => {
      companyInputRef.current?.focus();
      companyInputRef.current?.setSelectionRange(
        companyValues.companyName.length,
        companyValues.companyName.length,
      );
    });
  };

  return (
    <QuotationCompanyInformation
      formik={formik}
      fieldError={fieldError}
      fieldRefs={companyFieldRefs}
      keyboard={keyboard}
      onCompanyNameChange={changeCompanyName}
      onCompanySelect={selectCompany}
    />
  );
}

export default QuotationCompanyForm;
