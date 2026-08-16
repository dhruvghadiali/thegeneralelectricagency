export const COMPANY_DETAILS_INITIAL_VALUES = {
  company_name: "",
  company_type: "",
  email: "",
  phone_number: "",
  gst_number: "",
  pan_number: "",
  website: "",
  addresses: [
    {
      address: "",
      pincode: "",
      company_employees: [
        {
          contact_person_name: "",
          contact_person_mobile_number: "",
          contact_person_position: "",
        },
      ],
    },
  ],
};

export const EMPTY_COMPANY_ADDRESS = {
  address: "",
  pincode: "",
  company_employees: [],
};

export const EMPTY_COMPANY_CONTACT = {
  contact_person_name: "",
  contact_person_mobile_number: "",
  contact_person_position: "",
};
