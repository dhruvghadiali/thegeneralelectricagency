import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchQuotationCompanies } from "@Redux/quotation/quotation.action";
import {
  selectQuotationCompanyPagination,
  selectQuotationCompanyRequest,
} from "@Redux/quotation/quotation.selector";

function useCompanyDirectoryKeyboardShortcut({
  companyInputRef,
  companyDirectoryRef,
}) {
  const dispatch = useDispatch();
  const pagination = useSelector(selectQuotationCompanyPagination);
  const { isLoadingMore } = useSelector(selectQuotationCompanyRequest);
  const isLoadingNextPageRef = useRef(false);

  return useCallback(
    async (event, currentIndex) => {
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

      const isLastCompany = currentIndex === companyOptions.length - 1;
      const hasNextPage = pagination.page < pagination.totalPages;
      const shouldLoadNextPage =
        event.altKey &&
        event.key === "ArrowDown" &&
        isLastCompany &&
        hasNextPage;

      if (shouldLoadNextPage) {
        if (isLoadingMore || isLoadingNextPageRef.current) return;

        isLoadingNextPageRef.current = true;
        const firstNewCompanyIndex = companyOptions.length;

        try {
          const result = await dispatch(
            fetchQuotationCompanies({ page: pagination.page + 1 }),
          );

          if (!fetchQuotationCompanies.fulfilled.match(result)) return;

          window.requestAnimationFrame(() => {
            const updatedCompanyOptions =
              companyDirectoryRef.current?.querySelectorAll(
                "[data-company-option]",
              );
            updatedCompanyOptions?.[firstNewCompanyIndex]?.focus();
          });
        } finally {
          isLoadingNextPageRef.current = false;
        }

        return;
      }

      const nextIndex =
        (currentIndex + direction + companyOptions.length) %
        companyOptions.length;
      companyOptions[nextIndex]?.focus();
    },
    [
      companyDirectoryRef,
      companyInputRef,
      dispatch,
      isLoadingMore,
      pagination.page,
      pagination.totalPages,
    ],
  );
}

export default useCompanyDirectoryKeyboardShortcut;
