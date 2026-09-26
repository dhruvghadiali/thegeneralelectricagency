import { createTableSelectors } from "@Redux/factories/table.factory";

const selectTallyCompanySyncState = (state) => state.tallyCompanySyncs;

export const tallyCompanySyncTableSelectors = createTableSelectors(
  selectTallyCompanySyncState,
);

export default tallyCompanySyncTableSelectors;
