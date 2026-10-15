import _ from "lodash";

export function fromProductSummaryApiResponse(summary = {}) {
  return {
    totalProducts: _.toNumber(summary.total_products) || 0,
    activeProducts: _.toNumber(summary.active_products) || 0,
    inactiveProducts: _.toNumber(summary.inactive_products) || 0,
  };
}

export default fromProductSummaryApiResponse;
