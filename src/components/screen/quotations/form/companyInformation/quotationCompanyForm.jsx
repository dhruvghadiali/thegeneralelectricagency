import { useMemo, useRef } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { CREATE_QUOTATION_STEPS } from "@Enums";
import { toQuotationCompanyFormValues } from "@Redux/quotation/quotation-company-directory.api-response";
import { CREATE_QUOTATION_INITIAL_VALUES } from "@screenComponent/quotations/form/quotationForm.initialValues";
import { CREATE_QUOTATION_NEW_COMPANY_ADDRESS_PATTERN } from "@screenComponent/quotations/form/quotationForm.validation.constants";
import { createQuotationValidationSchema } from "@screenComponent/quotations/form/quotationForm.validation.schema";
import {
  selectQuotationCompanyInformation,
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
  const savedCompanyInformation = useSelector(
    selectQuotationCompanyInformation,
  );
  const companySearch = useSelector(selectQuotationCompanySearch);
  const selectedCompany = useSelector(selectQuotationSelectedCompany);
  const pendingCompanyInformation = useSelector(
    selectQuotationPendingUnsavedCompanyInformation,
  );
  const isUnsavedCompany = !selectedCompany?.id;
  const companyValidationSchema = useMemo(
    () =>
      createQuotationValidationSchema({
        requireFormattedAddress: isUnsavedCompany,
      }),
    [isUnsavedCompany],
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
    initialValues: savedCompanyInformation
      ? {
          ...CREATE_QUOTATION_INITIAL_VALUES,
          ...savedCompanyInformation,
        }
      : selectedCompany
        ? toQuotationCompanyFormValues(selectedCompany)
        : {
            ...CREATE_QUOTATION_INITIAL_VALUES,
            companyName: companySearch,
          },
    validationSchema: companyValidationSchema,
    onSubmit: (values) => {
      const companyInformation = companyValidationSchema.cast(values);

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
    formik.touched[field] && formik.errors[field] ? formik.errors[field] : null;

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
  const hasValidUnsavedCompanyAddress =
    CREATE_QUOTATION_NEW_COMPANY_ADDRESS_PATTERN.test(
      formik.values.address.trim(),
    );
  const showAddressFormatGuide = Boolean(
    formik.values.companyName.trim() &&
      isUnsavedCompany &&
      !hasValidUnsavedCompanyAddress,
  );

  return (
    <>
      <QuotationCompanyInformation
        formik={formik}
        fieldError={fieldError}
        fieldRefs={companyFieldRefs}
        keyboard={keyboard}
        showAddressFormatGuide={showAddressFormatGuide}
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
