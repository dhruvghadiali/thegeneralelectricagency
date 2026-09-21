function elementsByTagName(node, tagName) {
  const normalizedTagName = tagName.toUpperCase();

  return Array.from(node.getElementsByTagName("*")).filter(
    (element) => element.localName?.toUpperCase() === normalizedTagName,
  );
}

function firstText(node, tagName) {
  return elementsByTagName(node, tagName)[0]?.textContent?.trim() ?? "";
}

function debiterName(ledger) {
  return ledger.getAttribute("NAME")?.trim() || firstText(ledger, "NAME");
}

function directText(node, tagName) {
  return Array.from(node.children).find((child) =>
    child.localName?.toUpperCase() === tagName,
  )?.textContent?.trim() ?? "";
}

function listText(ledger, listName, tagName) {
  const list = Array.from(ledger.children).find((child) => child.localName?.toUpperCase() === listName);
  return list ? elementsByTagName(list, tagName).map((item) => item.textContent.trim()).filter(Boolean).join("\n") : "";
}

export function ledgerDetails(ledger) {
  const text = (...tags) => tags.map((tag) => directText(ledger, tag)).find(Boolean) || "";
  const names = elementsByTagName(ledger, "NAME").map((item) => item.textContent.trim());
  return {
    alias: [...new Set(names.filter((name) => name && name !== debiterName(ledger)))].join(", "),
    mailingName: listText(ledger, "MAILINGNAME.LIST", "MAILINGNAME") || text("MAILINGNAME"),
    address: listText(ledger, "ADDRESS.LIST", "ADDRESS"),
    state: text("LEDSTATENAME", "LEDGERSTATENAME", "STATENAME"),
    country: text("COUNTRYNAME", "COUNTRYOFRESIDENCE"),
    pincode: text("PINCODE"),
    mobile: text("LEDGERMOBILE"),
    phone: text("LEDGERPHONE"),
    email: text("EMAIL"),
    contactPerson: text("LEDGERCONTACT"),
    pan: text("INCOMETAXNUMBER"),
    gstin: text("PARTYGSTIN") || firstText(ledger, "GSTIN"),
    registrationType: text("GSTREGISTRATIONTYPE") || firstText(ledger, "GSTREGISTRATIONTYPE"),
    openingBalance: text("OPENINGBALANCE"),
    billWise: text("ISBILLWISEON"),
    creditPeriod: text("BILLCREDITPERIOD"),
    checkCreditDays: text("ISCREDITDAYSCHKON"),
    interestCalculation: text("ISINTERESTON"),
    tdsDeductible: text("ISTDSDEDUCTABLE"),
    tcsApplicable: text("ISTCSAPPLICABLE"),
  };
}

function isXmlCharacter(code) {
  return code === 9 || code === 10 || code === 13 ||
    (code >= 0x20 && code <= 0xd7ff) ||
    (code >= 0xe000 && code <= 0xfffd) ||
    (code >= 0x10000 && code <= 0x10ffff);
}

export function sanitizeTallyXml(xml) {
  // Tally's internal markers (for example &#4; Primary) are invalid in XML 1.0.
  const withoutInvalidReferences = xml.replace(/&#(x[0-9a-f]+|[0-9]+);/gi, (reference, value) => {
    const code = value[0].toLowerCase() === "x"
      ? Number.parseInt(value.slice(1), 16)
      : Number.parseInt(value, 10);
    return isXmlCharacter(code) ? reference : "";
  });
  return Array.from(withoutInvalidReferences)
    .filter((character) => isXmlCharacter(character.codePointAt(0)))
    .join("");
}

export function parseDebitersXml(xml) {
  const document = new DOMParser().parseFromString(sanitizeTallyXml(xml), "application/xml");
  const parseError = document.querySelector("parsererror");

  if (parseError) {
    throw new Error("Tally returned an invalid XML response.");
  }

  const tallyError = firstText(document, "LINEERROR");
  if (tallyError) {
    throw new Error(tallyError);
  }

  return elementsByTagName(document, "LEDGER")
    .map((ledger, index) => {
      const name = debiterName(ledger);
      const parent = firstText(ledger, "PARENT");

      return {
        id: `${name || "debiter"}-${parent || "ledger"}-${index}`,
        name,
        parent,
        closingBalance: firstText(ledger, "CLOSINGBALANCE"),
        ...ledgerDetails(ledger),
      };
    })
    .filter((debiter) => debiter.name);
}
