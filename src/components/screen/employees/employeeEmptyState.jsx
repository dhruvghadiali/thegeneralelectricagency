import { UsersRound } from "lucide-react";

function EmployeeEmptyState({ hasFilters }) {
  return (
    <div className="px-4 py-14 text-center">
      <UsersRound className="mx-auto size-8 text-muted-foreground/50" />
      <p className="mt-3 font-medium">No employees found</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {hasFilters
          ? "Try changing your search or role filter."
          : "Add your first employee to start building the directory."}
      </p>
    </div>
  );
}

export default EmployeeEmptyState;
