import {
  Boxes,
  Building2,
  HandCoins,
  Settings,
  Users,
  LucideHome,
  ShoppingCart,
  Receipt,
  TrendingUp,
} from "lucide-react";

import { ROLE_PATHS } from "@Enums";
import { ROUTES } from "@routes/navigate";

/**
 * Sidebar nav items per role. Keyed by ROLE_PATHS so a role with no sign-in
 * flow wired up yet still has its menu ready to go the moment it does.
 */
export const SIDEBAR_NAV_ITEMS_BY_ROLE = {
  [ROLE_PATHS.SUPER_ADMIN]: [
    { title: "Dashboard", url: ROUTES.DASHBOARD, icon: LucideHome },
    { title: "EUOB", url: ROUTES.PURCHASE_CREDITS, icon: HandCoins },
    { title: "Products", url: ROUTES.PRODUCTS, icon: Boxes },
    { title: "Employees", url: ROUTES.EMPLOYEES, icon: Users },
    { title: "Companies", url: ROUTES.COMPANIES, icon: Building2 },
    { title: "Settings", url: ROUTES.SETTINGS, icon: Settings },
  ],
  [ROLE_PATHS.EMPLOYEE]: [
    { title: "Dashboard", url: ROUTES.DASHBOARD, icon: LucideHome },
    { title: "Purchase orders", url: ROUTES.PURCHASES, icon: ShoppingCart },
    { title: "Sales", url: ROUTES.SALES, icon: Receipt },
    { title: "EUOB", url: ROUTES.PURCHASE_CREDITS, icon: HandCoins },
    { title: "Products", url: ROUTES.PRODUCTS, icon: Boxes },
    { title: "Companies", url: ROUTES.COMPANIES, icon: Building2 },
    { title: "Settings", url: ROUTES.SETTINGS, icon: Settings },
  ],
  [ROLE_PATHS.WAREHOUSE_MANAGER]: [
    { title: "Dashboard", url: ROUTES.DASHBOARD, icon: LucideHome },
    { title: "Stocks", url: ROUTES.STOCKS, icon: TrendingUp },
    { title: "Settings", url: ROUTES.SETTINGS, icon: Settings },
  ],
};
