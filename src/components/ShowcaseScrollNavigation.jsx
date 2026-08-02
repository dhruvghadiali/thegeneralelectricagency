import { memo, useState } from "react";
import { LogIn } from "lucide-react";
import { showcaseSections } from "@/utils/showcaseSections";
import "./ShowcaseScrollNavigation.css";
import logoImage from "@Assets/images/logo.png";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

/**
 * Purely presentational. The active section is owned by the page so the
 * navigation, the foreground content and the motor animation all render from
 * the same value in the same commit.
 */
function ShowcaseScrollNavigation({
  activeIndex = 0,
  isRevealed = false,
  onSelectSection,
  onSignIn,
}) {
  const [previewIndex, setPreviewIndex] = useState(null);
  const expandedIndex = previewIndex ?? activeIndex;

  const handleSelect = (index) => {
    setPreviewIndex(null);
    onSelectSection?.(index);
  };

  return (
    <nav
      className={`showcase-scroll-nav ${
        isRevealed ? "showcase-scroll-nav--revealed" : ""
      }`}
      aria-label="Home showcase navigation"
    >
      <div
        className={`motor-scroll-animation__overlay showcase-scroll-nav__intro flex items-start justify-between gap-4 ${
          isRevealed ? "showcase-scroll-nav__intro--hidden" : ""
        }`}
      >
        <div className="w-[min(22rem,100%)] shrink">
          <div className="motor-scroll-animation__logo-mark">
            <img
              src={logoImage}
              alt="The General Electric Stores"
              className="motor-scroll-animation__logo"
            />
          </div>
          <Typography as="h2" variant="sectionTitle">
            The General Electric Stores
          </Typography>
          <Typography variant="body">
            India's Largest Dealer in Rotating Machine & Drives
          </Typography>
        </div>
        <div className="pointer-events-auto hidden shrink-0 lg:block">
          <Button
            type="button"
            variant="outline"
            className="bg-[#164863] text-white hover:bg-[#0f2f46] hover:text-white border-white/20 hover:cursor-pointer"
            onClick={() => onSignIn?.()}
          >
            <LogIn />
            Sign in
          </Button>
        </div>
      </div>

      <button
        type="button"
        className="showcase-scroll-nav__control"
        aria-label="Go to overview"
        onClick={() => handleSelect(0)}
      >
        <img
          src={logoImage}
          alt="The General Electric Stores"
          className="showcase-scroll-nav__control-logo"
        />
      </button>

      <div className="showcase-scroll-nav__items">
        {showcaseSections.map((section, index) => {
          const isActive = index === activeIndex;
          const isExpanded = index === expandedIndex;
          const { Icon } = section;

          return (
            <button
              key={section.id}
              type="button"
              className={`showcase-scroll-nav__item ${
                isActive ? "showcase-scroll-nav__item--active" : ""
              } ${isExpanded ? "showcase-scroll-nav__item--expanded" : ""}`}
              style={{ "--showcase-nav-index": index }}
              onMouseEnter={() => setPreviewIndex(index)}
              onMouseLeave={() => setPreviewIndex(null)}
              onFocus={() => setPreviewIndex(index)}
              onBlur={() => setPreviewIndex(null)}
              onClick={() => handleSelect(index)}
              aria-label={`Show ${section.label}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span className="showcase-scroll-nav__icon" aria-hidden="true">
                <Icon size={18} strokeWidth={2.25} />
              </span>
              <Typography
                as="span"
                variant="nav"
                className="showcase-scroll-nav__label"
              >
                {section.label}
              </Typography>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// Re-renders only when the active section or reveal state actually changes.
export default memo(ShowcaseScrollNavigation);
