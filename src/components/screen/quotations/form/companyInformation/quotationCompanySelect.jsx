import { useRef } from "react";
import { useDispatch } from "react-redux";

import { quotationCompanyDirectorySearchChanged } from "@Redux/quotation/quotation.slice";
import QuotationSearchableSelect from "@screenComponent/quotations/form/quotationSearchableSelect";
import useQuotationCompanyDirectory from "@screenComponent/quotations/form/companyInformation/companyDirectory/useQuotationCompanyDirectory";

function QuotationCompanySelect({ value, onCompanySelect, onCompanyClear }) {
  const dispatch = useDispatch();
  const directory = useQuotationCompanyDirectory();
  const selectionChangedRef = useRef(false);

  const restoreSearch = () => {
    dispatch(
      quotationCompanyDirectorySearchChanged(
        directory.selectedCompany?.name ?? value ?? "",
      ),
    );
  };

  return (
    <QuotationSearchableSelect
      id="quotation-companyName-mobile"
      value={value}
      placeholder="Select a company"
      searchPlaceholder="Search company name..."
      emptyMessage="No companies found."
      options={directory.companies}
      selectedId={directory.selectedCompany?.id}
      search={directory.companySearch}
      isLoading={directory.isLoading}
      isLoadingMore={directory.isLoadingMore}
      error={directory.error}
      hasMore={directory.hasMoreCompanies}
      onOpenChange={(open) => {
        if (open) return;
        if (selectionChangedRef.current) {
          selectionChangedRef.current = false;
          return;
        }
        restoreSearch();
      }}
      onSearchChange={(search) =>
        dispatch(quotationCompanyDirectorySearchChanged(search))
      }
      onSelect={(company, isSelected) => {
        selectionChangedRef.current = true;
        if (isSelected) onCompanyClear();
        else onCompanySelect(company, { focusInput: false });
      }}
      onClear={() => {
        selectionChangedRef.current = true;
        onCompanyClear();
      }}
      onRetry={() => directory.loadCompanies()}
      onLoadMore={() =>
        directory.loadCompanies(directory.pagination.page + 1)
      }
    />
  );
}

export default QuotationCompanySelect;
