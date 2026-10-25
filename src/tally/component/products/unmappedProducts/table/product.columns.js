import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";

const columns = [
  {
    field: "hsn_code",
    header: "HSN code",
    mobile: MOBILE_SLOTS.META,
    className: "min-w-36",
  },
  {
    field: "name",
    header: "Name",
    mobile: MOBILE_SLOTS.PRIMARY,
    className: "min-w-56 font-medium",
  },
  {
    field: "stock_group",
    header: "Stock group",
    type: COLUMN_TYPES.SELECT,
    mobile: MOBILE_SLOTS.SECONDARY,
    className: "min-w-48",
  },
  {
    field: "agency",
    header: "Agency",
    mobile: MOBILE_SLOTS.META,
    className: "min-w-36",
  },
  {
    field: "category",
    header: "Category",
    mobile: MOBILE_SLOTS.META,
    className: "min-w-36",
  },
];

export function getUnmappedProductColumns(stockGroups = []) {
  const stockGroupOptions = [
    ...new Set(stockGroups.map((stockGroup) => String(stockGroup).trim()).filter(Boolean)),
  ].map((stockGroup) => ({ value: stockGroup, label: stockGroup }));

  return columns.map(({ field, header, type, mobile, className }) => ({
    key: field,
    field,
    header,
    type: type ?? COLUMN_TYPES.TEXT,
    sortKey: field,
    filterKey: field,
    options: field === "stock_group" ? stockGroupOptions : undefined,
    allOptionLabel: field === "stock_group" ? "All stock groups" : undefined,
    mobile,
    mobileLabel: `${header}:`,
    className,
  }));
}
