import { createSlice } from "@reduxjs/toolkit";

import { fetchCompanyContacts } from "@Redux/companyContact/companyContact.action";
import { COMPANY_ASSIGNMENT_INITIAL_VALUES } from "@Forms/company/companyAssignment/companyAssignment.initialValues";
import {
  createTableState,
  tableFetchCases,
  TABLE_REDUCERS,
} from "@Redux/factories/table.factory";
import { COMPANY_CONTACT_TABLE_DEFAULTS } from "@Tables/companyContact/companyContactTable.defaults";
import { TABLE_DEFAULTS } from "@Enums";

const COMPANY_CONTACT_ASSIGNMENT_INITIAL_STATE = {
  ...COMPANY_ASSIGNMENT_INITIAL_VALUES,
  currentCompany: null,
  currentAddress: null,
  selectedCompanyOption: null,
  isChecking: false,
  checkError: null,
  isSaving: false,
  saveError: null,
  fieldErrors: {},
  pickerOpen: false,
  companySearch: "",
  debouncedSearch: "",
  companies: [],
  companyPage: TABLE_DEFAULTS.PAGE,
  companyPagination: {
    page: TABLE_DEFAULTS.PAGE,
    totalPages: 0,
  },
  isLoadingCompanies: false,
};

const initialState = {
  ...createTableState({
    limit: COMPANY_CONTACT_TABLE_DEFAULTS.limit,
    sort: COMPANY_CONTACT_TABLE_DEFAULTS.sort,
    columnFilters: COMPANY_CONTACT_TABLE_DEFAULTS.filters,
  }),
  selectedContact: null,
  contactAssignment: { ...COMPANY_CONTACT_ASSIGNMENT_INITIAL_STATE },
  summary: {
    totalContacts: 0,
    activeContacts: 0,
    inactiveContacts: 0,
  },
};

const companyContactSlice = createSlice({
  name: "companyContacts",
  initialState,
  reducers: {
    ...TABLE_REDUCERS,
    contactDetailsOpened(state, action) {
      state.selectedContact = action.payload;
      state.contactAssignment = {
        ...COMPANY_CONTACT_ASSIGNMENT_INITIAL_STATE,
      };
    },
    contactDetailsClosed(state) {
      state.selectedContact = null;
      state.contactAssignment = {
        ...COMPANY_CONTACT_ASSIGNMENT_INITIAL_STATE,
      };
    },
    contactAssignmentChanged(state, action) {
      Object.assign(state.contactAssignment, action.payload);
    },
    contactAssignmentReset(state) {
      state.contactAssignment = {
        ...COMPANY_CONTACT_ASSIGNMENT_INITIAL_STATE,
      };
    },
    contactCompanyOptionsLoaded(state, action) {
      const { items, pagination, replace } = action.payload;
      const companies = replace
        ? items
        : [...state.contactAssignment.companies, ...items];
      state.contactAssignment.companies = [
        ...new Map(companies.map((company) => [company.id, company])).values(),
      ];
      state.contactAssignment.companyPagination = pagination;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyContacts.pending, tableFetchCases.pending)
      .addCase(fetchCompanyContacts.fulfilled, (state, action) => {
        tableFetchCases.fulfilled(state, action);
        state.summary = action.payload.summary;
      })
      .addCase(fetchCompanyContacts.rejected, (state, action) =>
        tableFetchCases.rejected(
          state,
          action,
          "Unable to load company contacts.",
        ),
      );
  },
});

export const {
  columnFilterChanged,
  contactAssignmentChanged,
  contactAssignmentReset,
  contactCompanyOptionsLoaded,
  contactDetailsClosed,
  contactDetailsOpened,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  searchCommitted,
  sortChanged,
} = companyContactSlice.actions;

export const companyContactTableActions = {
  columnFilterChanged,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  searchCommitted,
  sortChanged,
};

export default companyContactSlice.reducer;
