import { CircleHelp } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function KeyboardNavigationTrigger({ onOpen }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="size-8 shrink-0"
      onClick={onOpen}
      aria-label="Open keyboard navigation"
      aria-keyshortcuts="Alt+G"
      title="Keyboard navigation (Alt+G)"
    >
      <CircleHelp className="size-4" aria-hidden="true" />
    </Button>
  );
}

export default KeyboardNavigationTrigger;
