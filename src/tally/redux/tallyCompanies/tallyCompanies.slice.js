import { createSlice } from "@reduxjs/toolkit";
import { createTableState, TABLE_REDUCERS, tableFetchCases } from "@Redux/factories/table.factory";
import { TALLY_COMPANIES_TABLE_DEFAULTS } from "@Tally/tables/tallyCompanies/tallyCompaniesTable.defaults";
import { fetchTallyCompanies } from "@Tally/redux/tallyCompanies/tallyCompanies.action";

const tallyCompaniesSlice = createSlice({
  name: "tallyCompaniesList",
  initialState: createTableState(TALLY_COMPANIES_TABLE_DEFAULTS),
  reducers: TABLE_REDUCERS,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTallyCompanies.pending, tableFetchCases.pending)
      .addCase(fetchTallyCompanies.fulfilled, tableFetchCases.fulfilled)
      .addCase(fetchTallyCompanies.rejected, (state, action) =>
        tableFetchCases.rejected(state, action, "Unable to load Tally companies."),
      );
  },
});

export const tallyCompaniesTableActions = tallyCompaniesSlice.actions;
export default tallyCompaniesSlice.reducer;

