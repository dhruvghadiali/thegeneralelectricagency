import _ from "lodash";

export function fromProductDiscountRangeApiResponse(value) {
  if (_.isObject(value)) {
    return { min: value.min ?? null, max: value.max ?? null };
  }

  return { min: value ?? null, max: value ?? null };
}

export default fromProductDiscountRangeApiResponse;
