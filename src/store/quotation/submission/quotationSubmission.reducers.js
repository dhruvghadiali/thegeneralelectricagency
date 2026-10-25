import {
  createQuotationDetails,
  updateQuotationDetails,
} from "@Redux/quotation/quotation.action";

function submissionPending(state) {
  state.isSubmitting = true;
  state.isSubmitSuccessful = false;
  state.submitError = null;
}

function submissionFulfilled(state, action) {
  state.isSubmitting = false;
  state.isSubmitSuccessful = true;
  state.submitError = null;
  state.createdQuotation = action.payload;
}

export const quotationSubmissionReducers = {
  quotationSubmissionErrorCleared(state) {
    state.submitError = null;
  },
};

export function addQuotationSubmissionExtraReducers(builder) {
  builder
    .addCase(createQuotationDetails.pending, (state) => {
      submissionPending(state);
      state.createdQuotation = null;
    })
    .addCase(createQuotationDetails.fulfilled, submissionFulfilled)
    .addCase(createQuotationDetails.rejected, (state, action) => {
      state.isSubmitting = false;
      state.isSubmitSuccessful = false;
      state.submitError =
        action.payload ?? "Unable to create quotation details.";
    })
    .addCase(updateQuotationDetails.pending, submissionPending)
    .addCase(updateQuotationDetails.fulfilled, submissionFulfilled)
    .addCase(updateQuotationDetails.rejected, (state, action) => {
      state.isSubmitting = false;
      state.isSubmitSuccessful = false;
      state.submitError =
        action.payload ?? "Unable to update quotation details.";
    });
}
