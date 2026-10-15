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
          className="flex w-full items-center gap-3 px-4 py-4 text-left outline-none transition-colors hover:bg-muted/40 focus-visible:outline-none sm:px-6"
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
          <ChevronDown
            className={cn(
              "size-5 shrink-0 text-muted-foreground transition-transform",
              isOpen && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>
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
