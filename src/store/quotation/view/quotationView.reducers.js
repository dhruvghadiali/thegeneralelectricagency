export const quotationViewReducers = {
  quotationViewSectionToggled(state, action) {
    state.viewOpenSection =
      state.viewOpenSection === action.payload ? null : action.payload;
  },
  quotationViewSectionClosed(state) {
    state.viewOpenSection = null;
  },
  quotationViewPdfDownloadStarted(state, action) {
    state.viewPdfDownloadStatuses[action.payload] = "downloading";
  },
  quotationViewPdfDownloadCompleted(state, action) {
    delete state.viewPdfDownloadStatuses[action.payload];
  },
  quotationViewPdfDownloadFailed(state, action) {
    state.viewPdfDownloadStatuses[action.payload] = "error";
  },
};
