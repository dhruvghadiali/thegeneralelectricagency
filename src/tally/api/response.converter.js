function convertXmlElement(element) {
  const attributes = Object.fromEntries(
    Array.from(element.attributes, ({ name, value }) => [name, value]),
  );
  const children = Array.from(element.children);
  const text = Array.from(element.childNodes)
    .filter((node) => node.nodeType === 3 || node.nodeType === 4)
    .map((node) => node.nodeValue)
    .join("")
    .trim();

  if (children.length === 0 && Object.keys(attributes).length === 0) {
    return text;
  }

  const result = new Map();

  if (Object.keys(attributes).length > 0) {
    result.set("@attributes", attributes);
  }

  for (const child of children) {
    const name = child.nodeName;
    const value = convertXmlElement(child);

    if (!result.has(name)) {
      result.set(name, value);
    } else if (Array.isArray(result.get(name))) {
      result.get(name).push(value);
    } else {
      result.set(name, [result.get(name), value]);
    }
  }

  if (text) {
    result.set("#text", text);
  }

  return Object.fromEntries(result);
}

/** Convert a Tally response to a serializable, format-tagged JSON value. */
export function convertTallyResponse(response) {
  if (response == null || response === "") {
    return { format: "empty", data: null };
  }

  if (typeof response !== "string") {
    return { format: "json", data: response };
  }

  const value = response.trim();

  if (!value) {
    return { format: "empty", data: null };
  }

  if (value.startsWith("<") && typeof DOMParser !== "undefined") {
    const document = new DOMParser().parseFromString(value, "application/xml");
    const hasParseError = document.getElementsByTagName("parsererror").length > 0;

    if (document.documentElement && !hasParseError) {
      const root = document.documentElement;
      return {
        format: "xml",
        data: { [root.nodeName]: convertXmlElement(root) },
      };
    }
  }

  try {
    return { format: "json", data: JSON.parse(value) };
  } catch {
    return { format: "text", data: { text: response } };
  }
}
