import { Handshake, Home, MessageCircle, Users, Wrench } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import "./ShowcaseScrollNavigation.css";
import logoImage from "@Assets/images/logo.png";

const showcaseSections = [
  { id: "home", label: "Overview", Icon: Home },
  { id: "services", label: "Services", Icon: Wrench },
  { id: "clients", label: "Clients", Icon: Users },
  { id: "partners", label: "Partners", Icon: Handshake },
  { id: "contact-us", label: "Contact Us", Icon: MessageCircle },
];
const REVEAL_START_VH = 0.62;
const SECTION_STEP_VH = 1;
const CLICK_OFFSET_VH = 0.68;

function ShowcaseScrollNavigation({
  activeSection: controlledActiveSection,
  onActiveSectionChange,
  onNavigationRevealChange,
}) {
  const [internalActiveSection, setInternalActiveSection] = useState(
    showcaseSections[0].id,
  );
  const [isNavigationRevealed, setIsNavigationRevealed] = useState(false);
  const [previewSection, setPreviewSection] = useState(null);
  const activeSection = controlledActiveSection ?? internalActiveSection;
  const expandedSection = previewSection ?? activeSection;
  const sectionIds = useMemo(
    () => showcaseSections.map((section) => section.id),
    [],
  );

  useEffect(() => {
    let frameId = 0;

    const updateActiveSection = () => {
      const revealStart = window.innerHeight * REVEAL_START_VH;
      const sectionLength = window.innerHeight * SECTION_STEP_VH;
      const shouldRevealNavigation = window.scrollY > revealStart;
      const activeIndex = shouldRevealNavigation
        ? Math.min(
            sectionIds.length - 1,
            Math.max(0, Math.floor((window.scrollY - revealStart) / sectionLength)),
          )
        : 0;
      const nextSection = { id: sectionIds[activeIndex] };

      setInternalActiveSection((currentSection) => {
        if (currentSection !== nextSection.id) {
          onActiveSectionChange?.(nextSection.id);
        }

        return nextSection.id;
      });
      setIsNavigationRevealed((currentRevealState) => {
        const nextRevealState = currentRevealState || shouldRevealNavigation;

        if (currentRevealState !== nextRevealState) {
          onNavigationRevealChange?.(nextRevealState);
        }

        return nextRevealState;
      });
    };

    const queueUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      window.cancelAnimationFrame(frameId);
    };
  }, [onActiveSectionChange, onNavigationRevealChange, sectionIds]);

  const scrollToSection = (id) => {
    const targetIndex = sectionIds.indexOf(id);

    if (targetIndex === -1) {
      return;
    }

    setInternalActiveSection(id);
    setIsNavigationRevealed(true);
    onActiveSectionChange?.(id);
    onNavigationRevealChange?.(true);

    const targetTop =
      window.innerHeight * (CLICK_OFFSET_VH + targetIndex * SECTION_STEP_VH);

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };

  return (
    <nav
      className={`showcase-scroll-nav ${
        isNavigationRevealed ? "showcase-scroll-nav--revealed" : ""
      }`}
      aria-label="Home showcase navigation"
    >
      <div
        className={`motor-scroll-animation__overlay showcase-scroll-nav__intro ${
          isNavigationRevealed ? "showcase-scroll-nav__intro--hidden" : ""
        }`}
      >
        <div className="motor-scroll-animation__logo-mark">
          <img
            src={logoImage}
            alt="The General Electric Stores"
            className="motor-scroll-animation__logo"
          />
        </div>
        <h2>The General Electric Stores</h2>
        <p>India's Largest Dealer in Rotating Machine & Drives</p>
      </div>

      <button
        type="button"
        className="showcase-scroll-nav__control"
        aria-label="Go to overview"
        onClick={() => scrollToSection("home")}
      >
        <img
          src={logoImage}
          alt="The General Electric Stores"
          className="showcase-scroll-nav__control-logo"
        />
      </button>

      <div className="showcase-scroll-nav__items">
        {showcaseSections.map((section, index) => {
          const isActive = activeSection === section.id;
          const isExpanded = expandedSection === section.id;
          const { Icon } = section;

          return (
            <button
              key={section.id}
              type="button"
              className={`showcase-scroll-nav__item ${
                isActive ? "showcase-scroll-nav__item--active" : ""
              } ${
                isExpanded ? "showcase-scroll-nav__item--expanded" : ""
              }`}
              style={{ "--showcase-nav-index": index }}
              onMouseEnter={() => setPreviewSection(section.id)}
              onMouseLeave={() => setPreviewSection(null)}
              onFocus={() => setPreviewSection(section.id)}
              onBlur={() => setPreviewSection(null)}
              onClick={() => scrollToSection(section.id)}
              aria-label={`Show ${section.label}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span className="showcase-scroll-nav__icon" aria-hidden="true">
                <Icon size={18} strokeWidth={2.25} />
              </span>
              <span className="showcase-scroll-nav__label">
                {section.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default ShowcaseScrollNavigation;
