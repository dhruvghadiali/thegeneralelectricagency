import { createAsyncThunk } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums";
import { PRODUCT_LIST_DEFAULTS } from "@Redux/product/product.defaults";
import { COMPANY_TABLE_DEFAULTS } from "@Tables/company/companyTable.defaults";
import {
  QUOTATION_COMPANY_LIMIT,
  QUOTATION_COMPANY_PAGE,
  QUOTATION_PRODUCT_LIMIT,
  QUOTATION_PRODUCT_PAGE,
} from "@Redux/quotation/quotation.state";

import { toProductListParams } from "@Redux/product/product.api-payload";
import { toCompanyListParams } from "@Tables/company/companyTable.api-payload";
import { fromQuotationListResponse } from "@Redux/quotation/quotation.api-response";
import { toQuotationListParams } from "@screenComponent/quotations/table/quotationTable.api-payload";
import { fromQuotationCompanyDirectoryResponse } from "@Redux/quotation/quotation-company-directory.api-response";
import { fromQuotationProductDirectoryResponse } from "@Redux/quotation/quotation-product-directory.api-response";
import {
  employeeCompanyApi,
  employeeProductApi,
  employeeQuotationApi,
  extractErrorMessage,
} from "@Api";
import {
  toQuotationDetailsCreatePayload,
  toQuotationDetailsUpdatePayload,
} from "@Redux/quotation/quotation.api-payload";

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

      return fromQuotationCompanyDirectoryResponse(
        response,
        requestedPagination,
      );
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

      return fromQuotationProductDirectoryResponse(
        response,
        requestedPagination,
      );
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
    const payload = toQuotationDetailsCreatePayload({
      quotationRefId,
      selectedCompany: quotation.selectedCompany,
      companyInformation: quotation.companyInformation,
      taxTreatment: quotation.taxTreatment,
      gstPercentage: quotation.gstPercentage,
      deliveryNotes: quotation.deliveryNotes,
      paymentNotes: quotation.paymentNotes,
      roundOff: quotation.roundOff,
      productInformation: quotation.productInformation,
    });

    try {
      return await employeeQuotationApi.createQuotationDetails(payload);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const updateQuotationDetails = createAsyncThunk(
  "quotation/updateDetails",
  async (
    { id, quotationRefId, quotationVersion },
    { getState, rejectWithValue },
  ) => {
    const state = getState();

    if (state.auth.role !== ROLE_PATHS.EMPLOYEE) {
      return rejectWithValue(
        "You do not have permission to update quotation details.",
      );
    }

    const quotation = state.quotation;
    const payload = toQuotationDetailsUpdatePayload({
      quotationRefId,
      quotationVersion,
      selectedCompany: quotation.selectedCompany,
      companyInformation: quotation.companyInformation,
      taxTreatment: quotation.taxTreatment,
      gstPercentage: quotation.gstPercentage,
      deliveryNotes: quotation.deliveryNotes,
      paymentNotes: quotation.paymentNotes,
      roundOff: quotation.roundOff,
      productInformation: quotation.productInformation,
    });

    try {
      return await employeeQuotationApi.updateQuotationDetails(id, payload);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
