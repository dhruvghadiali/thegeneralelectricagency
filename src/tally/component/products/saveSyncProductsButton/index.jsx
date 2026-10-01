import { Save } from "lucide-react";
import { useSelector } from "react-redux";

import { Button } from "@shadcnComponent/button";
import { selectShowSaveSyncProductsButton } from "@Tally/redux/syncProducts/syncProducts.selector";

function SaveSyncProductsButton() {
  const isVisible = useSelector(selectShowSaveSyncProductsButton);

  if (!isVisible) return null;

  return (
    <Button
      type="button"
      className="ml-auto shrink-0"
      disabled
      title="Save products is not configured yet"
    >
      <Save className="size-4" aria-hidden="true" />
      Save
    </Button>
  );
}

export default SaveSyncProductsButton;
