import QuotationCompanyDirectory from "@screenComponent/quotations/form/companyInformation/companyDirectory";
import QuotationCompanyInformationCard from "@screenComponent/quotations/form/companyInformation/quotationCompanyInformationCard";

function QuotationCompanyInformation({
  formik,
  fieldError,
  fieldRefs,
  keyboard,
  showAddressFormatGuide,
  onCompanyNameChange,
  onCompanySelect,
  onCompanyClear,
}) {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="grid w-full gap-6 lg:h-full lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.8fr)]"
      noValidate
    >
      <QuotationCompanyInformationCard
        companyInputRef={fieldRefs.companyInputRef}
        addressInputRef={fieldRefs.addressInputRef}
        emailInputRef={fieldRefs.emailInputRef}
        phoneInputRef={fieldRefs.phoneInputRef}
        gstInputRef={fieldRefs.gstInputRef}
        saveButtonRef={fieldRefs.saveButtonRef}
        formik={formik}
        fieldError={fieldError}
        showAddressFormatGuide={showAddressFormatGuide}
        onCompanyNameChange={onCompanyNameChange}
        onCompanySelect={onCompanySelect}
        onCompanyClear={onCompanyClear}
        onCompanyNameFocus={keyboard.handleCompanyNameFocus}
        onCompanyNameKeyDown={keyboard.handleCompanyNameKeyDown}
        onAddressKeyDown={keyboard.handleAddressKeyDown}
        onEmailKeyDown={keyboard.handleEmailKeyDown}
        onPhoneKeyDown={keyboard.handlePhoneKeyDown}
        onGstKeyDown={keyboard.handleGstKeyDown}
        onSaveKeyDown={keyboard.handleSaveKeyDown}
      />
      <QuotationCompanyDirectory
        directoryRef={fieldRefs.companyDirectoryRef}
        onCompanySelect={onCompanySelect}
        onCompanyOptionKeyDown={keyboard.handleCompanyOptionKeyDown}
      />
    </form>
  );
}

export default QuotationCompanyInformation;
