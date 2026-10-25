import { ROLE_PATHS } from "@Enums";
import { createUnmappedProductsListApi } from "@Tally/api/factories/unmappedProducts.factory";

export const unmappedProductsApi = createUnmappedProductsListApi(
  ROLE_PATHS.TECH_SUPPORT,
);
