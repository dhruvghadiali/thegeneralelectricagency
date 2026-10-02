export function omitEmptyPayloadFields(payload) {
  return Object.fromEntries(
    Object.entries(payload).flatMap(([key, value]) => {
      if (value === null || value === undefined) return [];
      if (typeof value === "string" && value.trim() === "") return [];

      if (value && typeof value === "object" && !Array.isArray(value)) {
        const nested = omitEmptyPayloadFields(value);
        return Object.keys(nested).length ? [[key, nested]] : [];
      }

      return [[key, value]];
    }),
  );
}
