import { useCallback } from "react";

function useCompanyNameKeyboardShortcut({
  addressInputRef,
  companyDirectoryRef,
}) {
  const handleCompanyNameFocus = useCallback((event) => {
    const input = event.currentTarget;

    window.requestAnimationFrame(() => {
      if (document.activeElement !== input) return;

      const lastCharacterPosition = input.value.length;
      input.setSelectionRange(lastCharacterPosition, lastCharacterPosition);
    });
  }, []);

  const handleCompanyNameKeyDown = useCallback(
    (event) => {
      if (event.altKey && event.key === "ArrowRight") {
        event.preventDefault();
        const selectedCompany = companyDirectoryRef.current?.querySelector(
          '[data-company-option][aria-selected="true"]',
        );
        const firstCompany = companyDirectoryRef.current?.querySelector(
          "[data-company-option]",
        );

        (selectedCompany ?? firstCompany)?.focus();
        return;
      }

      const shouldFocusAddress =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusAddress) return;

      event.preventDefault();
      addressInputRef.current?.focus();
    },
    [addressInputRef, companyDirectoryRef],
  );

  return { handleCompanyNameFocus, handleCompanyNameKeyDown };
}

export default useCompanyNameKeyboardShortcut;
