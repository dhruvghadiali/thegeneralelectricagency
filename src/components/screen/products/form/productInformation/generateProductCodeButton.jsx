import { Sparkles } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import { generateProductCode } from "@screenComponent/products/form/productInformation/helpers/generateProductCode";

function GenerateProductCodeButton({ formik }) {
  const generateCode = () => {
    formik.setFieldValue("productCode", generateProductCode(), true);
    formik.setFieldTouched("productCode", true, false);
  };

  return (
    <Button
      type="button"
      variant="outline"
      disabled={Boolean(formik.values.productCode?.trim())}
      onClick={generateCode}
    >
      <Sparkles className="size-4" aria-hidden="true" />
      Generate code
    </Button>
  );
}

export default GenerateProductCodeButton;
