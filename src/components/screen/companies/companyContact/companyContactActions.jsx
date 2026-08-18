import { Eye } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function CompanyContactActions({ contact, onView }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onView(contact)}
      aria-label={`View ${contact.contactPersonName} at ${contact.companyName}`}
      title="View company details"
    >
      <Eye className="size-4" />
    </Button>
  );
}

export default CompanyContactActions;
