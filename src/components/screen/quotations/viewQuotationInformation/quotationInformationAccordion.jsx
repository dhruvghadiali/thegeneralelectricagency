import { createElement, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

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
  const [isTriggerFocused, setIsTriggerFocused] = useState(false);
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
      className={cn(
        "scroll-mt-4 overflow-hidden rounded-xl border bg-card shadow-sm outline-none transition-[border-color,box-shadow]",
        isTriggerFocused && "border-ring ring-2 ring-ring",
      )}
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
            onFocus={() => setIsTriggerFocused(true)}
            onBlur={() => setIsTriggerFocused(false)}
            onClick={handleToggle}
            style={{ cursor: "pointer" }}
            className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 px-4 py-4 text-left outline-none focus-visible:outline-none sm:px-6"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {createElement(icon, {
                className: "size-5",
                "aria-hidden": true,
              })}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">{title}</span>
              <span className="mt-0.5 block text-sm font-normal text-muted-foreground">
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
            className="flex size-12 shrink-0 cursor-pointer items-center justify-center text-muted-foreground outline-none transition-colors hover:text-foreground sm:mr-2"
          >
            <ChevronDown
              className={cn(
                "size-5 transition-transform",
                isOpen && "rotate-180",
              )}
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
          className="border-t px-4 py-5 sm:px-6"
        >
          {children}
        </div>
      )}
    </section>
  );
}

export default QuotationInformationAccordion;
