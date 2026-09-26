import { createSelector } from "@reduxjs/toolkit";

export const selectTallyProducts = (state) => state.tally.products;

function asRecords(value) {
  if (Array.isArray(value)) return value;
  return value && typeof value === "object" ? [value] : [];
}

function findRecords(value, recordName) {
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value)) {
    return value.flatMap((item) => findRecords(item, recordName));
  }

  return Object.entries(value).flatMap(([name, item]) =>
    name.split(":").at(-1).toUpperCase() === recordName
      ? asRecords(item)
      : findRecords(item, recordName),
  );
}

function tallyText(value) {
  if (typeof value === "string" || typeof value === "number") {
    return String(value).trim();
  }
  if (Array.isArray(value)) {
    return value.map(tallyText).filter(Boolean).join(", ");
  }
  return value && typeof value === "object"
    ? tallyText(value["#text"] ?? value.ADDRESS)
    : "";
}

function firstListValue(ledger, listName, fieldName) {
  return asRecords(ledger?.[listName])
    .map((item) => tallyText(item?.[fieldName]))
    .find(Boolean) ?? "";
}

export const selectTallyProductRows = createSelector(
  [selectTallyProducts],
  ({ response }) => {
    const data = response?.data;
    if (!data) return [];

    const records = Array.isArray(data)
      ? data
      : asRecords(
          data.products ??
            data.stockItems ??
            data.data?.products ??
            data.data?.stockItems,
        );
    const stockItems = records.length ? records : findRecords(data, "STOCKITEM");

    return stockItems
      .map((item) => ({
        name: tallyText(item?.["@attributes"]?.NAME ?? item?.NAME ?? item?.name),
        guid: tallyText(item?.GUID ?? item?.guid),
        masterId: tallyText(item?.MASTERID ?? item?.masterId),
        alterId: tallyText(item?.ALTERID ?? item?.alterId),
        group: tallyText(item?.PARENT ?? item?.parent),
        description: tallyText(item?.DESCRIPTION ?? item?.description),
        units: tallyText(item?.BASEUNITS ?? item?.baseUnits),
        hsnCode: firstListValue(item, "HSNDETAILS.LIST", "HSNCODE"),
        gstApplicable: tallyText(item?.GSTAPPLICABLE),
        supplyType: tallyText(item?.GSTTYPEOFSUPPLY),
        openingBalance: tallyText(item?.OPENINGBALANCE),
        closingBalance: tallyText(item?.CLOSINGBALANCE),
      }))
      .filter(({ name }) => name);
  },
);

export const selectTallyProductCount = createSelector(
  [selectTallyProducts, selectTallyProductRows],
  ({ response }, rows) => (response ? rows.length : null),
);
