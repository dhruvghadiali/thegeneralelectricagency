import { createTallyConnectorApi } from "@Tally/api/factories/connector.factory";

export const tallyConnectorApi = createTallyConnectorApi();

export const getTallyConnectorStatus = tallyConnectorApi.getStatus;
