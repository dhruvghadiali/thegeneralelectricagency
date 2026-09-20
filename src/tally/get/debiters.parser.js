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

export function parseDebitersXml(xml) {
  const document = new DOMParser().parseFromString(xml, "application/xml");
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
      };
    })
    .filter((debiter) => debiter.name);
}
