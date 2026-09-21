import assert from "node:assert/strict";
import { test } from "node:test";
import { getSharedGstinLedgers } from "../src/tally/get/sharedGstin.js";

test("groups matching GSTINs despite case and whitespace while excluding blanks and unique values", () => {
  const rows = [
    { name: "Branch B", gstin: " 24aabca2390m1zp " },
    { name: "Branch A", gstin: "24AABCA2390M1ZP" },
    { name: "Unique", gstin: "07AAACA0627Q1ZM" },
    { name: "Blank A", gstin: "" }, { name: "Blank B" },
    { name: "Placeholder A", gstin: "—" }, { name: "Placeholder B", gstin: "—" },
  ];
  const result = getSharedGstinLedgers(rows);
  assert.equal(result.groupCount, 1);
  assert.deepEqual(result.ledgers.map((row) => row.name), ["Branch A", "Branch B"]);
  assert.equal(rows[0].name, "Branch B");
});

test("empty data has no shared GSTIN groups", () => {
  assert.deepEqual(getSharedGstinLedgers([]), { groupCount: 0, ledgers: [] });
});
