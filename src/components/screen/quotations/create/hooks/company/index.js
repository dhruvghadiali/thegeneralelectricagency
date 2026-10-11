import useCompanyAddressKeyboardShortcut from "@screenComponent/quotations/create/hooks/company/useCompanyAddressKeyboardShortcut";
import useCompanyDirectoryKeyboardShortcut from "@screenComponent/quotations/create/hooks/company/useCompanyDirectoryKeyboardShortcut";
import useCompanyEmailKeyboardShortcut from "@screenComponent/quotations/create/hooks/company/useCompanyEmailKeyboardShortcut";
import useCompanyGstKeyboardShortcut from "@screenComponent/quotations/create/hooks/company/useCompanyGstKeyboardShortcut";
import useCompanyNameKeyboardShortcut from "@screenComponent/quotations/create/hooks/company/useCompanyNameKeyboardShortcut";
import useCompanyPhoneKeyboardShortcut from "@screenComponent/quotations/create/hooks/company/useCompanyPhoneKeyboardShortcut";
import useCompanySaveKeyboardShortcut from "@screenComponent/quotations/create/hooks/company/useCompanySaveKeyboardShortcut";

function useCompanyKeyboardShortcuts({
  companyInputRef,
  addressInputRef,
  emailInputRef,
  phoneInputRef,
  gstInputRef,
  saveButtonRef,
  companyDirectoryRef,
}) {
  const companyNameKeyboard = useCompanyNameKeyboardShortcut({
    addressInputRef,
    companyDirectoryRef,
  });
  const handleAddressKeyDown = useCompanyAddressKeyboardShortcut({
    companyInputRef,
    emailInputRef,
  });
  const handleCompanyOptionKeyDown = useCompanyDirectoryKeyboardShortcut({
    companyInputRef,
    companyDirectoryRef,
  });
  const handleEmailKeyDown = useCompanyEmailKeyboardShortcut({
    addressInputRef,
    phoneInputRef,
  });
  const handlePhoneKeyDown = useCompanyPhoneKeyboardShortcut({
    emailInputRef,
    gstInputRef,
  });
  const handleGstKeyDown = useCompanyGstKeyboardShortcut({
    phoneInputRef,
    saveButtonRef,
  });
  const handleSaveKeyDown = useCompanySaveKeyboardShortcut({
    companyInputRef,
    gstInputRef,
  });

  return {
    ...companyNameKeyboard,
    handleAddressKeyDown,
    handleCompanyOptionKeyDown,
    handleEmailKeyDown,
    handlePhoneKeyDown,
    handleGstKeyDown,
    handleSaveKeyDown,
  };
}

export default useCompanyKeyboardShortcuts;
