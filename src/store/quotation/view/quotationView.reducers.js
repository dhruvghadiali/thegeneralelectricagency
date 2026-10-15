export const quotationViewReducers = {
  quotationViewSectionToggled(state, action) {
    state.viewOpenSection =
      state.viewOpenSection === action.payload ? null : action.payload;
  },
  quotationViewSectionClosed(state) {
    state.viewOpenSection = null;
  },
};
