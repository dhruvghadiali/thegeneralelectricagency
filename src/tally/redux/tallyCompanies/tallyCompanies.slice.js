import { createSlice } from "@reduxjs/toolkit";
import { createTableState, TABLE_REDUCERS, tableFetchCases } from "@Redux/factories/table.factory";
import { TALLY_COMPANIES_TABLE_DEFAULTS } from "@Tally/tables/tallyCompanies/tallyCompaniesTable.defaults";
import { fetchTallyCompanies } from "@Tally/redux/tallyCompanies/tallyCompanies.action";
import { fetchTallyCompaniesComparison } from "@Tally/redux/tallyCompanies/tallyCompaniesComparison.action";
import { syncTallyCompanies } from "@Tally/redux/company/company.action";
import { saveTallyCompanies } from "@Tally/redux/tallyCompanies/tallyCompaniesSave.action";

const emptyComparison = { status: "idle", error: null, requestId: null, newRecords: [], deletedRecords: [] };

const tallyCompaniesSlice = createSlice({
  name: "tallyCompaniesList",
  initialState: { ...createTableState(TALLY_COMPANIES_TABLE_DEFAULTS), comparison: emptyComparison, saveStatus: "idle", saveError: null, savedCount: 0 },
  reducers: TABLE_REDUCERS,
  extraReducers: (builder) => {
    builder
      .addCase(saveTallyCompanies.pending, (state) => {
        state.saveStatus = "loading";
        state.saveError = null;
        state.savedCount = 0;
      })
      .addCase(saveTallyCompanies.fulfilled, (state, action) => {
        const { savedIds, errors } = action.payload;
        state.saveStatus = errors.length ? "failed" : "succeeded";
        state.saveError = errors.length ? errors.join("\n") : null;
        state.savedCount = savedIds.length;
        state.comparison.newRecords = state.comparison.newRecords.filter((company) => !savedIds.includes(company._id));
      })
      .addCase(saveTallyCompanies.rejected, (state, action) => {
        state.saveStatus = "failed";
        state.saveError = action.payload || "Unable to save companies.";
      })
      .addCase(fetchTallyCompanies.pending, tableFetchCases.pending)
      .addCase(fetchTallyCompanies.fulfilled, tableFetchCases.fulfilled)
      .addCase(fetchTallyCompanies.rejected, (state, action) =>
        tableFetchCases.rejected(state, action, "Unable to load Tally companies."),
      )
      .addCase(syncTallyCompanies.pending, (state) => {
        state.comparison = { ...emptyComparison };
      })
      .addCase(fetchTallyCompaniesComparison.pending, (state, action) => {
        state.comparison = { ...emptyComparison, status: "loading", requestId: action.meta.requestId };
      })
      .addCase(fetchTallyCompaniesComparison.fulfilled, (state, action) => {
        if (state.comparison.requestId !== action.meta.requestId) return;
        state.comparison = { ...action.payload, status: "succeeded", error: null, requestId: null };
      })
      .addCase(fetchTallyCompaniesComparison.rejected, (state, action) => {
        if (state.comparison.requestId !== action.meta.requestId) return;
        state.comparison = { ...emptyComparison, status: action.meta.aborted ? "idle" : "failed", error: action.meta.aborted ? null : action.payload || "Unable to compare companies." };
      });
  },
});

export const tallyCompaniesTableActions = tallyCompaniesSlice.actions;
export default tallyCompaniesSlice.reducer;

