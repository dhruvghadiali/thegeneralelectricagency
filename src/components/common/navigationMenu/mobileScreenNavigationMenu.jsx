import { Button } from "@ShadcnComponents/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@ShadcnComponents/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ShadcnComponents/popover";
import { useNavigate } from "react-router-dom";

function MobileScreenNavigationMenuComponent({ navigationLinks, useLink }) {
  const navigate = useNavigate();
  const handleSectionScroll = (href) => {
    // Extract the section ID from href (remove the # symbol)
    const sectionId = href.replace("#", "");
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  const handleNavigateAndScroll = (link) => {
    console.log("Navigating and scrolling to:", link);
    // First navigate to home page
    navigate("/");

    // Then scroll to the section after a brief delay to ensure page is loaded
    setTimeout(() => {
      console.log("Scrolling to section:", link.href);
      handleSectionScroll(link.href);
    }, 300);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="group size-8 lg:hidden text-secondary hover:text-primary-foreground hover:bg-primary transition-all duration-200"
          variant="ghost"
          size="icon"
        >
          <svg
            className="pointer-events-none"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12L20 12"
              className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
            />
            <path
              d="M4 12H20"
              className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
            />
            <path
              d="M4 12H20"
              className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
            />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-1 mt-3 lg:hidden">
        <NavigationMenu className="max-w-none *:w-full">
          <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
            {navigationLinks.map((link, index) => (
              <NavigationMenuItem key={index} className="w-full">
                {link.submenu ? (
                  <>
                    <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                      {link.label}
                    </div>
                    <ul>
                      {link.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <NavigationMenuLink
                            href={useLink ? item.href : undefined}
                            onClick={(e) => {
                              e.preventDefault();
                              if (useLink) {
                                handleNavigateAndScroll(item);
                              } else {
                                handleSectionScroll(item.href);
                              }
                            }}
                            className="py-1.5 text-card-foreground hover:text-primary hover:bg-accent px-2 rounded transition-all duration-200 cursor-pointer"
                          >
                            {item.label}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <NavigationMenuLink
                    href={useLink ? link.href : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      if (useLink) {
                        handleNavigateAndScroll(link);
                      } else {
                        handleSectionScroll(link.href);
                      }
                    }}
                    className="py-1.5 text-card-foreground hover:text-primary hover:bg-accent px-2 rounded transition-all duration-200 cursor-pointer"
                  >
                    {link.label}
                  </NavigationMenuLink>
                )}
                {/* Add separator between different types of items */}
                {index < navigationLinks.length - 1 &&
                  // Show separator if:
                  // 1. One is submenu and one is simple link OR
                  // 2. Both are submenus but with different types
                  ((!link.submenu && navigationLinks[index + 1].submenu) ||
                    (link.submenu && !navigationLinks[index + 1].submenu) ||
                    (link.submenu &&
                      navigationLinks[index + 1].submenu &&
                      link.type !== navigationLinks[index + 1].type)) && (
                    <div
                      role="separator"
                      aria-orientation="horizontal"
                      className="bg-border -mx-1 my-1 h-px w-full"
                    />
                  )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </PopoverContent>
    </Popover>
  );
}

export default MobileScreenNavigationMenuComponent;
