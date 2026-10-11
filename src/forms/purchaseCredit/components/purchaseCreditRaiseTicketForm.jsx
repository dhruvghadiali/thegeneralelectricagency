import { useFormik } from "formik";
import _ from "lodash";

import { PURCHASE_CREDIT_EDIT_TICKET_INITIAL_VALUES } from "@Forms/purchaseCredit/purchaseCreditEditTicket.initialValues";
import { PURCHASE_CREDIT_EDIT_TICKET_FIELD_OPTIONS } from "@Forms/purchaseCredit/purchaseCreditEditTicket.options";
import { Button } from "@shadcnComponent/button";
import { Label } from "@shadcnComponent/label";
import { Textarea } from "@shadcnComponent/textarea";

function PurchaseCreditRaiseTicketForm({ onCancel, onSubmit }) {
  const formik = useFormik({
    initialValues: PURCHASE_CREDIT_EDIT_TICKET_INITIAL_VALUES,
    onSubmit,
  });

  const toggleField = (field, checked) => {
    formik.setFieldValue(
      "fields",
      checked
        ? _.uniq(_.concat(formik.values.fields, field))
        : _.filter(formik.values.fields, (value) => value !== field),
      false,
    );
  };

  return (
    <form onSubmit={formik.handleSubmit} className="grid gap-5" noValidate>
      <fieldset className="grid gap-3">
        <legend className="text-sm font-medium">
          Select fields you want to edit
        </legend>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {_.map(PURCHASE_CREDIT_EDIT_TICKET_FIELD_OPTIONS, (option) => {
            const id = `purchase-credit-ticket-${option.value}`;
            const checked = _.includes(formik.values.fields, option.value);

            return (
              <Label
                key={option.value}
                htmlFor={id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-3 text-sm transition-colors hover:bg-muted/50 ${
                  checked
                    ? "border-primary bg-primary/5 text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <input
                  id={id}
                  type="checkbox"
                  name="fields"
                  value={option.value}
                  checked={checked}
                  onChange={(event) =>
                    toggleField(option.value, event.target.checked)
                  }
                  className="size-4 shrink-0 accent-primary"
                />
                <span>{option.label}</span>
              </Label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-2">
        <Label htmlFor="purchase-credit-ticket-comment">Comment</Label>
        <Textarea
          id="purchase-credit-ticket-comment"
          name="comment"
          value={formik.values.comment}
          rows={5}
          placeholder="Explain why these non-editable fields need to be updated"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Submit ticket</Button>
      </div>
    </form>
  );
}

export default PurchaseCreditRaiseTicketForm;
