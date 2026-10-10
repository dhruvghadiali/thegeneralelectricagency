import { useCallback } from "react";

function useCompanyDirectoryKeyboardShortcut({
  companyInputRef,
  companyDirectoryRef,
}) {
  return useCallback(
    (event, currentIndex) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        companyInputRef.current?.focus();
        return;
      }

      const direction =
        event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
      if (direction === 0) return;

      event.preventDefault();
      const companyOptions = Array.from(
        companyDirectoryRef.current?.querySelectorAll(
          "[data-company-option]",
        ) ?? [],
      );
      if (companyOptions.length === 0) return;

      const nextIndex =
        (currentIndex + direction + companyOptions.length) %
        companyOptions.length;
      companyOptions[nextIndex]?.focus();
    },
    [companyDirectoryRef, companyInputRef],
  );
}

export default useCompanyDirectoryKeyboardShortcut;
