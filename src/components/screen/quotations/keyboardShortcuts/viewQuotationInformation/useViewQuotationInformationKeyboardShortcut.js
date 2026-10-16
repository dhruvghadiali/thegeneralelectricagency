import { useCallback, useEffect, useMemo, useRef } from "react";

import { isDesktopKeyboardEnabled } from "@keyboard/keyboard.utils";
import { addQuotationKeyboardListener } from "@screenComponent/quotations/keyboardShortcuts/shared/quotationKeyboardListener";

function useViewQuotationInformationKeyboardShortcut({
  quotation,
  openSection,
  onCloseSection,
  onBack,
}) {
  const companyRef = useRef(null);
  const currentRef = useRef(null);
  const historyRef = useRef(null);
  const historyEntryRefs = useRef([]);
  const sectionRefs = useMemo(
    () => [companyRef, currentRef, historyRef],
    [],
  );

  useEffect(() => {
    if (!quotation || !isDesktopKeyboardEnabled()) return;

    companyRef.current?.focus({ preventScroll: true });
  }, [quotation]);

  useEffect(() => {
    const handleBackShortcut = (event) => {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.key !== "Escape"
      ) {
        return;
      }

      event.preventDefault();
      onBack();
    };

    return addQuotationKeyboardListener(handleBackShortcut);
  }, [onBack]);

  const handleSectionNavigation = useCallback(
    (event) => {
      if (!isDesktopKeyboardEnabled()) return;

      const isTab = event.key === "Tab";
      const isPreviousKey =
        event.key === "Backspace" || event.key === "Delete";

      if (!isTab && !isPreviousKey) return;

      const sectionElement = event.target.closest?.("[data-section-index]");
      const currentIndex = Number(sectionElement?.dataset.sectionIndex);
      if (!Number.isInteger(currentIndex)) return;

      if (isPreviousKey) {
        event.preventDefault();

        if (currentIndex === 1) companyRef.current?.focus();
        if (currentIndex === 2) currentRef.current?.focus();
        return;
      }

      event.preventDefault();

      if (event.shiftKey) {
        const previousIndex =
          (currentIndex - 1 + sectionRefs.length) % sectionRefs.length;
        sectionRefs[previousIndex].current?.focus();
        return;
      }

      if (currentIndex === 2) {
        const firstHistoryEntry = historyEntryRefs.current[0];

        if (openSection === "history" && firstHistoryEntry) {
          firstHistoryEntry.focus();
        } else {
          companyRef.current?.focus();
        }
        return;
      }

      sectionRefs[currentIndex + 1].current?.focus();
    },
    [openSection, sectionRefs],
  );

  const moveBeforeHistory = useCallback(() => {
    if (!isDesktopKeyboardEnabled()) return;

    currentRef.current?.focus();
  }, []);

  const moveAfterHistory = useCallback(() => {
    if (!isDesktopKeyboardEnabled()) return;

    onCloseSection();
    window.requestAnimationFrame(() => companyRef.current?.focus());
  }, [onCloseSection]);

  return {
    companyRef,
    currentRef,
    handleSectionNavigation,
    historyEntryRefs,
    historyRef,
    moveAfterHistory,
    moveBeforeHistory,
  };
}

export default useViewQuotationInformationKeyboardShortcut;
