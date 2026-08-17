import { Building2, MapPin, Phone, UserRound } from "lucide-react";

import {
  COLUMN_TYPES,
  COMPANY_TYPE_OPTIONS,
  CONTACT_POSITION_OPTIONS,
  MOBILE_SLOTS,
} from "@Enums";
import CompanyTypeBadge from "@screenComponent/companies/company/companyTypeBadge";
import ContactPositionBadge from "@screenComponent/companies/companyContact/contactPositionBadge";

export function createCompanyContactColumns(onCompanyOpen) {
  return [
    {
      key: "contactPersonName",
      header: "Contact person",
      filterLabel: "Contact person name",
      type: COLUMN_TYPES.TEXT,
      field: "contactPersonName",
      sortKey: "contact_person_name",
      filterKey: "contact_person_name",
      mobile: MOBILE_SLOTS.PRIMARY,
      mobileIcon: UserRound,
      width: "240px",
      className: "font-medium",
    },
    {
      key: "contactPersonMobileNumber",
      header: "Mobile number",
      filterLabel: "Mobile number",
      type: COLUMN_TYPES.TEXT,
      field: "contactPersonMobileNumber",
      sortKey: "contact_person_mobile_number",
      filterKey: "contact_person_mobile_number",
      mobile: MOBILE_SLOTS.META,
      mobileIcon: Phone,
      width: "190px",
      render: (contact) => (
        <a
          href={`tel:${contact.contactPersonMobileNumber}`}
          className="text-primary hover:underline"
        >
          {contact.contactPersonMobileNumber}
        </a>
      ),
    },
    {
      key: "contactPersonPosition",
      header: "Position",
      filterLabel: "Position",
      type: COLUMN_TYPES.SELECT,
      field: "contactPersonPosition",
      sortKey: "contact_person_position",
      filterKey: "contact_person_position",
      options: CONTACT_POSITION_OPTIONS,
      allOptionLabel: "All positions",
      mobile: MOBILE_SLOTS.BADGE,
      width: "180px",
      render: (contact) => (
        <ContactPositionBadge position={contact.contactPersonPosition} />
      ),
    },
    {
      key: "companyName",
      header: "Company",
      filterLabel: "Company name",
      type: COLUMN_TYPES.TEXT,
      field: "companyName",
      sortKey: "company_name",
      filterKey: "company_name",
      mobile: MOBILE_SLOTS.SECONDARY,
      mobileIcon: Building2,
      width: "360px",
      render: (contact) => (
        <button
          type="button"
          onClick={() => onCompanyOpen(contact)}
          className="text-left font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {contact.companyName}
        </button>
      ),
    },
    {
      key: "companyType",
      header: "Company type",
      filterLabel: "Company type",
      type: COLUMN_TYPES.SELECT,
      field: "companyType",
      sortKey: "company_type",
      filterKey: "company_type",
      options: COMPANY_TYPE_OPTIONS,
      allOptionLabel: "All company types",
      width: "190px",
      render: (contact) => <CompanyTypeBadge type={contact.companyType} />,
    },
    {
      key: "companyAddress",
      header: "Company address",
      filterLabel: "Company address",
      type: COLUMN_TYPES.TEXT,
      field: "companyAddress",
      sortKey: "company_address",
      filterKey: "company_address",
      mobile: MOBILE_SLOTS.META,
      mobileIcon: MapPin,
      width: "620px",
    },
    {
      key: "companyAddressPincode",
      header: "PIN code",
      filterLabel: "PIN code",
      type: COLUMN_TYPES.TEXT,
      field: "companyAddressPincode",
      sortKey: "company_address_pincode",
      filterKey: "company_address_pincode",
      width: "140px",
    },
  ];
}
