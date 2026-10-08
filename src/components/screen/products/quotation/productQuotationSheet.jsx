import { useEffect, useMemo, useRef, useState } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useDispatch, useSelector } from "react-redux";
import {
  Building2,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Download,
  Loader2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import { employeeCompanyApi } from "@Api";
import companyLogoUrl from "@Assets/images/logo.png";
import { TABLE_DEFAULTS } from "@Enums";
import { fetchQuotationProducts } from "@Redux/product/product.action";
import { selectQuotationProductOptions } from "@Redux/product/product.selector";
import { quotationProductOptionsReset } from "@Redux/product/product.slice";
import {
  selectQuotationCompany,
  selectQuotationGstPercentage,
  selectQuotationTaxTreatment,
} from "@Redux/product/quotation/quotation.selector";
import { toCompanyListParams } from "@Tables/company/companyTable.api-payload";
import { COMPANY_TABLE_DEFAULTS } from "@Tables/company/companyTable.defaults";
import { fromCompanyListResponse } from "@Tables/company/companyTable.frontend-payload";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import { Label } from "@shadcnComponent/label";
import { Textarea } from "@shadcnComponent/textarea";
import { Popover, PopoverTrigger } from "@shadcnComponent/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@shadcnComponent/sheet";
import ProductAgencyBadge from "@screenComponent/products/quotation/productAgencyBadge";
import ProductCategoryBadge from "@screenComponent/products/quotation/productCategoryBadge";
import { companyAddress } from "@screenComponent/products/dialogs/quotation/quotationCompanyInformation.utils";
import { cn } from "@/lib/utils";

function QuotationPopoverContent({
  container,
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return (
    <PopoverPrimitive.Portal container={container}>
      <PopoverPrimitive.Content
        data-lenis-prevent
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

const EMPTY_COMPANY_PAGINATION = Object.freeze({
  page: TABLE_DEFAULTS.PAGE,
  totalPages: 0,
});

const EMPTY_PRODUCTS = Object.freeze([]);
const QUOTATION_QUANTITY_MIN = 1;
const QUOTATION_QUANTITY_MAX = 10_000;

const LOCKED_FIELDS = Object.freeze({
  description: false,
  salePrice: false,
  discountAmount: false,
});

const moneyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numericValue = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const quotationItemId = (product) => product.id || product.productCode;

function createQuotationItem(product, gstPercentage = product.gstPercentage ?? "") {
  return {
    id: quotationItemId(product),
    product,
    quantity: String(QUOTATION_QUANTITY_MIN),
    description: product.description ?? "",
    salePrice: "0",
    gstPercentage,
    discountAmount: "0",
    enabledFields: { ...LOCKED_FIELDS },
  };
}

function calculateItemTotals(item) {
  const parsedQuantity = Number(item.quantity);
  const quantity =
    Number.isInteger(parsedQuantity) &&
    parsedQuantity >= QUOTATION_QUANTITY_MIN &&
    parsedQuantity <= QUOTATION_QUANTITY_MAX
      ? parsedQuantity
      : 0;
  const unitPrice = Math.max(numericValue(item.salePrice), 0);
  const discountPerUnit = Math.max(numericValue(item.discountAmount), 0);
  const subtotal = unitPrice * quantity;
  const totalDiscount = discountPerUnit * quantity;
  const taxableAmount = Math.max(subtotal - totalDiscount, 0);

  return {
    quantity,
    unitPrice,
    discountPerUnit,
    subtotal,
    totalDiscount,
    taxableAmount,
  };
}

function validateQuotationItem(item) {
  const next = {};
  const quantity = Number(item.quantity);
  const salePrice = Number(item.salePrice);
  const discount = Number(item.discountAmount);

  if (
    item.quantity === "" ||
    !Number.isInteger(quantity) ||
    quantity < QUOTATION_QUANTITY_MIN ||
    quantity > QUOTATION_QUANTITY_MAX
  ) {
    next.quantity = `Quantity must be a whole number between ${QUOTATION_QUANTITY_MIN} and ${QUOTATION_QUANTITY_MAX.toLocaleString("en-IN")}.`;
  }

  if (item.salePrice === "" || !Number.isFinite(salePrice) || salePrice <= 0) {
    next.salePrice = "Sale price must be greater than 0.";
  }
  if (!Number.isFinite(discount) || discount < 0) {
    next.discountAmount = "Discount cannot be negative.";
  } else if (Number.isFinite(salePrice) && discount > salePrice) {
    next.discountAmount =
      "Per-unit discount cannot exceed the unit sale price.";
  }
  return next;
}

function staticValue(value) {
  return value === null || value === undefined || value === "" ? "—" : value;
}

function EditableHeading({ label, enabled, onEdit }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Label>{label}</Label>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onEdit}
        className="h-7 px-2 text-xs"
      >
        <Pencil className="size-3.5" />
        {enabled ? "Lock" : "Edit"}
      </Button>
    </div>
  );
}

function SummaryItem({ label, value, emphasized = false }) {
  return (
    <div
      className={
        emphasized
          ? "rounded-lg bg-primary px-4 py-3 text-primary-foreground"
          : "flex items-center justify-between gap-3 border-b py-2.5 last:border-0"
      }
    >
      <span
        className={
          emphasized ? "text-xs font-medium" : "text-xs text-muted-foreground"
        }
      >
        {label}
      </span>
      <span className="text-sm font-semibold tabular-nums">{value}</span>
    </div>
  );
}

function CardExpansionButton({ expanded, onClick, controls }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      aria-expanded={expanded}
      aria-controls={controls}
      className="w-20 shrink-0 justify-center text-muted-foreground"
    >
      {expanded ? (
        <ChevronUp className="size-4" />
      ) : (
        <ChevronDown className="size-4" />
      )}
      {expanded ? "Hide" : "Show"}
    </Button>
  );
}

function QuotationProductCard({
  item,
  errors,
  canRemove,
  onRemove,
  onUpdate,
  onToggleField,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { product, enabledFields } = item;

  return (
    <article className="rounded-xl border bg-card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="truncate text-sm font-semibold">{product.name}</h4>
            {product.category && (
              <ProductCategoryBadge category={product.category} />
            )}
            {(product.agency || product.agencyName) && (
              <ProductAgencyBadge
                agency={product.agency}
                label={product.agencyName}
              />
            )}
          </div>
          {(product.productCode || product.hsnCode) && (
            <p className="mt-1 text-xs text-muted-foreground">
              {product.productCode && (
                <>
                  Product code: {product.productCode}
                  {product.hsnCode && " · "}
                </>
              )}
              {product.hsnCode && <>HSN code: {product.hsnCode}</>}
            </p>
          )}
          {!isExpanded && (
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-md border bg-muted/30 px-2.5 py-1">
                Quantity: <strong>{staticValue(item.quantity)}</strong>
              </span>
              <span className="rounded-md border bg-muted/30 px-2.5 py-1">
                Sale price:{" "}
                <strong>
                  {moneyFormatter.format(numericValue(item.salePrice))}
                </strong>
              </span>
            </div>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={!canRemove}
            onClick={onRemove}
            aria-label={`Remove ${product.name}`}
            className="shrink-0 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
          <CardExpansionButton
            expanded={isExpanded}
            onClick={() => setIsExpanded((current) => !current)}
          />
        </div>
      </div>

      {isExpanded && (
        <>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div className="grid content-start gap-2 sm:col-span-2">
          <Label htmlFor={`quotation-quantity-${item.id}`}>Quantity</Label>
          <Input
            id={`quotation-quantity-${item.id}`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={item.quantity}
            onChange={(event) => onUpdate("quantity", event.target.value)}
            placeholder="Enter quantity"
            aria-invalid={Boolean(errors.quantity)}
          />
          {errors.quantity && (
            <p className="text-xs font-medium text-destructive">
              {errors.quantity}
            </p>
          )}
        </div>

        <div className="grid content-start gap-2">
          <EditableHeading
            label="Sale price per unit"
            enabled={enabledFields.salePrice}
            onEdit={() => onToggleField("salePrice")}
          />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              ₹
            </span>
            <Input
              type="text"
              inputMode="decimal"
              value={item.salePrice}
              onChange={(event) => onUpdate("salePrice", event.target.value)}
              disabled={!enabledFields.salePrice}
              className="pl-7"
            />
          </div>
          {errors.salePrice && (
            <p className="text-xs font-medium text-destructive">
              {errors.salePrice}
            </p>
          )}
        </div>

        <div className="grid content-start gap-2">
          <EditableHeading
            label="Fixed discount per unit"
            enabled={enabledFields.discountAmount}
            onEdit={() => onToggleField("discountAmount")}
          />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              ₹
            </span>
            <Input
              type="text"
              inputMode="decimal"
              value={item.discountAmount}
              onChange={(event) =>
                onUpdate("discountAmount", event.target.value)
              }
              disabled={!enabledFields.discountAmount}
              className="pl-7"
            />
          </div>
          {errors.discountAmount && (
            <p className="text-xs font-medium text-destructive">
              {errors.discountAmount}
            </p>
          )}
        </div>
        <div className="grid content-start gap-2 sm:col-span-2">
          <EditableHeading
            label="Product description"
            enabled={enabledFields.description}
            onEdit={() => onToggleField("description")}
          />
          <Textarea
            value={item.description}
            onChange={(event) => onUpdate("description", event.target.value)}
            disabled={!enabledFields.description}
            placeholder="Add product description"
            rows={3}
          />
        </div>
          </div>
        </>
      )}
    </article>
  );
}

function ProductQuotationSheet({ products = EMPTY_PRODUCTS, onClose }) {
  const dispatch = useDispatch();
  const quotationCompany = useSelector(selectQuotationCompany);
  const quotationGstPercentage = useSelector(selectQuotationGstPercentage);
  const quotationTaxTreatment = useSelector(selectQuotationTaxTreatment);
  const {
    items: availableProducts,
    pagination: productPagination,
    isLoading: isLoadingProducts,
    isLoadingMore: isLoadingMoreProducts,
    error: productError,
  } = useSelector(selectQuotationProductOptions);
  const sheetContentRef = useRef(null);
  const isOpen = products.length > 0;
  const [quotationItems, setQuotationItems] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isProductPickerOpen, setIsProductPickerOpen] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [debouncedProductSearch, setDebouncedProductSearch] = useState("");
  const [productPage, setProductPage] = useState(TABLE_DEFAULTS.PAGE);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isBillToExpanded, setIsBillToExpanded] = useState(false);
  const [isCompanyPickerOpen, setIsCompanyPickerOpen] = useState(false);
  const [companySearch, setCompanySearch] = useState("");
  const [debouncedCompanySearch, setDebouncedCompanySearch] = useState("");
  const [companyPage, setCompanyPage] = useState(TABLE_DEFAULTS.PAGE);
  const [companyPagination, setCompanyPagination] = useState(
    EMPTY_COMPANY_PAGINATION,
  );
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);
  const [isLoadingMoreCompanies, setIsLoadingMoreCompanies] = useState(false);
  const [companyError, setCompanyError] = useState(null);
  const selectedGstPercentage =
    quotationTaxTreatment === "sezlout" ? "0" : quotationGstPercentage;

  useEffect(() => {
    if (!isOpen) return;
    setQuotationItems(
      products.map((product) =>
        createQuotationItem(product, selectedGstPercentage),
      ),
    );
    setIsGenerating(false);
    setIsProductPickerOpen(false);
    setProductSearch("");
    setDebouncedProductSearch("");
    setProductPage(TABLE_DEFAULTS.PAGE);
    dispatch(quotationProductOptionsReset());
    setSelectedCompany(quotationCompany);
    setIsBillToExpanded(false);
    setIsCompanyPickerOpen(false);
    setCompanySearch("");
    setDebouncedCompanySearch("");
    setCompanyPage(TABLE_DEFAULTS.PAGE);
    setCompanyPagination(EMPTY_COMPANY_PAGINATION);
  }, [
    dispatch,
    isOpen,
    products,
    quotationCompany,
    selectedGstPercentage,
  ]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setProductPage(TABLE_DEFAULTS.PAGE);
      setDebouncedProductSearch(productSearch.trim());
    }, TABLE_DEFAULTS.SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [productSearch]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const request = dispatch(
      fetchQuotationProducts({
        page: productPage,
        search: debouncedProductSearch,
      }),
    );

    return () => request.abort();
  }, [debouncedProductSearch, dispatch, isOpen, productPage]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setCompanyPage(TABLE_DEFAULTS.PAGE);
      setDebouncedCompanySearch(companySearch.trim());
    }, TABLE_DEFAULTS.SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [companySearch]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const controller = new AbortController();
    const isFirstPage = companyPage === TABLE_DEFAULTS.PAGE;

    if (isFirstPage) {
      setCompanies([]);
      setIsLoadingCompanies(true);
    } else {
      setIsLoadingMoreCompanies(true);
    }
    setCompanyError(null);

    const loadCompanies = async () => {
      try {
        const response = await employeeCompanyApi.getCompanies(
          {
            ...toCompanyListParams({
              page: companyPage,
              limit: COMPANY_TABLE_DEFAULTS.limit,
              search: debouncedCompanySearch,
              sort: COMPANY_TABLE_DEFAULTS.sort,
            }),
            is_active: true,
          },
          { signal: controller.signal },
        );
        const result = fromCompanyListResponse(response, {
          page: companyPage,
          limit: COMPANY_TABLE_DEFAULTS.limit,
        });

        setCompanies((current) => {
          if (isFirstPage) return result.items;

          const uniqueCompanies = new Map(
            [...current, ...result.items].map((company) => [
              company.id,
              company,
            ]),
          );
          return [...uniqueCompanies.values()];
        });
        setCompanyPagination(result.pagination);
      } catch {
        if (!controller.signal.aborted) {
          if (isFirstPage) setCompanies([]);
          setCompanyError("Unable to load companies. Try searching again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingCompanies(false);
          setIsLoadingMoreCompanies(false);
        }
      }
    };

    loadCompanies();

    return () => controller.abort();
  }, [companyPage, debouncedCompanySearch, isOpen]);

  const selectCompany = (company) => {
    setSelectedCompany(company);
    setIsCompanyPickerOpen(false);
    setCompanySearch("");
  };

  const updateSelectedCompanyField = (field, value) =>
    setSelectedCompany((current) =>
      current ? { ...current, [field]: value } : current,
    );

  const updateSelectedCompanyAddress = (value) =>
    setSelectedCompany((current) => {
      if (!current) return current;

      const addresses = current.addresses?.length
        ? [...current.addresses]
        : [{}];
      addresses[0] = { ...addresses[0], address: value };

      return { ...current, addresses };
    });

  const selectedProductIds = useMemo(
    () => new Set(quotationItems.map((item) => item.id)),
    [quotationItems],
  );

  const addProduct = (nextProduct) => {
    const id = quotationItemId(nextProduct);
    setQuotationItems((current) =>
      current.some((item) => item.id === id)
        ? current
        : [...current, createQuotationItem(nextProduct, selectedGstPercentage)],
    );
    setIsProductPickerOpen(false);
    setProductSearch("");
  };

  const removeProduct = (itemId) =>
    setQuotationItems((current) =>
      current.length > 1
        ? current.filter((item) => item.id !== itemId)
        : current,
    );

  const updateItem = (itemId, field, value) =>
    setQuotationItems((current) =>
      current.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item,
      ),
    );

  const toggleItemField = (itemId, field) =>
    setQuotationItems((current) =>
      current.map((item) =>
        item.id === itemId
          ? {
              ...item,
              enabledFields: {
                ...item.enabledFields,
                [field]: !item.enabledFields[field],
              },
            }
          : item,
      ),
    );

  const itemErrors = useMemo(
    () =>
      Object.fromEntries(
        quotationItems.map((item) => [item.id, validateQuotationItem(item)]),
      ),
    [quotationItems],
  );

  const hasItemErrors = useMemo(
    () =>
      Object.values(itemErrors).some((errors) => Object.keys(errors).length),
    [itemErrors],
  );

  const hasNonPositiveSalePrice = useMemo(
    () =>
      quotationItems.some((item) => {
        const salePrice = Number(item.salePrice);
        return !Number.isFinite(salePrice) || salePrice <= 0;
      }),
    [quotationItems],
  );

  const totals = useMemo(() => {
    const productTotals = quotationItems.reduce(
      (summary, item) => {
        const itemTotals = calculateItemTotals(item);
        summary.quantity += itemTotals.quantity;
        summary.subtotal += itemTotals.subtotal;
        summary.totalDiscount += itemTotals.totalDiscount;
        summary.taxableAmount += itemTotals.taxableAmount;
        return summary;
      },
      {
        quantity: 0,
        subtotal: 0,
        totalDiscount: 0,
        taxableAmount: 0,
      },
    );
    const gstRate = Math.max(numericValue(selectedGstPercentage), 0);
    const gstAmount = productTotals.taxableAmount * (gstRate / 100);

    return {
      ...productTotals,
      gstAmount,
      grandTotal: productTotals.taxableAmount + gstAmount,
    };
  }, [quotationItems, selectedGstPercentage]);

  const generatePdf = async () => {
    if (
      !isOpen ||
      !selectedCompany ||
      hasNonPositiveSalePrice ||
      hasItemErrors
    )
      return;
    setIsGenerating(true);
    try {
      const { downloadProductQuotationPdf } =
        await import("@screenComponent/products/quotation/productQuotationPdf");
      await downloadProductQuotationPdf(
        quotationItems.map((item) => ({
          product: {
            ...item.product,
            description: item.description,
          },
          pricing: {
            quantity: item.quantity,
            salePrice: item.salePrice,
            gstPercentage: item.gstPercentage,
            discountAmount: item.discountAmount,
          },
        })),
        companyLogoUrl,
        selectedCompany,
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        ref={sheetContentRef}
        className="w-full gap-0 sm:max-w-xl lg:max-w-2xl"
      >
        {isOpen && (
          <>
            <SheetHeader className="border-b px-5 py-5 sm:px-6">
              <div className="flex items-start gap-3 pr-8">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-white p-1.5 shadow-xs">
                  <img
                    src={companyLogoUrl}
                    alt="The General Electric Stores"
                    className="size-full object-contain"
                  />
                </span>
                <div>
                  <SheetTitle className="text-xl sm:text-2xl">
                    Product quotation
                  </SheetTitle>
                  <SheetDescription className="mt-1">
                    Choose a quantity and review commercial values before
                    export.
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div
              data-lenis-prevent
              className="flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-6"
            >
              <section>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold">Products</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Add products and configure commercial values for each
                      line.
                    </p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {quotationItems.length}{" "}
                    {quotationItems.length === 1 ? "product" : "products"}
                  </span>
                </div>

                <Popover
                  open={isProductPickerOpen}
                  onOpenChange={setIsProductPickerOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4 w-full"
                    >
                      <Plus className="size-4" />
                      Add another product
                    </Button>
                  </PopoverTrigger>
                  <QuotationPopoverContent
                    align="start"
                    container={sheetContentRef.current}
                    className="w-(--radix-popover-trigger-width) p-0"
                  >
                    <div className="border-b p-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={productSearch}
                          onChange={(event) =>
                            setProductSearch(event.target.value)
                          }
                          placeholder="Search product name or code..."
                          aria-label="Search products"
                          className="pl-9"
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="max-h-72 overflow-y-auto p-1">
                      {isLoadingProducts ? (
                        <div className="flex items-center justify-center gap-2 px-3 py-8 text-sm text-muted-foreground">
                          <Loader2 className="size-4 animate-spin" />
                          Searching products...
                        </div>
                      ) : productError ? (
                        <p className="px-3 py-8 text-center text-sm text-destructive">
                          {productError}
                        </p>
                      ) : availableProducts.length === 0 ? (
                        <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                          No product found.
                        </p>
                      ) : (
                        availableProducts.map((availableProduct) => {
                          const isAdded = selectedProductIds.has(
                            quotationItemId(availableProduct),
                          );

                          return (
                            <Button
                              key={quotationItemId(availableProduct)}
                              type="button"
                              variant="ghost"
                              disabled={isAdded}
                              onClick={() => addProduct(availableProduct)}
                              className="h-auto w-full justify-start gap-2 px-3 py-2.5 text-left font-normal"
                            >
                              <Check
                                className={`size-4 shrink-0 ${
                                  isAdded ? "opacity-100" : "opacity-0"
                                }`}
                              />
                              <span className="min-w-0 flex-1">
                                <span className="block truncate font-medium">
                                  {availableProduct.name}
                                </span>
                                <span className="block truncate text-xs text-muted-foreground">
                                  {availableProduct.productCode} ·{" "}
                                  {availableProduct.agencyName ||
                                    availableProduct.agency}
                                </span>
                              </span>
                              {isAdded && (
                                <span className="text-xs text-muted-foreground">
                                  Added
                                </span>
                              )}
                            </Button>
                          );
                        })
                      )}
                    </div>

                    {productPagination.page < productPagination.totalPages && (
                      <div className="border-t p-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          disabled={isLoadingMoreProducts}
                          onClick={() => setProductPage((page) => page + 1)}
                          className="w-full"
                        >
                          {isLoadingMoreProducts && (
                            <Loader2 className="size-4 animate-spin" />
                          )}
                          {isLoadingMoreProducts
                            ? "Loading..."
                            : "Load more products"}
                        </Button>
                      </div>
                    )}
                  </QuotationPopoverContent>
                </Popover>

                <div className="mt-4 space-y-4">
                  {quotationItems.map((item) => (
                    <QuotationProductCard
                      key={item.id}
                      item={item}
                      errors={itemErrors[item.id] ?? {}}
                      canRemove={quotationItems.length > 1}
                      onRemove={() => removeProduct(item.id)}
                      onUpdate={(field, value) =>
                        updateItem(item.id, field, value)
                      }
                      onToggleField={(field) => toggleItemField(item.id, field)}
                    />
                  ))}
                </div>
              </section>

              <section className="rounded-xl border bg-card p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold">Bill to</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Select the client company whose billing details should
                      appear in the PDF.
                    </p>
                    {!isBillToExpanded && selectedCompany && (
                      <div className="mt-3 flex items-start gap-2 text-sm">
                        <Building2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            {selectedCompany.name}
                          </p>
                          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                            {companyAddress(selectedCompany)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <CardExpansionButton
                    expanded={isBillToExpanded}
                    onClick={() =>
                      setIsBillToExpanded((current) => !current)
                    }
                    controls="quotation-bill-to-details"
                  />
                </div>

                {isBillToExpanded && (
                  <div id="quotation-bill-to-details">
                    <div className="mt-4 grid gap-2">
                  <Label htmlFor="quotation-company">Company</Label>
                  <Popover
                    open={isCompanyPickerOpen}
                    onOpenChange={setIsCompanyPickerOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        id="quotation-company"
                        type="button"
                        variant="outline"
                        role="combobox"
                        aria-expanded={isCompanyPickerOpen}
                        className="w-full justify-between font-normal"
                      >
                        <span className="truncate">
                          {selectedCompany?.name || "Select a company"}
                        </span>
                        <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <QuotationPopoverContent
                      align="start"
                      container={sheetContentRef.current}
                      className="w-(--radix-popover-trigger-width) p-0"
                    >
                      <div className="border-b p-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            value={companySearch}
                            onChange={(event) =>
                              setCompanySearch(event.target.value)
                            }
                            placeholder="Search company name..."
                            aria-label="Search company by name"
                            className="pl-9"
                            autoFocus
                          />
                        </div>
                      </div>

                      <div className="max-h-64 overscroll-contain overflow-y-auto p-1">
                        {isLoadingCompanies ? (
                          <div className="flex items-center justify-center gap-2 px-3 py-8 text-sm text-muted-foreground">
                            <Loader2 className="size-4 animate-spin" />
                            Searching companies...
                          </div>
                        ) : companyError ? (
                          <p className="px-3 py-8 text-center text-sm text-destructive">
                            {companyError}
                          </p>
                        ) : companies.length === 0 ? (
                          <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                            No company found.
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
                                  selectedCompany?.id === company.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              <span className="min-w-0">
                                <span className="block truncate font-medium">
                                  {company.name}
                                </span>
                                <span className="block truncate text-xs text-muted-foreground">
                                  {company.email ||
                                    company.phone ||
                                    "No contact information"}
                                </span>
                              </span>
                            </Button>
                          ))
                        )}
                      </div>

                      {companyPagination.page <
                        companyPagination.totalPages && (
                        <div className="border-t p-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={isLoadingMoreCompanies}
                            onClick={() => setCompanyPage((page) => page + 1)}
                            className="w-full"
                          >
                            {isLoadingMoreCompanies && (
                              <Loader2 className="size-4 animate-spin" />
                            )}
                            {isLoadingMoreCompanies
                              ? "Loading..."
                              : "Load more companies"}
                          </Button>
                        </div>
                      )}
                    </QuotationPopoverContent>
                  </Popover>
                    </div>

                    {selectedCompany && (
                      <div className="mt-4 rounded-lg border bg-muted/20 p-4 text-sm">
                    <div className="flex gap-2">
                      <Building2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <p className="font-semibold">{selectedCompany.name}</p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      These details apply only to this quotation.
                    </p>

                    <div className="mt-4 grid gap-4">
                      <div className="grid gap-2">
                        <Label
                          htmlFor="quotation-company-address"
                          className="flex items-center gap-2"
                        >
                          <MapPin className="size-3.5 text-primary" />
                          Address
                        </Label>
                        <Textarea
                          id="quotation-company-address"
                          value={
                            selectedCompany.addresses?.[0]?.address ||
                            selectedCompany.address1 ||
                            ""
                          }
                          onChange={(event) =>
                            updateSelectedCompanyAddress(event.target.value)
                          }
                          placeholder="Enter billing address"
                          rows={3}
                        />
                        {(selectedCompany.addresses?.[0]?.state ||
                          selectedCompany.state1 ||
                          selectedCompany.addresses?.[0]?.pincode ||
                          selectedCompany.pincode1) && (
                          <p className="text-xs text-muted-foreground">
                            {(selectedCompany.addresses?.[0]?.state ||
                              selectedCompany.state1) && (
                              <>
                                State:{" "}
                                {selectedCompany.addresses?.[0]?.state ||
                                  selectedCompany.state1}
                                {(selectedCompany.addresses?.[0]?.pincode ||
                                  selectedCompany.pincode1) && " · "}
                              </>
                            )}
                            {(selectedCompany.addresses?.[0]?.pincode ||
                              selectedCompany.pincode1) && (
                              <>
                                Pincode:{" "}
                                {selectedCompany.addresses?.[0]?.pincode ||
                                  selectedCompany.pincode1}
                              </>
                            )}
                          </p>
                        )}
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                          <Label
                            htmlFor="quotation-company-email"
                            className="flex items-center gap-2"
                          >
                            <Mail className="size-3.5 text-primary" />
                            Email
                          </Label>
                          <Input
                            id="quotation-company-email"
                            type="email"
                            value={selectedCompany.email ?? ""}
                            onChange={(event) =>
                              updateSelectedCompanyField(
                                "email",
                                event.target.value,
                              )
                            }
                            placeholder="Enter email address"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label
                            htmlFor="quotation-company-phone"
                            className="flex items-center gap-2"
                          >
                            <Phone className="size-3.5 text-primary" />
                            Contact number
                          </Label>
                          <Input
                            id="quotation-company-phone"
                            type="tel"
                            value={selectedCompany.phone ?? ""}
                            onChange={(event) =>
                              updateSelectedCompanyField(
                                "phone",
                                event.target.value,
                              )
                            }
                            placeholder="Enter contact number"
                          />
                        </div>
                      </div>

                      <p className="text-xs font-medium">
                        GSTIN: {staticValue(selectedCompany.gstNumber)}
                      </p>
                    </div>
                      </div>
                    )}
                  </div>
                )}
              </section>

              <section className="rounded-xl border bg-card p-4 sm:p-5">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold">Quotation preview</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {quotationItems.length} product line
                      {quotationItems.length === 1 ? "" : "s"}
                      {" · "}
                      {totals.quantity} total unit
                      {totals.quantity === 1 ? "" : "s"}
                    </p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {totals.quantity} {totals.quantity === 1 ? "unit" : "units"}
                  </span>
                </div>
                <div className="mt-4">
                  <SummaryItem
                    label="Subtotal"
                    value={moneyFormatter.format(totals.subtotal)}
                  />
                  <SummaryItem
                    label="Total discount"
                    value={`- ${moneyFormatter.format(totals.totalDiscount)}`}
                  />
                  <SummaryItem
                    label="Taxable amount"
                    value={moneyFormatter.format(totals.taxableAmount)}
                  />
                  {quotationTaxTreatment === "gujarat" && (
                    <>
                      <SummaryItem
                        label={`CGST (${numericValue(selectedGstPercentage) / 2}%)`}
                        value={moneyFormatter.format(totals.gstAmount / 2)}
                      />
                      <SummaryItem
                        label={`SGST (${numericValue(selectedGstPercentage) / 2}%)`}
                        value={moneyFormatter.format(totals.gstAmount / 2)}
                      />
                    </>
                  )}
                  {quotationTaxTreatment === "out-of-gujarat" && (
                    <SummaryItem
                      label={`IGST (${numericValue(selectedGstPercentage)}%)`}
                      value={moneyFormatter.format(totals.gstAmount)}
                    />
                  )}
                  <SummaryItem
                    label={`Total for ${totals.quantity} ${totals.quantity === 1 ? "unit " : "units "}`}
                    value={moneyFormatter.format(totals.grandTotal)}
                    emphasized
                  />
                </div>
              </section>
            </div>

            <SheetFooter className="border-t bg-background px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-xs text-muted-foreground">
                {!selectedCompany
                  ? "Select a billing company to enable PDF download."
                  : hasNonPositiveSalePrice
                    ? "Enter a sale price greater than 0 for every product."
                    : hasItemErrors
                      ? "Resolve the quotation errors to enable PDF download."
                      : `Billing to ${selectedCompany.name}.`}
              </p>
              <Button
                type="button"
                onClick={generatePdf}
                disabled={
                  isGenerating ||
                  !selectedCompany ||
                  hasNonPositiveSalePrice ||
                  hasItemErrors
                }
              >
                {isGenerating ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Download className="size-4" />
                )}
                {isGenerating ? "Creating PDF..." : "Download quotation PDF"}
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default ProductQuotationSheet;
