import { useRef } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { CREATE_QUOTATION_STEPS } from "@Enums";
import { toQuotationCompanyFormValues } from "@Redux/quotation/quotation-company-directory.api-response";
import { CREATE_QUOTATION_INITIAL_VALUES } from "@screenComponent/quotations/form/quotationForm.initialValues";
import { createQuotationValidationSchema } from "@screenComponent/quotations/form/quotationForm.validation.schema";
import {
  selectQuotationCompanySearch,
  selectQuotationPendingUnsavedCompanyInformation,
  selectQuotationSelectedCompany,
} from "@Redux/quotation/quotation.selector";
import {
  quotationCompanyInformationSaved,
  quotationCompanySearchChanged,
  quotationCompanySelected,
  quotationStepChanged,
  quotationUnsavedCompanyConfirmationClosed,
  quotationUnsavedCompanyConfirmationRequested,
} from "@Redux/quotation/quotation.slice";

import QuotationCompanyInformation from "@screenComponent/quotations/form/companyInformation";
import useCompanyKeyboardShortcuts from "@screenComponent/quotations/keyboardShortcuts/companyForm";
import QuotationUnsavedCompanyDialog from "@screenComponent/quotations/dialogs/quotationUnsavedCompanyDialog";

function QuotationCompanyForm() {
  const dispatch = useDispatch();
  const companySearch = useSelector(selectQuotationCompanySearch);
  const selectedCompany = useSelector(selectQuotationSelectedCompany);
  const pendingCompanyInformation = useSelector(
    selectQuotationPendingUnsavedCompanyInformation,
  );
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

  const saveCompanyInformation = (companyInformation) => {
    dispatch(quotationCompanyInformationSaved(companyInformation));
    dispatch(quotationStepChanged(CREATE_QUOTATION_STEPS.PRODUCT_INFORMATION));
  };
  
  const formik = useFormik({
    initialValues: selectedCompany
      ? toQuotationCompanyFormValues(selectedCompany)
      : {
          ...CREATE_QUOTATION_INITIAL_VALUES,
          companyName: companySearch,
        },
    validationSchema: createQuotationValidationSchema,
    onSubmit: (values) => {
      const companyInformation = createQuotationValidationSchema.cast(values);

      if (!selectedCompany?.id) {
        dispatch(
          quotationUnsavedCompanyConfirmationRequested(companyInformation),
        );
        return;
      }

      saveCompanyInformation(companyInformation);
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

  const selectCompany = (company, { focusInput = true } = {}) => {
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

    if (focusInput) {
      window.requestAnimationFrame(() => {
        companyInputRef.current?.focus();
        companyInputRef.current?.setSelectionRange(
          companyValues.companyName.length,
          companyValues.companyName.length,
        );
      });
    }
  };
  const clearCompany = () => {
    dispatch(quotationCompanySelected(null));
    formik.resetForm({ values: { ...CREATE_QUOTATION_INITIAL_VALUES } });
  };
  const cancelUnsavedCompany = () => {
    dispatch(quotationUnsavedCompanyConfirmationClosed());
  };
  const proceedWithUnsavedCompany = () => {
    if (!pendingCompanyInformation) return;

    const companyInformation = pendingCompanyInformation;

    saveCompanyInformation(companyInformation);
  };

  return (
    <>
      <QuotationCompanyInformation
        formik={formik}
        fieldError={fieldError}
        fieldRefs={companyFieldRefs}
        keyboard={keyboard}
        onCompanyNameChange={changeCompanyName}
        onCompanySelect={selectCompany}
        onCompanyClear={clearCompany}
      />
      <QuotationUnsavedCompanyDialog
        companyName={pendingCompanyInformation?.companyName}
        open={Boolean(pendingCompanyInformation)}
        onCancel={cancelUnsavedCompany}
        onProceed={proceedWithUnsavedCompany}
      />
    </>
  );
}

export default QuotationCompanyForm;
