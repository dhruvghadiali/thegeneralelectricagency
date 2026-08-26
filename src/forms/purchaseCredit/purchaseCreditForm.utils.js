import _ from "lodash";

const PURCHASE_CREDIT_AMOUNT_FORMATTER = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

const PURCHASE_CREDIT_AMOUNT_UNITS = Object.freeze([
  { minimum: 10_000_000, divisor: 10_000_000, label: "Cr" },
  { minimum: 100_000, divisor: 100_000, label: "Lac" },
  { minimum: 1_000, divisor: 1_000, label: "K" },
]);

export function formatPurchaseCreditAmount(value) {
  const parsedAmount = _.toNumber(value);
  const amount = _.isFinite(parsedAmount) ? parsedAmount : 0;
  const unit = _.find(
    PURCHASE_CREDIT_AMOUNT_UNITS,
    ({ minimum }) => Math.abs(amount) >= minimum,
  );

  if (!unit) return `₹${PURCHASE_CREDIT_AMOUNT_FORMATTER.format(amount)}`;

  return `₹${PURCHASE_CREDIT_AMOUNT_FORMATTER.format(amount / unit.divisor)} ${unit.label}`;
}

export function countPurchaseCreditValidationErrors(error) {
  if (!error) return 0;
  if (_.isString(error)) return 1;

  if (_.isArray(error)) {
    return _.reduce(
      error,
      (total, item) => total + countPurchaseCreditValidationErrors(item),
      0,
    );
  }

  if (_.isObject(error)) {
    return _.reduce(
      _.values(error),
      (total, item) => total + countPurchaseCreditValidationErrors(item),
      0,
    );
  }

  return 0;
}
