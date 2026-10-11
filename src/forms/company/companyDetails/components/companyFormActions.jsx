import { LoaderCircle, Save } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function CompanyFormActions({ form, isEditing }) {
  const {
    formik,
    saveError,
    hasPendingRecordMutation,
    hasUnsavedAddress,
    hasUnsavedContact,
  } = form;
  const isSubmitDisabled =
    formik.isSubmitting ||
    hasPendingRecordMutation ||
    (isEditing && (hasUnsavedAddress || hasUnsavedContact)) ||
    !formik.dirty;

  return (
    <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p
        role={saveError ? "alert" : undefined}
        className={
          saveError
            ? "text-xs font-medium text-destructive"
            : "text-xs text-muted-foreground"
        }
      >
        {saveError ??
          (isEditing
            ? "Your changes will be reflected in the company directory after saving."
            : "The company will appear in the company table after saving.")}
      </p>
      <Button
        type="submit"
        disabled={isSubmitDisabled}
        className="sm:min-w-36"
      >
        {formik.isSubmitting ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <Save className="size-4" />
        )}
        {formik.isSubmitting
          ? "Saving..."
          : isEditing
            ? "Save changes"
            : "Save company"}
      </Button>
    </div>
  );
}

export default CompanyFormActions;
