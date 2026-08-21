import { FIRST_COMPANY_PAGE } from "@Forms/company/companyAssignment/companyAssignment.helpers";

export function useCompanyAssignmentActions({ assignment, changeAssignment }) {
  const openCompanyPicker = (pickerOpen) => {
    changeAssignment({
      pickerOpen,
      ...(pickerOpen && {
        companyPage: FIRST_COMPANY_PAGE,
        debouncedSearch: assignment.companySearch.trim(),
      }),
    });
  };

  const searchCompanies = (companySearch) => {
    changeAssignment({
      companySearch,
      companyPage: FIRST_COMPANY_PAGE,
      companies: [],
      isLoadingCompanies: true,
      saveError: null,
    });
  };

  const selectCompany = (company) => {
    changeAssignment({
      companyId: String(company.id),
      companyAddressId: "",
      selectedCompanyOption: company,
      companySearch: "",
      pickerOpen: false,
      saveError: null,
      fieldErrors: {},
    });
  };

  const selectCompanyAddress = (companyAddressId) => {
    changeAssignment({
      companyAddressId,
      saveError: null,
      fieldErrors: { ...assignment.fieldErrors, companyAddressId: null },
    });
  };

  const loadMoreCompanies = () => {
    changeAssignment({ companyPage: assignment.companyPage + 1 });
  };

  return {
    openCompanyPicker,
    searchCompanies,
    selectCompany,
    selectCompanyAddress,
    loadMoreCompanies,
  };
}
