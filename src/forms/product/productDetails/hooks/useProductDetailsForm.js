import { useRef } from "react";
import { useFormik } from "formik";

import { toProductFormValues } from "@Forms/product/productDetails/productDetails-frontend.payload";
import { productValidationSchema } from "@Forms/product/productDetails/productDetails.validation.schema";

const roundedCommercialValue = (value) =>
  Number.isFinite(value) ? String(Math.round(value * 100) / 100) : "";

export function useProductDetailsForm({ product, onSubmit, isSubmitting }) {
  const discountSourceRef = useRef({ Min: "amount", Max: "amount" });
  const formik = useFormik({
    initialValues: toProductFormValues(product),
    validationSchema: productValidationSchema,
    onSubmit: (values) => onSubmit(productValidationSchema.cast(values)),
  });
  const isBusy = isSubmitting || formik.isSubmitting;
  const fieldError = (field) =>
    formik.touched[field] && formik.errors[field] ? formik.errors[field] : null;
  const inputProps = (field, id) => ({
    name: field,
    value: formik.values[field] ?? "",
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    "aria-invalid": Boolean(fieldError(field)),
    "aria-describedby": fieldError(field) ? `${id}-error` : undefined,
  });

  const updateCommercialValues = (field, value) => {
    formik.setValues((current) => {
      const next = { ...current, [field]: value };
      const salePrice = Number(
        field === "salePrice" ? value : current.salePrice,
      );

      if (field.startsWith("discountAmount")) {
        const boundary = field.endsWith("Min") ? "Min" : "Max";
        discountSourceRef.current[boundary] = "amount";
        const discountAmount = Number(value);
        next[`discountPercentage${boundary}`] =
          value !== "" && salePrice > 0
            ? roundedCommercialValue((discountAmount / salePrice) * 100)
            : "";
      }
      if (field.startsWith("discountPercentage")) {
        const boundary = field.endsWith("Min") ? "Min" : "Max";
        discountSourceRef.current[boundary] = "percentage";
        const discountPercentage = Number(value);
        next[`discountAmount${boundary}`] =
          value !== "" && salePrice > 0
            ? roundedCommercialValue((salePrice * discountPercentage) / 100)
            : "";
      }
      if (field === "salePrice") {
        ["Min", "Max"].forEach((boundary) => {
          if (discountSourceRef.current[boundary] === "percentage") {
            const percentageField = `discountPercentage${boundary}`;
            next[`discountAmount${boundary}`] =
              current[percentageField] !== "" && salePrice > 0
                ? roundedCommercialValue(
                    (salePrice * Number(current[percentageField])) / 100,
                  )
                : "";
          } else {
            const amountField = `discountAmount${boundary}`;
            next[`discountPercentage${boundary}`] =
              current[amountField] !== "" && salePrice > 0
                ? roundedCommercialValue(
                    (Number(current[amountField]) / salePrice) * 100,
                  )
                : "";
          }
        });
      }
      return next;
    }, true);
  };

  return { fieldError, formik, inputProps, isBusy, updateCommercialValues };
}
