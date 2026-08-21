import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

function CompanyPickerContent({ containerRef, className, ...props }) {
  return (
    <PopoverPrimitive.Portal container={containerRef?.current}>
      <PopoverPrimitive.Content
        align="start"
        sideOffset={4}
        className={cn(
          "z-50 w-[var(--radix-popover-trigger-width)] rounded-md border bg-popover text-popover-foreground shadow-md outline-hidden",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

export default CompanyPickerContent;
