import { DATE_FORMATS, formatDate } from "@/utils/date.util";

const yesNo = (value) => value == null ? "—" : value ? "Yes" : "No";
const status = (value) => value == null ? "—" : value ? "Active" : "Inactive";
const dateTime = (value) => formatDate(value, DATE_FORMATS.DATE_TIME);

export const COMPANY_DETAILS = [
  {
    title: "Company information",
    fields: [
      ["Record ID", "_id"],
      ["Company name", "company_name"],
      ["Tally company ID", "company_id"],
      ["Company code", "company_code"],
      ["Company type", "company_type"],
      ["GST number", "gst_number"],
      ["PAN number", "pan_number"],
    ],
  },
  {
    title: "Contact information",
    fields: [
      ["Email", "email"],
      ["Phone number", "phone_number"],
      ["Website", "website"],
    ],
  },
  {
    title: "Addresses",
    fields: [1, 2, 3].flatMap((index) => [
      [`Address ${index}`, `address${index}`],
      [`State ${index}`, `state${index}`],
      [`Pincode ${index}`, `pincode${index}`],
    ]),
  },
  {
    title: "Contact people",
    fields: [1, 2, 3].flatMap((index) => [
      [`Contact ${index} name`, `contact_person_name${index}`],
      [`Contact ${index} mobile number`, `contact_person_mobile_number${index}`],
      [`Contact ${index} position`, `contact_person_position${index}`],
    ]),
  },
  {
    title: "Status and activity",
    fields: [
      ["System generated", "is_system_generated", yesNo],
      ["Status", "is_active", status],
      ["Created at", "created_at", dateTime],
      ["Updated at", "updated_at", dateTime],
    ],
  },
  {
    title: "Created by",
    fields: [
      ["User ID", "created_by._id"],
      ["Employee ID", "created_by.emp_id"],
      ["Username", "created_by.username"],
      ["First name", "created_by.first_name"],
      ["Last name", "created_by.last_name"],
    ],
  },
  {
    title: "Updated by",
    fields: [
      ["User ID", "updated_by._id"],
      ["Employee ID", "updated_by.emp_id"],
      ["Username", "updated_by.username"],
      ["First name", "updated_by.first_name"],
      ["Last name", "updated_by.last_name"],
    ],
  },
];
