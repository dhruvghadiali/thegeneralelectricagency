import { Button } from "@shadcnComponent/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";
import QuotationProductForm from "@screenComponent/quotations/create/productInformation/quotationProductForm";

function QuotationProductInformationCard({
  formik,
  fieldError,
  fieldRefs,
  keyboard,
  onProductNameChange,
}) {
  return (
    <Card className="min-h-64 w-full shrink-0">
      <CardHeader className="border-b">
        <CardTitle>Product information</CardTitle>
      </CardHeader>
      <CardContent>
        <QuotationProductForm
          formik={formik}
          fieldError={fieldError}
          fieldRefs={fieldRefs}
          keyboard={keyboard}
          onProductNameChange={onProductNameChange}
        />
      </CardContent>
      <CardFooter className="justify-end border-t">
        <Button
          ref={fieldRefs.saveButtonRef}
          type="submit"
          form="quotation-product-form"
          onKeyDown={keyboard.handleSaveKeyDown}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}

export default QuotationProductInformationCard;
