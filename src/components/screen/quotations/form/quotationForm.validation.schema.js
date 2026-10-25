import * as Yup from "yup";

import {
  CREATE_QUOTATION_ADDRESS_MAX_LENGTH,
  CREATE_QUOTATION_ADDRESS_MIN_LENGTH,
  CREATE_QUOTATION_COMPANY_NAME_MAX_LENGTH,
  CREATE_QUOTATION_COMPANY_NAME_MIN_LENGTH,
  CREATE_QUOTATION_EMAIL_MAX_LENGTH,
  CREATE_QUOTATION_EMAIL_MIN_LENGTH,
  CREATE_QUOTATION_GST_PATTERN,
  CREATE_QUOTATION_NEW_COMPANY_ADDRESS_PATTERN,
  CREATE_QUOTATION_PHONE_PATTERN,
  QUOTATION_PRODUCT_DESCRIPTION_MAX_LENGTH,
  QUOTATION_PRODUCT_DISCOUNT_MIN,
  QUOTATION_PRODUCT_DISCOUNT_PERCENTAGE_MAX,
  QUOTATION_PRODUCT_NAME_MAX_LENGTH,
  QUOTATION_PRODUCT_QUANTITY_MAX,
  QUOTATION_PRODUCT_QUANTITY_MIN,
  QUOTATION_PRODUCT_SELLING_PRICE_MAX,
} from "@screenComponent/quotations/form/quotationForm.validation.constants";
import {
  CREATE_QUOTATION_VALIDATION_MESSAGES,
  QUOTATION_PRODUCT_VALIDATION_MESSAGES,
} from "@screenComponent/quotations/form/quotationForm.validation.messages";

const formNumber = (typeError) =>
  Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue === null ? undefined : value,
    )
    .typeError(typeError);

const companyAddressSchema = (requireFormattedAddress) => {
  let schema = Yup.string()
    .trim()
    .min(
      CREATE_QUOTATION_ADDRESS_MIN_LENGTH,
      CREATE_QUOTATION_VALIDATION_MESSAGES.ADDRESS_MIN,
    )
    .max(
      CREATE_QUOTATION_ADDRESS_MAX_LENGTH,
      CREATE_QUOTATION_VALIDATION_MESSAGES.ADDRESS_MAX,
    )
    .required(CREATE_QUOTATION_VALIDATION_MESSAGES.ADDRESS_REQUIRED);

  if (requireFormattedAddress) {
    schema = schema.matches(CREATE_QUOTATION_NEW_COMPANY_ADDRESS_PATTERN, {
      message: CREATE_QUOTATION_VALIDATION_MESSAGES.ADDRESS_FORMAT,
      excludeEmptyString: true,
    });
  }

  return schema;
};

export const createQuotationValidationSchema = ({
  requireFormattedAddress = false,
} = {}) => Yup.object({
  companyName: Yup.string()
    .trim()
    .min(
      CREATE_QUOTATION_COMPANY_NAME_MIN_LENGTH,
      CREATE_QUOTATION_VALIDATION_MESSAGES.COMPANY_NAME_MIN,
    )
    .max(
      CREATE_QUOTATION_COMPANY_NAME_MAX_LENGTH,
      CREATE_QUOTATION_VALIDATION_MESSAGES.COMPANY_NAME_MAX,
    )
    .required(CREATE_QUOTATION_VALIDATION_MESSAGES.COMPANY_NAME_REQUIRED),
  address: companyAddressSchema(requireFormattedAddress),
  email: Yup.string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .min(
      CREATE_QUOTATION_EMAIL_MIN_LENGTH,
      CREATE_QUOTATION_VALIDATION_MESSAGES.EMAIL_MIN,
    )
    .max(
      CREATE_QUOTATION_EMAIL_MAX_LENGTH,
      CREATE_QUOTATION_VALIDATION_MESSAGES.EMAIL_MAX,
    )
    .email(CREATE_QUOTATION_VALIDATION_MESSAGES.EMAIL_INVALID),
  phoneNumber: Yup.string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .matches(
      CREATE_QUOTATION_PHONE_PATTERN,
      CREATE_QUOTATION_VALIDATION_MESSAGES.PHONE_INVALID,
    ),
  gstNumber: Yup.string()
    .trim()
    .uppercase()
    .transform((value) => (value === "" ? undefined : value))
    .matches(
      CREATE_QUOTATION_GST_PATTERN,
      CREATE_QUOTATION_VALIDATION_MESSAGES.GST_INVALID,
  ),
});

export const quotationProductValidationSchema = Yup.object({
  product: Yup.string()
    .trim()
    .max(
      QUOTATION_PRODUCT_NAME_MAX_LENGTH,
      QUOTATION_PRODUCT_VALIDATION_MESSAGES.PRODUCT_MAX,
    )
    .required(QUOTATION_PRODUCT_VALIDATION_MESSAGES.PRODUCT_REQUIRED),
  sellingPrice: formNumber(
    QUOTATION_PRODUCT_VALIDATION_MESSAGES.SELLING_PRICE_NUMBER,
  )
    .moreThan(
      0,
      QUOTATION_PRODUCT_VALIDATION_MESSAGES.SELLING_PRICE_POSITIVE,
    )
    .max(
      QUOTATION_PRODUCT_SELLING_PRICE_MAX,
      QUOTATION_PRODUCT_VALIDATION_MESSAGES.SELLING_PRICE_MAX,
    )
    .required(
      QUOTATION_PRODUCT_VALIDATION_MESSAGES.SELLING_PRICE_REQUIRED,
    ),
  quantity: formNumber(QUOTATION_PRODUCT_VALIDATION_MESSAGES.QUANTITY_NUMBER)
    .integer(QUOTATION_PRODUCT_VALIDATION_MESSAGES.QUANTITY_INTEGER)
    .min(
      QUOTATION_PRODUCT_QUANTITY_MIN,
      QUOTATION_PRODUCT_VALIDATION_MESSAGES.QUANTITY_RANGE,
    )
    .max(
      QUOTATION_PRODUCT_QUANTITY_MAX,
      QUOTATION_PRODUCT_VALIDATION_MESSAGES.QUANTITY_RANGE,
    )
    .required(QUOTATION_PRODUCT_VALIDATION_MESSAGES.QUANTITY_REQUIRED),
  discount: formNumber(QUOTATION_PRODUCT_VALIDATION_MESSAGES.DISCOUNT_NUMBER)
    .min(
      QUOTATION_PRODUCT_DISCOUNT_MIN,
      QUOTATION_PRODUCT_VALIDATION_MESSAGES.DISCOUNT_MIN,
    )
    .test(
      "discount-does-not-exceed-selling-price",
      QUOTATION_PRODUCT_VALIDATION_MESSAGES.DISCOUNT_MAX,
      function doesNotExceedSellingPrice(value) {
        if (value === undefined || value === null) return true;

        return value <= Number(this.parent.sellingPrice);
      },
    ),
  discountPercentage: formNumber(
    QUOTATION_PRODUCT_VALIDATION_MESSAGES.DISCOUNT_PERCENTAGE_NUMBER,
  )
    .min(
      QUOTATION_PRODUCT_DISCOUNT_MIN,
      QUOTATION_PRODUCT_VALIDATION_MESSAGES.DISCOUNT_PERCENTAGE_MIN,
    )
    .max(
      QUOTATION_PRODUCT_DISCOUNT_PERCENTAGE_MAX,
      QUOTATION_PRODUCT_VALIDATION_MESSAGES.DISCOUNT_PERCENTAGE_MAX,
    ),
  description: Yup.string()
    .trim()
    .max(
      QUOTATION_PRODUCT_DESCRIPTION_MAX_LENGTH,
      QUOTATION_PRODUCT_VALIDATION_MESSAGES.DESCRIPTION_MAX,
    )
    .optional(),
});
