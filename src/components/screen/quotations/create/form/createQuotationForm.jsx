import { useRef } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import {
  selectQuotationCompanyInformation,
  selectQuotationCompanySearch,
  selectQuotationCurrentStep,
  selectQuotationSelectedCompany,
} from "@Redux/quotation/quotation.selector";
import {
  quotationCompanyInformationSaved,
  quotationCompanySearchChanged,
  quotationCompanySelected,
  quotationStepChanged,
} from "@Redux/quotation/quotation.slice";
import { CREATE_QUOTATION_STEPS } from "@Enums";
import { toQuotationCompanyFormValues } from "@screenComponent/quotations/create/form/createQuotation-frontend.payload";
import { CREATE_QUOTATION_INITIAL_VALUES } from "@screenComponent/quotations/create/form/createQuotation.initialValues";
import { createQuotationValidationSchema } from "@screenComponent/quotations/create/form/createQuotation.validation.schema";

import useCompanyKeyboardShortcuts from "@screenComponent/quotations/create/hooks/company";
import QuotationCompanyInformation from "@screenComponent/quotations/create/companyInformation";
import QuotationProductInformation from "@screenComponent/quotations/create/productInformation";
import QuotationSummary from "@screenComponent/quotations/create/quotationSummary";

function CreateQuotationForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectQuotationCurrentStep);
  const companyInformation = useSelector(selectQuotationCompanyInformation);
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

  const quotationStepComponents = {
    [CREATE_QUOTATION_STEPS.COMPANY_INFORMATION]: (
      <QuotationCompanyInformation
        formik={formik}
        fieldError={fieldError}
        fieldRefs={companyFieldRefs}
        keyboard={keyboard}
        onCompanyNameChange={changeCompanyName}
        onCompanySelect={selectCompany}
      />
    ),
    [CREATE_QUOTATION_STEPS.PRODUCT_INFORMATION]: (
      <QuotationProductInformation companyInformation={companyInformation} />
    ),
    [CREATE_QUOTATION_STEPS.QUOTATION_SUMMARY]: <QuotationSummary />,
  };

  return quotationStepComponents[currentStep];
}

export default CreateQuotationForm;
