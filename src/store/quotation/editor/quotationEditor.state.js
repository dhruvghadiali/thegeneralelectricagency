import { CREATE_QUOTATION_STEPS, INDIAN_GST_RATES } from "@Enums";

export const createQuotationEditorState = () => ({
  currentStep: CREATE_QUOTATION_STEPS.COMPANY_INFORMATION,
  isExitDialogOpen: false,
  editingQuotationId: null,
  editingQuotationReference: "",
  editingQuotationVersion: "V1",
  originalGstPercentage: String(INDIAN_GST_RATES.EIGHTEEN),
  taxTreatment: null,
  gstPercentage: String(INDIAN_GST_RATES.EIGHTEEN),
  deliveryNotes: "",
  paymentNotes: "",
  roundOff: false,
});

export default createQuotationEditorState;
