import { ThemeSwitch } from "@/components/ui/theme-switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import logoImage from "@Assets/images/logo.png";
import LargeScreenNavigationMenuComponent from "@Components/navigationMenu/largeScreenNavigationMenu";
import MobileScreenNavigationMenuComponent from "@Components/navigationMenu/mobileScreenNavigationMenu";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "#home", label: "Home" },
  {
    label: "Services",
    submenu: true,
    type: "description",
    items: [
      {
        href: "#services",
        label: "Motors",
        description: "CG offers wide range of electrical motors.",
      },
      {
        href: "#services",
        label: "Drives",
        description: "CG drives & automation offers complete drive solutions.",
      },
      {
        href: "#services",
        label: "Pumps",
        description: "CG offers wide range of energy efficient pumps.",
      },
      {
        href: "#services",
        label: "Gear Boxes",
        description: "Premium transmission provides high quality, precision-engineered power transmission.",
      },
      {
        href: "#services",
        label: "Cables",
        description: "Effective way of transporting energy with maximum efficiency and minimum carbon footprint.",
      },
      {
        href: "#services",
        label: "Spares",
        description: "We provide genuine spare parts for all products we supply.",
      },
    ],
  },
  { href: "#clients", label: "Clients" },
  { href: "#awards", label: "Awards" },
  { href: "#projects", label: "Projects" },
  { href: "#about-us", label: "About us" },
];

function NavigationMenuComponent() {
  return (
    <header className="sticky top-0 bg-primary px-4 md:px-6 z-50 shadow-lg">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <MobileScreenNavigationMenuComponent
            navigationLinks={navigationLinks}
          />

          {/* Main nav */}
          <div className="relative flex items-center gap-6">
            <Avatar className="bg-white h-14 w-14">
              <AvatarImage src={logoImage} />
              <AvatarFallback>GE</AvatarFallback>
            </Avatar>
            {/* Navigation menu */}
            <LargeScreenNavigationMenuComponent
              navigationLinks={navigationLinks}
            />
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}

export default NavigationMenuComponent;
