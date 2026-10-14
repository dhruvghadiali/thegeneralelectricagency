import useCompanyAddressKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/companyForm/useCompanyAddressKeyboardShortcut";
import useCompanyDirectoryKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/companyForm/useCompanyDirectoryKeyboardShortcut";
import useCompanyEmailKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/companyForm/useCompanyEmailKeyboardShortcut";
import useCompanyGstKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/companyForm/useCompanyGstKeyboardShortcut";
import useCompanyNameKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/companyForm/useCompanyNameKeyboardShortcut";
import useCompanyPhoneKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/companyForm/useCompanyPhoneKeyboardShortcut";
import useCompanySaveKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/companyForm/useCompanySaveKeyboardShortcut";

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
