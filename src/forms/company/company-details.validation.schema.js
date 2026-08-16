import * as yup from "yup";

const optionalWebsite = yup
  .string()
  .trim()
  .test("website", "Enter a valid website URL", (value) => {
    if (!value) return true;

    try {
      new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
      return true;
    } catch {
      return false;
    }
  });

export const companyDetailsValidationSchema = yup.object({
  companyName: yup.string().trim().min(2, "Company name is too short").max(120).required("Company name is required"),
  companyType: yup.string().required("Company type is required"),
  industry: yup.string().trim().max(100).required("Industry is required"),
  gstNumber: yup
    .string()
    .trim()
    .uppercase()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/, "Enter a valid 15-character GSTIN")
    .required("GSTIN is required"),
  panNumber: yup
    .string()
    .trim()
    .uppercase()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Enter a valid PAN number")
    .required("PAN number is required"),
  email: yup.string().trim().email("Enter a valid email address").required("Business email is required"),
  phone: yup
    .string()
    .trim()
    .matches(/^[+]?[0-9][0-9\s-]{8,14}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  website: optionalWebsite,
  contactName: yup.string().trim().min(2, "Contact name is too short").max(100).required("Contact name is required"),
  contactDesignation: yup.string().trim().max(100),
  addressLine: yup.string().trim().min(5, "Enter the complete street address").max(250).required("Registered address is required"),
  city: yup.string().trim().max(80).required("City is required"),
  state: yup.string().trim().max(80).required("State is required"),
  postalCode: yup.string().trim().matches(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit PIN code").required("PIN code is required"),
});
