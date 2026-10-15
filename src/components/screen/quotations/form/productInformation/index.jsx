import QuotationProductDirectory from "@screenComponent/quotations/form/productInformation/productDirectory";
import QuotationProductDuplicateDialog from "@screenComponent/quotations/dialogs/quotationProductDuplicateDialog";
import QuotationProductAddAnotherDialog from "@screenComponent/quotations/dialogs/quotationProductAddAnotherDialog";
import QuotationProductFormDiscardDialog from "@screenComponent/quotations/dialogs/quotationProductFormDiscardDialog";
import QuotationCompanySummaryCard from "@screenComponent/quotations/form/companyInformation/quotationCompanySummaryCard";
import useQuotationProductInformation from "@screenComponent/quotations/form/productInformation/useQuotationProductInformation";
import QuotationProductInformationCard from "@screenComponent/quotations/form/productInformation/quotationProductInformationCard";
import QuotationProductSummaryCard from "@screenComponent/quotations/form/productInformation/productSummary/quotationProductSummaryCard";

function QuotationProductInformation({
  companyInformation,
  canNavigateToCompanyInformation = true,
}) {
  const product = useQuotationProductInformation({
    canNavigateToCompanyInformation,
  });

  return (
    <>
      <div className="grid w-full gap-6 lg:h-full lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.8fr)]">
        <div className="flex min-w-0 flex-col gap-4 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
          <QuotationCompanySummaryCard
            companyName={companyInformation.companyName}
            address={companyInformation.address}
            onClick={product.openCompanyInformation}
            isInteractive={canNavigateToCompanyInformation}
          />
          {product.productInformation.length > 0 && (
            <QuotationProductSummaryCard
              products={product.productInformation}
              isExpanded={product.isProductSummaryExpanded}
              onEdit={product.editProduct}
              pendingDeleteProductIndex={product.pendingDeleteProductIndex}
              onDeleteRequest={product.requestProductDelete}
              onDeleteCancel={product.cancelProductDelete}
              onDeleteConfirm={product.deleteProduct}
              onOpenProductSummary={product.openProductSummary}
              onNavigateToCompanyInformation={product.openCompanyInformation}
              onNavigateToProductInformation={product.openProductInformation}
              onOpenQuotationSummary={product.openQuotationSummary}
            />
          )}
          {!product.isProductSummaryExpanded &&
            !product.isAddAnotherDialogOpen && (
              <QuotationProductInformationCard
                formik={product.formik}
                fieldError={product.fieldError}
                fieldRefs={product.productFieldRefs}
                keyboard={product.keyboard}
                canUndoProductDescription={
                  product.canUndoProductDescription
                }
                onUndoProductDescription={product.undoProductDescription}
                onProductNameChange={product.changeProductName}
                onProductNameBlur={product.blurProductName}
              />
            )}
        </div>
        <QuotationProductDirectory
          directoryRef={product.productFieldRefs.productDirectoryRef}
          onProductSelect={product.selectProduct}
          onProductOptionKeyDown={product.keyboard.handleProductOptionKeyDown}
        />
      </div>
      <QuotationProductAddAnotherDialog
        open={product.isAddAnotherDialogOpen}
        onNo={product.finishAddingProducts}
        onYes={product.addAnotherProduct}
      />
      <QuotationProductDuplicateDialog
        product={
          product.productInformation[product.pendingDuplicateProductIndex] ??
          null
        }
        onNo={product.cancelDuplicateProduct}
        onYes={product.editDuplicateProduct}
      />
      <QuotationProductFormDiscardDialog
        open={product.isProductFormDiscardDialogOpen}
        onCancel={product.cancelProductFormDiscard}
        onConfirm={product.confirmProductFormDiscard}
      />
    </>
  );
}

export default QuotationProductInformation;
