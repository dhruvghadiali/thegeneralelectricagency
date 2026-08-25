import {
  Boxes,
  Building2,
  CreditCard,
  Settings,
  Users,
  LucideHome,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

import { ROLE_PATHS } from "@Enums";

/**
 * Sidebar nav items per role. Keyed by ROLE_PATHS so a role with no sign-in
 * flow wired up yet still has its menu ready to go the moment it does.
 */
export const SIDEBAR_NAV_ITEMS_BY_ROLE = {
  [ROLE_PATHS.SUPER_ADMIN]: [
    { title: "Dashboard", url: "/dashboard", icon: LucideHome },
    { title: "Credit", url: "/credit", icon: CreditCard },
    { title: "Products", url: "/products", icon: Boxes },
    { title: "Stocks", url: "/stocks", icon: TrendingUp },
    { title: "Employees", url: "/employees", icon: Users },
    { title: "Companies", url: "/companies", icon: Building2 },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
  [ROLE_PATHS.EMPLOYEE]: [
    { title: "Dashboard", url: "/dashboard", icon: LucideHome },
    { title: "Purchase orders", url: "/purchases", icon: ShoppingCart },
    { title: "Credit", url: "/credit", icon: CreditCard },
    { title: "Products", url: "/products", icon: Boxes },
    { title: "Companies", url: "/companies", icon: Building2 },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
  [ROLE_PATHS.WAREHOUSE_MANAGER]: [
    { title: "Dashboard", url: "/dashboard", icon: LucideHome },
    { title: "Stocks", url: "/stocks", icon: TrendingUp },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
};
