import { Avatar, AvatarFallback, AvatarImage } from "@shadcnComponent/avatar";
import { useEffect, useState } from "react";

import logoImage from "@Assets/images/logo.png";
import LargeScreenNavigationMenuComponent from "@commonComponent/navigationMenu/largeScreenNavigationMenu";
import MobileScreenNavigationMenuComponent from "@commonComponent/navigationMenu/mobileScreenNavigationMenu";
import { HOME_SECTIONS, ROUTES } from "@routes/navigate";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: HOME_SECTIONS.HOME, label: "Home" },
  {
    label: "Services",
    submenu: true,
    type: "description",
    items: [
      {
        href: ROUTES.MOTORS,
        label: "Motors",
        description: "CG offers wide range of electrical motors.",
      },
      {
        href: ROUTES.DRIVES,
        label: "Drives",
        description: "CG drives & automation offers complete drive solutions.",
      },
      {
        href: ROUTES.PUMPS,
        label: "Pumps",
        description: "CG offers wide range of energy efficient pumps.",
      },
      {
        href: ROUTES.GEAR_BOXES,
        label: "Gear Boxes",
        description:
          "Premium transmission provides high quality, precision-engineered power transmission.",
      },
      {
        href: ROUTES.CABLES,
        label: "Cables",
        description:
          "Effective way of transporting energy with maximum efficiency and minimum carbon footprint.",
      },
      {
        href: ROUTES.SPARES,
        label: "Spares",
        description:
          "We provide genuine spare parts for all products we supply.",
      },
    ],
  },
  { href: HOME_SECTIONS.CLIENTS, label: "Clients" },
  { href: HOME_SECTIONS.PARTNERS, label: "Partners" },
  { href: HOME_SECTIONS.CONTACT_US, label: "Contact us" },
];

function NavigationMenuComponent({ useLink }) {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = Object.values(HOME_SECTIONS).map((href) => href.slice(1));

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.38;
      const currentSection = sectionIds
        .map((id) => {
          const element = document.getElementById(id);
          return element ? { id, top: element.offsetTop } : null;
        })
        .filter(Boolean)
        .reduce((active, section) => {
          if (section.top <= scrollPosition && section.top >= active.top) {
            return section;
          }

          return active;
        }, { id: "home", top: Number.NEGATIVE_INFINITY });

      setActiveSection(currentSection.id);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <header className="sticky top-0 bg-primary px-4 md:px-6 z-50 shadow-lg">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <MobileScreenNavigationMenuComponent
            navigationLinks={navigationLinks}
            useLink={useLink}
            activeSection={activeSection}
          />

          {/* Main nav */}
          <div className="relative flex items-center gap-6">
            <Avatar className="bg-white h-12 w-12">
              <AvatarImage src={logoImage} />
              <AvatarFallback>GE</AvatarFallback>
            </Avatar>
            {/* Navigation menu */}
            <LargeScreenNavigationMenuComponent
              useLink={useLink}
              navigationLinks={navigationLinks}
              activeSection={activeSection}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavigationMenuComponent;
