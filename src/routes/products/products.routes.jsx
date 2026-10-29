import { ROLE_PATHS } from "@Enums";
import { ROUTES } from "@routes/navigate";

import RoleRoute from "@routes/role.route";
import ProductsPage from "@pages/products.page";
import ProductsScreen from "@Tally/pages/products";
import ProductDetailsPage from "@pages/product-details.page";
import ProductSyncPendingPage from "@pages/product-sync-pending.page";

export const productRoutes = [
  {
    element: <RoleRoute allowedRoles={[ROLE_PATHS.TECH_SUPPORT]} />,
    children: [{ path: ROUTES.SYNC_PRODUCTS, Component: ProductsScreen }],
  },
  {
    element: (
      <RoleRoute allowedRoles={[ROLE_PATHS.SUPER_ADMIN, ROLE_PATHS.EMPLOYEE]} />
    ),
    children: [{ path: ROUTES.PRODUCTS, Component: ProductsPage }],
  },
  {
    element: <RoleRoute allowedRoles={[ROLE_PATHS.EMPLOYEE]} />,
    children: [
      {
        path: ROUTES.PRODUCT_SYNC_PENDING,
        Component: ProductSyncPendingPage,
      },
      { path: ROUTES.PRODUCT_NEW, Component: ProductDetailsPage },
      { path: ROUTES.PRODUCT_EDIT, Component: ProductDetailsPage },
    ],
  },
];
