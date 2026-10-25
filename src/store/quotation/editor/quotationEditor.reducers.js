import _ from "lodash";

import { CREATE_QUOTATION_STEPS } from "@Enums";
import { createQuotationFormState } from "@Redux/quotation/quotation.state";

export const quotationEditorReducers = {
  quotationEditingStarted(state, action) {
    const quotation = action.payload;
    const productInformation = _.cloneDeep(
      quotation.productInformation ?? [],
    );

    Object.assign(state, createQuotationFormState(), {
      editingQuotationId: quotation.id,
      editingQuotationReference: quotation.quotationNumber,
      editingQuotationVersion: quotation.quotationVersion,
      originalGstPercentage: quotation.gstPercentage,
      currentStep: CREATE_QUOTATION_STEPS.PRODUCT_INFORMATION,
      selectedCompany: _.cloneDeep(quotation.selectedCompany),
      companyInformation: _.cloneDeep(quotation.companyInformation),
      taxTreatment: quotation.taxTreatment,
      gstPercentage: quotation.gstPercentage,
      deliveryNotes: quotation.deliveryNotes,
      paymentNotes: quotation.paymentNotes,
      roundOff: Boolean(quotation.roundOff),
      productInformation,
      originalProductInformation: _.cloneDeep(productInformation),
      isProductSummaryExpanded: productInformation.length > 0,
    });
  },
  quotationExitRequested(state) {
    state.isExitDialogOpen = true;
  },
  quotationExitCancelled(state) {
    state.isExitDialogOpen = false;
  },
  quotationStepChanged(state, action) {
    state.currentStep = action.payload;
    state.isProductAddAnotherDialogOpen = false;
    state.pendingDuplicateProductIndex = null;
  },
  quotationTaxTreatmentChanged(state, action) {
    state.taxTreatment = action.payload;
  },
  quotationGstPercentageChanged(state, action) {
    state.gstPercentage = action.payload;
  },
  quotationDeliveryNotesChanged(state, action) {
    state.deliveryNotes = _.toUpper(action.payload);
  },
  quotationPaymentNotesChanged(state, action) {
    state.paymentNotes = _.toUpper(action.payload);
  },
  quotationRoundOffChanged(state, action) {
    state.roundOff = Boolean(action.payload);
  },
};
