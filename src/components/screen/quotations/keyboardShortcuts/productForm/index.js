import { withDesktopKeyboardShortcut } from "@keyboard/keyboard.utils";
import useProductDescriptionKeyboardShortcut, {
  useProductDescriptionUndoKeyboardShortcut,
} from "@screenComponent/quotations/keyboardShortcuts/productForm/useProductDescriptionKeyboardShortcut";
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
  discountInputRef,
  descriptionInputRef,
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
    discountInputRef,
  });
  const handleDiscountKeyDown = useProductDiscountKeyboardShortcut({
    sellingPriceInputRef,
    descriptionInputRef,
  });
  const handleDescriptionKeyDown = useProductDescriptionKeyboardShortcut({
    discountInputRef,
    saveButtonRef,
  });
  const handleSaveKeyDown = useProductSaveKeyboardShortcut({
    descriptionInputRef,
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
    handleDescriptionKeyDown: withDesktopKeyboardShortcut(
      handleDescriptionKeyDown,
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
