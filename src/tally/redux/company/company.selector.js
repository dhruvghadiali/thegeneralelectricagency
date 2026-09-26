import { createSelector } from "@reduxjs/toolkit";

export const selectTallyCompanies = (state) => state.tallyCompanies;

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

export function getTallyCompanyRows(response) {
  const data = response?.data;
  if (!data) return [];

  const records = Array.isArray(data)
    ? data
    : asRecords(
        data.companies ??
          data.ledgers ??
          data.data?.companies ??
          data.data?.ledgers,
      );
  const ledgers = records.length ? records : findRecords(data, "LEDGER");

  return ledgers
    .map((ledger) => ({
      name: tallyText(
        ledger?.["@attributes"]?.NAME ?? ledger?.NAME ?? ledger?.name,
      ),
      guid: tallyText(ledger?.GUID ?? ledger?.guid),
      masterId: tallyText(ledger?.MASTERID ?? ledger?.masterId),
      parent: tallyText(ledger?.PARENT ?? ledger?.parent),
      gstin:
        tallyText(ledger?.GSTIN) ||
        firstListValue(ledger, "LEDGSTREGDETAILS.LIST", "GSTIN"),
      pan: tallyText(ledger?.INCOMETAXNUMBER ?? ledger?.PAN),
      email: tallyText(ledger?.EMAIL),
      phone:
        tallyText(ledger?.LEDGERMOBILE) ||
        tallyText(ledger?.LEDGERPHONE) ||
        firstListValue(ledger, "CONTACTDETAILS.LIST", "PHONENUMBER"),
      address: firstListValue(
        ledger,
        "LEDMAILINGDETAILS.LIST",
        "ADDRESS.LIST",
      ),
      state: firstListValue(ledger, "LEDMAILINGDETAILS.LIST", "STATE"),
      pinCode: firstListValue(ledger, "LEDMAILINGDETAILS.LIST", "PINCODE"),
    }))
    .filter(({ name }) => name);
}

export const selectTallyCompanyRows = createSelector(
  [selectTallyCompanies],
  ({ response }) => getTallyCompanyRows(response),
);

export const selectTallyCompanyCount = createSelector(
  [selectTallyCompanies, selectTallyCompanyRows],
  ({ response }, rows) => (response ? rows.length : null),
);
