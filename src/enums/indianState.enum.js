export const INDIAN_STATES = Object.freeze({
  ANDHRA_PRADESH: "Andhra Pradesh",
  ARUNACHAL_PRADESH: "Arunachal Pradesh",
  ASSAM: "Assam",
  BIHAR: "Bihar",
  CHHATTISGARH: "Chhattisgarh",
  GOA: "Goa",
  GUJARAT: "Gujarat",
  HARYANA: "Haryana",
  HIMACHAL_PRADESH: "Himachal Pradesh",
  JHARKHAND: "Jharkhand",
  KARNATAKA: "Karnataka",
  KERALA: "Kerala",
  MADHYA_PRADESH: "Madhya Pradesh",
  MAHARASHTRA: "Maharashtra",
  MANIPUR: "Manipur",
  MEGHALAYA: "Meghalaya",
  MIZORAM: "Mizoram",
  NAGALAND: "Nagaland",
  ODISHA: "Odisha",
  PUNJAB: "Punjab",
  RAJASTHAN: "Rajasthan",
  SIKKIM: "Sikkim",
  TAMIL_NADU: "Tamil Nadu",
  TELANGANA: "Telangana",
  TRIPURA: "Tripura",
  UTTAR_PRADESH: "Uttar Pradesh",
  UTTARAKHAND: "Uttarakhand",
  WEST_BENGAL: "West Bengal",
});

export const INDIAN_UNION_TERRITORIES = Object.freeze({
  ANDAMAN_AND_NICOBAR_ISLANDS: "Andaman and Nicobar Islands",
  CHANDIGARH: "Chandigarh",
  DADRA_AND_NAGAR_HAVELI_AND_DAMAN_AND_DIU:
    "Dadra and Nagar Haveli and Daman and Diu",
  DELHI: "Delhi",
  JAMMU_AND_KASHMIR: "Jammu and Kashmir",
  LADAKH: "Ladakh",
  LAKSHADWEEP: "Lakshadweep",
  PUDUCHERRY: "Puducherry",
});

export const INDIAN_STATES_AND_UNION_TERRITORIES = Object.freeze({
  ...INDIAN_STATES,
  ...INDIAN_UNION_TERRITORIES,
});

const toOptions = (values) =>
  Object.freeze(
    Object.values(values).map((value) =>
      Object.freeze({ value, label: value }),
    ),
  );

export const INDIAN_STATE_OPTIONS = toOptions(INDIAN_STATES);

export const INDIAN_UNION_TERRITORY_OPTIONS = toOptions(
  INDIAN_UNION_TERRITORIES,
);

export const INDIAN_STATE_AND_UNION_TERRITORY_OPTIONS = toOptions(
  INDIAN_STATES_AND_UNION_TERRITORIES,
);
