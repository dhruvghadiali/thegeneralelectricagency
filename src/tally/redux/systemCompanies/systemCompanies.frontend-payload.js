export function fromSystemCompaniesResponse(response) {
  if (!Array.isArray(response?.tally_companies)) {
    throw new Error("The system companies response is missing tally_companies.");
  }

  return response.tally_companies;
}
