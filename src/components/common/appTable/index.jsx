import { cn } from "@/lib/utils";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell as ShadcnTableCell,
  TableHead as ShadcnTableHead,
  TableHeader,
  TableRow,
} from "@shadcnComponent/table";

function Table({ className, ...props }) {
  return (
    <ShadcnTable
      className={cn(
        "font-sans text-sm",
        "[&_th]:font-sans [&_th]:text-sm [&_th_*]:font-sans [&_th_*]:text-sm",
        "[&_td]:font-sans [&_td]:text-sm [&_td_*]:font-sans [&_td_*]:text-sm",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }) {
  return (
    <ShadcnTableHead
      className={cn("font-sans text-sm", className)}
      {...props}
    />
  );
}

function TableCell({ className, ...props }) {
  return (
    <ShadcnTableCell
      className={cn("font-sans text-sm", className)}
      {...props}
    />
  );
}

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
