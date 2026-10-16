import { createElement, useRef } from "react";
import { ChevronDown } from "lucide-react";

function QuotationInformationAccordion({
  id,
  title,
  description,
  icon,
  isOpen,
  onToggle,
  triggerRef,
  sectionIndex,
  action,
  children,
}) {
  const contentId = `${id}-content`;
  const sectionRef = useRef(null);
  const handleToggle = () => {
    const willOpen = !isOpen;
    onToggle();

    if (willOpen) {
      window.requestAnimationFrame(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "center",
        });
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="scroll-mt-4 overflow-hidden rounded-lg border bg-card shadow-sm outline-none transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-2 focus-within:ring-ring sm:rounded-xl"
    >
      <h2>
        <span
          className="flex cursor-pointer items-center transition-colors hover:bg-muted/40"
          style={{ cursor: "pointer" }}
        >
          <button
            ref={triggerRef}
            type="button"
            data-section-index={sectionIndex}
            aria-expanded={isOpen}
            aria-controls={contentId}
            aria-keyshortcuts="Enter"
            onClick={handleToggle}
            style={{ cursor: "pointer" }}
            className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 px-3 py-3 text-left outline-none focus-visible:outline-none sm:gap-3 sm:px-6 sm:py-4"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:size-10">
              {createElement(icon, {
                className: "size-4 sm:size-5",
                "aria-hidden": true,
              })}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold sm:text-base">
                {title}
              </span>
              <span className="mt-0.5 block text-xs font-normal leading-relaxed text-muted-foreground sm:text-sm">
                {description}
              </span>
            </span>
          </button>
          {action && (
            <span className="shrink-0" style={{ cursor: "pointer" }}>
              {action}
            </span>
          )}
          <button
            type="button"
            tabIndex={-1}
            aria-label={`${isOpen ? "Close" : "Open"} ${title}`}
            aria-expanded={isOpen}
            aria-controls={contentId}
            onClick={handleToggle}
            style={{ cursor: "pointer" }}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center text-muted-foreground outline-none transition-colors hover:text-foreground sm:mr-2 sm:size-12"
          >
            <ChevronDown
              className={`size-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        </span>
      </h2>
      {isOpen && (
        <div
          id={contentId}
          role="region"
          aria-label={title}
          className="border-t px-3 py-4 sm:px-6 sm:py-5"
        >
          {children}
        </div>
      )}
    </section>
  );
}

export default QuotationInformationAccordion;
