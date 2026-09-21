import assert from "node:assert/strict";
import { test } from "node:test";
import { ledgerDetails, sanitizeTallyXml } from "../src/tally/get/debiters.parser.js";

function element(localName, textContent = "", children = [], attributes = {}) {
  return {
    localName, textContent: textContent || children.map((child) => child.textContent).join(""), children,
    getAttribute: (name) => attributes[name] ?? null,
    getElementsByTagName: () => children.flatMap((child) => [child, ...child.getElementsByTagName("*")]),
  };
}

test("maps mailing, contact, tax and ledger settings without inventing missing values", () => {
  const ledger = element("LEDGER", "", [
    element("MAILINGNAME.LIST", "", [element("MAILINGNAME", "Example Engineering")]),
    element("ADDRESS.LIST", "", [element("ADDRESS", "Street 1"), element("ADDRESS", "City")]),
    element("LEDSTATENAME", "Gujarat"), element("COUNTRYNAME", "India"),
    element("PINCODE", "393002"), element("LEDGERMOBILE", "1234567890"),
    element("INCOMETAXNUMBER", "ABCDE1234F"), element("PARTYGSTIN", "24ABCDE1234F1Z5"),
    element("GSTREGISTRATIONTYPE", "Regular"), element("OPENINGBALANCE", "0.00"),
    element("ISBILLWISEON", "Yes"), element("ISTDSDEDUCTABLE", "No"),
  ], { NAME: "Example Engineering" });
  const result = ledgerDetails(ledger);
  assert.equal(result.address, "Street 1\nCity");
  assert.equal(result.mailingName, "Example Engineering");
  assert.equal(result.state, "Gujarat");
  assert.equal(result.pincode, "393002");
  assert.equal(result.gstin, "24ABCDE1234F1Z5");
  assert.equal(result.registrationType, "Regular");
  assert.equal(result.openingBalance, "0.00");
  assert.equal(result.billWise, "Yes");
  assert.equal(result.tdsDeductible, "No");
  assert.equal(result.email, "");
});

test("removes Tally control markers in decimal, hexadecimal, and literal form", () => {
  assert.equal(sanitizeTallyXml('<PARENT>&#4;&#x04;\u0004 Primary</PARENT>'), '<PARENT> Primary</PARENT>');
});

test("preserves escaped names, Unicode, whitespace and balances", () => {
  const xml = '<LEDGER NAME="A &amp; B">\n<NAME>ગુજરાત ₹ &#8377; &#x1F600;</NAME>\t<CLOSINGBALANCE>-272919.00</CLOSINGBALANCE>\r\n</LEDGER>';
  assert.equal(sanitizeTallyXml(xml), xml);
});

test("does not conceal malformed XML or unknown named entities", () => {
  const xml = '<LEDGER><NAME>&unknown;</LEDGER>';
  assert.equal(sanitizeTallyXml(xml), xml);
});
