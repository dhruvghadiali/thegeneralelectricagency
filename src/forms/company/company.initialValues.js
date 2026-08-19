export const COMPANY_INITIAL_VALUES = {
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
  pincode: "",
  companyEmployees: [],
};

export const EMPTY_COMPANY_CONTACT = {
  contactPersonName: "",
  contactPersonMobileNumber: "",
  contactPersonPosition: "",
};
