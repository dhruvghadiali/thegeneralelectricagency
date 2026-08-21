import { createElement, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import {
  Boxes,
  Check,
  ChevronsUpDown,
  CircleAlert,
  IndianRupee,
  Loader2,
  Search,
  Sparkles,
} from "lucide-react";

import { INDIAN_GST_OPTIONS, PRODUCT_CATEGORY_OPTIONS, TABLE_DEFAULTS } from "@Enums";
import { employeeCompanyApi } from "@Api";
import { toProductFormValues } from "@Forms/product/product-frontend.payload";
import {
  PRODUCT_CODE_MAX_LENGTH,
  PRODUCT_CODE_MIN_LENGTH,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
  PRODUCT_DISCOUNT_AMOUNT_MAX,
  PRODUCT_DISCOUNT_PERCENTAGE_MAX,
  PRODUCT_MODEL_NUMBER_MAX_LENGTH,
  PRODUCT_MODEL_NUMBER_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_NAME_MIN_LENGTH,
  PRODUCT_PURCHASE_PRICE_MAX,
  PRODUCT_SALE_PRICE_MAX,
} from "@Forms/product/product.validation.constants";
import { productValidationSchema } from "@Forms/product/product.validation.schema";
import { toCompanyListParams } from "@Tables/company/companyTable.api-payload";
import { COMPANY_TABLE_DEFAULTS } from "@Tables/company/companyTable.defaults";
import { fromCompanyListResponse } from "@Tables/company/companyTable.frontend-payload";
import { Button } from "@shadcnComponent/button";
import { DialogFooter } from "@shadcnComponent/dialog";
import { Input } from "@shadcnComponent/input";
import { Label } from "@shadcnComponent/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcnComponent/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";
import { Textarea } from "@shadcnComponent/textarea";
import { generateProductCode } from "@screenComponent/products/product.utils";

const roundedCommercialValue = (value) =>
  Number.isFinite(value) ? String(Math.round(value * 100) / 100) : "";

function FormField({ id, label, required = false, error, children }) {
  return (
    <div className="grid content-start gap-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-start gap-1.5 text-xs font-medium leading-4 text-destructive"
        >
          <CircleAlert className="mt-px size-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

function SectionHeading({ icon, title, description }) {
  return (
    <div className="flex items-start gap-3 border-b pb-4">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        {createElement(icon, { className: "size-4", "aria-hidden": true })}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function ProductSelect({
  id,
  field,
  placeholder,
  options,
  formik,
  error,
  numeric = false,
}) {
  return (
    <Select
      value={
        formik.values[field] === "" || formik.values[field] === undefined
          ? ""
          : String(formik.values[field])
      }
      onValueChange={(value) =>
        formik.setFieldValue(field, numeric ? Number(value) : value, true)
      }
      onOpenChange={(open) =>
        !open && formik.setFieldTouched(field, true, true)
      }
    >
      <SelectTrigger
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="aria-invalid:border-destructive aria-invalid:ring-destructive/20"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function CompanySearchSelect({ formik, error, isBusy }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(TABLE_DEFAULTS.PAGE);
  const [pagination, setPagination] = useState({
    page: TABLE_DEFAULTS.PAGE,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setPage(TABLE_DEFAULTS.PAGE);
      setDebouncedSearch(search.trim());
    }, TABLE_DEFAULTS.SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    if (!open) return undefined;

    const controller = new AbortController();
    const isFirstPage = page === TABLE_DEFAULTS.PAGE;
    setIsLoading(true);
    setLoadError(null);

    const loadCompanies = async () => {
      try {
        const response = await employeeCompanyApi.getCompanies(
          {
            ...toCompanyListParams({
              page,
              limit: COMPANY_TABLE_DEFAULTS.limit,
              search: debouncedSearch,
              sort: COMPANY_TABLE_DEFAULTS.sort,
            }),
            is_active: true,
          },
          { signal: controller.signal },
        );
        const result = fromCompanyListResponse(response, {
          page,
          limit: COMPANY_TABLE_DEFAULTS.limit,
        });

        setCompanies((current) => {
          if (isFirstPage) return result.items;
          return [
            ...new Map(
              [...current, ...result.items].map((company) => [
                company.id,
                company,
              ]),
            ).values(),
          ];
        });
        setPagination(result.pagination);
      } catch {
        if (!controller.signal.aborted) {
          if (isFirstPage) setCompanies([]);
          setLoadError("Unable to load companies. Try again.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    loadCompanies();
    return () => controller.abort();
  }, [debouncedSearch, open, page]);

  const selectCompany = (company) => {
    formik.setFieldValue("agency", company.id, true);
    formik.setFieldValue("agencyName", company.name, false);
    formik.setFieldTouched("agency", true, false);
    setSearch("");
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) formik.setFieldTouched("agency", true, true);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          id="product-agency"
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "product-agency-error" : undefined}
          disabled={isBusy}
          className="w-full justify-between font-normal aria-invalid:border-destructive aria-invalid:ring-destructive/20"
        >
          <span
            className={
              formik.values.agencyName || formik.values.agency
                ? "truncate"
                : "truncate text-muted-foreground"
            }
          >
            {formik.values.agencyName ||
              formik.values.agency ||
              "Select a company"}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-0"
      >
        <div className="border-b p-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search company name..."
              aria-label="Search company by name"
              className="pl-9"
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-64 overflow-y-auto p-1">
          {isLoading && companies.length === 0 ? (
            <div className="flex items-center justify-center gap-2 px-3 py-8 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading companies...
            </div>
          ) : loadError ? (
            <p className="px-3 py-8 text-center text-sm text-destructive">
              {loadError}
            </p>
          ) : companies.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No active company found.
            </p>
          ) : (
            companies.map((company) => (
              <Button
                key={company.id}
                type="button"
                variant="ghost"
                onClick={() => selectCompany(company)}
                className="h-auto w-full justify-start gap-2 px-3 py-2.5 text-left font-normal"
              >
                <Check
                  className={`size-4 shrink-0 ${
                    formik.values.agency === company.id
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
                <span className="truncate">{company.name}</span>
              </Button>
            ))
          )}
        </div>

        {pagination.page < pagination.totalPages && (
          <div className="border-t p-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={isLoading}
              onClick={() => setPage((current) => current + 1)}
              className="w-full"
            >
              {isLoading && <Loader2 className="size-4 animate-spin" />}
              {isLoading ? "Loading..." : "Load more companies"}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

function ProductForm({
  product,
  onSubmit,
  onCancel,
  submitLabel,
  isSubmitting,
}) {
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
      const salePrice = Number(field === "salePrice" ? value : current.salePrice);

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
            const discountPercentage = Number(current[percentageField]);
            next[`discountAmount${boundary}`] =
              current[percentageField] !== "" && salePrice > 0
                ? roundedCommercialValue(
                    (salePrice * discountPercentage) / 100,
                  )
                : "";
          } else {
            const amountField = `discountAmount${boundary}`;
            const discountAmount = Number(current[amountField]);
            next[`discountPercentage${boundary}`] =
              current[amountField] !== "" && salePrice > 0
                ? roundedCommercialValue((discountAmount / salePrice) * 100)
                : "";
          }
        });
      }

      return next;
    }, true);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-8" noValidate>
      <section className="space-y-5">
        <SectionHeading
          icon={Boxes}
          title="Product information"
          description="Basic information used to identify and classify the product."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="product-code"
            label="Product code"
          required
          error={fieldError("productCode")}
        >
            <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
              <Input
                id="product-code"
                {...inputProps("productCode", "product-code")}
                placeholder="e.g. MOT-001"
                minLength={PRODUCT_CODE_MIN_LENGTH}
                maxLength={PRODUCT_CODE_MAX_LENGTH}
              />
              <Button
                type="button"
                variant="outline"
                disabled={Boolean(formik.values.productCode?.trim()) || isBusy}
                onClick={() => {
                  formik.setFieldValue(
                    "productCode",
                    generateProductCode(),
                    true,
                  );
                  formik.setFieldTouched("productCode", true, false);
                }}
              >
                <Sparkles className="size-4" />
                Generate code
              </Button>
            </div>
          </FormField>
          <FormField
            id="product-name"
            label="Product name"
            required
            error={fieldError("name")}
          >
            <Input
              id="product-name"
              {...inputProps("name", "product-name")}
              placeholder="e.g. Industrial motor"
              minLength={PRODUCT_NAME_MIN_LENGTH}
              maxLength={PRODUCT_NAME_MAX_LENGTH}
            />
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="product-category"
            label="Category"
            required
            error={fieldError("category")}
          >
            <ProductSelect
              id="product-category"
              field="category"
              placeholder="Select a category"
              options={PRODUCT_CATEGORY_OPTIONS}
              formik={formik}
              error={fieldError("category")}
            />
          </FormField>
          <FormField
            id="product-agency"
            label="Company"
            required
            error={fieldError("agency")}
          >
            <CompanySearchSelect
              formik={formik}
              error={fieldError("agency")}
              isBusy={isBusy}
            />
          </FormField>
        </div>

        <FormField
          id="product-model-number"
          label="Model number"
          error={fieldError("modelNumber")}
        >
          <Input
            id="product-model-number"
            {...inputProps("modelNumber", "product-model-number")}
            placeholder="Optional model number"
            minLength={PRODUCT_MODEL_NUMBER_MIN_LENGTH}
            maxLength={PRODUCT_MODEL_NUMBER_MAX_LENGTH}
          />
        </FormField>

        <FormField
          id="product-description"
          label="Description"
          error={fieldError("description")}
        >
          <Textarea
            id="product-description"
            {...inputProps("description", "product-description")}
            placeholder="Optional product description"
            rows={4}
            minLength={PRODUCT_DESCRIPTION_MIN_LENGTH}
            maxLength={PRODUCT_DESCRIPTION_MAX_LENGTH}
          />
        </FormField>
      </section>

      <section className="space-y-5">
        <SectionHeading
          icon={IndianRupee}
          title="Commercial values"
          description="Set prices, tax, and the available discount range. Amount and percentage update each other using the sale price."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="product-purchase-price"
            label="Purchase price"
            error={fieldError("purchasePrice")}
          >
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                ₹
              </span>
              <Input
                id="product-purchase-price"
                type="number"
                min="0"
                max={PRODUCT_PURCHASE_PRICE_MAX}
                step="0.01"
                inputMode="decimal"
                {...inputProps("purchasePrice", "product-purchase-price")}
                className="pl-7"
              />
            </div>
          </FormField>

          <FormField
            id="product-sale-price"
            label="Sale price"
            error={fieldError("salePrice")}
          >
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                ₹
              </span>
              <Input
                id="product-sale-price"
                type="number"
                min="0"
                max={PRODUCT_SALE_PRICE_MAX}
                step="0.01"
                inputMode="decimal"
                {...inputProps("salePrice", "product-sale-price")}
                onChange={(event) =>
                  updateCommercialValues("salePrice", event.target.value)
                }
                className="pl-7"
              />
            </div>
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="product-gst-percentage"
            label="GST percentage"
            error={fieldError("gstPercentage")}
          >
            <ProductSelect
              id="product-gst-percentage"
              field="gstPercentage"
              placeholder="Select GST rate"
              options={INDIAN_GST_OPTIONS}
              formik={formik}
              error={fieldError("gstPercentage")}
              numeric
            />
          </FormField>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Discount amount range
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                ["Min", "Minimum"],
                ["Max", "Maximum"],
              ].map(([boundary, label]) => {
                const field = `discountAmount${boundary}`;
                const id = `product-discount-amount-${boundary.toLowerCase()}`;

                return (
                  <FormField
                    key={field}
                    id={id}
                    label={label}
                    error={fieldError(field)}
                  >
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        ₹
                      </span>
                      <Input
                        id={id}
                        type="number"
                        min="0"
                        max={PRODUCT_DISCOUNT_AMOUNT_MAX}
                        step="0.01"
                        inputMode="decimal"
                        {...inputProps(field, id)}
                        onChange={(event) =>
                          updateCommercialValues(field, event.target.value)
                        }
                        className="pl-7"
                      />
                    </div>
                  </FormField>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Discount percentage range
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                ["Min", "Minimum"],
                ["Max", "Maximum"],
              ].map(([boundary, label]) => {
                const field = `discountPercentage${boundary}`;
                const id = `product-discount-percentage-${boundary.toLowerCase()}`;

                return (
                  <FormField
                    key={field}
                    id={id}
                    label={label}
                    error={fieldError(field)}
                  >
                    <div className="relative">
                      <Input
                        id={id}
                        type="number"
                        min="0"
                        max={PRODUCT_DISCOUNT_PERCENTAGE_MAX}
                        step="0.01"
                        inputMode="decimal"
                        {...inputProps(field, id)}
                        onChange={(event) =>
                          updateCommercialValues(field, event.target.value)
                        }
                        className="pr-8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        %
                      </span>
                    </div>
                  </FormField>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <DialogFooter className="border-t pt-6">
        <Button
          type="button"
          variant="outline"
          disabled={isBusy}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isBusy}>
          {isBusy ? "Saving..." : submitLabel}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default ProductForm;
