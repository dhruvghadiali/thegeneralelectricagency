import { Search } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@shadcnComponent/dialog";
import { Input } from "@shadcnComponent/input";

function KeyboardNavigationDialog({
  activeIndex,
  commands,
  isOpen,
  onActiveIndexChange,
  onInputKeyDown,
  onOpenChange,
  onQueryChange,
  onRunCommand,
  query,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="gap-3 p-0 sm:max-w-xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Go To</DialogTitle>
          <DialogDescription>
            Search the features available for your role.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 border-b px-4">
          <Search
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            autoFocus
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Go to a feature..."
            aria-label="Search available features"
            className="h-12 border-0 px-0 shadow-none focus-visible:ring-0"
          />
          <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
            Esc
          </kbd>
        </div>

        <div
          className="max-h-72 overflow-y-auto p-2"
          role="listbox"
          aria-label="Available features"
        >
          {commands.length ? (
            commands.map((command, index) => {
              const Icon = command.icon;
              return (
                <button
                  key={command.id}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  onMouseEnter={() => onActiveIndexChange(index)}
                  onClick={() => onRunCommand(command)}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring aria-selected:bg-accent"
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">
                      {command.label}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {command.description}
                    </span>
                  </span>
                  <kbd className="rounded border bg-background px-2 py-1 text-xs text-muted-foreground">
                    {command.shortcut}
                  </kbd>
                </button>
              );
            })
          ) : (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No matching features.
            </p>
          )}
        </div>

        <p className="border-t px-4 py-2 text-xs text-muted-foreground">
          Use ↑ and ↓ to choose, then Enter to open.
        </p>
      </DialogContent>
    </Dialog>
  );
}

export default KeyboardNavigationDialog;
