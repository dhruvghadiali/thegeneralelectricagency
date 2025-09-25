import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

function LargeScreenNavigationMenuComponent({ navigationLinks }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleMouseEnter = (index) => {
    setOpenDropdown(index);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <nav className="max-lg:hidden">
      <ul className="flex items-center gap-2">
        {navigationLinks.map((link, index) => (
          <li key={index} className="relative">
            {link.submenu ? (
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center text-secondary hover:text-primary-foreground hover:bg-primary bg-transparent px-3 py-2 font-medium transition-all duration-200 rounded-md">
                  {link.label}
                  <ChevronDownIcon className="ml-1 h-4 w-4 transition-transform duration-200" />
                </button>
                
                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 z-[9999] min-w-[280px] bg-card shadow-xl border border-border rounded-md overflow-hidden mt-2 transition-all duration-200 ${
                    openDropdown === index
                      ? "opacity-100 visible transform translate-y-0"
                      : "opacity-0 invisible transform -translate-y-2"
                  }`}
                >
                  <div className="p-3 space-y-2">
                    {link.items && link.items.map((item, itemIndex) => (
                      <a
                        key={itemIndex}
                        href={item.href}
                        className="block px-4 py-3 text-card-foreground hover:text-primary hover:bg-accent rounded-md font-medium transition-all duration-200"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-base">{item.label}</span>
                          {item.description && (
                            <span className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</span>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                href={link.href}
                className="text-secondary hover:text-primary-foreground hover:bg-primary px-3 py-2 font-medium transition-all duration-200 rounded-md"
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default LargeScreenNavigationMenuComponent;
