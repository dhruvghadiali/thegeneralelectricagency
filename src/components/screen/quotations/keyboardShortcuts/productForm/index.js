import { withDesktopKeyboardShortcut } from "@keyboard/keyboard.utils";
import useProductDescriptionKeyboardShortcut, {
  useProductDescriptionUndoKeyboardShortcut,
} from "@screenComponent/quotations/keyboardShortcuts/productForm/useProductDescriptionKeyboardShortcut";
import useProductDeliveryNotesKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/productForm/useProductDeliveryNotesKeyboardShortcut";
import useProductDirectoryKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/productForm/useProductDirectoryKeyboardShortcut";
import useProductDiscountKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/productForm/useProductDiscountKeyboardShortcut";
import useProductNameKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/productForm/useProductNameKeyboardShortcut";
import useProductQuantityKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/productForm/useProductQuantityKeyboardShortcut";
import useProductSaveKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/productForm/useProductSaveKeyboardShortcut";
import useProductSellingPriceKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/productForm/useProductSellingPriceKeyboardShortcut";

function useProductKeyboardShortcuts({
  productInputRef,
  quantityInputRef,
  sellingPriceInputRef,
  discountPercentageInputRef,
  discountInputRef,
  descriptionInputRef,
  productDeliveryNotesInputRef,
  saveButtonRef,
  productDirectoryRef,
  hasProductSummary,
  onNavigateToCompanyInformation,
  onOpenProductSummary,
  isProductFormOpen,
  canUndoProductDescription,
  onUndoProductDescription,
}) {
  const productNameKeyboard = useProductNameKeyboardShortcut({
    productDirectoryRef,
    quantityInputRef,
    hasProductSummary,
    onNavigateToCompanyInformation,
    onOpenProductSummary,
  });
  const handleQuantityKeyDown = useProductQuantityKeyboardShortcut({
    productInputRef,
    sellingPriceInputRef,
  });
  const handleSellingPriceKeyDown = useProductSellingPriceKeyboardShortcut({
    quantityInputRef,
    discountPercentageInputRef,
  });
  const handleDiscountPercentageKeyDown = useProductDiscountKeyboardShortcut({
    previousInputRef: sellingPriceInputRef,
    nextInputRef: discountInputRef,
  });
  const handleDiscountKeyDown = useProductDiscountKeyboardShortcut({
    previousInputRef: discountPercentageInputRef,
    nextInputRef: descriptionInputRef,
  });
  const handleDescriptionKeyDown = useProductDescriptionKeyboardShortcut({
    discountInputRef,
    productDeliveryNotesInputRef,
  });
  const handleProductDeliveryNotesKeyDown =
    useProductDeliveryNotesKeyboardShortcut({
      descriptionInputRef,
      saveButtonRef,
    });
  const handleSaveKeyDown = useProductSaveKeyboardShortcut({
    productDeliveryNotesInputRef,
    productInputRef,
  });
  const handleProductOptionKeyDown = useProductDirectoryKeyboardShortcut({
    productInputRef,
    productDirectoryRef,
  });
  const descriptionUndoKeyboard = useProductDescriptionUndoKeyboardShortcut({
    enabled: isProductFormOpen,
    canUndoProductDescription,
    onUndoProductDescription,
  });

  return {
    handleProductNameFocus: productNameKeyboard.handleProductNameFocus,
    handleProductNameKeyDown: withDesktopKeyboardShortcut(
      productNameKeyboard.handleProductNameKeyDown,
    ),
    handleQuantityKeyDown: withDesktopKeyboardShortcut(handleQuantityKeyDown),
    handleSellingPriceKeyDown: withDesktopKeyboardShortcut(
      handleSellingPriceKeyDown,
    ),
    handleDiscountKeyDown: withDesktopKeyboardShortcut(handleDiscountKeyDown),
    handleDiscountPercentageKeyDown: withDesktopKeyboardShortcut(
      handleDiscountPercentageKeyDown,
    ),
    handleDescriptionKeyDown: withDesktopKeyboardShortcut(
      handleDescriptionKeyDown,
    ),
    handleProductDeliveryNotesKeyDown: withDesktopKeyboardShortcut(
      handleProductDeliveryNotesKeyDown,
    ),
    handleSaveKeyDown: withDesktopKeyboardShortcut(handleSaveKeyDown),
    handleProductOptionKeyDown: withDesktopKeyboardShortcut(
      handleProductOptionKeyDown,
    ),
    handleDescriptionBeforeInput: withDesktopKeyboardShortcut(
      descriptionUndoKeyboard.handleDescriptionBeforeInput,
    ),
  };
}

export default useProductKeyboardShortcuts;
