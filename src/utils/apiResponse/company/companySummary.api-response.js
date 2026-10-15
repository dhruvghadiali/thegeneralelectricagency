import _ from "lodash";

export function fromCompanySummaryApiResponse(summary = {}) {
  return {
    totalCompanies: _.toNumber(summary.total_companies) || 0,
    activeCompanies: _.toNumber(summary.active_companies) || 0,
    inactiveCompanies: _.toNumber(summary.inactive_companies) || 0,
  };
}

export default fromCompanySummaryApiResponse;
