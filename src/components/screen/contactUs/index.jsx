import { ArrowUpRight, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";

import ContactActionButton from "./ContactActionButton";
import ContactDetailSheet from "./ContactDetailSheet";
import { CONTACT_SHEET_TYPE } from "./contactShowcase.constants";
import { Typography } from "@/components/ui/typography";

function ContactUsScreenComponent() {
  const [activeContactSheet, setActiveContactSheet] = useState(null);

  useEffect(() => {
    if (!activeContactSheet) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveContactSheet(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeContactSheet]);

  return (
    <section className="contact-showcase" id="contact-us" aria-label="Contact us">
      <div className="contact-showcase__shell">
        <div className="contact-showcase__home-surface">
          <div className="contact-showcase__eyebrow">
            <Send size={15} strokeWidth={2.4} />
            Contact Us
          </div>

          <div className="contact-showcase__frame-label">
            <MapPin size={18} strokeWidth={2.4} />
            <Typography as="span" variant="label">Ankleshwar & Bharuch</Typography>
          </div>

          <Typography as="h2" variant="sectionTitle" className="contact-showcase__title">
            Reach our industrial supply team.
          </Typography>

          <div className="contact-showcase__home-actions">
            <ContactActionButton
              label="Directions"
              mobileLabel="Get Directions"
              TrailingIcon={ArrowUpRight}
              onClick={() => setActiveContactSheet(CONTACT_SHEET_TYPE.DIRECTIONS)}
            />
            <ContactActionButton
              label="Email"
              Icon={Mail}
              onClick={() => setActiveContactSheet(CONTACT_SHEET_TYPE.EMAIL)}
            />
            <ContactActionButton
              label="Phone"
              Icon={Phone}
              onClick={() => setActiveContactSheet(CONTACT_SHEET_TYPE.PHONE)}
            />
          </div>

          <div className="contact-showcase__home-details">
            <div
              className="contact-showcase__home-detail contact-showcase__home-detail--time"
              style={{ "--home-card-index": 0 }}
            >
              <Clock size={17} strokeWidth={2.4} />
              <Typography as="span" variant="caption">Office Time</Typography>
              <Typography as="strong" variant="label">Mon - Sat, 9:30 AM - 6:00 PM</Typography>
              <Typography as="small" variant="caption">Sunday closed</Typography>
            </div>
          </div>
        </div>
      </div>

      <ContactDetailSheet
        activeContactSheet={activeContactSheet}
        onClose={() => setActiveContactSheet(null)}
      />
    </section>
  );
}

export default ContactUsScreenComponent;
