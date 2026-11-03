export const displayProductValue = (value) =>
  value === null || value === undefined || value === "" ? "—" : String(value);

export const displayProductPerson = (person) =>
  displayProductValue(
    person?.name || person?.username || person?.employeeId || person,
  );
