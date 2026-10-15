import { useDispatch, useSelector } from "react-redux";

import {
  selectQuotationDeliveryNotes,
  selectQuotationPaymentNotes,
} from "@Redux/quotation/quotation.selector";
import {
  quotationDeliveryNotesChanged,
  quotationPaymentNotesChanged,
} from "@Redux/quotation/quotation.slice";
import { Input } from "@shadcnComponent/input";
import { Label } from "@shadcnComponent/label";

function QuotationNotesFields({
  deliveryNotesRef,
  paymentNotesRef,
  onDeliveryNotesKeyDown,
  onPaymentNotesKeyDown,
}) {
  const dispatch = useDispatch();
  const deliveryNotes = useSelector(selectQuotationDeliveryNotes);
  const paymentNotes = useSelector(selectQuotationPaymentNotes);

  return (
    <>
      <section className="grid min-w-0 gap-2">
        <Label htmlFor="quotation-delivery-notes">Delivery notes</Label>
        <Input
          ref={deliveryNotesRef}
          id="quotation-delivery-notes"
          value={deliveryNotes}
          onChange={(event) =>
            dispatch(quotationDeliveryNotesChanged(event.target.value))
          }
          onKeyDown={onDeliveryNotesKeyDown}
          placeholder="Enter delivery notes"
          className="text-xs"
        />
      </section>
      <section className="grid min-w-0 gap-2">
        <Label htmlFor="quotation-payment-notes">Payment notes</Label>
        <Input
          ref={paymentNotesRef}
          id="quotation-payment-notes"
          value={paymentNotes}
          onChange={(event) =>
            dispatch(quotationPaymentNotesChanged(event.target.value))
          }
          onKeyDown={onPaymentNotesKeyDown}
          placeholder="Enter payment notes"
          className="text-xs"
        />
      </section>
    </>
  );
}

export default QuotationNotesFields;
