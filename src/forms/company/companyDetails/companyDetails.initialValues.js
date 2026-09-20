export const COMPANY_DETAILS_INITIAL_VALUES = {
  companyName: "",
  companyType: "",
  email: "",
  phoneNumber: "",
  gstNumber: "",
  panNumber: "",
  website: "",
  addresses: [
    {
      address: "",
      state: "",
      pincode: "",
      companyEmployees: [
        {
          contactPersonName: "",
          contactPersonMobileNumber: "",
          contactPersonPosition: "",
        },
      ],
    },
  ],
};

export const EMPTY_COMPANY_ADDRESS = {
  address: "",
  state: "",
  pincode: "",
  companyEmployees: [],
};

export const EMPTY_COMPANY_CONTACT = {
  contactPersonName: "",
  contactPersonMobileNumber: "",
  contactPersonPosition: "",
};
