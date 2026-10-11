import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  employeeCompanyApi,
  employeeProductApi,
  employeeQuotationApi,
  extractErrorMessage,
} from "@Api";
import { ROLE_PATHS } from "@Enums";
import { toProductListParams } from "@Redux/product/product.api-payload";
import { PRODUCT_LIST_DEFAULTS } from "@Redux/product/product.defaults";
import { fromProductListResponse } from "@Redux/product/product.api-response";
import { toQuotationListParams } from "@screenComponent/quotations/table/quotationTable.api-payload";
import { fromQuotationListResponse } from "@screenComponent/quotations/table/quotationTable.frontend-payload";
import {
  QUOTATION_COMPANY_LIMIT,
  QUOTATION_COMPANY_PAGE,
  QUOTATION_PRODUCT_LIMIT,
  QUOTATION_PRODUCT_PAGE,
} from "@Redux/quotation/quotation.state";
import { toQuotationDetailsPayload } from "@Redux/quotation/quotation.api-payload";
import { toCompanyListParams } from "@Tables/company/companyTable.api-payload";
import { COMPANY_TABLE_DEFAULTS } from "@Tables/company/companyTable.defaults";
import { fromCompanyListResponse } from "@Tables/company/companyTable.frontend-payload";

export const fetchQuotationDetails = createAsyncThunk(
  "quotation/fetchDetails",
  async (columns = [], { getState, signal, rejectWithValue }) => {
    const state = getState();
    const { page, limit, searchQuery, sort, appliedFilters } = state.quotation;

    if (state.auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue("Only employees can view quotation details.");
    }

    try {
      const response = await employeeQuotationApi.getQuotationDetails(
        toQuotationListParams({
          columns,
          page,
          limit,
          search: searchQuery,
          sort,
          filters: appliedFilters,
        }),
        { signal },
      );

      return fromQuotationListResponse(response, { page, limit });
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const fetchQuotationCompanies = createAsyncThunk(
  "quotation/fetchCompanies",
  async (
    { page = QUOTATION_COMPANY_PAGE } = {},
    { getState, signal, rejectWithValue },
  ) => {
    const state = getState();

    if (state.auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue(
        "You do not have permission to load quotation companies.",
      );
    }

    const requestedPagination = {
      page,
      limit: QUOTATION_COMPANY_LIMIT,
    };

    try {
      const response = await employeeCompanyApi.getCompanies(
        {
          ...toCompanyListParams({
            ...requestedPagination,
            search: state.quotation.companySearch,
            sort: COMPANY_TABLE_DEFAULTS.sort,
          }),
          is_active: true,
        },
        { signal },
      );

      return fromCompanyListResponse(response, requestedPagination);
    } catch (error) {
      if (signal.aborted) {
        const abortError = new Error(
          "Quotation company request was cancelled.",
        );
        abortError.name = "AbortError";
        throw abortError;
      }

      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const fetchQuotationProducts = createAsyncThunk(
  "quotation/fetchProducts",
  async (
    { page = QUOTATION_PRODUCT_PAGE } = {},
    { getState, signal, rejectWithValue },
  ) => {
    const state = getState();

    if (state.auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue(
        "You do not have permission to load quotation products.",
      );
    }

    const requestedPagination = {
      page,
      limit: QUOTATION_PRODUCT_LIMIT,
    };

    try {
      const response = await employeeProductApi.getProducts(
        toProductListParams({
          ...requestedPagination,
          search: state.quotation.productSearch,
          sort: PRODUCT_LIST_DEFAULTS.sort,
        }),
        { signal },
      );

      return fromProductListResponse(response, requestedPagination);
    } catch (error) {
      if (signal.aborted) {
        const abortError = new Error(
          "Quotation product request was cancelled.",
        );
        abortError.name = "AbortError";
        throw abortError;
      }

      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const createQuotationDetails = createAsyncThunk(
  "quotation/createDetails",
  async ({ quotationRefId }, { getState, rejectWithValue }) => {
    const state = getState();

    if (state.auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue(
        "You do not have permission to create quotation details.",
      );
    }

    const quotation = state.quotation;
    const payload = toQuotationDetailsPayload({
      quotationRefId,
      selectedCompany: quotation.selectedCompany,
      companyInformation: quotation.companyInformation,
      taxTreatment: quotation.taxTreatment,
      gstPercentage: quotation.gstPercentage,
      productInformation: quotation.productInformation,
    });

    try {
      return await employeeQuotationApi.createQuotationDetails(payload);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
