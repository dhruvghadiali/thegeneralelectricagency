import { ExternalLink, Mail, MapPin, Phone, X } from "lucide-react";
import { createPortal } from "react-dom";

import useScrollLock from "@/utils/useScrollLock";
import { Typography } from "@shadcnComponent/typography";
import {
  CONTACT_SHEET_TYPE,
  emailContacts,
  offices,
  phoneContacts,
} from "./contactShowcase.constants";

function getSheetCopy(activeContactSheet) {
  if (activeContactSheet === CONTACT_SHEET_TYPE.DIRECTIONS) {
    return {
      label: "Google Map Location",
      title: "Office directions",
      Icon: MapPin,
    };
  }

  if (activeContactSheet === CONTACT_SHEET_TYPE.EMAIL) {
    return {
      label: "Email Contacts",
      title: "Email our team",
      Icon: Mail,
    };
  }

  return {
    label: "Phone Contacts",
    title: "Call our team",
    Icon: Phone,
  };
}

function DirectionLocations() {
  return (
    <div className="contact-directions-sheet__locations">
      {offices.map((office) => (
        <article
          className="contact-directions-sheet__location-card"
          key={office.name}
        >
          <div className="contact-directions-sheet__office">
            <MapPin size={17} strokeWidth={2.45} />
            <Typography as="span" variant="label">{office.name}</Typography>
            <Typography as="strong" variant="bodySmall">{office.address}</Typography>
          </div>

          <iframe
            title={`${office.name} map`}
            src={office.mapUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <a href={office.directionUrl} target="_blank" rel="noreferrer">
            <Typography as="span" variant="label">Open in Google Maps</Typography>
            <ExternalLink size={15} strokeWidth={2.4} />
          </a>
        </article>
      ))}
    </div>
  );
}

function EmailContactList() {
  return (
    <div className="contact-directions-sheet__contact-list">
      {emailContacts.map((email) => (
        <a href={`mailto:${email}`} key={email}>
          <Mail size={18} strokeWidth={2.45} />
          <Typography as="span" variant="label">Email</Typography>
          <Typography as="strong" variant="bodySmall">{email}</Typography>
          <ExternalLink size={15} strokeWidth={2.4} />
        </a>
      ))}
    </div>
  );
}

function PhoneContactList() {
  return (
    <div className="contact-directions-sheet__contact-list">
      {phoneContacts.map((contact) => (
        <a
          href={`tel:${contact.phone.replace(/\s+/g, "")}`}
          key={contact.label}
        >
          <Phone size={18} strokeWidth={2.45} />
          <Typography as="span" variant="label">{contact.label}</Typography>
          <Typography as="strong" variant="bodySmall">{contact.phone}</Typography>
          <ExternalLink size={15} strokeWidth={2.4} />
        </a>
      ))}
    </div>
  );
}

function ContactDetailSheet({ activeContactSheet, onClose }) {
  // Hooks must run before the early return below, so the lock is conditional
  // on there actually being a sheet to show.
  useScrollLock(Boolean(activeContactSheet));

  if (!activeContactSheet) {
    return null;
  }

  const { label, title, Icon } = getSheetCopy(activeContactSheet);

  const sheet = (
    <div
      className={`service-detail-sheet contact-directions-sheet contact-directions-sheet--${activeContactSheet}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-directions-sheet-title"
    >
      <button
        type="button"
        className="service-detail-sheet__overlay contact-directions-sheet__overlay"
        aria-label="Close contact details"
        onClick={onClose}
      />

      <section
        className="service-detail-sheet__content contact-directions-sheet__content"
        data-lenis-prevent
      >
        <div
          className="service-detail-sheet__handle contact-directions-sheet__handle"
          aria-hidden="true"
        />

        <button
          type="button"
          className="service-detail-sheet__close contact-directions-sheet__close"
          aria-label="Close contact details"
          onClick={onClose}
        >
          <X size={18} strokeWidth={2.4} />
        </button>

        <div className="contact-directions-sheet__header">
          <Typography as="span" variant="overline">
            <Icon size={15} strokeWidth={2.4} />
            {label}
          </Typography>
          <Typography as="h2" variant="sheetTitle" id="contact-directions-sheet-title">{title}</Typography>
        </div>

        <div className="contact-directions-sheet__body">
          {activeContactSheet === CONTACT_SHEET_TYPE.DIRECTIONS && (
            <DirectionLocations />
          )}
          {activeContactSheet === CONTACT_SHEET_TYPE.EMAIL && (
            <EmailContactList />
          )}
          {activeContactSheet === CONTACT_SHEET_TYPE.PHONE && (
            <PhoneContactList />
          )}
        </div>
      </section>
    </div>
  );

  if (typeof document === "undefined") {
    return sheet;
  }

  return createPortal(sheet, document.body);
}

export default ContactDetailSheet;
