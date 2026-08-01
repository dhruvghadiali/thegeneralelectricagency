import { Handshake, Home, MessageCircle, Users, Wrench } from "lucide-react";

/**
 * Order of the home showcase sections.
 *
 * This is the ordering the scroll timeline, the navigation and the foreground
 * stage all read from, so the three can never disagree about which section is
 * at a given index.
 */
export const showcaseSections = [
  { id: "home", label: "Overview", Icon: Home },
  { id: "services", label: "Services", Icon: Wrench },
  { id: "clients", label: "Clients", Icon: Users },
  { id: "partners", label: "Partners", Icon: Handshake },
  { id: "contact-us", label: "Contact Us", Icon: MessageCircle },
];

export const showcaseSectionIds = showcaseSections.map((section) => section.id);
