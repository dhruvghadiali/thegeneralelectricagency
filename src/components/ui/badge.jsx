import { cn } from "@/lib/utils";

const variants = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  success: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-400",
  warning: "bg-amber-500/12 text-amber-700 dark:text-amber-400",
  destructive: "bg-destructive/12 text-destructive",
  outline: "border border-border text-foreground",
};

function Badge({ className, variant = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
