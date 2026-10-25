import { createSelector } from "@reduxjs/toolkit";

import { selectQuotationState } from "@Redux/quotation/quotation.selectors.base";

export const selectQuotationCurrentStep = (state) =>
  selectQuotationState(state).currentStep;

export const selectQuotationExitDialog = (state) =>
  selectQuotationState(state).isExitDialogOpen;

export const selectQuotationEditingId = (state) =>
  selectQuotationState(state).editingQuotationId;

export const selectQuotationTaxTreatment = (state) =>
  selectQuotationState(state).taxTreatment;

export const selectQuotationGstPercentage = (state) =>
  selectQuotationState(state).gstPercentage;

export const selectQuotationDeliveryNotes = (state) =>
  selectQuotationState(state).deliveryNotes;

export const selectQuotationPaymentNotes = (state) =>
  selectQuotationState(state).paymentNotes;

export const selectQuotationRoundOff = (state) =>
  selectQuotationState(state).roundOff;

export const selectQuotationEditSource = createSelector(
  selectQuotationState,
  ({
    editingQuotationReference,
    editingQuotationVersion,
    originalGstPercentage,
    originalProductInformation,
  }) => ({
    quotationReference: editingQuotationReference,
    quotationVersion: editingQuotationVersion,
    originalGstPercentage,
    originalProducts: originalProductInformation,
  }),
);
