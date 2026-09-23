import { createSelector } from "@reduxjs/toolkit";

export const selectTallyCompanies = (state) => state.tally.companies;
export const selectTallyProducts = (state) => state.tally.products;

function countRecords(records) {
  if (Array.isArray(records)) return records.length;
  return records && typeof records === "object" ? 1 : 0;
}

function countNestedRecords(value, recordName) {
  if (!value || typeof value !== "object") return 0;
  if (Array.isArray(value)) {
    return value.reduce(
      (total, item) => total + countNestedRecords(item, recordName),
      0,
    );
  }

  return Object.entries(value).reduce((total, [name, item]) => {
    if (name.split(":").at(-1).toUpperCase() === recordName) {
      return total + countRecords(item);
    }

    return total + countNestedRecords(item, recordName);
  }, 0);
}

function countTallyRecords(response, recordName, jsonKeys) {
  if (!response) return null;

  const data = response.data;
  const collection = data?.ENVELOPE?.BODY?.DATA?.COLLECTION;

  if (collection !== undefined) {
    const collections = Array.isArray(collection) ? collection : [collection];
    const count = collections.reduce(
      (total, item) => total + countRecords(item?.[recordName]),
      0,
    );
    if (count > 0) return count;
  }

  if (Array.isArray(data)) return data.length;

  for (const key of jsonKeys) {
    const records = data?.[key] ?? data?.data?.[key];
    if (records !== undefined) return countRecords(records);
  }

  const nestedCount = countNestedRecords(data, recordName);
  if (nestedCount > 0) return nestedCount;

  const rawText = data?.text;
  if (typeof rawText === "string" && /<COLLECTION\b/i.test(rawText)) {
    return rawText.match(new RegExp(`<${recordName}\\b[^>]*\\bNAME\\s*=`, "gi"))?.length ?? 0;
  }

  return response.format === "xml" ? 0 : null;
}

export const selectTallyCompanyCount = createSelector(
  [selectTallyCompanies],
  ({ response }) => countTallyRecords(response, "LEDGER", ["companies", "ledgers"]),
);

export const selectTallyProductCount = createSelector(
  [selectTallyProducts],
  ({ response }) => countTallyRecords(response, "STOCKITEM", ["products", "stockItems"]),
);
