import _ from "lodash";
import moment from "moment";

export const FINANCIAL_YEAR_OPTIONS = Object.freeze([
  { value: "2026-27", label: "FY 2026–27" },
  { value: "2025-26", label: "FY 2025–26" },
  { value: "2024-25", label: "FY 2024–25" },
]);

const YEAR_FACTORS = Object.freeze({
  "2026-27": 1,
  "2025-26": 0.88,
  "2024-25": 0.74,
});

const MONTHLY_BASE = Object.freeze([
  { bill: 420000, paid: 362000, orders: 12 },
  { bill: 385000, paid: 344000, orders: 10 },
  { bill: 510000, paid: 438000, orders: 15 },
  { bill: 468000, paid: 421000, orders: 14 },
  { bill: 552000, paid: 491000, orders: 17 },
  { bill: 497000, paid: 456000, orders: 16 },
  { bill: 608000, paid: 548000, orders: 19 },
  { bill: 574000, paid: 523000, orders: 18 },
  { bill: 635000, paid: 579000, orders: 21 },
  { bill: 590000, paid: 552000, orders: 18 },
  { bill: 671000, paid: 622000, orders: 22 },
  { bill: 646000, paid: 604000, orders: 20 },
]);

const SUPPLIERS = Object.freeze([
  { name: "Shakti Electricals", purchases: 38, amount: 1685000, paid: 1480000 },
  { name: "Crompton Greaves Ltd", purchases: 31, amount: 1410000, paid: 1295000 },
  { name: "Precision Drives", purchases: 26, amount: 1125000, paid: 1010000 },
  { name: "Western Cable House", purchases: 24, amount: 986000, paid: 895000 },
  { name: "Apex Pump Solutions", purchases: 23, amount: 872000, paid: 832000 },
]);

const CATEGORIES = Object.freeze([
  { category: "Motors", orders: 42, amount: 1840000 },
  { category: "Pumps", orders: 34, amount: 1425000 },
  { category: "Drives", orders: 27, amount: 1175000 },
  { category: "Cables", orders: 25, amount: 1028000 },
  { category: "Spares", orders: 24, amount: 908000 },
]);

const scale = (value, factor) => Math.round(value * factor);

export function getFinancialSummaryData(financialYear) {
  const factor = YEAR_FACTORS[financialYear] ?? 1;
  const startYear = Number(financialYear.split("-")[0]);
  const months = _.map(MONTHLY_BASE, (month, index) => ({
    month: moment({ year: startYear, month: 3, date: 1 })
      .add(index, "months")
      .format("MMM"),
    bill: scale(month.bill, factor),
    paid: scale(month.paid, factor),
    outstanding: scale(month.bill - month.paid, factor),
    orders: scale(month.orders, factor),
  }));
  const suppliers = _.orderBy(
    _.map(SUPPLIERS, (supplier) => ({
      ...supplier,
      purchases: scale(supplier.purchases, factor),
      amount: scale(supplier.amount, factor),
      paid: scale(supplier.paid, factor),
    })),
    "amount",
    "desc",
  );
  const categories = _.orderBy(
    _.map(CATEGORIES, (category) => ({
      ...category,
      orders: scale(category.orders, factor),
      amount: scale(category.amount, factor),
    })),
    "amount",
    "desc",
  );
  const totalBill = _.sumBy(months, "bill");
  const totalPaid = _.sumBy(months, "paid");

  return {
    months,
    suppliers,
    categories,
    summary: {
      totalPurchases: _.sumBy(months, "orders"),
      totalBill,
      totalPaid,
      outstanding: totalBill - totalPaid,
      paymentProgress: totalBill ? (totalPaid / totalBill) * 100 : 0,
    },
    paymentAllocation: [
      { name: "Paid", value: totalPaid, fill: "var(--color-paid)" },
      {
        name: "Outstanding",
        value: totalBill - totalPaid,
        fill: "var(--color-outstanding)",
      },
    ],
  };
}
