import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const typographyVariants = cva("font-sans", {
  variants: {
    variant: {
      inherit: "",
      display: "text-4xl font-bold leading-tight tracking-tight lg:text-6xl",
      pageTitle: "text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-6xl",
      sectionTitle: "text-2xl font-bold leading-tight tracking-tight lg:text-4xl",
      sheetTitle: "text-2xl font-semibold leading-tight tracking-tight",
      cardTitle: "text-lg font-semibold leading-snug",
      body: "text-base font-normal leading-relaxed",
      bodyLarge: "text-lg font-normal leading-relaxed lg:text-xl",
      bodySmall: "text-sm font-normal leading-relaxed",
      label: "text-sm font-medium leading-snug",
      nav: "text-sm font-medium leading-none",
      caption: "text-xs font-normal leading-snug",
      overline: "text-xs font-semibold uppercase leading-none tracking-wider",
    },
    tone: {
      inherit: "text-inherit",
      foreground: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      card: "text-card-foreground",
    },
  },
  defaultVariants: {
    variant: "body",
    tone: "inherit",
  },
});

/**
 * Shared text primitive for screens, navigation, cards, and sheets.
 * `as` keeps the correct semantic element while variants own typography.
 */
function Typography({ as = "p", variant, tone, className, ...props }) {
  const Comp = as;

  return (
    <Comp
      className={cn(typographyVariants({ variant, tone }), className)}
      {...props}
    />
  );
}

export { Typography };
