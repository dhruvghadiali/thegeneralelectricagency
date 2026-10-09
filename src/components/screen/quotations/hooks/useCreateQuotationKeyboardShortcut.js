import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@routes/navigate";

function useCreateQuotationKeyboardShortcut() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCreateQuotationShortcut = (event) => {
      if (event.key !== "Escape") return;

      event.preventDefault();
      navigate(ROUTES.QUOTATIONS);
    };

    window.addEventListener("keydown", handleCreateQuotationShortcut);
    return () =>
      window.removeEventListener("keydown", handleCreateQuotationShortcut);
  }, [navigate]);
}

export default useCreateQuotationKeyboardShortcut;
