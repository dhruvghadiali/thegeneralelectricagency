import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isAltShortcut } from "@keyboard/keyboard.utils";
import { ROUTES } from "@routes/navigate";
import { addQuotationKeyboardListener } from "@screenComponent/quotations/keyboardShortcuts/shared/quotationKeyboardListener";

function useQuotationKeyboardShortcut(newQuotationButtonRef) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleQuotationShortcut = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        navigate(ROUTES.DASHBOARD);
        return;
      }

      if (!isAltShortcut(event, "n")) return;

      event.preventDefault();
      newQuotationButtonRef.current?.click();
    };

    return addQuotationKeyboardListener(handleQuotationShortcut);
  }, [navigate, newQuotationButtonRef]);
}

export default useQuotationKeyboardShortcut;
