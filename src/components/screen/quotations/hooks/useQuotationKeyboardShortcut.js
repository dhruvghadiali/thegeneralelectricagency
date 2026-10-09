import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isAltShortcut } from "@keyboard/keyboard.utils";
import { ROUTES } from "@routes/navigate";

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

    window.addEventListener("keydown", handleQuotationShortcut);
    return () =>
      window.removeEventListener("keydown", handleQuotationShortcut);
  }, [navigate, newQuotationButtonRef]);
}

export default useQuotationKeyboardShortcut;
